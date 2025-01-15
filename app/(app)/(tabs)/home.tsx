import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import {
    Avatar,
    AvatarBadge,
    AvatarFallbackText,
    AvatarImage,
} from '@/components/ui/avatar';
import { Heading } from "@/components/ui/heading";

export default function Home() {
    return (
        <VStack className="h-full w-full bg-primary-500 py-10 px-6" space="4xl">
            <Text size="4xl" className="text-secondary-0" bold>Dashboard</Text>

        <HStack className="justify-between items-center w-full">
            <VStack className="">
                <Heading size="4xl" className="text-secondary-0">Hello, Michael</Heading>
                <Text size="lg" className="border-tertiary-200 text-secondary-0 border rounded-lg p-2 w-min" bold>Matric Number: 21/0611</Text>
            </VStack>

            <Avatar size="xl" className="border-4 border-white">
                <AvatarFallbackText>Jane Doe</AvatarFallbackText>
                <AvatarImage
                    source={{
                    uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                }}
                />
            </Avatar>
        </HStack>

        </VStack>
    )
}