import React from 'react';
import { Home } from './src/screens/Home';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  if (!fontsLoaded) <AppLoading />

  return (
    <>
      <StatusBar style="light" />
      <Home />
    </>
  );
}
