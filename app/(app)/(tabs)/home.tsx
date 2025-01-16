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

export default function Home() {
    const { user } = useSession();

    return (
        <VStack className="h-full w-full bg-primary-500 py-10 px-6" space="4xl">
        <HStack className="justify-between items-center w-full">
            <VStack className="w-fit">
                <Heading size="4xl" className="text-white ">
                    Hello,{" "}
                    {user?.username}!
                </Heading>
                <HStack className="items-center" space="sm">
                    <Text size="lg" className="border-tertiary-200 text-secondary-0 border rounded-lg p-2 w-min" bold>
                        Matric Number: 21/0611
                    </Text>
                </HStack>
            </VStack>

            <Avatar size="xl" className="border-4 border-white/20">
                <AvatarFallbackText>{user?.username}</AvatarFallbackText>
                <AvatarImage
                    source={{
                    uri: user?.profileImageUrl,
                }}
                />
            </Avatar>
        </HStack>

        </VStack>
    )
}