import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

import LogoSvg from '../../assets/logo.svg';

export function Header(){
  return (
    <View style={styles.container}>
      <LogoSvg />
      
      <TouchableOpacity>
        <Text style={styles.logouText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}