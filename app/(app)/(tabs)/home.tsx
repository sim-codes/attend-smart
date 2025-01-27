import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { useState, useEffect } from 'react';
import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
} from '@/components/ui/avatar';
import { Heading } from "@/components/ui/heading";
import { useSession } from "@/hooks/ctx";
import { Button, ButtonText } from '@/components/ui/button';
import { FontAwesome6 } from "@expo/vector-icons";
import CourseList from "@/components/CourseList";
import RegisterCourse from "@/components/RegisterCourse";
import TakeAttendance from "@/components/TakeAttendance";
import ModalDialog from "@/components/ModalDialog";
import { enrollmentService } from "@/services/enrollment";
import { EnrollmentResponse } from "@/constants/types";
import { useApp } from "@/hooks/appContext";
import NoProfileHome from "@/components/NoProfileHome";
import Toast from 'react-native-toast-message';


export default function Home() {
    const { user } = useSession();
    // const { profile } = useApp();
    const [showDialog, setShowDialog] = useState(false);
    const [ enrolledCourses, setEnrolledCourses ] = useState<EnrollmentResponse[]>([]);

    // useEffect(() => {
    //     if (!profile) return;
    //     fetchEnrolledCourses();
    // }, []);

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
            setEnrolledCourses(enrolledCourses.filter(course => !courseIds.includes(course.courseId)));
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to remove some or all courses. Please try again.',
            });
            console.error("Error removing courses:", error);
        }
    };


    async function fetchEnrolledCourses() {
        const { data, success, error } = await enrollmentService.getEnrolledCourses(user?.id!);
        if (success) {
            setEnrolledCourses(data!)
            Toast.show({
                type: 'success',
                text1: 'Enrolled Courses Fetched',
                text2: 'Enrolled courses list refrehed successfully!'
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Enrolled Courses Fetched',
                text2: 'Something went wrong!'
            });
            console.error("Error fetching enrolled courses:", error?.message);
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

                <Heading size="3xl" className="text-white">
                    Hello,{" "}
                    {user?.username}
                </Heading>
            </HStack>

            {/* {
                profile ?
                <>
                <HStack className="justify-between items-center w-full gap-x-2">
                    <RegisterCourse refreshEnrolledCourses={fetchEnrolledCourses} />
                    <Button variant="outline" className="" size="xl" onPress={() => setShowDialog(true)}>
                        <FontAwesome6 name="address-book" size={34} color="#D6BD98" />
                        <ButtonText className="text-secondary-0">Take Attedance</ButtonText>
                    </Button>
                </HStack>

                    <CourseList
                    refreshList={fetchEnrolledCourses}
                    courses={enrolledCourses}
                    onDeleteCourses={handleDeleteCourses}
                    />
                </>
                :
                <NoProfileHome />
            } */}

            <ModalDialog
                isOpen={showDialog}
                onClose={() => setShowDialog(false)}
                onAction={() => {}}
                title='Take Attendance'
                actionText='Take Attendance'
                cancelText="Cancel"
            >
                <TakeAttendance />
            </ModalDialog>

        </VStack>
    )
}