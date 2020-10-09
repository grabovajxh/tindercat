
      import React from 'react';
      import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Button,TextInput} from 'react-native';
      import IconButton  from '../components/IconButton/IconButton'
      import * as firebase from 'firebase';
      import { SearchBar } from 'react-native-elements';
      function Item({ item }) {
        return (
          <View style={styles.listItem} >
            <Image source={{uri:item.urlImage}}  style={{width:60, height:60,borderRadius:30}} />
            <View style={{alignItems:"center",flex:1}} >
              <Text style={{fontWeight:"bold"}}>{item.productionName}</Text>
              <Text>{item.price}$</Text>
              <Text style={{color:"green"}}>{item.action}</Text>
            </View>
           
            <TouchableOpacity>
            <IconButton
    name="delete"
    color="red"
    size={20}
    onPress={() => OnDeleteFav(item.key)}
  />
      
            </TouchableOpacity>
          </View>
        );
      }
    
    
      const   dbConnection=  firebase.firestore().collection("productsTinder");
      const  OnDeleteFav=(key)=>
      {
        dbConnection.doc(key).delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
      }

      export default class Favorite extends React.Component {
        constructor() {
          super();
        this.state = {
         
          collectionTinder:[],
          search: '',
          searchText: '',
          filterByValue: null
        
        };
      }
      render_FlatList_header = () => {

        var header_View = (
    
        <View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder="Type here to translate!"
          onChangeText={text =>this.onSearchInputChange(text) }
          value={this.state.searchText}
        />
        </View>
        );
    
        return header_View ;
    
      };
      componentDidMount() {
       this.getCollections();
       
      }
      onSearchInputChange = (text) => {
        const filterByValue = dbConnection.where("action", "==", "Left");
        this.setState({searchText: text, collectionTinder: filterByValue})
      }
      renderHeader = () => {
        return (
          <SearchBar
            placeholder="Type Here..."
            lightTheme
            round
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}
          />
        );
      };
      getCollections=()=>{
        let  imagesC = [];
      var tinderCollections = dbConnection.onSnapshot(querySnapshot=> {
         imagesC =[];
        this.setState({collectionTinder:imagesC});
        console.log(this.state.collectionTinder[0]);
        querySnapshot.forEach(doc=>{
       
          const {productionName,urlImage,price,action ,id} = doc.data();
          
              imagesC.push({ key:doc.id,productionName,urlImage,price,action,id});
           this.setState({collectionTinder:imagesC});
                console.log(doc.id, " => ", doc.data());
            });
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
      
      
      
        render(){
          return (
            <View style={styles.container}  >
              <FlatList
              ListHeaderComponent={this.renderHeader}
                style={{flex:1}}
                data={this.state.collectionTinder}
                renderItem={({ item }) =>// if(this.state.collectionTinder.length>0) {return(<Item item={item}/> ); }  else{return()}  }}
                {
                  if(this.state.collectionTinder.length>0){
                      return(
                        console.log("data"),
                        <Item item={item}/>
                       
                      );
                  }else{
                      return(
                          console.log("nodata")// OR WHATEVER YOU WANT HERE
                      );
                  }
              }}
                keyExtractor={(item, index) => index.toString()}
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