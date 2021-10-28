import React from 'react';
import { View } from 'react-native';
import { useAuth } from '../../hooks/auth';

import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function SignInBox() {
  const { signIn, isSignedIn } = useAuth()

  return (
    <View style={styles.container}>
      <Button 
        title="ENTRAR COM O GITHUB" 
        color={COLORS.BLACK_PRIMARY} 
        backgroundColor={COLORS.YELLOW} 
        icon="github" 
        onPress={signIn}
        isLoading={isSignedIn}
      />
    </View>
  );
}