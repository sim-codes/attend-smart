import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { useState, useEffect } from 'react';
import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
} from '@/components/ui/avatar';
import { Heading } from "@/components/ui/heading";
import CourseList from "@/components/CourseList";
import RegisterCourse from "@/components/RegisterCourse";
import TakeAttendance from "@/components/TakeAttendance";
import { enrollmentService } from "@/services/enrollment";
import NoProfileHome from "@/components/NoProfileHome";
import Toast from 'react-native-toast-message';
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchProfile } from "@/store/slices/profileSlice";
import { fetchEnrolledCourses } from "@/store/slices/courseSlice";
import { scheduleServices } from "@/services/schedule";
import { ScheduleApiResponse } from "@/constants/types/schedule";
import AttendanceVerification from "@/components/AttendanceVerification";

export default function Home() {
    const { user } = useAppSelector((state) => state.auth);
    const { data: enrolledCourses } = useAppSelector((state) => state.courses);
    const [showDialog, setShowDialog] = useState(false);
    const { data: profile, error: profileError } = useAppSelector((state) => state.profile);
    const dispatch = useAppDispatch();

    const [schedules, setSchedules] = useState<ScheduleApiResponse[]>([]);

    const courseIds = enrolledCourses.map(course => course.courseId);

    useEffect(() => {
        dispatch(fetchProfile(user?.id!));
        if (profile) {
            dispatch(fetchEnrolledCourses(user?.id!));
        }
    }, [dispatch]);

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

    const handleDeleteCourses = async (courseIds: string[]) => {
        if (!user?.id || courseIds.length === 0) return;

        try {
            await Promise.all(
                courseIds.map(courseId => enrollmentService.removeEnrolledCourse(user.id, courseId))
            );

            Toast.show({
                type: 'success',
                text1: 'Courses Removed',
                text2: 'You have successfully unenrolled from the selected courses!',
            });
            dispatch(fetchEnrolledCourses(user?.id!));
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to remove some or all courses. Please try again.',
            });
            console.error("Error removing courses:", error);
        }
    };

    return (
        <VStack className="h-full w-full bg-primary-500 py-10 px-6" space="4xl">
            <HStack className="justify-start items-center w-full gap-x-2">
                <Avatar size="lg" className="border-4 border-white/20">
                    <AvatarFallbackText>{user?.username}</AvatarFallbackText>
                    <AvatarImage
                        source={{
                        uri: user?.profileImageUrl,
                    }}
                    />
                </Avatar>

                <Heading size="2xl" className="text-white">
                    Hello,{" "}
                    {user?.username}
                </Heading>
            </HStack>

            {
                profile ?
                <>
                <HStack className="justify-between items-center w-full gap-x-2">
                            <RegisterCourse />
                            <AttendanceVerification />
                        {/* <TakeAttendance /> */}
                </HStack>

                    <CourseList
                    courses={enrolledCourses}
                    onDeleteCourses={handleDeleteCourses}
                    />
                </>
                :
                <NoProfileHome />
            }

        </VStack>
    )
}