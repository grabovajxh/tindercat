
import React from 'react';
import { View, ScrollView, Text, Image, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { Avatar, Button, Card, Title } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as firebase from 'firebase';
import Preview from '../components/FlatSlider/Preview';


import FlatListSlider from '../components/FlatSlider/FlatListSlider';
import SwitchSelector from "react-native-switch-selector";
import { Ionicons , AntDesign} from '@expo/vector-icons';
import Modal from "react-native-modal";
import BackButton from '../components/BackButton';
import { Rating } from 'react-native-ratings';

import 'firebase/firestore';

// const SCREEN_HEIGHT = Dimensions.get('window').height;
// const SCREEN_WIDTH = Dimensions.get('window').width;
// import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FirstPage from './LoginScreen';
import SecondPage from './RegisterScreen';
import { Alert } from 'react-native';

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
      isOpen: false,

      collectionTinder: [],
      modalVisible: false,
      data: [

        { key:1,
          image:
            'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2299060/2018/7/30/7584b116-2a2c-4fb1-881c-af58cc484b181532944603854-Tokyo-Talkies-Women-Black-Printed-Maxi-Dress-4791532944603727-1.jpg',
          desc:
            'Dress',
        },
        {
          key:2,
          image:
            'https://cdn-images.farfetch-contents.com/14/55/48/85/14554885_22201159_600.jpg',
          desc:
            'Coat',
        },
        {
          key:3,
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhIhtVrVvqVCtqVsvZSHJCaD_1wZHSMUayGw&usqp=CAU',
          desc:
            'Jeans',
        },
        { key:4,
          image:
            'https://media.missguided.com/i/missguided/Y9206187_01',
          desc:
            'Hoodies',
        },
        {
          key:5,
          image:
            'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2299060/2018/7/30/7584b116-2a2c-4fb1-881c-af58cc484b181532944603854-Tokyo-Talkies-Women-Black-Printed-Maxi-Dress-4791532944603727-1.jpg',
          desc:
            'Dress',
        },
        {key:6,
          image:
            'https://cdn-images.farfetch-contents.com/14/55/48/85/14554885_22201159_600.jpg',
          desc:
            'Coat',
        },
        {key:7,
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhIhtVrVvqVCtqVsvZSHJCaD_1wZHSMUayGw&usqp=CAU',
          desc:
            'Jeans',
        },
        {key:8,
          image:
            'https://media.missguided.com/i/missguided/Y9206187_01',
          desc:
            'Hoodies',
        }

      ],
      // url:""
    };
  }
  details = () => {
    this.setState({ isOpen: !this.state.isOpen })

  }
  // componentDidMount() {

  //   var name = "";
  //   firebase.auth().onAuthStateChanged((user) => {
  //     console.log(user.email);
  //     name = user.email.substr(0, user.email.indexOf('@'));
  //     this.setState({ users: name });


  //   });
  // }

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
        key: "Lorem Sit1",
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
              key={this.state.data.key}
                data={this.state.data}
                width={80}
                loop={true}
                component={<Preview />}
                onPress={item => alert(JSON.stringify(item))}
                indicatorActiveWidth={7}
                autoscroll={true}
                indicatorActiveColor='#DA8730'
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


        <View style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', width: '70%', marginTop: '5%' }}>
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
              { label: "WOMEN", value: "f" }, //images.feminino = require('./path_to/assets/img/feminino.png')
              { label: "MEN", value: "m" } //images.masculino = require('./path_to/assets/img/masculino.png')
            ]}
          />
        </View>

        <ScrollView
        bounces={true}
        bouncesZoom={true}
        maximumZoomScale={2.0}
        minimumZoomScale={0.5}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        
      </ScrollView>
        <View style={{

          flex: 1

        }}>

          <View style={{

            position: 'absolute',
            paddingTop: '5%',
            paddingLeft: '2%',
            paddingRight: 0,
            paddingBottom: 0

          }}>
            <ScrollView horizontal={true}>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{ flexDirection: 'column', paddingRight: '3%' }}>
                  <Image
                    source={require('../assets/SHOE2.png')} style={{
                      height: 150,
                      width: 150,
                      borderRadius: 1,
                      paddingRight: '5%'
                    }}
                  />
                  <View style={{

                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                    <Ionicons name="ios-add-circle" size={24} color="#DA8730" onPress={this.details} />
                  </View>
                  <View stuyle={{ flex: 1 }}>
                    <Text>54£</Text>
                    <Text>Shoes 1 </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'column', paddingRight: '3%' }}>
                  <Image
                    source={require('../assets/SHOE2.png')} style={{
                      height: 150,
                      width: 150,
                      borderRadius: 1
                    }}
                  />
                  <View style={{

                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                    <Ionicons name="ios-add-circle" size={24} color="#DA8730" onPress={this.details} />
                  </View>
                  <Text>54£</Text>
                  <Text>Shoes bla bla </Text>
                </View><View style={{ flexDirection: 'column', paddingRight: '3%' }}>
                  <Image
                    source={require('../assets/SHOE2.png')} style={{
                      height: 150,
                      width: 150,
                      borderRadius: 1,
                      paddingLeft: '20%'
                    }}
                  />
                  <View style={{

                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                    <Ionicons name="ios-add-circle" size={24} color="#DA8730" onPress={this.details} />
                  </View>
                  <Text>54£</Text>
                  <Text>Shoes bla bla </Text>
                </View><View style={{ flexDirection: 'column', paddingRight: '3%' }}>
                  <Image
                    source={require('../assets/SHOE2.png')} style={{
                      height: 150,
                      width: 150,
                      borderRadius: 1
                    }}
                  />
                  <View style={{

                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                    <Ionicons name="ios-add-circle" size={24} color="#DA8730" onPress={this.details} />
                  </View>
                  <Text>54£</Text>
                  <Text>Shoes bla bla </Text>
                </View><View style={{ flexDirection: 'column', paddingRight: '3%' }}>
                  <Image
                    source={require('../assets/SHOE2.png')} style={{
                      height: 150,
                      width: 150,
                      borderRadius: 1
                    }}
                  />
                  <View style={{

                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                    <Ionicons name="ios-add-circle" size={24} color="#DA8730" onPress={this.details} />
                  </View>
                  <Text>54£</Text>
                  <Text>Shoes bla bla </Text>
                </View>
                <View style={{ flexDirection: 'column', paddingRight: '3%' }}>
                  <Image
                    source={require('../assets/SHOE2.png')} style={{
                      height: 150,
                      width: 150,
                      borderRadius: 1
                    }}
                  />
                  <View style={{

                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                    <Ionicons name="ios-add-circle" size={24} color="#DA8730" onPress={this.details} />
                  </View>
                  <Text>59£</Text>
                  <Text>Shoes bla x </Text>
                </View>
                <View style={{ flexDirection: 'column', paddingRight: '3%' }}>
                  <Image
                    source={require('../assets/SHOE2.png')} style={{
                      height: 150,
                      width: 150,
                      borderRadius: 1
                    }}
                  />
                  <View style={{

                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                    <Ionicons name="ios-add-circle" size={24} color="#DA8730" onPress={this.details} />
                  </View>
                  <Text>59£</Text>
                  <Text>Shoes bla bla </Text>
                </View>
                <View style={{ flexDirection: 'column', paddingRight: '3%' }}>
                  <Image
                    source={require('../assets/SHOE2.png')} style={{
                      height: 150,
                      width: 150,
                      borderRadius: 1
                    }}
                  />
                  <View style={{

                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                    <Ionicons name="ios-add-circle" size={24} color="#DA8730" onPress={this.details} />
                  </View>
                  <Text>59£</Text>
                  <Text>Shoes bla bla </Text>
                </View>
                <View style={{ flexDirection: 'column', paddingRight: '3%' }}>
                  <Image
                    source={require('../assets/SHOE2.png')} style={{
                      height: 150,
                      width: 150,
                      borderRadius: 1
                    }}
                  />
                  <View style={{

                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                    <Ionicons name="ios-add-circle" size={24} color="#DA8730" onPress={this.details} />
                  </View>
                  <Text>59£</Text>
                  <Text>Shoes bla bla </Text>
                </View>
              </View>

            </ScrollView>
          </View>

        </View>

        <Modal
          animationIn='slideInUp'
          hasBackdrop={true}
          backdropColor='#fff'
          animationOut='swing'
          backdropOpacity={1}
          isVisible={this.state.isOpen}
        >
       
          <View style={{}}>
            <Image
              source={require('../assets/SHOE2.png')} style={{
                height: '50%',
                width: '100%',
                borderRadius: 1,
                marginBottom: '5%'
              }}
            />
            <View style={{ flexDirection: 'row', }}>
              <Text style={{ alignSelf: 'flex-start', flex: 1, fontSize: 22, }}>REEBOOK RED RUN </Text>
              <Text style={{ alignSelf: 'flex-end', fontSize: 22, color: 'red',marginRight:'5%' }}> 75 £</Text>
            </View>
            <Rating
              type='custom'
              ratingCount={5}
              imageSize={20}
              ratingColor='#DA8730'
              onFinishRating={this.ratingCompleted}
              style={{alignSelf:'flex-start'}}
            />
            <View style={{flex:1,marginTop:'5%'}}>
              <Text >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
        </Text>
            </View>
            <TouchableOpacity
              style={{ alignSelf: 'center', marginBottom: 10, }}
              onPress={this.details}>
              <AntDesign name="closecircle" size={34} color="#ff0000" onPress={this.details} />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>





    );


  }

}
