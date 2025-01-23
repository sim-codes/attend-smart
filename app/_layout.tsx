import "@/global.css";
import { useEffect } from "react";
import { Slot } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts, Nunito_400Regular, Nunito_900Black } from "@expo-google-fonts/nunito";
import * as SplashScreen from 'expo-splash-screen';
import { SessionProvider } from "@/hooks/ctx";
import { AppContextProvider } from "@/hooks/appContext";
import Toast from 'react-native-toast-message';
import toastConfig from "@/toastConfig";

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

  return (
    <SessionProvider>
      <AppContextProvider>
        <GluestackUIProvider>
          <Slot />
          <Toast config={toastConfig} />
        </GluestackUIProvider>
      </AppContextProvider>
    </SessionProvider>
  )
}
