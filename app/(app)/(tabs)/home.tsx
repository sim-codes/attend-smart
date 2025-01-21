import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
    Avatar,
    AvatarBadge,
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


export default function Home() {
    const { user, student } = useSession();
    const [showDialog, setShowDialog] = useState(false);
    const [ action, setAction ] = useState<string>('');
    const [ enrolledCourses, setEnrolledCourses ] = useState<EnrollmentResponse[]>([]);

    useEffect(() => {
        console.log(user?.id!);
        console.log(student?.userId!);
        const fetchEnrolledCourses = async () => {
            try {
                const response = await enrollmentService.getEnrolledCourses(user?.id!);
                setEnrolledCourses(response as EnrollmentResponse[]);
            } catch (error) {
                console.error("Error fetching enrolled courses:", error);
            }
        };

        fetchEnrolledCourses();
    }, []);

    const handleDeleteCourses = async (courseIds: string[]) => {
        try {
          // Make your API call here
          await fetch('your-api-endpoint', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ courseIds }),
          });
          // Update your local course list accordingly
        } catch (error) {
          console.error('Error:', error);
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

            <HStack className="justify-between items-center w-full gap-x-2">
                <Button variant="outline" className="" size="xl" onPress={() => {
                    setShowDialog(true);
                    setAction('register');
                }}>
                    <Ionicons name="add-outline" size={34} color="#D6BD98" />
                    <ButtonText className="text-secondary-0">Register Course</ButtonText>
                </Button>

                <Button variant="outline" className="" size="xl" onPress={() => {
                    setShowDialog(true);
                    setAction('attendance');
                }}>
                    <FontAwesome6 name="address-book" size={34} color="#D6BD98" />
                    <ButtonText className="text-secondary-0">Take Attedance</ButtonText>
                </Button>
            </HStack>

            <CourseList
            courses={enrolledCourses}
            onDeleteCourses={handleDeleteCourses}
            />

            <ModalDialog
                isOpen={showDialog}
                onClose={() => setShowDialog(false)}
                onAction={() => {}}
                title={action === 'register' ? 'Register Course' : 'Take Attendance'}
                actionText={action === 'register' ? 'Register' : 'Take Attendance'}
                cancelText="Cancel"
            >
                {action === 'register' ? <RegisterCourse /> : <TakeAttendance />}
            </ModalDialog>

        </VStack>
    )
}