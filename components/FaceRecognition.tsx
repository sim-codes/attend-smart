import { ActivityIndicator } from "react-native";
import { useRef, useState } from "react";
import { CameraView, useCameraPermissions, CameraPictureOptions } from "expo-camera";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";
import { Button, ButtonText } from "./ui/button";
import { Image } from "./ui/image";
import Toast from "react-native-toast-message";

export default function FaceRecognition({ onCapture }: {
    onCapture: (uri: string) => Promise<void>
}) {
    const [permission, requestPermission] = useCameraPermissions();
    const ref = useRef<CameraView>(null);
    const [uri, setUri] = useState<string | undefined>();
    const [isVerifying, setIsVerifying] = useState(false);

    if (!permission) {
        return <Text>We need your permission to use the camera</Text>;
    }

    const takePicture = async () => {
        if (ref.current) {
            const options: CameraPictureOptions = {
                shutterSound: false,
            };
            const photo = await ref.current?.takePictureAsync(options);
            if (!photo?.uri) return;

            setUri(photo.uri);
            setIsVerifying(true);

            try {
                await onCapture(photo.uri);
                setUri(undefined);
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Verification Failed',
                    text2: 'Failed to verify your identity. Please try again.',
                    // text2: error?.message!,
                });
            }
            setIsVerifying(false);
        }
    };

    const renderContent = () => {
        if (isVerifying) {
            return (
                <VStack className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text className="text-white mt-2">Verifying Identity...</Text>
                </VStack>
            );
        }
        
        if (uri) {
            return (
                <VStack space="lg" className="h-96 bg-black">
                    <Image
                        size="full"
                        source={{ uri }}
                        alt="Captured picture"
                        style={{ width: "100%", aspectRatio: 3/4 }}
                    />
                    <Button onPress={() => setUri(undefined)}>
                        <ButtonText>Retake Photo</ButtonText>
                    </Button>
                </VStack>
            );
        }

        return (
            <CameraView
                ref={ref}
                style={{ width: "100%", aspectRatio: 1 }}
                facing="front"
                flash="off"
                animateShutter={false}
            />
        );
    };

    return (
        <VStack space="lg" className="h-90">
            {renderContent()}
            {!uri && !isVerifying && (
                <Button onPress={takePicture}>
                    <ButtonText>Take Picture</ButtonText>
                </Button>
            )}
        </VStack>
    );
}
