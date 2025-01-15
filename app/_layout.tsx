import "@/global.css";
import { useEffect } from "react";
import { Slot, Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts, Nunito_400Regular, Nunito_900Black } from "@expo-google-fonts/nunito";
import * as SplashScreen from 'expo-splash-screen';
import { SessionProvider } from "@/hooks/ctx";

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const [loaded] = useFonts({
    Nunito_400Regular,
    Nunito_900Black,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
const unstable_settings = {
  initialRouteName: 'home',
};

  return (
    <SessionProvider>
      <GluestackUIProvider>
        <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{
          headerTitle: "",
          headerTransparent: true,
          headerBackImageSource: require("@/assets/images/arrow-back-cream.png"),
        }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </GluestackUIProvider>
    </SessionProvider>
  )
}
