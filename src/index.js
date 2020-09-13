
import React from 'react';
import { createAppContainer,NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Home from './screens/Home';
import TinderLike from  './screens/TinderLike';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SettingsScreen from './screens/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Favorite from './screens/Favorite';

const {Navigator, Screen} = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()
// {
  
//   HomeScreen,
//   LoginScreen,
//   RegisterScreen,
//   ForgotPasswordScreen,
//   Dashboard,
//   MenuNavigationScreen,

// },
// {
//   initialRouteName: 'HomeScreen',
//   headerMode: 'none',
// }
// );
// function Navigators()
// {
//   return(
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )

// };
// const Routes = () => (
//   <Navigator>

    
//     <Screen name="Home" component={HomeScreen} />
//     <Screen name="Login" component={LoginScreen} />
//   </Navigator>
// );
// export default function Router() {
//   return (
//     <NavigationContainer>
      
//       <Routes/>
//     </NavigationContainer>
//   );
// };

//export default createAppContainer(Router);
function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#101010',
        style: {
          backgroundColor: '#8FD2FF'
        }
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName
          if (route.name == 'Home') {
            iconName = 'ios-home'
          } else if (route.name == 'Settings') {
            iconName = 'ios-settings'
          }
          else if (route.name == 'Tinder Cat') {
            iconName = 'ios-heart'
          }
          else if (route.name == 'Favorite') {
            iconName = 'ios-heart'
          }
          return <Ionicons name={iconName} color={color} size={size} />
        }
      })}>
     
     
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Tinder Cat' component={TinderLike} />
      <Tab.Screen name='Favorite' component={Favorite} />
      <Tab.Screen name='Settings' component={SettingsScreen} />
    
    
    </Tab.Navigator>
  )
}
function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='LoginScreen'
        >
        <Stack.Screen
          name='HomeScreen'
          component={HomeScreen}
         
        />
        <Stack.Screen
          name='LoginScreen'
          component={LoginScreen}
          
        />
        <Stack.Screen
          name='RegisterScreen'
          component={RegisterScreen}
          options={{ title: 'RegisterScreen' }}
        />
        <Stack.Screen
          name='Home'
       component={MainTabNavigator}
         
        />
       <Stack.Screen
          name='ForgotPasswordScreen'
          component={ForgotPasswordScreen}
         
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router;