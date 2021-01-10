import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Alert, ScrollView, TextInput,Button,Touch,ImageBackground ,Image} from 'react-native';

import BackgroundWelcome from '../components/BackgroundWelcome';
import Logo from '../components/Logo';
import Header from '../components/Header';
import AwesomeButton from "react-native-really-awesome-button";



// import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';

import Auth from '../core/Auth';
import { color } from 'react-native-reanimated';

export default class WelcomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            items: [],
        };
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
    }
    render() {

        return (
          <BackgroundWelcome>
             <Logo/>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')} style={welcomeStyle.appButtonContainer}>
    <Text style={welcomeStyle.appButtonText}>Sign In</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')} style={welcomeStyle.appButtonContainer2}>
    <Text style={welcomeStyle.appButtonText2}>Sign Up</Text>
  </TouchableOpacity>
            </BackgroundWelcome>
          
        )
    };
};
const welcomeStyle = StyleSheet.create({
    // ...
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#fff",
      borderRadius: 15,
      paddingVertical: 20,
      marginTop:5,
      paddingHorizontal: 10,
      width: '85%',


 
    },
    appButtonContainer2: {
      elevation: 8,
      backgroundColor: "#efefef",
      borderRadius: 15,
      paddingVertical: 20,
      marginTop:20,
      paddingHorizontal: 10,
      width: '85%',
      borderWidth:1,
      borderColor:'#fff'
    },
    appButtonText: {
      fontSize: 24,
      color: "#db872f",
      fontWeight: "bold",
      alignSelf: "center",
      
    },
    appButtonText2: {
        fontSize: 22,
        color: "#3f3f3c",
        fontWeight: "bold",
        alignSelf: "center",
        borderColor:'#ddd',
        
      },
      backgroundCover:{
        flex: 1,
        width: '100%',
      
      },
      container: {
        flex: 1,
        
        width:'100%'
   },
  });
