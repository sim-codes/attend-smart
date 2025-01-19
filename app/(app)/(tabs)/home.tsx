import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
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

const courses = [
    {
        id: 1,
        name: "Introduction to Computer Science",
        courseCode: "CSC 101",
        creditUnits: 3
    },
    {
        id: 2,
        name: "Data Structures and Algorithms",
        courseCode: "CSC 201",
        creditUnits: 3
    },
    {
        id: 3,
        name: "Software Engineering",
        courseCode: "CSC 301",
        creditUnits: 3
    },
    {
        id: 4,
        name: "Operating Systems",
        courseCode: "CSC 401",
        creditUnits: 3
    },
    {
        id: 5,
        name: "System Analysis and Design",
        courseCode: "CSC 501",
        creditUnits: 3
    },
    {
        id: 6,
        name: "Computer Networks",
        courseCode: "CSC 601",
        creditUnits: 3
    }
]

export default function Home() {
    const { user } = useSession();

    const handleDeleteCourses = async (courseIds: number[]) => {
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
                <Button variant="outline" className="" size="lg">
                    <Ionicons name="add-outline" size={24} color="#D6BD98" />
                    <ButtonText className="text-secondary-0">Register Course</ButtonText>
                </Button>

                <Button variant="outline" className="" size="lg">
                    <FontAwesome6 name="address-book" size={24} color="#D6BD98" />
                    <ButtonText className="text-secondary-0">Take Attedance</ButtonText>
                </Button>
            </HStack>

            <CourseList
            courses={courses}
            onDeleteCourses={handleDeleteCourses}
            />

        </VStack>
    )
}