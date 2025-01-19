import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { useSession } from "@/hooks/ctx";
import { useState } from 'react';
import { Pressable } from "react-native";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import ModalDialog from "@/components/ModalDialog";

export default function Profile() {
    const { user, logout } = useSession();
    const [showAlertDialog, setShowAlertDialog] = useState(false)

    return (
        <VStack className="h-full w-full bg-primary-500 py-10 px-6" space="4xl">
            <Heading size="4xl" className="text-secondary-0" bold>Profile</Heading>

            <VStack className="justify-start items-center w-full gap-y-2">
                <Avatar size="2xl" className="border-4 border-white/20">
                    <AvatarFallbackText>{user?.username}</AvatarFallbackText>
                    <AvatarImage
                        source={{
                        uri: user?.profileImageUrl,
                    }}
                    />
                </Avatar>

                <Heading size="3xl" className="text-white md:text-xs">
                    {user?.lastName} {user?.firstName}
                </Heading>
            </VStack>

            <VStack space="sm">
                <Heading size="md" className="text-secondary-0">Personal data</Heading>
                <HStack space="sm" className="items-end">
                    <Ionicons name="person-outline" size={28} color="#677D6A" />
                    <VStack>
                        <Text size="xl" className="text-white">{user?.lastName} {user?.firstName}</Text>
                        <Text size="md" className="text-tertiary-100">Full Name</Text>
                    </VStack>
                </HStack>

                <HStack space="sm" className="items-end">
                    <Ionicons name="phone-portrait-outline" size={28} color="#677D6A" />
                    <VStack>
                        <Text size="xl" className="text-white">{user?.phoneNumber}</Text>
                        <Text size="md" className="text-tertiary-100">Phone Number</Text>
                    </VStack>
                </HStack>

                <HStack space="sm" className="items-end">
                    <Ionicons name="mail-outline" size={28} color="#677D6A" />
                    <VStack>
                        <Text size="xl" className="text-white">{user?.email}</Text>
                        <Text size="md" className="text-tertiary-100">Email</Text>
                    </VStack>
                </HStack>
            </VStack>

            <VStack space="sm">
                <Heading size="md" className="text-secondary-0">Student Details</Heading>
                <HStack space="sm" className="items-end">
                    <Ionicons name="folder-open-outline" size={28} color="#677D6A" />
                    <VStack>
                        <Text size="xl" className="text-white">Computer Science</Text>
                        <Text size="md" className="text-tertiary-100">Department</Text>
                    </VStack>
                </HStack>

                <HStack space="sm" className="items-end">
                    <Ionicons name="people-outline" size={28} color="#677D6A" />
                    <VStack>
                        <Text size="xl" className="text-white">21/0611</Text>
                        <Text size="md" className="text-tertiary-100">Matric Number</Text>
                    </VStack>
                </HStack>

                <HStack space="sm" className="items-end">
                    <Ionicons name="list-outline" size={28} color="#677D6A" />
                    <VStack>
                        <Text size="xl" className="text-white">400</Text>
                        <Text size="md" className="text-tertiary-100">Level</Text>
                    </VStack>
                </HStack>
            </VStack>

            <VStack space="sm">
                <Heading size="md" className="text-secondary-0">Settings</Heading>
                <HStack space="sm" className="items-end">
                    <Ionicons name="lock-open-outline" size={28} color="#677D6A" />
                    <Text size="xl" className="text-white">Change Password</Text>
                </HStack>

                <HStack space="sm" className="items-end">
                    <Ionicons name="person-add-outline" size={28} color="#677D6A" />
                    <Text size="xl" className="text-white">Update Profile Details</Text>
                </HStack>

                <Pressable onPress={() => setShowAlertDialog(true)}>
                <HStack space="sm" className="items-end">
                    <FontAwesome name="sign-out" size={28} color="#677D6A" />
                    <Text size="xl" className="text-white">Sign Out</Text>
                </HStack>
                </Pressable>
            </VStack>

            <ModalDialog
                isOpen={showAlertDialog}
                onClose={() => setShowAlertDialog(false)}
                onConfirm={logout}
                title="Sign Out"
                confirmText="Sign Out"
                cancelText="Cancel"
            >Are you sure you want to sign out?</ModalDialog>
        </VStack>
    )
}
