import React, { useRef } from 'react'
import { View, Text,Platform ,StyleSheet,Modal,TouchableHighlight,TextInput} from 'react-native'
import IconButton from '../components/IconButton/IconButton'
import Swiper from 'react-native-deck-swiper'
import Card  from '../components/Card/Card'

import OverlayLabel from '../components/OverlayLabel/OverlayLabel'
import styles from './App.styles'
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Alert } from 'react-native'

const tinderCards = [
  {
    productionName: 'Sneakers',
      description:'',
    action:'', 
    price: 22,
    urlImage: "https://firebasestorage.googleapis.com/v0/b/tinder-3a7a1.appspot.com/o/products%2F1.png?alt=media&token=ff2625d6-17f4-4e79-9d89-4eeeff8fdc31",
    id: 1,
  },
  {
    productionName: 'Sneakers',
      description:'',
    action:'', 
    price: 22,
    urlImage: "https://firebasestorage.googleapis.com/v0/b/tinder-3a7a1.appspot.com/o/products%2F2.png?alt=media&token=500e7a42-ce0d-4b25-8218-a2e5cae36788",
    id: 2,
  },

  {
    productionName: 'Hoodie',
      description:'',
    action:'',
    price: 29,
    urlImage: 'https://firebasestorage.googleapis.com/v0/b/tinder-3a7a1.appspot.com/o/products%2F10.png?alt=media&token=0128d88a-cca6-454c-b11a-2aefcde63a02',
    id: 3,
  },
  {
    productionName: 'T-Shirt',
      description:'',
    action:'',
    price: 300,
    urlImage: 'https://firebasestorage.googleapis.com/v0/b/tinder-3a7a1.appspot.com/o/products%2F4.png?alt=media&token=d5fa7065-acc8-400b-931f-a7837be6fcad',
    id: 4,
  },
 
  {
    productionName: 'T-shirt',
      description:'',
    action:'',
    price: 26,
    urlImage: 'https://firebasestorage.googleapis.com/v0/b/tinder-3a7a1.appspot.com/o/products%2F5.png?alt=media&token=58b1b1f9-42fe-45d5-b7be-71fc71f83010',
    id: 5,
  },
  {
    productionName: 'T-shirt',
      description:'',
    action:'',
    price: 300,
    urlImage: 'https://firebasestorage.googleapis.com/v0/b/tinder-3a7a1.appspot.com/o/products%2F7.png?alt=media&token=d8ec1ba6-f32d-4f53-aa70-38ab6a0be4cf',
    id: 6,
  },
  {
    productionName: 'Jeans',
    description:'',
    action:'',
    price: 24,
    urlImage: 'https://firebasestorage.googleapis.com/v0/b/tinder-3a7a1.appspot.com/o/products%2F8.png?alt=media&token=51449f9b-5e2d-4339-929c-ef0e6f94a573',
    id: 7,
  }
 
]

const connectionDB = firebase.firestore().collection("productsTinder");
export default class Home extends React.Component {
  constructor(props) { 
    super(props);
    this.state = { 
        email: "",
        password: "",
        items:[],
        useSwiper:"",
        photoCards: tinderCards,
        photoCardsT:tinderCards,
        swiperCard : this.swiperCards,
        right : false,
        modalVisible: false, 
        index : 1,
        price:0,

    };
     
}

// componentDidMount(){
 
//   this.handleOnSwipedRight;
// }
setModalVisible(visible) {
 console.log(this.state.index);
  this.setState({modalVisible: visible});
}
currentIndex=(i)=>{
this.setState({index:i});
this.setState({modalVisible: true});
 console.log("currentIndex"+this.state.index);
}
  swiperCards=()=>{
   
  }

handleOnSwipedTop = () => this.useSwiper.swipeTop()
 handleOnSwipedRight = () => {  
  
  const filteredCards = this.state.photoCards
      .filter(contact => {
        let contactLowercase = (
          contact.productionName
        ).toLowerCase();
        let searchTermLowercase = "";
          searchTermLowercase = "Device".toLowerCase();
        return contactLowercase.indexOf(searchTermLowercase) > -1;
      });
    this.setState({right:true});
    this.setState({ photoCardsT: filteredCards?filteredCards:null });
    this.state.photoCardsT.forEach(snap=>
      console.log(snap.urlImage));
  
}
onSwipeAction= (swipeProduct,action) => {
  console.log(swipeProduct.id);
  let i = 0;
  i = swipeProduct.id;
  if (swipeProduct!=null) {
        swipeProduct.action=action;
        
        connectionDB.add(swipeProduct)
      .then(function(connectionDB) {
        console.log("Document written with ID: ", connectionDB.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
      
      };
     
    
  }
  updatePrice=(id)=>
  {
     connectionDB.doc("0Xd0q4EjE2gg1iexaeyP").update({
       "price":id
     });
     this.setState({modalVisible:false})
  }

  render() {
    
   return (
    <View
      style={styles.container}
    >
      <View style={styles.swiperContainer}>
      <Swiper
      cardIndex={0}
      onTapCard = {(index)=>this.setState({index:this.state.photoCards[index].id},()=>this.currentIndex(this.state.photoCards[index].id))}
      useViewOverflow={Platform.OS === 'ios'}
      ref={this.state.useSwipe}
      animateCardOpacity
      containerStyle={styles.swiperContainer}
      //this.setState({index:this.state.photoCards[index].id}
      cards={this.state.right==true?this.state.photoCardsT:this.state.photoCards}
      renderCard={card =>  {
        if(this.state.photoCardsT.length>0){
         if(card !=null){
                  return(                                     
                    <Card card={card}/>                      
                     );
                  }else{
                  return(
                      console.log("null")// OR WHATEVER YOU WANT HERE   
                  );
              }
            }
            }}          
      backgroundColor="white"
      stackSize={2}
      infinite
      showSecondCard
      animateOverlayLabelsOpacity       
      onSwipedRight={(index) => this.onSwipeAction(this.state.photoCards[index],"Right") }
      onSwipedLeft={(index) =>  this.onSwipeAction(this.state.photoCards[index],"Left")}
      overlayLabels={{
        left: {
          title: 'NOPE',
          element: <OverlayLabel label="NOPE" color="#E5566D" />,
          style: {
            wrapper: styles.overlayWrapper,
          },
        },
        right: {
          title: 'LIKE',
          element: <OverlayLabel label="LIKE" color="#E5566D" />,
          style: {
            wrapper: styles.overlayWrapper,
            // wrapper: {
            //   ...styles.overlayWrapper,
            //   alignItems: 'flex-start',
            //   marginLeft: 30,
            // },
          },
        },
      }}
    />
      {/* {this.state.swiperCard.call(this.state)} */}
      </View>
      
      <View style={{marginTop: 22}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        
        >
        <View >
            <View style={styles.modalView}> 
              <Text> Update Price</Text>
             
              {this.state.photoCards
              .filter(obj=>obj.id==this.state.index)
              .map(item => (   
           <View style={styles.modalText} key={item.id}>
             <Text>Production Name</Text>
            <Text>{item.productionName}</Text>
            <Text>Price</Text>
            <TextInput  style={{ width:300, borderWidth: 1}}  onChangeText={value => this.setState({price :value})}>{item.price}</TextInput> 
           <View >
        

          </View>
        
          </View>
        ))
      }
              
              <View  style={styles.buttonsContainer }>
            
              <IconButton name="edit"
               onPress={() => {
               this.updatePrice(this.state.price);}}
                color="white"
                backgroundColor="#E5566D"
               
              />

             
           
               </View>
          </View>
        </View>
      </Modal>

     
    </View>
      {/* <View  style={styles.buttonsContainer } >
        <IconButton
       
          name="edit"
          onPress={() => {
            this.setModalVisible(true);
          }}

          color="white"
          backgroundColor="#E5566D"
        /> 
       
        <IconButton
          name="heart"
          onPress={this.handleOnSwipedRight}
          color="white"
          backgroundColor="#4CCC93"
        />
      </View>  */}
      {/* <View style={styles.swipeTextContainer}>
        <Text
          style={styles.copyright}
        >
           
        </Text>
     
    </View> */}
     
    </View>
    );
    
  }
  
}

console.ignoredYellowBox = ['Setting a timer'];