import React, { memo } from 'react';
import Background from '../components/Background';
import Paragraph from '../components/Paragraph';
import * as firebase from 'firebase';
import IconButton from '../components/IconButton/IconButton';
import 'firebase/firestore';
import { TouchableOpacity, SectionList,StyleSheet,ListItem, ScrollView,TouchableWithoutFeedback, Text, View , TextInput,Alert,TouchableHighlight, Image, Modal } from 'react-native';
import { Button,List,Colors } from 'react-native-paper';
let addItem = async(item) => {
	// firebase.database().ref('/items').push({
	// 	name: item
  // });
  var docDocRef = firebase.firestore().collection("users");
  docDocRef.add({
  name: "Alan",
  images: "https://firebasestorage.googleapis.com/v0/b/tinder-3a7a1.appspot.com/o/asset%2FG1.png?alt=media&token=d1d9bde5-c8e8-4ecb-aff5-cef4e6b32787",
  age: 1912
})
.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});

};
let addImage = async(item) =>{
  let uri ="https://i.imgur.com/TkIrScD.png" ;
  const response = await fetch(uri);
  const blob = await response.blob();
  var metadata = {
    contentType: 'image/jpeg',
  };


  const ref = firebase
    .storage()
    .ref()
    .child('asset/' + uri)

   ref.put(blob, metadata);
  const file = "../../assets/1.jpg" ;// use the Blob or File API
  firebase.storage().ref('/images').put(file).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
  });
}


export default class SettingsScreen extends React.Component {
  constructor() {
    super();
    console.ignoredYellowBox = [
      'Setting a timer'
  ];
  this.state = {
    currentIndex: 0,
    items:[],
    images:[],
    downloadURLs:[],
    users:"",
  
    collectionTinder:[],
    modalVisible: false
   // url:""
  };
}
componentDidMount() {
  
   var name ="";
  firebase.auth().onAuthStateChanged((user) => {
    console.log(user.email);
    name= user.email.substr(0, user.email.indexOf('@')); 
   this.setState({users:name});
  
    
  });
}
setModalVisible(visible) {
  this.setState({modalVisible: visible});
}
GetSectionListItem = item => {
  //Function for click on an item
  this.scrollRef.scrollToLocation({itemIndex:18})
  Alert.alert(item);
};
FlatListItemSeparator = () => {
  return (
    //Item Separator
    <View
      style={{ height: 0.01, width: '100%', backgroundColor: '#C8C8C8' }}
    />
  );
};
  render() {
    return ( 
      <View>
       
     <View style={{marginTop:20,}}>
      <Image source={require('../assets/banner.jpg')}style={s.container}>  
      </Image>
  
   <View style={{
           top: '15%',
           right: 0,      
           left: '35%',
           padding:20,
           margin:'5%', 
            width:80,
            height:80,
              backgroundColor:'#DA8730',
              borderRadius:40,
              borderWidth: 3,
              borderColor: '#fff'}}>
        <Text >{this.state.users}</Text>
  </View>
  </View>
      <List.Section  style={styles.SectionListItemStyle}>
    <List.Subheader>Hi User, {this.state.users} </List.Subheader>
    
    <List.Item
      title="Notification"
      left={() => <List.Icon color={Colors.orange500} icon="bell" />}
    />
       <List.Item
      title="Payment methods"
      left={() => <List.Icon color={Colors.orange500} icon="id-card" />  }
    />
    <List.Item
      title="Contacts preferences"
      left={() => <List.Icon color={Colors.orange500} icon="message" />}
    />
    <List.Item
    
      title="Social accounts"
      left={() => <List.Icon color={Colors.orange500} icon="account" />}
    />          
  </List.Section>
  <List.Section>
  <List.Item
      title="Gift cards & vouchers"
      left={() =>  <List.Icon color={Colors.orange500} icon="gift" />}
    />
  </List.Section>
  <List.Section>
    <List.Item
      title="Sign out"
      onPress={() => this.props.navigation.navigate('LoginScreen')}
      left={() =>  <List.Icon color={Colors.orange500} icon="logout" />}
      
    />
  </List.Section>
    
   </View>
    // <View style={styles.container}>
    // <Text>My account</Text>
    //   <TouchableWithoutFeedback>
    //     <View style={styles.button}>
    //       <Text>My details</Text>
    //     </View>
    //   </TouchableWithoutFeedback>
      
    //    <TouchableWithoutFeedback>
    //     <View style={styles.button}>
    //       <Text>Log Out</Text>
    //     </View>
    //   </TouchableWithoutFeedback>
    // </View>

  
  )
        }
      }
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 10,
          width:'100%'
        },
     
        listItem: {
          margin: 10,
          padding: 10,
          backgroundColor: "#FFF",
          width: "100%",
          flex: 1,
          alignSelf: "center",
          flexDirection: "row",
          borderRadius: 5
        },
        button: {
          alignItems: "center",
          backgroundColor: "#DDDDDD",
          padding: 10,
          marginBottom:10
        },
      
        SectionHeaderStyle: {
          backgroundColor: '#CDDC89',
          fontSize: 20,
          padding: 5,
          color: '#fff',
        },
      
        SectionListItemStyle: {
          fontSize: 15,        
          padding:10,
          color: '#000',
          backgroundColor: '#F5F5F5',
        },
      });
      const s = StyleSheet.create({

        overlay: {
          
          top: '50%',
          right: 0,
          bottom: 0,
          left: '5%',
          width: 100, height: 100, 
          borderRadius: 100 / 2,      
          justifyContent: 'center',
          alignItems: 'center',
        },
        container: {
        position:'absolute',
          justifyContent: 'center',
          alignItems: 'center',
              width: '100%',
              height: '70%',
         
      
      }});