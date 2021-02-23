// import React, { memo } from 'react';
// import { StyleSheet, Text,Image, TouchableOpacity, TouchableHighlight, View,RefreshControl } from 'react-native';
// import { SwipeListView } from 'react-native-swipe-list-view';
// import * as firebase from 'firebase';
// import { AntDesign,MaterialIcons  } from '@expo/vector-icons'; 
// import SwitchSelector from "react-native-switch-selector";
// import { SearchBar } from 'react-native-elements';
// const dbConnection = firebase.firestore().collection("productsTinder");
// export default class AnalyticsSreen extends React.Component {
  
//     render() {
//         const styles = StyleSheet.create({
//           separator: {
//             height: 10,
//           },
//           contentStyle: {
//             paddingHorizontal: 12,
//             paddingTop:'25%',
           
//           },
//         });

       
//         return (

        
//             <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row', width: 'auto', height: 'auto', flex: 1 }}>
         
//           <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', paddingTop: '20%', paddingLeft: '10%' }}>
//             <Text style={{ fontSize: 40, fontWeight: "bold", }}>Analytics Sreen</Text>
//           </View>
           
//               </View>
    
    
//         );
    
    
//       }
//     }

// import React from "react";
// import { Dimensions, Image, StyleSheet, View } from "react-native";
// import { PanGestureHandler, State } from "react-native-gesture-handler";
// import Animated, {
//   add,
//   clockRunning,
//   cond,
//   debug,
//   divide,
//   eq,
//   floor,
//   not,
//   set,
//   useCode,
  
// } from "react-native-reanimated";
// import {
//   snapPoint,
//   timing,
  
//   usePanGestureHandler,
 
// } from "react-native-redash";

// const { width, height } = Dimensions.get("window");

// export const assets = [
//   require("../assets/3.jpg"),
//   require("../assets/2.jpg"),
//   require("../assets/4.jpg"),
//   require("../assets/5.jpg"),
//   require("../assets/1.jpg"),
// ];

// const snapPoints = assets.map((_, i) => i * -width);

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "black",
//   },
//   pictures: {
//     width: width * assets.length,
//     height,
//     flexDirection: "row",
//   },
//   picture: {
//     width,
//     height,
//     overflow: "hidden",
//   },
//   image: {
//     ...StyleSheet.absoluteFillObject,
//     width: undefined,
//     height: undefined,
//   },
// });

// const AnalyticsSreen = () => {
//   const clock = useClock();
//   const index = useValue(0);
//   const offsetX = useValue(0);
//   const translateX = useValue(0);
//   const {
//     gestureHandler,
//     state,
//     velocity,
//     translation,
//   } = usePanGestureHandler();
//   const to = snapPoint(translateX, velocity.x, snapPoints);
//   useCode(
//     () => [
//       cond(eq(state, State.ACTIVE), [
//         set(translateX, add(offsetX, translation.x)),
//       ]),
//       cond(eq(state, State.END), [
//         set(translateX, timing({ clock, from: translateX, to })),
//         set(offsetX, translateX),
//         cond(not(clockRunning(clock)), [
//           set(index, floor(divide(translateX, -width))),
//           debug("index", index),
//         ]),
//       ]),
//     ],
//     []
//   );
//   return (
//     <View style={styles.container}>
//       <PanGestureHandler {...gestureHandler}>
//         <Animated.View style={StyleSheet.absoluteFill}>
//           <Animated.View
//             style={[styles.pictures, { transform: [{ translateX }] }]}
//           >
//             {assets.map((source) => (
//               <View key={source} style={styles.picture}>
//                 <Image style={styles.image} {...{ source }} />
//               </View>
//             ))}
//           </Animated.View>
//         </Animated.View>
//       </PanGestureHandler>
//     </View>
//   );
// };

// export default AnalyticsSreen;

import React from "react";
import { StyleSheet, View, Dimensions, Text, SafeAreaView } from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
const { width } = Dimensions.get("window");

const { cond, eq, add, call, set, Value, event, or, sub, lessThan, greaterThan } = Animated;

export default class AnalyticsSreen extends React.Component {
  constructor(props) {
    super(props);
    this.absoluteY = new Value(100);
    this.absoluteX = new Value(50);
    this.gestureState = new Value(-1);
    this.onGestureEvent = event([
      {
        nativeEvent: {
          state: this.gestureState,
          absoluteX: this.absoluteX
        }
      }
    ]);

    this.absoluteY2 = new Value(100);
    this.absoluteX2 = new Value(300);
    this.gestureState2 = new Value(-1);
    this.onGestureEvent2 = event([
      {
        nativeEvent: {
          state: this.gestureState2,
          absoluteX: this.absoluteX2
          
        }
      }
    ]);

    this.circleY = sub(this.absoluteY, new Value(CIRCLE_SIZE/2));
    this.circleX = cond(
        greaterThan(this.absoluteX, this.absoluteX2),
        this.absoluteX2,
        this.absoluteX
    )

    this.circleY2 = sub(this.absoluteY2, new Value(CIRCLE_SIZE/2));
    this.circleX2 = cond(
        lessThan(this.absoluteX2, this.absoluteX),
        this.absoluteX,
        this.absoluteX2
        )
    this.state = { dragging2: false, y2: 0 };
  }

  start = ([]) => {
    this.setState({ dragging: true });
  };

  moving = ([y, circleY]) => {
    this.setState({ y });
  };

  done = ([]) => {
    this.setState({ dragging: false });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>y: {this.state.y}</Text>
        <Animated.Code>
          {() => cond(eq(this.gestureState, State.BEGAN), call([], this.start))}
        </Animated.Code>
        <Animated.Code>
          {() =>
            cond(
              eq(this.gestureState, State.ACTIVE),
              call([this.absoluteY, this.circleY], this.moving)
            )
          }
        </Animated.Code>
        <Animated.Code>
          {() =>
            cond(
              or(
                eq(this.gestureState, State.END),
                eq(this.gestureState, State.FAILED),
                eq(this.gestureState, State.CANCELLED)
              ),
              call([], this.done)
            )
          }
        </Animated.Code>
        {/* {this.state.dragging && (
            )} */}
            <Animated.View style={[styles.box, { top: this.circleY , left:this.circleX}]} />
        <PanGestureHandler
          maxPointers={1}
          onGestureEvent={this.onGestureEvent}
          onHandlerStateChange={this.onGestureEvent}
        >
            <Animated.View style={[styles.box, { top: this.circleY , left:this.circleX}]} />
        </PanGestureHandler>

        <PanGestureHandler
          maxPointers={1}
          onGestureEvent={this.onGestureEvent2}
          onHandlerStateChange={this.onGestureEvent2}
        >
            <Animated.View style={[styles.box, {backgroundColor: "magenta",}, { top: this.circleY2 , left:this.circleX2}]} />
        </PanGestureHandler>
      </SafeAreaView>
    );
  }
}

const CIRCLE_SIZE = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box: {
    backgroundColor: "tomato",
    position: "absolute",
    marginLeft: -(CIRCLE_SIZE / 2),
    marginTop: -(CIRCLE_SIZE / 2),
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderColor: "#000"
  }
});