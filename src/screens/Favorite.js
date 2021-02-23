
import React , { Component } from 'react';
import { StyleSheet, Text,Image, TouchableOpacity, TouchableHighlight, View,RefreshControl } from 'react-native';
import IconButton from '../components/IconButton/IconButton'
import * as firebase from 'firebase';
import { SearchBar } from 'react-native-elements';
import SwitchSelector from "react-native-switch-selector";
import { AntDesign,MaterialIcons  } from '@expo/vector-icons'; 
import { SwipeListView } from 'react-native-swipe-list-view';

const dbConnection = firebase.firestore().collection("productsTinder");
export default class Favorite extends React.Component {
  constructor() {
    super();
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  this.state = {
      listData:  this.getCollections(),
      refreshing:false,
      search: '',
      searchText: '',
      collectionTinder: [],
    searchCollectionTinder:  [],
    isEnabled:false
  }}

  getCollections =  () => {
    let imagesC = [];
      dbConnection.onSnapshot(querySnapshot => {
      imagesC = [];
      this.setState({ listData: imagesC });
      this.setState({ collectionTinder: imagesC });
      this.setState({ searchCollectionTinder: imagesC });
   
      querySnapshot.forEach(doc => {
        const { productionName, urlImage, price, action, id } = doc.data();
        imagesC.push({ key: doc.id, productionName, urlImage, price, action, id });
        this.setState({ listData: imagesC });
        this.setState({ collectionTinder: imagesC });
      this.setState({ searchCollectionTinder: imagesC });
       
       
      });
    
    })};

   closeItem = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  updateSearch = (search) => {
    this.setState({ search });
    const filteredContacts = this.state.searchCollectionTinder
      .filter(contact => {
        let contactLowercase = (
          contact.productionName
        ).toLowerCase();

        let searchTermLowercase = search.toLowerCase();

        return contactLowercase.indexOf(searchTermLowercase) > -1;
      });
    this.setState({ listData: filteredContacts });
  };
  
   deleteItem = (rowMap, rowKey) => {
    this.closeItem(rowMap, rowKey);
    const newData = this.state.listData;
    const prevIndex = this.state.listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    this.setState({listData:newData})
    firebase.firestore().collection('productsTinder').doc(rowKey).delete()
   
  console.log(this.state.listData.length)

};

onSearchInputChange = (text) => {
const filterByValue = dbConnection.where("action", "==", "Left");
this.setState({ collectionTinder: filterByValue })
}    
toggleSwitch = (value) => {
this.setState({ isEnabled: value})
const filteredContacts = this.state.searchCollectionTinder
  .filter(contact => {
    let contactLowercase = (
      contact.action
    ).toLowerCase();
    let searchTermLowercase = "";
    if (this.state.isEnabled != true) {
      searchTermLowercase = "Right".toLowerCase();
    }
    else
      searchTermLowercase = "Left".toLowerCase();


    return contactLowercase.indexOf(searchTermLowercase) > -1;
  });

this.setState({ listData: filteredContacts });
};

   onItemOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

   renderItem = data => (
    <TouchableHighlight
      onPress={() => console.log('You touched me')}
      style={styles.rowFront}
      underlayColor={'#fff'}
    >
      <View style={{  backgroundColor: "#FFF",
  width: "95%",
  flex: 1,
  alignSelf: "center",
  flexDirection: "row",
  borderRadius: 5,}}>
         <Image source={{ uri: data.item.urlImage }} style={{ width: 100, height: 100}} />
      <View style={{ alignItems: "center", flex: 1 }} >
        <Text style={styles.list}>{data.item.productionName}</Text>
        <Text>{data.item.price}$</Text>
        <Text style={{ color: "green" }}>{data.item.action}</Text>
      </View>
      </View>
    </TouchableHighlight>
  );

   renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.actionButton, styles.closeBtn]}
        onPress={() => this.closeItem(rowMap, data.item.key)}
      >
      <MaterialIcons name="cancel" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteBtn]}
        onPress={() => this.deleteItem(rowMap, data.item.key)}
      >
          <AntDesign name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
   onRefresh = ()=> {
    this.setState({refreshing:true})
   }
  render() {
  return (
    
    <View style={styles.container}>
       <SearchBar
      placeholder="Type Here..."
      onChangeText={this.updateSearch}
      containerStyle={{ backgroundColor: 'transparent',
      borderWidth: 0, //no effect
      shadowColor: 'white', //no effect
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',overflow:'hidden'}}
      inputContainerStyle={{backgroundColor:'#e0e0eb', color:'#b3cccc'}}
      round={true}
      value={this.state.search}
    />
      <View style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', width: '50%', marginTop: '5%',marginBottom:'5%' }}>
        <SwitchSelector
          initial={0}
     
          onPress={ value => this.toggleSwitch(value)}
          textColor='#000' //'#7a44cf'
          selectedColor='#fff'
          bold={true}
          height={40}
          buttonColor='#a3c2c2'
          borderColor='#fff'
          hasPadding
          options={[
            { label: "Left", value: false }, //images.feminino = require('./path_to/assets/img/feminino.png')
            { label: "Right", value: true } //images.masculino = require('./path_to/assets/img/masculino.png')
          ]}
        />
      </View>
      <SwipeListView
      refreshing={true}
     // refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
        data={this.state.listData}
        renderItem={this.renderItem}
        renderHiddenItem={this.renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
 
      />
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop:'10%'
  },
  list: {
    color: '#000',
  },
  btnText: {
    color: '#000',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#e0e0eb',
    borderBottomWidth: 0.67,
    justifyContent: 'center',
    height: 110,
    paddingBottom:'10%'
  
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  actionButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  closeBtn: {
    backgroundColor: '#d9d9d9',
    right: 75,
  },
  deleteBtn: {
    backgroundColor: '#ff4d4d',
    right: 0,
  },
});