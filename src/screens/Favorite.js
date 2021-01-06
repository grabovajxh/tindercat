
import React , { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Button, TextInput, Switch } from 'react-native';
import IconButton from '../components/IconButton/IconButton'
import * as firebase from 'firebase';
import { SearchBar } from 'react-native-elements';


const dbConnection = firebase.firestore().collection("productsTinder");
 class Item extends Component{


  render() {
    const {item} = this.props;
    const {handleClicks} = this.props;
    const handleClickss = async (key) => {
      await dbConnection.doc(key).delete().then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    }
     
    return (
      <View style={styles.listItem} >
        <Image source={{ uri: item.urlImage }} style={{ width: 60, height: 60, borderRadius: 30 }} />
        <View style={{ alignItems: "center", flex: 1 }} >
          <Text style={{ fontWeight: "bold" }}>{item.productionName}</Text>
          <Text>{item.price}$</Text>
          <Text style={{ color: "#DA8730" }}>{item.action}</Text>
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
    );
  }
  
 }

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
  toggleSwitch = () => {
    this.setState({ isEnabled: !this.state.isEnabled })
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
  async    componentDidMount() {
    await this.getCollections();

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
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#ffffff"
            style={{
              backgroundColor: '#e6e6e6',
              
              marginLeft: '10%',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: "center",
              fontSize: 20,
              padding: '1%',
              color: 'white',
              width: '40%',
            }}
            onChangeText={value => this.searchContacts(value)}
          />
          <Switch
            trackColor={{ false: '#767577', true: '#39ac73' }}
            thumbColor={this.state.isEnabled ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.toggleSwitch}
            value={this.state.isEnabled}
            style={{
              marginLeft: '10%',
              marginTop: '2%',
              
            }}
          />
        </View>

        <FlatList

          style={{ flex: 1 }}
          data={this.state.collectionTinder}
          renderItem={({ item }) =>// if(this.state.collectionTinder.length>0) {return(<Item item={item}/> ); }  else{return()}  }}
          {
            if (this.state.collectionTinder.length > 0) {
              return (
                
               <Item item={item} />

              );
            } else {
              return (
                console.log("nodata")// OR WHATEVER YOU WANT HERE
              );
            }
          }}
          keyExtractor={(item, index) => index.toString()}
          removeClippedSubviews={true} // Unmount components when outside of window 
          initialNumToRender={2} // Reduce initial render amount
          maxToRenderPerBatch={1} // Reduce number in each render batch
          updateCellsBatchingPeriod={100} // Increase time between renders
          windowSize={7} // Reduce the window size
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.setState({ refreshing: true });
            this.collectionTinder();
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
    marginTop: 60
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    width: "80%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5
  }
});