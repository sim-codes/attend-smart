import { Stack, Redirect } from "expo-router";
import { useSession } from "@/hooks/ctx";
import { Text } from "@/components/ui/text";

export const unstable_settings = {
    initialRouteName: '(tabs)',
};


export default function AppLayout() {
    const { isLoading } = useSession();

    if (isLoading) {
        return <Text>Loading...</Text>
    }

    return (
    <Stack>
        <Stack.Screen name="start" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{
            headerTitle: "",
            headerTransparent: true,
            headerBackImageSource: require("@/assets/images/arrow-back-cream.png"),
        }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
    )
}
