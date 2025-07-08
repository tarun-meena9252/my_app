import React, {useEffect, useState} from 'react';
import { SplashScreen, Stack} from 'expo-router';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({  })

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <Stack>
      <Stack.Screen name="get-started" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="Screens/GeneratingTrip" options={{ headerShown: false }} />
      <Stack.Screen name="Screens/TripDetailsScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
function useFonts(fontMap: { [key: string]: any }): [boolean, Error | null] {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    Font.loadAsync(fontMap)
      .then(() => setLoaded(true))
      .catch((err) => setError(err));
  }, []);

  return [loaded, error];
}
