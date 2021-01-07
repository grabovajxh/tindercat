import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Alert, ScrollView, TextInput } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
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
            <Background>

                <Logo />


                <Button mode="contained"onPress={() => this.props.navigation.navigate('LoginScreen')}>
                    Sign In
      </Button>

                <Button mode="contained" onPress={() => this.props.navigation.navigate('RegisterScreen')}>
                    Sign Up
      </Button>

            </Background>
        )
    };
};

const styles = StyleSheet.create({
    forgotPassword: {
        width: '50%',
        height: 20,
        fontSize: 20,
        alignItems: 'center',
        borderRadius: 40,
        marginTop: 10,
        marginBottom: 20,

        color: 'black',
    },
    row: {
        justifyContent: 'center',
        marginTop: 90,

    },
    label: {
        color: 'black',
        marginTop: 5,

    },
    link: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: '#DA8730',
        marginTop: 15,

    },
});

//export default memo(LoginScreen);
