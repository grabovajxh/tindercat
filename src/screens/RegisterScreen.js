import React, { memo, useState , Alert} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import * as firebase from 'firebase';
import { theme } from '../core/theme';


import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';

//const RegisterScreen = ({ navigation }) => {
  export default class RegisterScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
          email: "",
          password: "",
          passwordConfirm: "",
      };
  }

  onSignupPress = () => {
      if (this.state.password !== this.state.passwordConfirm) {
          Alert.alert("Passwords do not match");
          return;
      }

      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => {  this.props.navigation.navigate('LoginScreen');}, (error) => { alert(error.message); });
  }
  //const [name, setName] = useState({ value: '', error: '' });
 // const [email, setEmail] = useState({ value: '', error: '' });
  //const [password, setPassword] = useState({ value: '', error: '' });

  /*const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    navigation.navigate('Dashboard');*/
 

    render() {
      return (
    <Background>


      <Logo />

      <Header>Create Account</Header>


      <TextInput
       value={this.state.email}
       onChangeText={(text) => { this.setState({email: text}) }}
       placeholder="Email"
       keyboardType="email-address"
       autoCapitalize="none"
       autoCorrect={false}value={this.state.email}
                    onChangeText={(text) => { this.setState({email: text}) }}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
      />

      <TextInput
       value={this.state.password}
       onChangeText={(text) => { this.setState({password: text}) }}
       placeholder="Password"
       secureTextEntry={true}
       autoCapitalize="none"
       autoCorrect={false}
      />
<TextInput 
                    value={this.state.passwordConfirm}
                    onChangeText={(text) => { this.setState({passwordConfirm: text}) }}
                    placeholder="Password (confirm)"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
 <Button mode="contained" onPress={this.onSignupPress} >
        Sign Up
      </Button>

      

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
        );
      }
  }
  

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

