import {
    CameraMode,
    CameraType,
    CameraView,
    useCameraPermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { VStack } from "@/components/ui/vstack";

export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const ref = useRef<CameraView>(null);
    const [uri, setUri] = useState<string | undefined>(undefined);
    // const [mode, setMode] = useState<CameraMode>("picture");
    const [facing, setFacing] = useState<CameraType>("front");
    const [recording, setRecording] = useState(false);

    if (!permission) {
        return null;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
            <Text style={{ textAlign: "center" }}>
                We need your permission to use the camera
            </Text>
            <Button onPress={requestPermission} title="Grant permission" />
            </View>
        );
    }

    const takePicture = async () => {
        const photo = await ref.current?.takePictureAsync();
        setUri(photo?.uri);
    };

    // const recordVideo = async () => {
    //     if (recording) {
    //         setRecording(false);
    //         ref.current?.stopRecording();
    //         return;
    //     }
    //     setRecording(true);
    //     const video = await ref.current?.recordAsync();
    //     console.log({ video });
    // };

    // const toggleMode = () => {
    //     setMode((prev) => (prev === "picture" ? "video" : "picture"));
    // };

    const toggleFacing = () => {
        setFacing((prev) => (prev === "back" ? "front" : "back"));
    };

    const renderPicture = () => {
        return (
            <View>
                <Image
                    source={{ uri }}
                    // contentFit="contain"
                    style={{ width: 300, aspectRatio: 1 }}
                />
                <Button onPress={() => setUri(undefined)} title="Take another picture" />
            </View>
        );
    };

    const renderCamera = () => {
        return (
            <CameraView
            // style={styles.camera}
            ref={ref}
            // mode={mode}
            facing={facing}
                mute={false}
                autofocus="on"
            responsiveOrientationWhenOrientationLocked
            >
            <View style={styles.shutterContainer}>
                {/* <Pressable onPress={toggleMode}>
                {mode === "picture" ? (
                    <AntDesign name="picture" size={32} color="white" />
                ) : (
                    <Feather name="video" size={32} color="white" />
                )}
                </Pressable> */}
                <Pressable onPress={takePicture}>
                {({ pressed }) => (
                    <View
                    style={[
                        styles.shutterBtn,
                        {
                        opacity: pressed ? 0.5 : 1,
                        },
                    ]}
                    >
                    <View
                        style={[
                        styles.shutterBtnInner,
                        {
                            backgroundColor: "white",
                        },
                        ]}
                    />
                    </View>
                )}
                </Pressable>
                <Pressable onPress={toggleFacing}>
                <FontAwesome6 name="rotate-left" size={32} color="white" />
                </Pressable>
            </View>
            </CameraView>
        );
    };

    return (
        <VStack style={styles.container} className="bg-black">
            <Text>Camera</Text>
            {/* {uri ? renderPicture() : renderCamera()} */}
        </VStack>
    );
}

const styles = StyleSheet.create({
container: {
        flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
},
camera: {
    flex: 1,
    width: "100%",
},
shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
},
shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
},
shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
},
});
