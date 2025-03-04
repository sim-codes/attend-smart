import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import CalendarSchedule from "@/components/calendarSchedule";
import { scheduleServices } from "@/services/schedule";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { ScheduleApiResponse } from "@/constants/types/schedule";
import Toast from "react-native-toast-message";
import AttendanceReport from "@/components/attendanceReport";

export default function Schedules() {
    const { data: enrolledCourses } = useAppSelector((state) => state.courses);
    const [schedules, setSchedules] = useState<ScheduleApiResponse[]>([]);

    const courseIds = enrolledCourses.map(course => course.courseId);

    useEffect(() => {
        if (courseIds.length > 0) {
            fetchCourseSchedules();
        }
    }, [enrolledCourses]);

    const fetchCourseSchedules = async () => {
        const {data, success, error} = await scheduleServices.getAllSchedules();

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



    const handleSchedulePress = (schedule: any ) => {
        console.log('Schedule pressed:', schedule);
    };
    return (
        <VStack className="flex-1 bg-primary-500 py-10 px-6" space="3xl">
            <Text size="2xl" className="text-secondary-0" bold>Schedules</Text>

            <CalendarSchedule
            schedules={schedules}
            onSchedulePress={handleSchedulePress}
            />

            <AttendanceReport />
        </VStack>
    )
}