import { useState, useEffect } from "react";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import ModalDialog from "./ModalDialog";
import FormFieldComponent from "./FormFieldComponent";
import {
    FacultyAndDepartmentApiResponse,
    CourseApiResponse
} from "@/constants/types";
import { courseEnrollmentFormFields } from '../constants/forms';
import { facultyService } from "@/services/faculty";
import { departmentService } from "@/services/department";
import { courseService } from "@/services/course";
import { Text } from "./ui/text";
import { createOptionsFromResponse } from "@/hooks/createOptions";
import { CourseEnrollmentField, CourseEnrollmentFieldId } from '@/constants/types';
import { studentService } from "@/services/student";
import Toast from 'react-native-toast-message';
import { useSession } from "@/hooks/ctx";

interface PaginationMetadata {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    hasPrevious: boolean;
    hasNext: boolean;
}

export default function RegisterCourse() {
    const { user } = useSession()
    // Form state
    const [showDialog, setShowDialog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Data state
    const [formFields, setFormFields] = useState<CourseEnrollmentField[] | undefined>(undefined);
    const [facultiesData, setFacultiesData] = useState<FacultyAndDepartmentApiResponse[] | null>(null);
    const [departmentsData, setDepartmentsData] = useState<FacultyAndDepartmentApiResponse[] | null>(null);
    const [coursesData, setCoursesData] = useState<CourseApiResponse[] | null>(null);
    const [coursesPagination, setCoursesPagination] = useState<PaginationMetadata | null>(null);

    // Form data and errors
    const [formData, setFormData] = useState<Record<CourseEnrollmentFieldId, string>>({
        faculty: "",
        department: "",
        course: ""
    });
    const [errors, setErrors] = useState<Partial<Record<CourseEnrollmentFieldId, string>>>({});

    // Load initial data
    useEffect(() => {
        if (showDialog) {
            loadInitialData();
        }
    }, [showDialog]);

    // Load departments when faculty changes
    useEffect(() => {
        if (formData.faculty) {
            loadDepartments(formData.faculty);
        }
    }, [formData.faculty]);

    // Load courses when department and level change
    useEffect(() => {
        if (formData.department) {
            loadCourses(formData.department);
        }
    }, [formData.department]);

    // Update form steps when data changes
    useEffect(() => {
        if (facultiesData || departmentsData) {
            updateFormSteps();
        }
    }, [facultiesData, departmentsData]);

    const loadInitialData = async () => {
        try {
            const [facultiesResponse] = await Promise.all([
                facultyService.getFaculties(),
            ]);

            if (facultiesResponse.success) {
                setFacultiesData(facultiesResponse.data!);
            }
        } catch (error) {
            console.error("Error loading initial data:", error);
        }
    };

    const loadDepartments = async (facultyId: string) => {
        try {
            const { data, success } = await departmentService.getDepartmentsByFaculty(facultyId);
            if (success) {
                setDepartmentsData(data!);
            }
        } catch (error) {
            console.error("Error loading departments:", error);
        }
    };

    const loadCourses = async (departmentId: string) => {
        try {
            const response = await courseService.getCoursesByDepartment(departmentId);
            if (response.success) {
                setCoursesData(response.data!);
                console.log(response.data)
                console.log(JSON.parse(response.headers))
                // Extract pagination metadata from headers
                // const paginationHeader = response.headers['X-Pagination'];
                // if (paginationHeader) {
                //     const metadata = JSON.parse(paginationHeader);
                //     setCoursesPagination(metadata);
                //     console.log(metadata);
                // }
            }
        } catch (error) {
            console.error("Error loading courses:", error);
        }
    };

    const updateFormSteps = () => {
        const facultyOptions = createOptionsFromResponse(facultiesData!, "id", "name");
        const departmentOptions = departmentsData
            ? createOptionsFromResponse(departmentsData, "id", "name")
            : [];
        const courseOptions = coursesData
            ? createOptionsFromResponse(coursesData, "id", "title")
            : [];

        const fields = courseEnrollmentFormFields(
            facultyOptions,
            departmentOptions,
            courseOptions
        );
        setFormFields(fields!);
        console.log('Sets course data:', coursesData)
    };

    const handleChange = (id: CourseEnrollmentFieldId) => (value: string) => {
        const trimmedValue = value.trim();
        setFormData(prev => ({ ...prev, [id]: trimmedValue }));

        // Clear dependent fields when faculty changes
        if (id === 'faculty') {
            setFormData(prev => ({
                ...prev,
                department: '',
                course: ''
            }));
            setDepartmentsData(null);
            setCoursesData(null);
        }

        // Clear courses when department or level changes
        if (id === 'department') {
            setFormData(prev => ({ ...prev, course: '' }));
            setCoursesData(null);
        }

        // Clear error when field changes
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: '' }));
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const payload = {
                courseId: formData.course
            };

            // await studentService.enrollInCourse(user?.id!, payload);
            setShowDialog(false);
            Toast.show({
                type: 'success',
                text1: 'Course Enrolled',
                text2: 'You have successfully enrolled in the course!'
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Enrollment Failed',
                text2: 'Could not enroll in course. Please try again.'
            });
            console.error("Error enrolling in course:", error);
        } finally {
            setIsSubmitting(false);
        }
        setFormData({faculty: "", department: "", course: ""})
    };

    return (
        <VStack>
            <Button
                variant="outline"
                size="xl"
                onPress={() => setShowDialog(true)}
            >
                <Ionicons name="add-outline" size={34} color="#D6BD98" />
                <ButtonText className="text-secondary-0">Course Registration</ButtonText>
            </Button>

            <ModalDialog
                isOpen={showDialog}
                onClose={() => setShowDialog(false)}
                onAction={handleSubmit}
                title="Course Registration"
                actionText={'Enroll'}
                cancelText={'Cancel'}
                isLoading={isSubmitting}
            >
                {formFields ? (
                    formFields.map(field => (
                        <FormFieldComponent
                            key={field.id}
                            {...field}
                            value={formData[field.id]}
                            onChange={handleChange(field.id)}
                            isInvalid={!!errors[field.id]}
                            errorText={errors[field.id]}
                            isDisabled={
                                (field.id === 'department' && !formData.faculty) ||
                                (field.id === 'course' && (!formData.department))
                            }
                            options={
                                field.id === 'department' ? (
                                    departmentsData
                                    ? createOptionsFromResponse(departmentsData, "id", "name")
                                    : []
                                ) : field.id === 'course' ? (
                                    coursesData
                                    ? createOptionsFromResponse(coursesData, "id", "title")
                                    : []
                                ) : field.options
                            }
                        />
                    ))
                ) : (
                    <Text>Loading form fields...</Text>
                )}
            </ModalDialog>
        </VStack>
    );
}
