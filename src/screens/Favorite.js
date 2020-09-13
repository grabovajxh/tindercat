
      import React from 'react';
      import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
      import * as firebase from 'firebase';
      import 'firebase/firestore';
      function Item({ item }) {
        return (
          <View style={styles.listItem}>
            <Image source={{uri:item.urlImage}}  style={{width:60, height:60,borderRadius:30}} />
            <View style={{alignItems:"center",flex:1}}>
              <Text style={{fontWeight:"bold"}}>{item.name}</Text>
              <Text>{item.price}$</Text>
            </View>
            <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:"green"}}>{item.actions}</Text>
            </TouchableOpacity>
          </View>
        );
      }
      
      export default class Favorite extends React.Component {
        constructor() {
          super();
        this.state = {
         
          collectionTinder:[]
        
        };
      }
      componentDidMount() {
        this.getCollections();
       
      }
      getCollections=()=>{
        const imagesC = [];
        firebase.firestore().collection("productsTinder")
        .get()
        .then(querySnapshot=> {
            querySnapshot.forEach(doc=> {
              const { name,urlImage,price,actions } = doc.data();
              imagesC.push({ key:doc.id,name,urlImage,price,actions});
           this.setState({collectionTinder:imagesC});
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
      }
      
      
      
        render(){
          return (
            <View style={styles.container}>
              <FlatList
                style={{flex:1}}
                data={this.state.collectionTinder}
                renderItem={({ item }) => <Item item={item}/>}
                keyExtractor={item => item.email}
              />
            </View>
          );
        }
      }
      
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#F7F7F7',
          marginTop:60
        },
        listItem:{
          margin:10,
          padding:10,
          backgroundColor:"#FFF",
          width:"80%",
          flex:1,
          alignSelf:"center",
          flexDirection:"row",
          borderRadius:5
        }
      });