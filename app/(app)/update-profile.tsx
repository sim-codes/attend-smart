import { useState } from "react";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import cloudinaryService from "@/services/cloudinary";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import UpdateProfile from "@/components/UpdateProfile";
import { useApp } from "@/hooks/appContext";

export default function UpdateProfileModal() {
    const { profile } = useApp();
    const [image, setImage] = useState<string | undefined>(undefined);
    const handleUpload = async () => {
        const imageUrl = await cloudinaryService.handleImageUpload();
        if (imageUrl) {
            setImage(imageUrl);
        }
    };
    return (
        <VStack className="flex-1 w-full bg-primary-500" space="4xl">

            <VStack className="my-8 p-6">
                <Text size="4xl" className="text-secondary-0">Hi there,</Text>
                <Text size="4xl" className="text-secondary-0" bold>Update your profile</Text>
            </VStack>

            <VStack className="bg-secondary-0/70 h-full w-full rounded-t-[5rem] gap-y-4 mt-8 py-12 px-4">
                <VStack className="justify-start items-center w-full gap-y-2">
                    <Avatar size="2xl" className=" absolute -top-28 border-4 border-white/20">
                        <AvatarFallbackText>Avatar</AvatarFallbackText>
                        <AvatarImage
                            source={{
                            uri: image ?? profile?.profileImageUrl
                        }}
                        />
                    </Avatar>
                </VStack>

                <Pressable onPress={handleUpload} className="p-1">
                    <Text size="xl" className="text-center" bold>Click Upload Image</Text>
                </Pressable>

                <UpdateProfile profileImageUrl={image} />
            </VStack>
        </VStack>
    )
}
