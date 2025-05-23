import { useState, useEffect } from "react";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import ModalDialog from "./ModalDialog";
import FormFieldComponent from "./forms/FormFieldComponent";
import { CourseEnrollmentFieldId, CourseEnrollmentField, CourseData, Course } from "@/constants/types/course";
import { CourseApiResponse } from "@/constants/types/course";
import { FacultyAndDepartmentApiResponse } from "@/constants/types/api";

import { courseEnrollmentFormFields } from '@/constants/forms';
import { facultyService } from "@/services/faculty";
import { departmentService } from "@/services/department";
import { courseService } from "@/services/course";
import { Text } from "./ui/text";
import { createOptionsFromResponse } from "@/hooks/useCreateOptions";
import { enrollmentService } from "@/services/enrollment";
import Toast from 'react-native-toast-message';
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchEnrolledCourses } from "@/store/slices/courseSlice";

interface PaginationMetadata {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    hasPrevious: boolean;
    hasNext: boolean;
}

export default function RegisterCourse() {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    // Form state
    const [showDialog, setShowDialog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Data state
    const [formFields, setFormFields] = useState<CourseEnrollmentField[] | undefined>(undefined);
    const [facultiesData, setFacultiesData] = useState<FacultyAndDepartmentApiResponse[] | null>(null);
    const [departmentsData, setDepartmentsData] = useState<FacultyAndDepartmentApiResponse[] | null>(null);
    const [coursesData, setCoursesData] = useState<Course[] | undefined>(undefined);
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
            if (response.success && response.data) {
                const data  = response.data.courses;
                setCoursesData(data);
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
            setCoursesData(undefined);
        }

        // Clear courses when department or level changes
        if (id === 'department') {
            setFormData(prev => ({ ...prev, course: '' }));
            setCoursesData(undefined);
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

            const { data, success } = await enrollmentService.enrollStudentInCourse(user?.id!, payload);
            if (success) {
                setShowDialog(false);
                Toast.show({
                    type: 'success',
                    text1: 'Course Enrolled',
                    text2: 'You have successfully enrolled in the course!'
                });

                dispatch(fetchEnrolledCourses(user?.id!));
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Enrollment Failed',
                text2: 'Could not enroll in course. Please try again.'
            });
            console.error("Error enrolling in course:", error);
        } finally {
            setIsSubmitting(false);
            setShowDialog(false);
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
                <Ionicons name="add-outline" size={24} color="#D6BD98" />
                <ButtonText className="text-secondary-0" size="md">Course Registration</ButtonText>
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
