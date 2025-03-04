import { useState, useEffect } from "react";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import ModalDialog from "./ModalDialog";
import FormFieldComponent from "./forms/FormFieldComponent";
import { AttendanceField, AttendanceFieldId } from "@/constants/types/attendance";
import { ScheduleApiResponse } from "@/constants/types/schedule";
import { attendanceFormFields } from '@/constants/forms';
import { Text } from "@/components/ui/text";
import { createOptionsFromResponse } from "@/hooks/useCreateOptions";
import Toast from 'react-native-toast-message';
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { FontAwesome6 } from "@expo/vector-icons";
import { scheduleServices } from "@/services/schedule";
import { getDay } from 'date-fns';
import { attendanceService } from "@/services/attendance";
import * as Location from 'expo-location';
import { CameraView } from "expo-camera";
import FaceRecognition from "./FaceRecognition";

export default function AttendanceVerification() {
    const { user } = useAppSelector((state) => state.auth);
    const { data: enrolledCourses } = useAppSelector((state) => state.courses);
    const dispatch = useAppDispatch();

    const [showDialog, setShowDialog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [schedules, setSchedules] = useState<ScheduleApiResponse[]>([]);

    const courseIds = enrolledCourses.map(course => course.courseId);
    const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const [formFields, setFormFields] = useState<AttendanceField[] | undefined>(undefined);
    const [formData, setFormData] = useState<Record<AttendanceFieldId, string>>({
        status: "",
        course: ""
    });
    const [errors, setErrors] = useState<Partial<Record<AttendanceFieldId, string>>>({});

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isLocationEnabled, setIsLocationEnabled] = useState(false);

    useEffect(() => {
        checkAndRequestLocation();
    }, []);

    const checkAndRequestLocation = async () => {
        try {
            // First check if location services are enabled
            const serviceEnabled = await Location.hasServicesEnabledAsync();
            if (!serviceEnabled) {
                setErrorMsg('Location services are disabled. Please enable them in your device settings.');
                Toast.show({
                    type: 'error',
                    text1: 'Location Services Disabled',
                    text2: 'Please enable location services to take attendance.',
                });
                return;
            }

            // Request permissions
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                Toast.show({
                    type: 'error',
                    text1: 'Location Permission Denied',
                    text2: 'Location access is required to take attendance.',
                });
                return;
            }

            setIsLocationEnabled(true);
        } catch (error) {
            console.error('Error checking location permissions:', error);
            setErrorMsg('Failed to check location permissions');
        }
    };

    // useEffect(() => {
    //     if (showDialog) {
    //         fetchCourseSchedules();
    //     }
    // }, [showDialog]);

    useEffect(() => {
        if (enrolledCourses || schedules) {
            updateFormSteps();
        }
    }, [enrolledCourses, schedules]);

    const isCurrentTimeWithinSchedule = (schedule: ScheduleApiResponse): boolean => {
        const now = new Date();
        const currentDay = WEEKDAYS[getDay(now)];

        if (schedule.dayOfWeek !== currentDay) return false;

        const currentTime = now.toLocaleTimeString('en-NG', { timeZone: 'Africa/Lagos', hour12: false });

        const scheduleStart = schedule.startTime;
        const scheduleEnd = schedule.endTime;

        return currentTime >= scheduleStart && currentTime <= scheduleEnd;
    };

    const fetchCourseSchedules = async () => {
        const { data, success, error } = await scheduleServices.getAllSchedules();

        if (success && data) {
            // Filter schedules for current day and time
            const currentSchedules = data.filter(schedule =>
                courseIds.includes(schedule.courseId) &&
                isCurrentTimeWithinSchedule(schedule)
            );

            setSchedules(currentSchedules);

            if (currentSchedules.length > 0) {
                Toast.show({
                    type: 'success',
                    text1: 'Schedules Fetched',
                    text2: `Found ${currentSchedules.length} active classes for today.`,
                });
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to fetch schedules. Please try again.',
            });
            console.error('Error fetching schedules:', error);
        }
    };

    const validateField = (fieldId: AttendanceFieldId, value: string): string => {
        if (!value || value.trim() === '') {
            return 'This field is required';
        }
        return '';
    };

    const handleFieldChange = (fieldId: AttendanceFieldId, value: string) => {
        setFormData(prev => ({
            ...prev,
            [fieldId]: value
        }));

        const error = validateField(fieldId, value);
        setErrors(prev => ({
            ...prev,
            [fieldId]: error
        }));
    };

    const updateFormSteps = () => {
        const courseOptions = createOptionsFromResponse(schedules, "courseId", "courseTitle");
        const fields = attendanceFormFields(courseOptions);
        setFormFields(fields);
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<AttendanceFieldId, string>> = {};
        let isValid = true;

        Object.keys(formData).forEach((fieldId) => {
            const error = validateField(fieldId as AttendanceFieldId, formData[fieldId as AttendanceFieldId]);
            if (error) {
                newErrors[fieldId as AttendanceFieldId] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const getCurrentLocation = async (): Promise<Location.LocationObject | null> => {
        try {
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High, // Using high accuracy for better precision
                timeInterval: 5000, // Update every 5 seconds
                distanceInterval: 5, // Update every 5 meters
            });
            setLocation(location);
            return location;
        } catch (error) {
            console.error('Error getting current location:', error);
            Toast.show({
                type: 'error',
                text1: 'Location Error',
                text2: 'Failed to get your current location.',
            });
            return null;
        }
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Please fill in all required fields.',
            });
            return;
        }

        if (!isLocationEnabled) {
            Toast.show({
                type: 'error',
                text1: 'Location Required',
                text2: 'Please enable location services to take attendance.',
            });
            return;
        }

        setIsSubmitting(true);
        // const response = await attendanceService.submitAttendance(user?.id!, payload);

        try {
            // Get fresh location data before submitting
            const currentLocation = await getCurrentLocation();

            if (!currentLocation) {
                Toast.show({
                    type: 'error',
                    text1: 'Location Error',
                    text2: 'Unable to get your current location.',
                });
                setIsSubmitting(false);
                return;
            }

            const payload = {
                status: formData.status,
                courseId: formData.course,
                studentLon: currentLocation.coords.longitude,
                studentLat: currentLocation.coords.latitude,
            };

            const response = await attendanceService.submitAttendanceWithLocation(user?.id!, payload);

            if (response.success) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Attendance submitted successfully.',
                });
                setShowDialog(false);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: response.error?.message || 'Failed to submit attendance. Please try again.',
                });
            }
        } catch (error) {
            console.error('Error submitting attendance:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'An unexpected error occurred. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <VStack>
            <Button
                variant="outline"
                size="xl"
                onPress={() => setShowDialog(true)}
            >
                <FontAwesome6 name="address-book" size={24} color="#D6BD98" />
                <ButtonText className="text-secondary-0" size="md">Attendance</ButtonText>
            </Button>

            <ModalDialog
                isOpen={showDialog}
                onClose={() => setShowDialog(false)}
                onAction={handleSubmit}
                title="Face Recognition"
                actionText={'Submit'}
                cancelText={'Cancel'}
                isLoading={isSubmitting}
            >
                <FaceRecognition />
            </ModalDialog>
        </VStack>
    );
}
