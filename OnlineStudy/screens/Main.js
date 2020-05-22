import * as React from 'react';
import { Text, View,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen'
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
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
        },}}>

        <HomeStack.Screen options={{title:"Home"}} name="HomeScreen" component={HomeScreen} />          
    
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

        <BrowseStack.Screen options={{title:"Browse"}} name="BrowseScreen" component={HomeScreen} />
    
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
          }
        }}>

        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Download" component={DownloadStackScreen} />
        <Tab.Screen name="Browse" component={BrowseStackScreen} />
        <Tab.Screen name="Search" component={SearchStackScreen} />
        
    </Tab.Navigator>
    
  );
};