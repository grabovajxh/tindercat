import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet, Text, View ,Alert,ScrollView } from 'react-native';
//import { HomeScreen } from '.';
// const HomeScreen = ({ navigation }) => (
//   <Background>
//     <Logo/>
//     {/* <Header></Header> */}

//     <Paragraph>
//       Find  your favourite product!
//     </Paragraph>
//     <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
//       Login
//     </Button>
//     <Button
//       mode="outlined"
//       onPress={() => navigation.navigate('RegisterScreen')}
//     >
//       Sign Up
//     </Button>
//   </Background>
// );

// export default memo(HomeScreen);
function HomeScreen(props) {
  const { navigation } = props
  return (
      <Background>
    <Logo/>

    <Button  mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('RegisterScreen')}
    >
      Sign Up
    </Button>
  </Background>
  )
}
export default HomeScreen;