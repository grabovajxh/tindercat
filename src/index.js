
import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabIcon from './components/TabIcon';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Home from './screens/Home';
import TinderLike from  './screens/TinderLike';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import AnalyticsScreen  from './screens/AnalyticsSreen';
import SettingsScreen from './screens/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons , FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import Favorite from './screens/Favorite';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import { DrawerContent } from './screens/Drawer';
const {Navigator, Screen} = createStackNavigator();
const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="LoginScreen" component={LoginScreen}/>
        <RootStack.Screen name="RegisterScreen" component={RegisterScreen}/>
        <RootStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}/>
    </RootStack.Navigator>)
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

const HomeRoute = createSwitchNavigator(
  {
    Home,
   
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      tabBarOnPress: ({ navigation }) => {
        navigation.navigate('Home');
      },
     
      tabBarLabel: <Text >Home</Text>,
      tabBarIcon: props => <FontAwesome name="home" size={24} color="#64ECC7" />,
    },
  }
);
const analyticsRoute = createSwitchNavigator(
  {
    AnalyticsScreen,
    
  },
  {
    initialRouteName: 'AnalyticsScreen',
    navigationOptions: {
      tabBarOnPress: ({ navigation }) => {
        navigation.navigate('AnalyticsScreen');
      },
     
      tabBarLabel: <Text >Analytics</Text>,
      tabBarIcon: props => <MaterialCommunityIcons name="google-analytics" size={24} color="#64ECC7" />,
    },
  }
);

const profileRoute = createSwitchNavigator(
  {
   SettingsScreen,
    
  },
  {
    initialRouteName: 'SettingsScreen',
    navigationOptions: {
      tabBarOnPress: ({ navigation }) => {
        navigation.navigate('SettingsScreen');
      },
     
      tabBarLabel: <Text >Profile</Text>,
      tabBarIcon: props => <FontAwesome name="user" size={24} color="#64ECC7" />,
    },
  }
);

const tinderRoute = createSwitchNavigator(
  {
    TinderLike,
    
  },
  {
    initialRouteName: 'TinderLike',
    navigationOptions: {
      tabBarOnPress: ({ navigation }) => {
        navigation.navigate('TinderLike');
      },
    
      tabBarLabel: <Text >Swipe</Text>,
      tabBarIcon: props => <MaterialCommunityIcons name="gesture-swipe" size={24} color="#64ECC7" />,
    },
  }
);

const FavoriteRoute = createSwitchNavigator(
  {
    Favorite,
  },
  {
    initialRouteName: 'Favorite',
    navigationOptions: {
     
      tabBarLabel: <Text >Favorite</Text>,
      tabBarIcon: props => <FontAwesome name="heart" size={24} color="#64ECC7" />,
      
    },
  }
);

const BottomRoutes = createMaterialBottomTabNavigator(
  {
    HomeRoute,
   tinderRoute,
    FavoriteRoute,
    analyticsRoute,
    profileRoute,
  },
  {
    initialRouteName: 'HomeRoute',
    activeColor: '#000',
    inactiveColor: 'rgba(255,255,255,0.5)',
    labeled: true,
   backgroundColor:'#000', 
   borderRadius:100

  }
);
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
const EntryPoint = createSwitchNavigator(
  {
    LoginScreen,
    BottomRoutes,
  },
  {
    initialRouteName: 'LoginScreen',
  }
);

const Routes = createAppContainer(EntryPoint);

function Router() {
  return (
    <NavigationContainer>
     
      <Stack.Navigator
       //  initialRouteName='Home'
        >
      
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
       children={MainTabNavigator}
         
        />
       <Stack.Screen
          name='ForgotPasswordScreen'
          component={ForgotPasswordScreen}
         
        />
      </Stack.Navigator> 
    </NavigationContainer>

  )
}

export default Routes;