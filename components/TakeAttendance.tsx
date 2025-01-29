import { useState, useEffect } from "react";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import ModalDialog from "./ModalDialog";
import FormFieldComponent from "./FormFieldComponent";
import {
    ScheduleApiResponse,
    CourseApiResponse, CourseEnrollmentField, CourseEnrollmentFieldId,
    AttendanceField,
    AttendanceFieldId
} from "@/constants/types";
import { courseEnrollmentFormFields } from '../constants/forms';
import { facultyService } from "@/services/faculty";
import { departmentService } from "@/services/department";
import { courseService } from "@/services/course";
import { Text } from "./ui/text";
import { createOptionsFromResponse } from "@/hooks/createOptions";
import { enrollmentService } from "@/services/enrollment";
import Toast from 'react-native-toast-message';
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchEnrolledCourses } from "@/store/slices/courseSlice";
import { FontAwesome6 } from "@expo/vector-icons";
import { scheduleServices } from "@/services/schedule";

export default function TakeAttendance() {
    const { user } = useAppSelector((state) => state.auth);
    const { data: enrolledCourses } = useAppSelector((state) => state.courses);
    const dispatch = useAppDispatch();
    // Form state
    const [showDialog, setShowDialog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

        const [schedules, setSchedules] = useState<ScheduleApiResponse[]>([]);

        const courseIds = enrolledCourses.map(course => course.courseId);

    // Data state
    const [formFields, setFormFields] = useState<AttendanceField[] | undefined>(undefined);

    // Form data and errors
    const [formData, setFormData] = useState<Record<AttendanceFieldId, string>>({
        status: "",
        course: ""
    });
    const [errors, setErrors] = useState<Partial<Record<CourseEnrollmentFieldId, string>>>({});

    // Load initial data
    useEffect(() => {
        if (showDialog) {
            fetchCourseSchedules();
        }
    }, [showDialog]);

    const fetchCourseSchedules = async () => {
            const { data, success, error } = await scheduleServices.getAllSchedules();

                if (success && data) {
                    const filteredSchedules = data.filter(schedule => courseIds.includes(schedule.courseId));
                    setSchedules(filteredSchedules);
                    Toast.show({
                        type: 'success',
                        text1: 'Schedules Fetched',
                        text2: 'Schedules have been successfully fetched!',
                    })
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Failed to fetch schedules. Please try again.',
                    });
                    console.error('Error fetching schedules:', error);
                }
        };


    const handleSubmit = async () => {
        setIsSubmitting(true);
    };

    return (
        <VStack>
            <Button
                variant="outline"
                size="xl"
                onPress={() => setShowDialog(true)}
            >
                <FontAwesome6 name="address-book" size={34} color="#D6BD98" />
                <ButtonText className="text-secondary-0">Attendance</ButtonText>
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
                            onChange={ () => {}}
                            // isInvalid={!!errors[field.id]}
                            // errorText={errors[field.id]}
                            options={
                                field.id === 'course' ? (
                                    enrolledCourses
                                    ? createOptionsFromResponse(enrolledCourses)
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
