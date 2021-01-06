import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View ,Alert,ScrollView,TextInput } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
// import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import * as firebase from 'firebase';
import Auth from '../core/Auth';
import { color } from 'react-native-reanimated';

let app = firebase.initializeApp(Auth.FirebaseConfig);
let db = app.database();
let itemsref = db.ref('items');
export default class LoginScreen  extends React.Component {
//const LoginScreen = ({ navigation }) => {
  
 
  constructor(props) { 
    super(props);
    this.state = { 
        email: "",
        password: "",
        items:[],
    };
    console.ignoredYellowBox = [
      'Setting a timer'
  ];
}



  //const [email, setEmail] = useState({ value: '', error: '' });
  //const [password, setPassword] = useState({ value: '', error: '' });
 
  _onLoginPressed = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => { this.props.navigation.navigate('Home');}, (error) => {console.log(false);Alert.alert("error.message"); });
    //const emailError = emailValidator(email.value);
    //const passwordError = passwordValidator(password.value);

    /*if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;*/
    //}

    
  };
  componentDidMount() {
  itemsref.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
    });
  }
  
  render() {
   
  return (
    <Background>
      {/* <BackButton goBack={() => this.props.navigation.navigate('HomeScreen')} /> */}

      <Logo />
     
      
      <TextInput
      style={{ backgroundColor: '#64ECC7',width: '100%',height:'6%',textAlign:'center',borderRadius:'40', }}
      value={this.state.email}
      onChangeText={(text) => { this.setState({email: text}) }}
      placeholder="Email"
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
        // label="Email"
        // returnKeyType="next"
        // value={email.value}
        // onChangeText={text => setEmail({ value: text, error: '' })}
        // error={!!email.error}
        // errorText={email.error}
        // autoCapitalize="none"
        // autoCompleteType="email"
        // textContentType="emailAddress"
        // keyboardType="email-address"
      />

      <TextInput
        // label="Password"
        // returnKeyType="done"
        // value={password.value}
        // onChangeText={text => setPassword({ value: text, error: '' })}
        // error={!!password.error}
        // errorText={password.error}
        // secureTextEntry
        style={{ backgroundColor: '#64ECC7',width: '100%',height:'6%',textAlign:'center',borderRadius:'40', marginTop:'10%'}}
        value={this.state.password}
                    onChangeText={(text) => { this.setState({password: text}) }}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onKeyPress={ (event) => {
                      if(event.nativeEvent.key == "Enter"){
                        { this._onLoginPressed()}
                      } 
                      
                    }}
                   
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
          
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={this._onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? 
        </Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )};
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '50%',
    height:20,
    fontSize:20,
    alignItems: 'center',
    borderRadius:40,
    marginTop: 10,
    marginBottom:20,
    
    color: 'black',
  },
  row: {
    justifyContent: 'center',
    marginTop: 1,
    
  },
  label: {
    color: 'black',
    marginTop: 5,
    
  },
  link: {
    fontWeight: 'bold',
    fontSize:20,
    textAlign:'center',
    color: theme.colors.primary,
    marginTop:15,
    
  },
});

//export default memo(LoginScreen);
