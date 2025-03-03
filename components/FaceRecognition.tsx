import { useRef, useState } from "react";
import { CameraView, useCameraPermissions, CameraPictureOptions } from "expo-camera";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";
import { Button, ButtonText } from "./ui/button";
import { Image } from "./ui/image";

export default function FaceRecognition() {
    const [permission, requestPermission] = useCameraPermissions();
        const ref = useRef<CameraView>(null);
    const [uri, setUri] = useState<string | undefined>(undefined);

    if (!permission) {
        return <Text>We need your permission to use the camera</Text>;
    }

    const renderPicture = () => {
            return (
                <VStack space="lg" className="h-96 bg-black">
                    <Image
                        size="full"
                        source={{ uri }}
                        alt="Picture taken from camera"
                        style={{ width: "100%", aspectRatio: 3 / 4 }}
                    />
                    {/* <Button onPress={() => setUri(undefined)} title="Take another picture" /> */}
                </VStack>
            );
    };

    const renderCamera = () => {
        return (
            <CameraView
                ref={ref}
                style={{ width: "100%", aspectRatio: 1 }}
                flash="off"
                facing="front"
                animateShutter={false}
            />
        );
    }


    const takePicture = async () => {
        if (ref.current) {
            const options: CameraPictureOptions = {
                quality: 0.7,  // Image quality (0.0 - 1.0)
                base64: false, // Include base64 string (default: false)
                exif: true,    // Include EXIF metadata (default: false)
                skipProcessing: false, // Skip additional processing (default: false)
                shutterSound: false,   // Play shutter sound (default: true)
            };
            const photo = await ref.current?.takePictureAsync(options);
            setUri(photo?.uri);
        };
    }

    return (
        <VStack space="lg" className="h-90">
            {uri ? renderPicture() : renderCamera()}
            <Button onPress={uri ? () => setUri(undefined) : takePicture}>
                <ButtonText>
                    {uri ? "Take another picture" : "Take a picture"}
                </ButtonText>
            </Button>
        </VStack>
    );
}
