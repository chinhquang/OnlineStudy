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
export const LoginStatusContext = React.createContext();

const mainStack = createStackNavigator()
function  MainStack({navigation}) {
  const isSignout  = React.useContext(LoginStatusContext)
  console.log ("mainStack sign out " + isSignout)
  return (
    <mainStack.Navigator>
      {
        isSignout ? (
          <>
          <mainStack.Screen options={{headerShown: false}} name="StartUp" component={StartUpScreen} />
          <mainStack.Screen options={{headerShown: false}} name="MainPublic" component={Main} />
          </>
        ) : (
          <>
          
          <mainStack.Screen options={{headerShown: false}} name="MainPrivate" component={Main} />
          </>
        )
      }
      
    </mainStack.Navigator>
    
  );
  
  
}


//------------------------------------------------------------------------------------------------------------------------------------------------------------
const SignInStack = createStackNavigator()

function SignInStackScreen({navigation}) {
const {colors, setColors} = React.useContext(ColorThemeContext);

return (
    <SignInStack.Navigator 
        screenOptions={{
            headerStyle: {
                backgroundColor: colors.navBackgroundColor,
            },
            headerTintColor: colors.navTint,
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
              color={colors.navTint}
              />
              ),
        }}
         name="SignInScreen"
          component={SignInScreen}  initialParams={{ isPublic : false }}/>          
        {/* <HomeStack.Screen options={{title:"Home"}} name="HomeScreen" component={HomeScreen} />  */}
    </SignInStack.Navigator>
);
}



export const ColorThemeContext = React.createContext();

export function ColorThemeProvider({ children }) {
    const [colors, setColors] = React.useState(mainColors.darkTheme) //setting light theme as default
  const value = React.useMemo(
    () => ({
        colors,
        setColors,
    }),
    [colors, setColors],
  );

  return (
    <ColorThemeContext.Provider value={value}>{children}</ColorThemeContext.Provider>
  );
}

export const mainColors = {
  lightTheme: {
  //light theme colors
  statusBar : "dark-content",
  type : 'light',
  buttonColor: '#FFB74D',
  backgroundColorButton : "#fb8c00",
  navBackgroundColor : 'rgba(248, 248, 248, 0.92)',
  gradientColor :['rgba(224, 224, 224, 0.3)', 'rgba(224, 224, 224, 1)'],
  textPrimary : "#000000",
  navTint : '#000000',
  tabBackgroundColor: 'rgba(248, 248, 248, 0.92)',
  navIconTintColor : "gray",
  smallButtonBackgroundColor : "#9e9e9e",
  cellBackgroundColor : "#e0e0e0",
  subjectBackgroundColor: "#9e9e9e",
  },
  darkTheme: {
  //dark theme colors 
  navBackgroundColor: 'rgba(55, 71, 79, 0.92)',
  statusBar : "light-content",
  type : 'dark',
  buttonColor: '#FFE97D',
  backgroundColorButton : "#FFB74D",
  gradientColor :['rgba(38, 50, 56, 1)', 'rgba(38, 50, 56, 0.7)'],
  textPrimary : "#ffffff",
  navTint : '#ffffff',
  tabBackgroundColor: 'rgba(38, 50, 56, 1)',
  navIconTintColor : "#ffffff",
  smallButtonBackgroundColor : "#4f525c",
  cellBackgroundColor : "rgba(38, 50, 56, 0.7)",
  subjectBackgroundColor: "rgba(38, 50, 56, 0.7)",

  }
  //common colors
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
      
      isSignout: true,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        if (userToken == null){
          dispatch({ type: 'SIGN_OUT' })
        }else {
          dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        }
      } catch (e) {
      }
      
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
        await AsyncStorage.setItem('userToken', 'dummy-auth-token');
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
       
      },
      signOut: async data => {
        await AsyncStorage.removeItem('userToken');
        console.log("//////////// SIGN OUT //////////////////")
        dispatch({ type: 'SIGN_OUT' })
        
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        await AsyncStorage.setItem('userToken', 'dummy-auth-token');
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        
      },
    }),
    []
  );
  
  return (
    <ColorThemeProvider>
      <AuthContext.Provider value={authContext}>
      <LoginStatusContext.Provider value={state.isSignout}>
        <NavigationContainer>
        <mainStack.Navigator mode="modal">
          <mainStack.Screen options={{headerShown: false}} name="MainStack" component={MainStack} />

          <mainStack.Screen options={{headerShown: false}} name="SignInStack" component={SignInStackScreen} />
        </mainStack.Navigator>
        </NavigationContainer>
      </LoginStatusContext.Provider>
      
    </AuthContext.Provider>
    </ColorThemeProvider>
    
    
  );
};


export default App;
