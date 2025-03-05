import "@/global.css";
import { useEffect } from "react";
import { Slot } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts, Nunito_400Regular, Nunito_900Black } from "@expo-google-fonts/nunito";
import * as SplashScreen from 'expo-splash-screen';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import { ActivityIndicator, View } from 'react-native';
import { VStack } from "@/components/ui/vstack";

const LoadingScreen = () => (
  <VStack className="flex-1 items-center justify-center bg-primary-500">
    <ActivityIndicator size="large" />
  </VStack>
);



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
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <GluestackUIProvider>
          <Slot />
          <Toast />
        </GluestackUIProvider>
      </PersistGate>
    </Provider>
  )
}
