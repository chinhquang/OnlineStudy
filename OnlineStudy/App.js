/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const Stack = createStackNavigator();
import StartUpScreen from './screens/StartUpScreen'
import Main from './screens/Main'
const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      // screenOptions={{
      //   headerShown: false
      // }}
      >
        <Stack.Screen options={{headerShown: false}} name="StartUp" component={StartUpScreen} />
        <Stack.Screen options={{ headerShown: false}} name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};


export default App;
