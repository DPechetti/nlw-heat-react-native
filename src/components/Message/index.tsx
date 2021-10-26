import React from 'react';

import { Text, View } from 'react-native';
import { UserPhoto } from '../UserPhoto';

import { styles } from './styles';

export function Message(){
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Texto da batatinha</Text>

      <View style={styles.footer}>
        <UserPhoto sizes='SMALL' imageUri='https://github.com/dpechetti.png' />

        <Text style={styles.userName}>Nome da batatinha</Text>
      </View>
    </View>
  );
}