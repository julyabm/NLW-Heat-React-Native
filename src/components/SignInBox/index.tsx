import React from 'react';

import { View } from 'react-native';
import { Button } from '../Button'
import { COLORS } from '../../theme';

import { styles } from './styles';
import { useAuth } from '../../hooks/authContex';

export function SignInBox(){
  const { signIn, isSignIn } = useAuth()
  return (
    <View style={styles.container}>
        <Button title="ENTRAR COM GITHUB" color={COLORS.BLACK_PRIMARY} backgroundColor={COLORS.YELLOW} icons="github" onPress={signIn}  isLoading={isSignIn}/>
    </View>
  );
}