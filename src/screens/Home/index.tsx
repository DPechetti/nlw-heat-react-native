import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import React from 'react';
import { Text, View } from "react-native";
import { styles } from './styles';

export function Home() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  if (!fontsLoaded) <AppLoading />

  return (
    <View style={styles.container}>
      <Text>Batatinha</Text>
    </View>
  )
}