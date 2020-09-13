// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
  
import React from 'react';
import { Provider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';
import Auth from './src/core/Auth';
import * as firebase from 'firebase';
import 'firebase/firestore';
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false
    };
  if (!firebase.apps.length) { firebase.initializeApp(Auth.FirebaseConfig);
    firebase.firestore().enablePersistence(true); }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
   
  }
    onAuthStateChanged = (user) => {
      this.setState({isAuthenticationReady: true});
      this.setState({isAuthenticated: !!user});
    }
    render(){
      return (
        <Provider theme={theme}>
        <App />
      </Provider>
       )
    }
 

  
};

