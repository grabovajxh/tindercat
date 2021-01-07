
import React from 'react';
import { View, ScrollView, Text, Image, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { Avatar, Button, Card, Title } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as firebase from 'firebase';
 import Preview from '../components/FlatSlider/Preview';
 import PreviewList from '../components/FlatSlider/PreviewList';
 import FlatListSlider from '../components/FlatSlider/FlatListSlider';
import SwitchSelector from "react-native-switch-selector";

import 'firebase/firestore';

// const SCREEN_HEIGHT = Dimensions.get('window').height;
// const SCREEN_WIDTH = Dimensions.get('window').width;
// import Icon from 'react-native-vector-icons/Ionicons';
// import { TouchableOpacity } from 'react-native-gesture-handler';

// import * as firebase from 'firebase';
// import 'firebase/firestore';
// const Users = [
//   { id: '1', uri: require('../../assets/1.jpg') },
//   { id: '2', uri: require('../../assets/2.jpg') },
//   { id: '3', uri: require('../../assets/3.jpg') },
//   { id: '4', uri: require('../../assets/4.jpg') },
//   { id: '5', uri: require('../../assets/5.jpg') },
//   { id: '6', uri: require('../../assets/1.jpg') },
//   { id: '7', uri: require('../../assets/2.jpg') },
//   { id: '8', uri: require('../../assets/3.jpg') },
//   { id: '9', uri: require('../../assets/4.jpg') },
//   { id: '10', uri: require('../../assets/5.jpg') },
// ];

// let  addProduct = (item) => {
//   // firebase.database().ref('/items').push({
//   // 	name: item
//   // });
//   var docDocRef = firebase.firestore().collection("users");
//   docDocRef.add({
//   name: "Alan",
//   images: "https://firebasestorage.googleapis.com/v0/b/tinder-3a7a1.appspot.com/o/asset%2FG1.png?alt=media&token=d1d9bde5-c8e8-4ecb-aff5-cef4e6b32787",
//   age: 1912,
//   id:item
// })
// .then(function(docRef) {
//   console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//   console.error("Error adding document: ", error);
// });

// };
import FirstPage from './LoginScreen';
import SecondPage from './RegisterScreen';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#F8F8F8',
        style: {
          backgroundColor: '#633689',
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 2,
        },
      }}>
      <Tab.Screen
        name="FirstPage"
        component={FirstPage}
        options={{
          tabBarLabel: 'Home',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="home" color={color} size={size} />
          // ),
        }} />
      <Tab.Screen
        name="SecondPage"
        component={SecondPage}
        options={{
          tabBarLabel: 'Setting',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="settings" color={color} size={size} />
          // ),
        }} />
    </Tab.Navigator>
  );
}

export default class Home extends React.Component {
  //   constructor() {
  //     super();

  //     this.position = new Animated.ValueXY();
  //     this.state = {
  //       currentIndex: 0,
  //       items:[],
  //     };

  //     this.rotate = this.position.x.interpolate({
  //       inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
  //       outputRange: ['-10deg', '0deg', '10deg'],
  //       extrapolate: 'clamp',
  //     });

  //     this.rotateAndTranslate = {
  //       transform: [
  //         {
  //           rotate: this.rotate,
  //         },
  //         ...this.position.getTranslateTransform(),
  //       ],
  //     };

  //     this.likeOpacity = this.position.x.interpolate({
  //       inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
  //       outputRange: [0, 0, 1],
  //       extrapolate: 'clamp',
  //     });
  //     this.dislikeOpacity = this.position.x.interpolate({
  //       inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
  //       outputRange: [1, 0, 0],
  //       extrapolate: 'clamp',
  //     });

  //     this.nextCardOpacity = this.position.x.interpolate({
  //       inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
  //       outputRange: [1, 0, 1],
  //       extrapolate: 'clamp',
  //     });
  //     this.nextCardScale = this.position.x.interpolate({
  //       inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
  //       outputRange: [1, 0.8, 1],
  //       extrapolate: 'clamp',
  //     });
  //   }

  //   componentWillMount() {
  //     var connectedRef = firebase.database().ref(".info/connected");
  // connectedRef.on("value", function(snap) {
  //   if (snap.val() === true) {
  //     alert("connected");
  //   } else {
  //     alert("not connected");
  //   }
  // });
  //     this.PanResponder = PanResponder.create({
  //       onStartShouldSetPanResponder: (evt, gestureState) => true,
  //       onPanResponderMove: (evt, gestureState) => {
  //         this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
  //       },
  //       onPanResponderRelease: (evt, gestureState) => {
  //         if (gestureState.dx > 120) {
  //           Animated.spring(this.position, {
  //             toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
  //           }).start(() => {
  //             this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
  //               this.position.setValue({ x: 0, y: 0 });
  //             });
  //           });
  //         } else if (gestureState.dx < -120) {
  //           Animated.spring(this.position, {
  //             toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
  //           }).start(() => {
  //             this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
  //               this.position.setValue({ x: 0, y: 0 });
  //             });
  //           });
  //         } else {
  //           Animated.spring(this.position, {
  //             toValue: { x: 0, y: 0 },
  //             friction: 4,
  //           }).start();
  //         }
  //       },
  //     });

  //   }
  //   handleChange = e => {
  //     this.setState({
  //       id: e.nativeEvent.id
  //     });
  //   };
  //   handleSwipe = (item) => {
  //     console.log(item);
  //     addProduct(item);

  //   };
  //   renderUsers = () => {
  //     return Users.map((item, i) => {
  //       if (i < this.state.currentIndex) {
  //         return null;
  //       } else if (i == this.state.currentIndex) {
  //         return (
  //           <Animated.View
  //             {...this.PanResponder.panHandlers}
  //             key={item.id}
  //             style={[
  //               this.rotateAndTranslate,
  //               {
  //                 height: SCREEN_HEIGHT - 120,
  //                 width: SCREEN_WIDTH,
  //                 padding: 10,
  //                 position: 'absolute',
  //               },
  //             ]}>
  //             <Animated.View
  //               style={{
  //                 opacity: this.likeOpacity,
  //                 transform: [{ rotate: '-30deg' }],
  //                 position: 'absolute',
  //                 top: 50,
  //                 left: 40,
  //                 zIndex: 1000,
  //               }}>
  //               <Text
  //                 style={{
  //                   borderWidth: 1,
  //                   borderColor: 'green',
  //                   color: 'green',
  //                   fontSize: 32,
  //                   fontWeight: '800',
  //                   padding: 10,
  //                 }}>
  //                 LIKE
  //               </Text>
  //             </Animated.View>

  //             <Animated.View
  //               style={{
  //                 opacity: this.dislikeOpacity,
  //                 transform: [{ rotate: '30deg' }],
  //                 position: 'absolute',
  //                 top: 50,
  //                 right: 40,
  //                 zIndex: 1000,
  //               }}>
  //                 <TouchableOpacity onPress={this.handleSwipe(item.id)}> 
  //               <Text
  //                 style={{
  //                   borderWidth: 1,
  //                   borderColor: 'red',
  //                   color: 'red',
  //                   fontSize: 32,
  //                   fontWeight: '800',
  //                   padding: 10,
  //                 }}>
  //                 NOPE
  //               </Text>
  //               </TouchableOpacity>
  //             </Animated.View>

  //             <Image
  //               style={{
  //                 flex: 1,
  //                 height: null,
  //                 width: null,
  //                 resizeMode: 'cover',
  //                 borderRadius: 20,
  //               }}
  //               source={item.uri}
  //             />
  //           </Animated.View>
  //         );
  //       } else {
  //         return (
  //           <Animated.View
  //             key={item.id}
  //             style={[
  //               {
  //                 opacity: this.nextCardOpacity,
  //                 transform: [{ scale: this.nextCardScale }],
  //                 height: SCREEN_HEIGHT - 120,
  //                 width: SCREEN_WIDTH,
  //                 padding: 10,
  //                 position: 'absolute',
  //               },
  //             ]}>
  //             <Animated.View
  //               style={{
  //                 opacity: 0,
  //                 transform: [{ rotate: '-30deg' }],
  //                 position: 'absolute',
  //                 top: 50,
  //                 left: 40,
  //                 zIndex: 1000,
  //               }}>
  //               <Text
  //                 style={{
  //                   borderWidth: 1,
  //                   borderColor: 'green',
  //                   color: 'green',
  //                   fontSize: 32,
  //                   fontWeight: '800',
  //                   padding: 10,
  //                 }}>
  //                 LIKE
  //               </Text>
  //             </Animated.View>

  //             <Animated.View
  //               style={{
  //                 opacity: 0,
  //                 transform: [{ rotate: '30deg' }],
  //                 position: 'absolute',
  //                 top: 50,
  //                 right: 40,
  //                 zIndex: 1000,
  //               }}>
  //               <Text
  //                 style={{
  //                   borderWidth: 1,
  //                   borderColor: 'red',
  //                   color: 'red',
  //                   fontSize: 32,
  //                   fontWeight: '800',
  //                   padding: 10,
  //                 }}>
  //                 NOPE
  //               </Text>
  //             </Animated.View>

  //             <Image
  //               style={{
  //                 flex: 1,
  //                 height: null,
  //                 width: null,
  //                 resizeMode: 'cover',
  //                 borderRadius: 20,
  //               }}
  //               source={item.uri}
  //             />
  //           </Animated.View>
  //         );
  //       }
  //     }).reverse();
  //   };
  constructor() {
    super();
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
    this.state = {
      currentIndex: 0,
      items: [],
      images: [],
      downloadURLs: [],
      users: "",

      collectionTinder: [],
      modalVisible: false,
      data: [
        
        {
          image:
            'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2299060/2018/7/30/7584b116-2a2c-4fb1-881c-af58cc484b181532944603854-Tokyo-Talkies-Women-Black-Printed-Maxi-Dress-4791532944603727-1.jpg',
          desc:
            'Dress',
        },
        {
          image:
          'https://cdn-images.farfetch-contents.com/14/55/48/85/14554885_22201159_600.jpg',
          desc:
            'Coat',
        },
        {
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhIhtVrVvqVCtqVsvZSHJCaD_1wZHSMUayGw&usqp=CAU',
          desc:
            'Jeans',
        },
        {
          image:
          'https://media.missguided.com/i/missguided/Y9206187_01',
          desc:
            'Hoodies',
        },{
          image:
          'https://hypebeast.com/image/2020/02/nike-top-10-best-selling-sneakers-list-2019-01.jpg',
          desc: 'Shoes',
        },
        {
          image:
            'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2299060/2018/7/30/7584b116-2a2c-4fb1-881c-af58cc484b181532944603854-Tokyo-Talkies-Women-Black-Printed-Maxi-Dress-4791532944603727-1.jpg',
          desc:
            'Dress',
        },
        {
          image:
          'https://cdn-images.farfetch-contents.com/14/55/48/85/14554885_22201159_600.jpg',
          desc:
            'Coat',
        },
        {
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhIhtVrVvqVCtqVsvZSHJCaD_1wZHSMUayGw&usqp=CAU',
          desc:
            'Jeans',
        },
        {
          image:
          'https://media.missguided.com/i/missguided/Y9206187_01',
          desc:
            'Hoodies',
        },
      ],
      // url:""
    };
  }
  componentDidMount() {

    var name = "";
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user.email);
      name = user.email.substr(0, user.email.indexOf('@'));
      this.setState({ users: name });


    });
  }

  render() {
    const styles = StyleSheet.create({
      separator: {
        height: 8,
      },
      contentStyle: {
        paddingHorizontal: 12,
        paddingTop: '25%',

      },
      container: {
        flex: 1,
      },
    
      
    });
    const screenWidth = Math.round(Dimensions.get('window').width);
    const stories = [
      {
        name: "Mattis",
        hasStory: false,
        source: {
          uri:
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        },
      },
      {
        key: "Lorem Sit",
        hasStory: true,
        storyRingColor: ["#20fab1", "#20fab1"],
        notificationCount: 3,
        source: {
          uri:
            "https://images.unsplash.com/uploads/14110635637836178f553/dcc2ccd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        },
      },
      {
        key: "Parturient Aenean Fringilla",
        hasStory: true,
        storyRingColor: ["#eb3434", "#eb3434"],
        isStoryRead: true,
        source: {
          uri:
            "https://images.unsplash.com/photo-1496440737103-cd596325d314?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        },
      },
      {
        key: "Parturient",
        hasStory: true,
        storyRingColor: ["#e22ae8", "#e22ae8"],
        // isStoryRead: true,
        source: {
          uri:
            "https://images.unsplash.com/photo-1514846226882-28b324ef7f28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        },
      },
      {
        key: "Adipiscing",
        hasStory: true,
        storyRingColor: ["#3492eb", "#3492eb"],
        source: {
          uri:
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        },
      },
      {
        key: "Mollis",
        hasStory: true,
        source: {
          uri:
            "https://images.unsplash.com/photo-1448376561459-dbe8868fa34c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        },
      },
      {
        key: "Dapibus Euismod",
        hasStory: true,
        source: {
          uri:
            "https://images.unsplash.com/photo-1539811107033-3a67f3ebc852?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80",
        },
      },
      {
        key: "Pellentesque",
        hasStory: true,
        source: {
          uri:
            "https://images.unsplash.com/photo-1551292831-023188e78222?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        },
      },
    ];
    return (

      // <View style={{ flex: 1 }}>
      //   <View style={{ height: 60 }} />
      //   <View style={{ flex: 1 }}>{this.renderUsers()}</View>
      //   <View style={{ height: 60 }} />

      // </View>
      <View>
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row', width: 'auto', height: 'auto', flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', paddingTop: '20%', paddingLeft: '3%' }}>
            <Text style={{ fontSize: 40, fontWeight: "bold" }}>Explore</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: '15%', paddingLeft: '5%', paddingRight: '5%' }}>
            <Image
              source={{ uri: 'https://image.flaticon.com/icons/png/512/194/194938.png' }} style={{
                height: 60,
                width: 60,
                borderRadius: 30
              }}
            />
          </View>
        </View>
        <View >
        <SafeAreaView>
            <ScrollView>

              <FlatListSlider
                data={this.state.data}
                width={80}
               timer={4000}
               loop={true}
                component={<Preview />}
                onPress={item => alert(JSON.stringify(item))}
                indicatorActiveWidth={10}
                contentContainerStyle={styles.contentStyle}
              />
            </ScrollView>
            </SafeAreaView>
        </View>
       
        {/* <View style={styles.container}>
				<Bubbles />

				<View style={[
					styles.carouselWrap,
					store.offset,
					(store.carouselOpen ? styles.open : styles.closed)
				]}>
					<Stories />
				</View>
			</View> */}
    {/* {stories.map((item) => {
            return (
              <View key={item.name} style={{ marginLeft: 12 }}>
                <IGStoryCircle
                  {...item}
                  source={item.source}
                  hasStory={item.hasStory}
                  onPress={() => {}}
                />
              </View>
            );
          })} */}
        
          
        <View  style={{flexDirection:'column',alignSelf:'center',justifyContent:'center',width:'70%',marginTop:'5%'}}>
        <SwitchSelector
          initial={0}
          onPress={value => this.setState({ gender: value })}
          textColor='#000' //'#7a44cf'
          selectedColor='#fff'
          bold='true'
          height={60}
          buttonColor='#DA8730'
          borderColor='#fff'
          hasPadding
          options={[
            { label: "WOMEN", value: "f" }, //images.feminino = require('./path_to/assets/img/feminino.png')
            { label: "MEN", value: "m" } //images.masculino = require('./path_to/assets/img/masculino.png')
          ]}
        />
      </View>
     
       
      <View>
      <View style={{ flex: 1, flexDirection: 'row', paddingTop: '5%', paddingLeft: '5%'}}>
          
               <Image
               source={require('../assets/SHOE2.png')} style={{
                height: 200,
                width: 200,
                borderRadius: 1
              }}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row',  paddingRight: '5%' }}>
          
          <Image
          source={require('../assets/SHOE2.png')} style={{
           height: 200,
           width: 200,
           borderRadius: 1
         }}
       />
       
      </View>
      </View>
      
     </View>
        




    );


  }

}
