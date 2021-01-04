// //This is an example of Tinder like Swipeable Card//
// import React, { Component } from 'react';
// //import react in our code.
// import { Platform, StyleSheet, View, Text, 
//         Dimensions, Animated, PanResponder,} from 'react-native';
// //import all the components we are going to use.
// const SCREEN_WIDTH = Dimensions.get('window').width;
// class SwipeableCard extends React.Component {
//   constructor() {
//     super();
//     this.panResponder;
//     this.state = {
//       Xposition: new Animated.Value(0),
//       RightText: false,
//       LeftText: false,
//     };
//     this.Card_Opacity = new Animated.Value(1);
 
//     this.panResponder = PanResponder.create({
//       onStartShouldSetPanResponder: (evt, gestureState) => false,
//       onMoveShouldSetPanResponder: (evt, gestureState) => true,
//       onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
//       onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
//       onPanResponderMove: (evt, gestureState) => {
//         this.state.Xposition.setValue(gestureState.dx);
//         if (gestureState.dx > SCREEN_WIDTH - 250) {
//           this.setState({
//             RightText: true,
//             LeftText: false,
//           });
//         } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
//           this.setState({
//             LeftText: true,
//             RightText: false,
//           });
//         }
//       },
//       onPanResponderRelease: (evt, gestureState) => {
//         if (
//           gestureState.dx < SCREEN_WIDTH - 150 &&
//           gestureState.dx > -SCREEN_WIDTH + 150
//         ) {
//           this.setState({
//             LeftText: false,
//             RightText: false,
//           });
//           Animated.spring(
//             this.state.Xposition,
//             {
//               toValue: 0,
//               speed: 5,
//               bounciness: 10,
//             },
//             { useNativeDriver: true }
//           ).start();
//         } else if (gestureState.dx > SCREEN_WIDTH - 150) {
//           Animated.parallel(
//             [
//               Animated.timing(this.state.Xposition, {
//                 toValue: SCREEN_WIDTH,
//                 duration: 200,
//               }),
//               Animated.timing(this.Card_Opacity, {
//                 toValue: 0,
//                 duration: 200,
//               }),
//             ],
//             { useNativeDriver: true }
//           ).start(() => {
//             this.setState({ LeftText: false, RightText: false }, () => {
//               this.props.removeCard();
//             });
//           });
//         } else if (gestureState.dx < -SCREEN_WIDTH + 150) {
//           Animated.parallel(
//             [
//               Animated.timing(this.state.Xposition, {
//                 toValue: -SCREEN_WIDTH,
//                 duration: 200,
//               }),
//               Animated.timing(this.Card_Opacity, {
//                 toValue: 0,
//                 duration: 200,
//               }),
//             ],
//             { useNativeDriver: true }
//           ).start(() => {
//             this.setState({ LeftText: false, RightText: false }, () => {
//               this.props.removeCard();
//             });
//           });
//         }
//       },
//     });
//   }
//   render() {
//     const rotateCard = this.state.Xposition.interpolate({
//       inputRange: [-200, 0, 200],
//       outputRange: ['-20deg', '0deg', '20deg'],
//     });
//     return (
//       <Animated.View
//         {...this.panResponder.panHandlers}
//         style={[
//           styles.card_Style,
//           {
//             backgroundColor: this.props.item.backgroundColor,
//             opacity: this.Card_Opacity,
//             transform: [
//               { translateX: this.state.Xposition },
//               { rotate: rotateCard },
//             ],
//           },
//         ]}>
//         <Text style={styles.Card_Title}> {this.props.item.card_Title} </Text>
//         {this.state.LeftText ? (
//           <Text style={styles.Left_Text_Style}> Left Swipe </Text>
//         ) : null}
//         {this.state.RightText ? (
//           <Text style={styles.Right_Text_Style}> Right Swipe </Text>
//         ) : null}
//       </Animated.View>
//     );
//   }
// }

// export default class TinderLike extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       Sample_Card_Array: [{
//           id: '1', card_Title: 'Card 1', backgroundColor: '#FFC107',
//         },{
//           id: '2', card_Title: 'Card 2', backgroundColor: '#ED2525',
//         },{
//           id: '3', card_Title: 'Card 3', backgroundColor: '#E7088E',
//         },{
//           id: '4', card_Title: 'Card 4', backgroundColor: '#00BCD4',
//         },{
//           id: '5', card_Title: 'Card 5', backgroundColor: '#FFFB14',
//         }],
//         No_More_Card: false,
//     };
//   }
//   componentDidMount() {
//     this.setState({
//       Sample_Card_Array: this.state.Sample_Card_Array.reverse(),
//     });
//     if (this.state.Sample_Card_Array.length == 0) {
//       this.setState({ No_More_Card: true });
//     }
//   }
//   removeCard = id => {
//     this.state.Sample_Card_Array.splice(
//       this.state.Sample_Card_Array.findIndex(x => x.id == id),
//       1
//     );
//     this.setState({ Sample_Card_Array: this.state.Sample_Card_Array }, () => {
//       if (this.state.Sample_Card_Array.length == 0) {
//         this.setState({ No_More_Card: true });
//       }
//     });
//   };
//   render() {
//     return (
//       <View style={styles.MainContainer}>
//         {this.state.Sample_Card_Array.map((item, key) => (
//           <SwipeableCard
//             key={key}
//             item={item}
//             removeCard={this.removeCard.bind(this, item.id)}
//           />
//         ))}
//         {this.state.No_More_Card ? (
//           <Text style={{ fontSize: 22, color: '#000' }}>No Cards Found.</Text>
//         ) : null}
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   MainContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: Platform.OS === 'ios' ? 20 : 0,
//   },
//   card_Style: {
//     width: '75%',
//     height: '45%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     borderRadius: 7,
//   },
//   Card_Title: {
//     color: '#fff',
//     fontSize: 24,
//   },
//   Left_Text_Style: {
//     top: 22,
//     right: 32,
//     position: 'absolute',
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//     backgroundColor: 'transparent',
//   },
//   Right_Text_Style: {
//     top: 22,
//     left: 32,
//     position: 'absolute',
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//     backgroundColor: 'transparent',
//   },
// });
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
    productionName: 'Tech',
      description:'',
    action:'', 
    price: 22,
    urlImage: "https://firebasestorage.googleapis.com/v0/b/tinder-3a7a1.appspot.com/o/products%2F1.jpg?alt=media&token=9b93411f-b658-4b68-9258-a426f2bc3250",
    id: 1,
  },

  {
    productionName: 'Device',
      description:'',
    action:'',
    price: 29,
    urlImage: 'https://firebasestorage.googleapis.com/v0/b/tinder-3a7a1.appspot.com/o/products%2F3.jpg?alt=media&token=84b56b4d-ec7b-449c-ad74-f6da559791e6',
    id: 3,
  },
  {
    productionName: 'TV',
      description:'',
    action:'',
    price: 300,
    urlImage: 'https://firebasestorage.googleapis.com/v0/b/tinder-3a7a1.appspot.com/o/products%2F4.jpg?alt=media&token=3b3ebfbf-ea73-440f-990c-68abbf2eae51',
    id: 4,
  },
  {
    productionName: 'Head Phone',
      description:'',
    action:'',
    price: 240,
    urlImage: 'https://firebasestorage.googleapis.com/v0/b/tinder-3a7a1.appspot.com/o/products%2F5.jpg?alt=media&token=9ba9e5d3-f3ce-4c4e-abbd-d9068c4ac2d0',
    id: 2,
  },
  {
    productionName: 'Tech',
      description:'',
    action:'',
    price: 26,
    urlImage: 'https://firebasestorage.googleapis.com/v0/b/tinder-3a7a1.appspot.com/o/products%2F6.jpg?alt=media&token=63076312-de58-4c18-ad06-43aea74a2908',
    id: 5,
  },
  {
    productionName: 'Phone',
      description:'',
    action:'',
    price: 300,
    urlImage: 'https://firebasestorage.googleapis.com/v0/b/tinder-3a7a1.appspot.com/o/products%2F10.jpg?alt=media&token=400dca73-ca13-4d88-a484-7feb176ec993',
    id: 6,
  },
  {
    productionName: 'Device',
    description:'',
    action:'',
    price: 24,
    urlImage: 'https://firebasestorage.googleapis.com/v0/b/tinder-3a7a1.appspot.com/o/products%2F8.jpg?alt=media&token=21fc6550-1c9f-456e-bf34-9a60f0c57a19',
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

//  handleOnSwipedLeft = () => {
//      return (
      
//       <View style={{marginTop: 22}}>
//       <Modal
//         animationType="slide"
//         transparent={false}
//         visible={this.state.modalVisible}
//         onRequestClose={() => {
//           Alert.alert('Modal has been closed.');
//         }}>
//         <View style={{marginTop: 22}}>
//           <View>
//             <Text>Hello World!</Text>

//             <TouchableHighlight
//               onPress={() => {
//                 this.setModalVisible(!this.state.modalVisible);
//               }}>
//               <Text>Hide Modal</Text>
//             </TouchableHighlight>
//           </View>
//         </View>
//       </Modal>

//       <TouchableHighlight
//         onPress={() => {
//           this.setModalVisible(true);
//         }}>
//         <Text>Show Modal</Text>
//       </TouchableHighlight>
//     </View>
   
//   );
//   console.log("testpro");
//  }
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
          element: <OverlayLabel label="LIKE" color="#4CCC93" />,
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

