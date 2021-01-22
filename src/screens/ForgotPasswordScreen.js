import React, { memo, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { emailValidator } from '../core/utils';
import Background from '../components/LoginBackground';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import Button from '../components/Button';
import LoginScreen from './LoginScreen';
import { View } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });

  const _onSendPressed = () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    navigation.navigate('LoginScreen');
   
  
  };

  return (

    <Background>
         
    <BackButton style={styles.backButton} goBack={() =>navigation.navigate('LoginScreen')}/>

      <Text style={styles.reset}>
          RESET PASSWORD 
        </Text>
      

      <TextInput style={styles.textInput}
        placeholder="Enter e-mail adress"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <Button mode="contained" onPress={_onSendPressed} style={styles.button}>
      Reset
      </Button>

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('LoginScreen')}
      >
       
      </TouchableOpacity>
    </Background>
  );
};

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
  reset:{
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color:'#db872f'
  },
  textInput: {
    borderBottomColor: '#b2b2b2',
    borderBottomWidth: 1,
  },
  backButton:{
    flexDirection:'row'
  }
});

export default memo(ForgotPasswordScreen);
