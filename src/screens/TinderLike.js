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
import { View, Text } from 'react-native'
import Swiper from 'react-native-deck-swiper'

import  {photoCards}  from '../constants'
import Card  from '../components/Card/Card'
import IconButton  from '../components/IconButton/IconButton'
import OverlayLabel from '../components/OverlayLabel/OverlayLabel'
import styles from './App.styles'

const TinderLike = () => {
  const useSwiper = useRef(null).current

  const handleOnSwipedLeft = () => useSwiper.swipeLeft()
  const handleOnSwipedTop = () => useSwiper.swipeTop()
  const handleOnSwipedRight = () => useSwiper.swipeRight()

  return (
    <View
      style={styles.container}
    >
      <View style={styles.swiperContainer}>
        <Swiper
          ref={useSwiper}
          animateCardOpacity
          containerStyle={styles.container}
          cards={photoCards}
          renderCard={card => <Card card={card} />}
          cardIndex={0}
          backgroundColor="white"
          stackSize={2}
          infinite
          showSecondCard
          animateOverlayLabelsOpacity
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
                wrapper: {
                  ...styles.overlayWrapper,
                  alignItems: 'flex-start',
                  marginLeft: 30,
                },
              },
            },
          }}
        />
      </View>
      {/* <View style={styles.buttonsContainer}>
        <IconButton
          name="close"
          onPress={handleOnSwipedLeft}
          color="white"
          backgroundColor="#E5566D"
        />
        <IconButton
          name="star"
          onPress={handleOnSwipedTop}
          color="white"
          backgroundColor="#3CA3FF"
        />
        <IconButton
          name="heart"
          onPress={handleOnSwipedRight}
          color="white"
          backgroundColor="#4CCC93"
        />
      </View> 
      <View style={styles.swipeTextContainer}>
        <Text
          style={styles.copyright}
        >
           
        </Text>
      </View>
      */}
    </View>
  )
}

export default TinderLike