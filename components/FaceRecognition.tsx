import { useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
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
                <VStack>
                    <Image
                        size="full"
                        source={{ uri }}
                        alt="Picture taken from camera"
                        style={{ width: "100%", aspectRatio: 1 }}
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
            />
        );
    }


    const takePicture = async () => {
        const photo = await ref.current?.takePictureAsync();
        setUri(photo?.uri);
    };
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
