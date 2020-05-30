/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {

  Button,
  AsyncStorage
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StartUpScreen from './screens/StartUpScreen'
import SignInScreen from './screens/SignInScreen'
import Main from './screens/Main'

//------------------------------------------------------------------------------------------------------------------------------------------------------------
export const AuthContext = React.createContext();

const mainStack = createStackNavigator()
function  MainStack() {
  const {userToken, setToken }=React
  
  
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const getUserToken = async () => {
      
      let userToken 
      try {
        userToken = await AsyncStorage.getItem('userToken');
        setToken(userToken)
      } catch (e) {

      }
     
    };

    getUserToken();
  }, []);
  

  if (userToken === null){
    return (
    
      <mainStack.Navigator>
        
        <mainStack.Screen options={{headerShown: false}} name="StartUp" component={StartUpScreen} />
        <mainStack.Screen options={{ headerShown: false}} name="Main" component={Main} />
    
      </mainStack.Navigator>
      
      
    );
  }else {
    return (
    
      <mainStack.Navigator>
        
        {/* <mainStack.Screen options={{headerShown: false}} name="StartUp" component={StartUpScreen} /> */}
        <mainStack.Screen options={{ headerShown: false}} name="Main" component={Main} />
    
      </mainStack.Navigator>
      
      
    );
  }
  
  
}


//------------------------------------------------------------------------------------------------------------------------------------------------------------
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
const App = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);
  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        console.log('SIGN_IN')
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );
  return (
    <AuthContext.Provider value={authContext}>

        <NavigationContainer>
        <mainStack.Navigator mode="modal">
          <mainStack.Screen options={{headerShown: false}} name="MainStack" component={MainStack} />

          <mainStack.Screen options={{headerShown: false}} name="SignInStack" component={SignInStackScreen} />
        </mainStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
    
    
  );
};


export default App;
