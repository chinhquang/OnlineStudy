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
  Button
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
import SignInScreen from './screens/SignInScreen'
import Main from './screens/Main'

const mainStack = createStackNavigator()
function  MainStack() {
  return (
    <mainStack.Navigator 
      // screenOptions={{
      //   headerShown: false
      // }}
      >
        <mainStack.Screen options={{headerShown: false}} name="StartUp" component={StartUpScreen} />
        <mainStack.Screen options={{ headerShown: false}} name="Main" component={Main} />
      </mainStack.Navigator>
  );
}
const SignInStack = createStackNavigator()
function SignInStackScreen({navigation}) {

return (
    <SignInStack.Navigator 
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
        <SignInStack.Screen options={{
            title:"Sign In",
            headerLeft: () => (
              <Button
              onPress={() => navigation.goBack()}
              title="Cancel"
              color="#fff"
            
              />
              ),
        }}
         name="SignInScreen"
          component={SignInScreen} />          
        {/* <HomeStack.Screen options={{title:"Home"}} name="HomeScreen" component={HomeScreen} />  */}
    </SignInStack.Navigator>
);
}
const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <mainStack.Navigator mode="modal">
        <mainStack.Screen options={{headerShown: false}} name="MainStack" component={MainStack} />

        <mainStack.Screen options={{headerShown: false}} name="SignInStack" component={SignInStackScreen} />
      </mainStack.Navigator>
    </NavigationContainer>
    
  );
};


export default App;
