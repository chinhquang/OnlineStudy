import * as React from 'react';
import { Text, View,Button, TouchableOpacity, Dimensions, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import SignInScreen from './SignInScreen';
import BrowseScreen from './BrowseScreen'
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
{/* <TouchableOpacity onPress={() => {}} style={{left: Dimensions.get("window").height < 667 ? '8%' : '3%', backgroundColor: 'red', width: '100%'}}>
                    <Ionicons name="ios-settings" size={30} color={'white'}/>
                </TouchableOpacity> */}
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator()
function HomeStackScreen() {

return (
    <HomeStack.Navigator 
        screenOptions={{
            headerStyle: {
                backgroundColor: 'rgba(55, 71, 79, 0.92)',
            },
            headerTintColor: '#ffff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            

        }}
    > 
        <HomeStack.Screen options={{
            title:"Sign In",
            headerLeft: () => (
                <TouchableOpacity onPress={settingClick} style={{left: 10}}>
                    <Ionicons style={alignSelf='center'} name="ios-settings" size={30} color={'white'}/>
                </TouchableOpacity>
              ),
        }}
         name="SignInScreen"
          component={SignInScreen} />          
        {/* <HomeStack.Screen options={{title:"Home"}} name="HomeScreen" component={HomeScreen} />  */}
    </HomeStack.Navigator>
);
}
const BrowseStack = createStackNavigator();
function BrowseStackScreen() {
return (
    <BrowseStack.Navigator
        screenOptions={{
        headerStyle: {
          backgroundColor: 'rgba(55, 71, 79, 0.92)',
        },
        headerTintColor: '#ffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },}}
    >

        <BrowseStack.Screen options={{title:"Browse"}} name="BrowseScreen" component={BrowseScreen} />
    
    </BrowseStack.Navigator>
);
}

const DownloadStack = createStackNavigator();
function DownloadStackScreen() {
return (
    <DownloadStack.Navigator
        screenOptions={{
        headerStyle: {
          backgroundColor: 'rgba(55, 71, 79, 0.92)',
        },
        headerTintColor: '#ffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },}}
    >
        <DownloadStack.Screen options={{title:"Download"}} name="DownloadScreen" component={HomeScreen} />          
    
    </DownloadStack.Navigator>
);
}

const SearchStack = createStackNavigator();
function SearchStackScreen() {
return (
    <SearchStack.Navigator
        screenOptions={{
        headerStyle: {
          backgroundColor: 'rgba(55, 71, 79, 0.92)',
        },
        headerTintColor: '#ffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },}}
    >
        <SearchStack.Screen options={{title:"Search"}} name="SearchScreen" component={HomeScreen} />
    
    </SearchStack.Navigator>
);
}

export default function Main() {
  return (

    <Tab.Navigator tabBarOptions={{
        activeTintColor: '#FFB74D',
        inactiveTintColor: 'gray',
        
        style: {
            backgroundColor: 'rgba(38, 50, 56, 1)',//color you want to change
          },
        }}
        
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
  
                if (route.name === 'Home') {
                    // iconName = focused ? "ios-home" : "ios-home-outline";
                    iconName = "ios-home";
                }
                if (route.name === 'Download') {
                    // iconName = focused ? "ios-home" : "ios-home-outline";
                    iconName = "ios-download";
                }
                if (route.name === 'Browse') {
                    // iconName = focused ? "ios-home" : "ios-home-outline";
                    iconName = "ios-desktop";
                }
                if (route.name === 'Search') {
                    // iconName = focused ? "ios-home" : "ios-home-outline";
                    iconName = "ios-search";
                }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          initialRouteName={"Browse"}
        >

        <Tab.Screen name="Home" component={HomeStackScreen}/>
        <Tab.Screen name="Download" component={DownloadStackScreen} />
        <Tab.Screen name="Browse" component={BrowseStackScreen} />
        <Tab.Screen name="Search" component={SearchStackScreen} />
        
    </Tab.Navigator>
    
  );
};