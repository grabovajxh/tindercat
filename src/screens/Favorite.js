
import React , { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Button, TextInput, Switch } from 'react-native';
import IconButton from '../components/IconButton/IconButton'
import * as firebase from 'firebase';
import { SearchBar } from 'react-native-elements';
import SwitchSelector from "react-native-switch-selector";
import { Ionicons , FontAwesome, MaterialCommunityIcons,MaterialIcons,Fontisto} from '@expo/vector-icons';

//  class Item extends Component{


//   render() {
//     const {item} = this.props;
//     const {handleClicks} = this.props;
//     const handleClickss = async (key) => {
//       await dbConnection.doc(key).delete().then(function () {
//         console.log("Document successfully deleted!");
//       }).catch(function (error) {
//         console.error("Error removing document: ", error);
//       });
//     }
     
//     return (
//       <View style={styles.listItem} >
//         <Image source={{ uri: item.urlImage }} style={{ width: 50, height: 50, borderRadius: 25 }} />
//         <View style={{ alignItems: "flex-start", flex: 1 }} >
//           <Text style={{ paddingLeft:'15%',paddingTop:'8%',fontWeight: "bold" ,alignSelf:'center'}}>{item.productionName}</Text>
      
       
//         </View>
//         <View style={{ alignItems: "center", flex: 1 }} >
       
//           <Text style={{ paddingLeft:'15%',paddingTop:'7%',alignSelf:'center'}}>{item.price}$</Text>
       
//         </View>
//         <View style={{ alignItems: "flex-end", flex: 1 }} >
      
//           <Text style={{ color: "#DA8730",paddingLeft:'15%',paddingTop:'7%',alignSelf:'center' }}>{item.action}</Text>
//         </View>
  
//         <TouchableOpacity>
//           <IconButton
//             name="delete"
//             color="red"
//             size={20}
//             onPress={()=>{handleClickss(item.key);this._onRemove(item);}}
//           />
  
//         </TouchableOpacity>
//       </View>
//     );
//   }
  
//  }
const dbConnection = firebase.firestore().collection("productsTinder");
export default class Favorite extends React.Component {
  constructor() {
    super();
    this.state = {

      collectionTinder: [],
      searchCollectionTinder: [],
      search: '',
      searchText: '',
      filterByValue: null,
      isEnabled: false,
      refreshing :false

    };
  }
 
  handleClicks = async (key) => {
    await dbConnection.doc(key).delete().then(function () {
     console.log("Document successfully deleted!");
   }).catch(function (error) {
     console.error("Error removing document: ", error);
   });
  }
  _onRemove = (key) => { 
    const filteredData = this.state.collectionTinder.filter(item => item.key !== key);
    this.setState({ collectionTinder: filteredData });
    
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

    this.setState({ collectionTinder: filteredContacts });
  };
  render_FlatList_header = () => {

    var header_View = (

      <View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder="Type here to translate!"
          onChangeText={text => this.onSearchInputChange(text)}
          value={this.state.searchText}
        />
      </View>
    );

    return header_View;

  };
componentDidMount(){
  this.getCollections();
}

  onSearchInputChange = (text) => {
    const filterByValue = dbConnection.where("action", "==", "Left");
    this.setState({ collectionTinder: filterByValue })
  }
  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.onSearchInputChange(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  getCollections = async () => {
    let imagesC = [];
    var tinderCollections = dbConnection.onSnapshot(querySnapshot => {
      imagesC = [];
      this.setState({ collectionTinder: imagesC });
      this.setState({ searchCollectionTinder: imagesC });
      console.log(this.state.collectionTinder[0]);
      querySnapshot.forEach(doc => {
        const { productionName, urlImage, price, action, id } = doc.data();
        imagesC.push({ key: doc.id, productionName, urlImage, price, action, id });
        this.setState({ collectionTinder: imagesC });
        this.setState({ searchCollectionTinder: imagesC });
        console.log(doc.id, " => ", doc.data());
       
      });
      console.log(this.state.collectionTinder.length);
       return tinderCollections;
    });

    // firebase.firestore().collection("productsTinder")
    // .get()
    // .then(querySnapshot=> {
    //     querySnapshot.forEach(doc=> {
    //       const { productionName,urlImage,price,action } = doc.data();
    //       imagesC.push({ key:doc.id,productionName,urlImage,price,action});
    //    this.setState({collectionTinder:imagesC});
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // })
    // .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // });
  }
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
    this.setState({ collectionTinder: filteredContacts });
  };
  searchContacts = value => {
    const filteredContacts = this.state.searchCollectionTinder
      .filter(contact => {
        let contactLowercase = (
          contact.productionName
        ).toLowerCase();

        let searchTermLowercase = value.toLowerCase();

        return contactLowercase.indexOf(searchTermLowercase) > -1;
      });
    this.setState({ collectionTinder: filteredContacts });
  };
  renderFlatList=(item)=>{
    <View style={styles.listItem} >
        <Image source={{ uri: item.urlImage }} style={{ width: 60, height: 60, borderRadius: 30 }} />
        <View style={{ alignItems: "center", flex: 1 }} >
          <Text style={{ fontWeight: "bold" }}>{item.productionName}</Text>
          <Text>{item.price}$</Text>
          <Text style={{ color: "green" }}>{item.action}</Text>
        </View>
  
        <TouchableOpacity>
          <IconButton
            name="delete"
            color="red"
            size={20}
            onPress={()=>handleClickss(item.key)}
          />
  
        </TouchableOpacity>
      </View>
  }
  render() {
   
    return (
      <View style={styles.container}  >
     
        <View style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', width: '70%', marginTop: '5%' }}>
          <SwitchSelector
            initial={0}
       
            onPress={ value => this.toggleSwitch(value)}
            textColor='#000' //'#7a44cf'
            selectedColor='#fff'
            bold={true}
            height={40}
            buttonColor='#DA8730'
            borderColor='#fff'
            hasPadding
            options={[
              { label: "Left", value: false }, //images.feminino = require('./path_to/assets/img/feminino.png')
              { label: "Right", value: true } //images.masculino = require('./path_to/assets/img/masculino.png')
            ]}
          />
        </View>
        
        <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        lightTheme={true}
        round={true}
        value={this.state.search}
      />

        {/* <View style={styles.searchSection}>
    <FontAwesome style={styles.searchIcon} name="search" size={15} color="#000"/>
    <TextInput
        style={styles.input}
        placeholder="Search"
        onChangeText={value => this.searchContacts(value)}
        underlineColorAndroid="transparent"
    />
</View> */}
        {/* <View style={{  
    flexDirection: 'row', 
 }}>
        <FontAwesome name="search" style={{paddingLeft:'10%'}} size={24} color="black" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#ffffff"
            style={{
              backgroundColor: '#e6e6e6',
              marginLeft: '10%',
              marginRight: '10%',
              flex:1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              textAlign: "center",
              fontSize: 20,
              padding: '1%',
              color: 'white',
              width: '100%',
              borderRadius:20
            }}
            onChangeText={value => this.searchContacts(value)}
          />
           {/* <View style={{  alignSelf: 'flex-end', justifyContent: 'flex-end', width: '30%',  marginTop: '5%' , marginLeft:'14%' }}>
          <SwitchSelector
            initial={0}
            onPress={value => this.setState({ gender: value })}
            textColor='#000' //'#7a44cf'
            selectedColor='#fff'
            bold={true}
            height={60}
            buttonColor='#DA8730'
            borderColor='#fff'
            hasPadding
            options={[
              { label: "<", value: "f" }, //images.feminino = require('./path_to/assets/img/feminino.png')
              { label: ">", value: "m" } //images.masculino = require('./path_to/assets/img/masculino.png')
            ]}
          />
        </View>
         </View> */}
          {/* <Switch
            trackColor={{ false: '#767577', true: '#39ac73' }}
            thumbColor={this.state.isEnabled ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.toggleSwitch}
            value={this.state.isEnabled}
            style={{
              marginLeft: '10%',
              marginTop: '2%',
              
            }}
          /> */}
       

        <FlatList

          style={{ flex: 1 }}
          data={this.state.collectionTinder}
          renderItem={({ item }) =>// if(this.state.collectionTinder.length>0) {return(<Item item={item}/> ); }  else{return()}  }}
          {
            return (
              <View style={styles.listItem} >
                <Image source={{ uri: item.urlImage }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                <View style={{ alignItems: "flex-start", flex: 1 }} >
                  <Text style={{ paddingLeft:'15%',paddingTop:'8%',fontWeight: "bold" ,alignSelf:'center'}}>{item.productionName}</Text>
              
               
                </View>
                <View style={{ alignItems: "center", flex: 1 }} >
               
                  <Text style={{ paddingLeft:'15%',paddingTop:'7%',alignSelf:'center'}}>{item.price}$</Text>
               
                </View>
                <View style={{ alignItems: "flex-end", flex: 1 }} >
              
                  <Text style={{ color: "#DA8730",paddingLeft:'15%',paddingTop:'7%',alignSelf:'center' }}>{item.action}</Text>
                </View>
          
                <TouchableOpacity>
                  <IconButton
                    name="delete"
                    color="red"
                    size={20}
                    onPress={()=>{this.handleClicks(item.key);this._onRemove(item.key);}}
                  />
          
                </TouchableOpacity>
              </View>
            );
            // if (this.state.collectionTinder.length > 0) {
            //   return (
                
            //    <Item item={item} />

            //   );
            // } else {
            //   return (
            //     console.log("nodata")// OR WHATEVER YOU WANT HERE
            //   );
            // }
          }}
          keyExtractor={(item, index) => index.toString()}
          removeClippedSubviews={true} // Unmount components when outside of window 
          initialNumToRender={50} // Reduce initial render amount
          maxToRenderPerBatch={50} // Reduce number in each render batch
          updateCellsBatchingPeriod={1} // Increase time between renders
          windowSize={21} // Reduce the window size
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.setState({ refreshing: true });
            this.getCollections();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
      marginTop:'10%'
 
  },

  searchSection: {
    width:'95%',
    flexDirection: 'row',  
    backgroundColor: '#fff',
    marginLeft:'2.5%',
    marginRight:'10%',
    marginBottom:'5%',
    paddingRight:'5%',
     borderRadius:60,
    backgroundColor: '#e6e6e6',
},
searchIcon: {
    padding:'1%'
},
input: {
    
    paddingTop: '1%',
    paddingRight: '1%',
    paddingBottom: '1%',
    paddingLeft:'1%',
    backgroundColor: '#e6e6e6',
    color: '#424242',
},
  listItem: {
    margin: 2,

    backgroundColor: "#FFF",
    width: "95%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
   
  }
});