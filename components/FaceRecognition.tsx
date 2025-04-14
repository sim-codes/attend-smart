import { ActivityIndicator, View } from "react-native";
import { useRef, useState } from "react";
import { CameraView, useCameraPermissions, CameraPictureOptions } from "expo-camera";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";
import { Button, ButtonText } from "./ui/button";
import Toast from "react-native-toast-message";

export default function FaceRecognition({ onCapture }: {
    onCapture: (uri: string) => Promise<void>
}) {
    const [permission, requestPermission] = useCameraPermissions();
    const ref = useRef<CameraView>(null);
    const [isVerifying, setIsVerifying] = useState(false);

    if (!permission) {
        return <Text>We need your permission to use the camera</Text>;
    }

    const takePicture = async () => {
        if (ref.current) {
            const options: CameraPictureOptions = {
                shutterSound: false,
            };

            setIsVerifying(true);

            try {
                const photo = await ref.current?.takePictureAsync(options);
                if (!photo?.uri) {
                    setIsVerifying(false);
                    return;
                }

                await onCapture(photo.uri);
                // If successful, verification is complete
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Verification Failed',
                    text2: 'Failed to verify your identity. Please try again.',
                });
            }

            setIsVerifying(false);
        }
    };

    return (
        <VStack space="lg" className="h-90">
            <View style={{ width: "100%", aspectRatio: 1, position: "relative" }}>
                <CameraView
                    ref={ref}
                    style={{ width: "100%", height: "100%" }}
                    facing="front"
                    flash="off"
                    animateShutter={false}
                />

                {isVerifying && (
                    <View style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <ActivityIndicator size="large" color="#ffffff" />
                        <Text className="text-white mt-2">Verifying Identity...</Text>
                    </View>
                )}
            </View>

            {!isVerifying && (
                <Button onPress={takePicture}>
                    <ButtonText>Take Picture</ButtonText>
                </Button>
            )}
        </VStack>
    );
}
