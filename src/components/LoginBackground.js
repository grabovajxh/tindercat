import React, { memo } from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

const BackgroundSignIn = ({ children }) => (
  <ImageBackground
    source={require('../assets/signinbackground.png')}

    style={styles.background}
  >
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'contain'
  },
  container: {
    flex: 1,
    padding: 0,
    width: '100%',
    maxWidth: 340,
    marginBottom: '10%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(BackgroundSignIn);
