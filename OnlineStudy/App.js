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
import SignUpScreen from './screens/SignUpScreen'
import CourseDetail  from './screens/CourseDetail'
import VideoFullScreen  from './screens/CourseDetail'
import Main from './screens/Main'
import SupportScreen from './screens/SupportScreen'
import ForgotPassScreen from "./screens/ForgotPassScreen"
import {LanguageThemeProvider, LanguageContext} from "./LanguageContext"
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { DrawerLayoutAndroidBase } from 'react-native';
//------------------------------------------------------------------------------------------------------------------------------------------------------------
export const AuthContext = React.createContext();
export const LoginStatusContext = React.createContext();
export const UserInfoContext = React.createContext();
export const UserTokenContext = React.createContext();
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
const {lang, setLang} = React.useContext(LanguageContext);

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
            title: lang.signIn,
            headerLeft: () => (
              <Button
              onPress={() => navigation.goBack()}
              title={lang.cancel}
              color={colors.navTint}
              />
              ),
        }}
         name="SignInScreen"
          component={SignInScreen}  initialParams={{ isPublic : false }}/>  

        <SignInStack.Screen options={{
            title:"",
            
        }}
         name="SupportScreen"
         
          component={SupportScreen}  />    

        <SignInStack.Screen options={{
            title: lang.forgetPassword,
            
        }}
         name="ForgotPassScreen"
         
          component={ForgotPassScreen}  />    
        {/* <HomeStack.Screen options={{title:"Home"}} name="HomeScreen" component={HomeScreen} />  */}
    </SignInStack.Navigator>
);
}

const SignUpStack = createStackNavigator()

function SignUpStackScreen({navigation}) {
const {colors, setColors} = React.useContext(ColorThemeContext);
const {lang, setLang} = React.useContext(LanguageContext);

return (
    <SignUpStack.Navigator 
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
            title:lang.signUp,
            headerLeft: () => (
              <Button
              onPress={() => navigation.goBack()}
              title={lang.cancel}
              color={colors.navTint}
              />
              ),
        }}
         name="SignUpScreen"
          component={SignUpScreen}  initialParams={{ isPublic : false }}/>          
        {/* <HomeStack.Screen options={{title:"Home"}} name="HomeScreen" component={HomeScreen} />  */}
    </SignUpStack.Navigator>
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
  toolBackgroundColor: 'rgba(248, 248, 248, 1)',
  navIconTintColor : "gray",
  smallButtonBackgroundColor : "#9e9e9e",
  cellBackgroundColor : "#e0e0e0",
  subjectBackgroundColor: "#9e9e9e",
  emptyCellBackgroundColor : "white",
  },
  darkTheme: {
  //dark theme colors 
  navBackgroundColor: 'rgba(55, 71, 79, 0.92)',
  statusBar : "light-content",
  type : 'dark',
  buttonColor: '#FFE97D',
  backgroundColorButton : "#FFB74D",
  toolBackgroundColor: 'rgba(38, 50, 56, 1)',

  gradientColor :['rgba(38, 50, 56, 1)', 'rgba(38, 50, 56, 0.7)'],
  textPrimary : "#ffffff",
  navTint : '#ffffff',
  tabBackgroundColor: 'rgba(38, 50, 56, 1)',
  navIconTintColor : "#ffffff",
  smallButtonBackgroundColor : "#4f525c",
  cellBackgroundColor : "rgba(38, 50, 56, 0.7)",
  subjectBackgroundColor: "rgba(38, 50, 56, 0.7)",
  emptyCellBackgroundColor : "rgba(38, 50, 56, 0.7)",
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
            userInfo : action.userInfo,
            
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userInfo : action.userInfo,
            
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userInfo : null,
            
          };
        case 'UPDATE_INFO':
          return {
            ...prevState,
            
            
            userInfo : action.userInfo,
            
          };

      }
    },
    {
      userInfo : null,
      isSignout: true,
      userToken: null,
    }
  );
  updateUserInfo = (val) => {
    dispatch({ type: 'UPDATE_INFO', userInfo : val});
  }
  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        let response = await doSignIn(data)
        
        if (response.statusCode == 200) {
          console.log('SIGN_IN')
          let responseJson = response.responseJson
          console.log(responseJson.token)
          
          let userInfo = responseJson.userInfo
          dispatch({ type: 'SIGN_IN', token: responseJson.token, userInfo : userInfo});
        }
        
        return response.statusCode
        
      },
      signInGoogle: async data => {
        let response = await doGoogleSignIn()
        if (response.statusCode == 200) {
          console.log('SIGN_IN')
          let responseJson = response.responseJson
          console.log(responseJson.token)
          
          let userInfo = responseJson.userInfo
          dispatch({ type: 'SIGN_IN', token: responseJson.token, userInfo : userInfo});
        }
        
        return response.statusCode
        
      },
      signOut: async data => {
        await AsyncStorage.removeItem('userToken');
        console.log("//////////// SIGN OUT //////////////////")
        dispatch({ type: 'SIGN_OUT' })
        
      },
      signUp: async data => {
        
        let statusCode = await doSignUp(data)
        console.log("Doing sign up")
        console.log (statusCode)
        return statusCode
        
      },
    }),
    []
  );
  signInWithGoogle = async(data) => {
    try {
      console.log(data.user.email)
      console.log(data.user.id)
      let response  = await fetch('https://api.itedu.me/user/login-google-mobile', {
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user :{
            email: data.user.email,
            id : data.user.id
          } 
        })
      })
      let responseJson = await response.json()
      let statusCode = await response.status;
      
      return {responseJson : responseJson, statusCode : statusCode};
    } catch (e) {
        
    }
}
  doGoogleSignIn = async () => {
    
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
      let signInResponse = await signInWithGoogle(userInfo)
      console.log('-----Concoo---------', signInResponse)
      return signInResponse
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  React.useEffect(() => {
    GoogleSignin.configure({
      iosClientId: '24937570262-3ltsdve7qs7omttdjg4sis9mbn640imi.apps.googleusercontent.com'
    });
  })
  async function doSignUp(data) {
    console.log("Data" + data.name)
    try {
      let response  = await fetch('https://api.itedu.me/user/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone : data.phone,
          password : data.password
        })
      })
      let responseJson = await response.json();
      let statusCode = await response.status;
      
      console.log()
      return statusCode;
    }catch(error) {
      console.error(error); 
    }
    
  }
  async function doSignIn(data) {
    console.log("Data " + data.email)
    console.log("Data " + data.password)
    try {
      let response  = await fetch('https://api.itedu.me/user/login', {
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
          email: data.email,
          password : data.password
        })
      })
      let responseJson = await response.json()
      let statusCode = await response.status;
      
      return {responseJson : responseJson, statusCode : statusCode};
    }catch(error) {
      console.error(error); 
    }
    
  }
  async function doGetUserInfo(userToken) {
    try {
      let response  = await fetch('https://api.itedu.me/user/me', {
        method: 'GET',
        headers: {
          'Authorization' : 'Bearer ' + userToken,
          'Content-Type': 'application/json',
        },
      })
      let responseJson = await response.json()
      let statusCode = await response.status;
      
      return responseJson;
    }catch(error) {
      console.error(error); 
    }
    
  }
  return (
    <LanguageThemeProvider>
    <ColorThemeProvider>
      <AuthContext.Provider value={authContext}>
      <LoginStatusContext.Provider value={state.isSignout}>
      <UserInfoContext.Provider value={{userInfo : state.userInfo, updateUserInfo : updateUserInfo}}>
      <UserTokenContext.Provider value={state.userToken}>
        <NavigationContainer>
          <mainStack.Navigator mode="modal">
            <mainStack.Screen options={{headerShown: false}} name="MainStack" component={MainStack} />
            <mainStack.Screen options={{headerShown: false}} name="SignUpStack" component={SignUpStackScreen} />

            <mainStack.Screen options={{headerShown: false}} name="SignInStack" component={SignInStackScreen} />
            <mainStack.Screen options={{headerShown: false}} name="CourseDetail" component={CourseDetail} />
            <mainStack.Screen options={{headerShown: false}} name="VideoFullScreen" component={VideoFullScreen} />

                      
          </mainStack.Navigator>
        </NavigationContainer>
      </UserTokenContext.Provider>
        
      </UserInfoContext.Provider>
        
      </LoginStatusContext.Provider>
      
    </AuthContext.Provider>
    </ColorThemeProvider>
    </LanguageThemeProvider>
    
  );
};


export default App;
