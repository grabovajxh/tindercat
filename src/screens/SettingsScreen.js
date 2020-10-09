import React, { memo } from 'react';
import Background from '../components/Background';
import Paragraph from '../components/Paragraph';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { TouchableOpacity, StyleSheet,ListItem, ScrollView, Text, View , TextInput,Alert,TouchableHighlight, Image } from 'react-native';
import { Button } from 'react-native-paper';
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
  
    collectionTinder:[]
   // url:""
  };
}

  // componentDidMount() {
 
  //   const ref = firebase.storage().ref().child("asset/G1.png");
  //   ref.getDownloadURL().then(data => {
  //      this.setState({ url: data})
  //   });
  //   this.getUrl();
  //   this.getCollections();
  // }
   // const ref = firebase.storage().ref('https://firebasestorage.googleapis.com/v0/b/tinder-3a7a1.appspot.com/o/assets%2Fhttps%3A%2Fimages.unsplash.com%2Fphoto-1482822683622-00effad5052e%3Fixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26auto%3Dformat%26fit%3Dcrop%26w%3D1050%26q%3D80?alt=media&token=9abdfdd7-b015-40df-8923-dcc5124b75cb');
//const url =  ref.getDownloadURL();
//this.setState({ items:url})
   //const db = firebase.database().ref().child("items");
  //  db.on('value', snapshot => {

      
  //   let data = snapshot.val();
  //   let dataitem = Object.values(data);
  //   this.setState({ items:dataitem});
  // });
   //const db = firebase.storage().ref().child("users");
  // db.getDownloadURL().then((url) => { this.setState({ items: url })});
    // db.on('value', snapshot => {

      
    //     let data = snapshot.val();
    //     let dataitem = Object.values(data);
    //     this.setState({ items:dataitem});
    //   });
//   getCollections=()=>{
//     const imagesC = [];
//     firebase.firestore().collection("users")
//     .get()
//     .then(querySnapshot=> {
//         querySnapshot.forEach(doc=> {
//           const { name, images, age } = doc.data();
//           imagesC.push({ key:doc.id,doc,name,images,age});
//        this.setState({collectionTinder:imagesC});
//             console.log(doc.id, " => ", doc.data());
//         });
//     })
//     .catch(function(error) {
//         console.log("Error getting documents: ", error);
//     });
//   }
//     getUrl=()=>{
//     const listRef = firebase.storage().ref().child("asset/");
 
// let imgURL=[];
// listRef.listAll().then(res=> {
// res.prefixes.forEach(function (folderrREF){

//   this.setState({images:res.items});
// });


// res.items.forEach(itemRef=>{
//   itemRef.getDownloadURL().then(url=> {
//    console.log(url);
//    imgURL.push({name:url});
//    this.setState({downloadURLs:imgURL});
// // this.setState({downloadURLs :"test"});//downloadURLs[itemRef.name]
// // downloadURLs= url;
// //this.downloadURLs.push({name:url});


// });

// });

// })

// .catch(function(error) {
// console.log(error);
// console.log("error error");
// // Uh-oh, an error occurred!

// });
//     }
//     handleChange = e => {
//       this.setState({
//         name: e.nativeEvent.text
//       });
//     };
//     handleSubmit = () => {
//       addItem(this.state.name);
//     // addImage(this.state.name);
//     };

  render() {

    return (
      <Background>
    <Paragraph>
    Personal Information
    </Paragraph>
    {/* <View>
   
				{this.state.items.length > 0 ? (
          this.state.items.map((item, index) => {
            return (
              <View key={index} >
                <Text >{item.name}</Text>
              </View>
            );
          })
					
				) : (
					<Text>No items</Text>
				)}
			</View> */}
      <View >
		
				<TextInput onChange={this.handleChange} />
				<TouchableHighlight underlayColor="white"onPress={this.handleSubmit}>

           <View>
					{/* < Button>Add</Button> */}
       </View>
				</TouchableHighlight>
        {/* <ScrollView >
          {
            this.state.collectionTinder.map((item, i) => {
              return (
                <View>
              <Text>{item.name}</Text>
              <Image source={{uri:item.images}} style={{ width: 305, height: 159 }}/> 
              </View>
              );
            })
          }
      </ScrollView> */}
        {/* <View>
        {Object.keys(this.state.image).map((d, key) => {
 
      
        <Text key={key}>
          {d.name}
        </Text>
     
     
    })}

  
 </View> */}
              {/* <View>
   
   {this.state.downloadURLs.length > 0 ? (
     this.state.downloadURLs.map((image, index) => {
       return (
         <View key={index} >
          <Image source={{ uri: image.name }} style={{ width: 305, height: 159 }} />
         </View>
       );
     })
     
   ) : (
     <Text>No items</Text>
   )}
 </View>*/}
        
        </View> 
			
     
  </Background>
  )
        }
      }