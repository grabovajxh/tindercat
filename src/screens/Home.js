
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  PanResponder,
  TouchableHighlight,
  TextInput,
} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Paragraph from '../components/Paragraph';
import * as firebase from 'firebase';
import 'firebase/firestore';

const Users = [
  { id: '1', uri: require('../../assets/1.jpg') },
  { id: '2', uri: require('../../assets/2.jpg') },
  { id: '3', uri: require('../../assets/3.jpg') },
  { id: '4', uri: require('../../assets/4.jpg') },
  { id: '5', uri: require('../../assets/5.jpg') },
  { id: '6', uri: require('../../assets/1.jpg') },
  { id: '7', uri: require('../../assets/2.jpg') },
  { id: '8', uri: require('../../assets/3.jpg') },
  { id: '9', uri: require('../../assets/4.jpg') },
  { id: '10', uri: require('../../assets/5.jpg') },
];

let  addProduct = (item) => {
  // firebase.database().ref('/items').push({
  // 	name: item
  // });
  var docDocRef = firebase.firestore().collection("users");
  docDocRef.add({
  name: "Alan",
  images: "https://firebasestorage.googleapis.com/v0/b/tinder-3a7a1.appspot.com/o/asset%2FG1.png?alt=media&token=d1d9bde5-c8e8-4ecb-aff5-cef4e6b32787",
  age: 1912,
  id:item
})
.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});

};
export default class Home extends React.Component {
  constructor() {
    super();

    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0,
      items:[],
    };

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp',
    });

    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate,
        },
        ...this.position.getTranslateTransform(),
      ],
    };

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
    });

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp',
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp',
    });
  }
  
  componentWillMount() {
    var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    alert("connected");
  } else {
    alert("not connected");
  }
});
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
          }).start();
        }
      },
    });

  }
  handleChange = e => {
    this.setState({
      id: e.nativeEvent.id
    });
  };
  handleSwipe = (item) => {
    console.log(item);
    addProduct(item);

  };
  renderUsers = () => {
    return Users.map((item, i) => {
      if (i < this.state.currentIndex) {
        return null;
      } else if (i == this.state.currentIndex) {
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id}
            style={[
              this.rotateAndTranslate,
              {
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position: 'absolute',
              },
            ]}>
            <Animated.View
              style={{
                opacity: this.likeOpacity,
                transform: [{ rotate: '-30deg' }],
                position: 'absolute',
                top: 50,
                left: 40,
                zIndex: 1000,
              }}>
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'green',
                  color: 'green',
                  fontSize: 32,
                  fontWeight: '800',
                  padding: 10,
                }}>
                LIKE
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                opacity: this.dislikeOpacity,
                transform: [{ rotate: '30deg' }],
                position: 'absolute',
                top: 50,
                right: 40,
                zIndex: 1000,
              }}>
                <TouchableOpacity onPress={this.handleSwipe(item.id)}> 
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'red',
                  color: 'red',
                  fontSize: 32,
                  fontWeight: '800',
                  padding: 10,
                }}>
                NOPE
              </Text>
              </TouchableOpacity>
            </Animated.View>

            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: 'cover',
                borderRadius: 20,
              }}
              source={item.uri}
            />
          </Animated.View>
        );
      } else {
        return (
          <Animated.View
            key={item.id}
            style={[
              {
                opacity: this.nextCardOpacity,
                transform: [{ scale: this.nextCardScale }],
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position: 'absolute',
              },
            ]}>
            <Animated.View
              style={{
                opacity: 0,
                transform: [{ rotate: '-30deg' }],
                position: 'absolute',
                top: 50,
                left: 40,
                zIndex: 1000,
              }}>
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'green',
                  color: 'green',
                  fontSize: 32,
                  fontWeight: '800',
                  padding: 10,
                }}>
                LIKE
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                opacity: 0,
                transform: [{ rotate: '30deg' }],
                position: 'absolute',
                top: 50,
                right: 40,
                zIndex: 1000,
              }}>
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'red',
                  color: 'red',
                  fontSize: 32,
                  fontWeight: '800',
                  padding: 10,
                }}>
                NOPE
              </Text>
            </Animated.View>

            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: 'cover',
                borderRadius: 20,
              }}
              source={item.uri}
            />
          </Animated.View>
        );
      }
    }).reverse();
  };
  
  
  render() {
    return (
  
      // <View style={{ flex: 1 }}>
      //   <View style={{ height: 60 }} />
      //   <View style={{ flex: 1 }}>{this.renderUsers()}</View>
      //   <View style={{ height: 60 }} />
            
      // </View>
      <View>
        <Paragraph>Welcome to our applications</Paragraph>
        </View>
    );
  }
}
