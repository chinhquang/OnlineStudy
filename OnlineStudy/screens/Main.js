import * as React from 'react';
import { Text, View,Button, TouchableOpacity, Dimensions, Alert,AsyncStorage, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen'
import SettingScreen from './SettingScreen'
import SupportScreen from './SupportScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import SignInScreen from './SignInScreen';
import BrowseScreen from './BrowseScreen'
import SearchScreen from './SearchScreen'
import DownloadScreen from './DownloadScreen'
import ThemeSetting from './ThemeSetting'
import SignUpScreen from './SignUpScreen'
import ForgotPassScreen from './ForgotPassScreen'
import UserInfoScreen from "./UserInfoScreen"
import LangSetting from './LangSetting'
import FullCourseScreen from './FullCourseScreen'
import UpdateProfileScreen from "./UpdateProfileScreen"
import {LoginStatusContext, ColorThemeContext,UserInfoContext} from '../App.js'
import {LanguageContext} from "../LanguageContext.js"

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
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375

function HomeStackScreen() {
const {colors, setColors} = React.useContext(ColorThemeContext);
const {lang, setLang} = React.useContext(LanguageContext);
const isSignout  = React.useContext(LoginStatusContext)
const userInfoContext  = React.useContext(UserInfoContext)
const userInfo = userInfoContext.userInfo
if (isSignout){
  return (
    <HomeStack.Navigator 
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
      
      <HomeStack.Screen options={{
            title: lang.signIn,
            headerLeft: () => (
                <TouchableOpacity onPress={settingClick} style={{left: 10 * widthRatio}}>
                    <Ionicons style={alignSelf='center'} name="ios-settings" size={30 * widthRatio} color={colors.navIconTintColor}/>
                </TouchableOpacity>
              ),}} 
            name="SignInScreen" component={SignInScreen} initialParams={{ isPublic : true }}/>     
      <HomeStack.Screen options={{ title:"", }} name="SupportScreen" component={SupportScreen}  />    
      <HomeStack.Screen options={{title:"Forgot your password",}} name="ForgotPassScreen" component={ForgotPassScreen}/> 
      <HomeStack.Screen options={{title: lang.setting}} name="SettingScreen" component={SettingScreen} /> 
      <HomeStack.Screen options={{title: lang.themeSetting}} name="ThemeSettingScreen" component={ThemeSetting} /> 
      <HomeStack.Screen options={{title: lang.langSetting}} name="LangSettingScreen" component={LangSetting} />
      
    </HomeStack.Navigator>
   
)
}else {
  return (
    <HomeStack.Navigator 
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
      <HomeStack.Screen options={{title:lang.home,
          headerLeft: () => (
            <TouchableOpacity onPress={settingClick2} style={{left: 10 * widthRatio}}>

                <Ionicons style={alignSelf='center'} name="ios-settings" size={30 * widthRatio} color={colors.navIconTintColor}/>
            </TouchableOpacity>
          
          ),
          headerRight: () => (
            <TouchableOpacity onPress={userInfoClick} style={{left: -10 * widthRatio}}>
              <Image style={{width : 30, height: 30, borderRadius : 1000, resizeMode:'cover'}} source={{uri : userInfo.avatar}}/>
            </TouchableOpacity>
          ),
      }} name="HomeScreen" component={HomeScreen} /> 
    <HomeStack.Screen options={{title:lang.setting}} name="SettingScreen2" component={SettingScreen} /> 
    <HomeStack.Screen options={{title: lang.langSetting}} name="LangSettingScreen" component={LangSetting} />
    <HomeStack.Screen options={{title:lang.themeSetting}} name="ThemeSettingScreen" component={ThemeSetting} /> 
    <HomeStack.Screen options={{title:"User Info"}} name="UserInfoScreen" component={UserInfoScreen} /> 
    <HomeStack.Screen options={{title:"Update Profile"}} name="UpdateProfileScreen" component={UpdateProfileScreen} /> 
    <HomeStack.Screen options={{title:""}} name="FullCourseScreen" component={FullCourseScreen} /> 

    
    </HomeStack.Navigator>
    
  )
}

}


const BrowseStack = createStackNavigator();
function BrowseStackScreen() {
const {colors, setColors} = React.useContext(ColorThemeContext);
const {lang, setLang} = React.useContext(LanguageContext);
return (
    <BrowseStack.Navigator
        screenOptions={{
        headerStyle: {
          backgroundColor: colors.navBackgroundColor,
        },
        headerTintColor: colors.navTint,
        headerTitleStyle: {
          fontWeight: 'bold',
        },}}
    >

        <BrowseStack.Screen options={{title:lang.browse}} name="BrowseScreen" component={BrowseScreen} />
        <BrowseStack.Screen options={{title:""}} name="FullCourseScreen" component={FullCourseScreen} /> 

    </BrowseStack.Navigator>
);
}

const DownloadStack = createStackNavigator();
function DownloadStackScreen() {
  const {lang, setLang} = React.useContext(LanguageContext);
  const {colors, setColors} = React.useContext(ColorThemeContext);
  return (
      <DownloadStack.Navigator
          screenOptions={{
          headerStyle: {
            backgroundColor: colors.navBackgroundColor,
          },
          headerTintColor: colors.navTint,
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}
      >
          <DownloadStack.Screen options={{title:lang.download}} name="DownloadScreen" component={DownloadScreen} />          
      
      </DownloadStack.Navigator>
  );
}

const SearchStack = createStackNavigator();
function SearchStackScreen() {
  const {lang, setLang} = React.useContext(LanguageContext);
  const {colors, setColors} = React.useContext(ColorThemeContext);
return (
    <SearchStack.Navigator
        screenOptions={{
        headerStyle: {
          backgroundColor: colors.navBackgroundColor,
        },
        headerTintColor: colors.navTint,
        headerTitleStyle: {
          fontWeight: 'bold',
        },}}
    >
        <SearchStack.Screen options={{title: lang.search}} name="SearchScreen" component={SearchScreen} />
    
    </SearchStack.Navigator>
);
}

export default function Main({navigation}) {
  const {lang, setLang} = React.useContext(LanguageContext);
  const isSignout  = React.useContext(LoginStatusContext)
  const {colors, setColors} = React.useContext(ColorThemeContext);
  return (
      <Tab.Navigator tabBarOptions={{
        activeTintColor: colors.backgroundColorButton,
        inactiveTintColor: 'gray',
        
        style: {
            backgroundColor: colors.tabBackgroundColor,//color you want to change
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
          initialRouteName={isSignout ? "Browse" : "Home"}
          
        >
        
        <Tab.Screen options={{title: lang.home}} name="Home" component={HomeStackScreen}/>
        <Tab.Screen options={{title: lang.download}} name="Download" component={DownloadStackScreen} />
        <Tab.Screen options={{title: lang.browse}} name="Browse" component={BrowseStackScreen} />
        <Tab.Screen options={{title: lang.search}} name="Search" component={SearchStackScreen} />
        
    </Tab.Navigator>
    
    
  );
};