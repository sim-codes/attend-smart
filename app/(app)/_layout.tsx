import { Stack, Redirect } from "expo-router";
import { useSession } from "@/hooks/ctx";
import { Text } from "@/components/ui/text";
import { Link, useRouter } from "expo-router";

export const unstable_settings = {
    initialRouteName: '(tabs)',
};


export default function AppLayout() {
    const { isTokenLoading, isAuthenticated, user } = useSession();
    const router = useRouter();

    if (isTokenLoading) {
        return <Text>Loading...</Text>
    }

    return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="start" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{
            headerTitle: "",
            headerTransparent: true,
            headerTintColor: '#677D6A',
        }} />
        <Stack.Screen name="update-profile" options={{
            headerTitle: "",
            headerTintColor: '#677D6A',
            headerTransparent: true,
            presentation: "containedModal",
            animation: "slide_from_bottom",
            }} />
    </Stack>
    )
}
