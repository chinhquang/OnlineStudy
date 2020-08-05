/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, 
  Dimensions,
  TouchableOpacity,
  TextInput,
  AsyncStorage, Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import CustomButton from '../components/CustomButton'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LanguageContext} from "../LanguageContext.js"
import {ColorThemeContext, UserInfoContext, UserTokenContext} from "../App.js"

const {width, height} = Dimensions.get('window');
const widthRatio = width / 375

export default function  UpdateProfileScreen ({ navigation, route }){
    // const [count, setCount] = React.useState(0);
    const userInfoContext  = React.useContext(UserInfoContext)

    const userInfo  = userInfoContext.userInfo
    const [usernameValue, onChangeUsername] = React.useState(userInfo.name);
    const [phoneValue, onChangePhoneNumber] = React.useState(userInfo.phone);
    
    const userToken = React.useContext(UserTokenContext)
    const {lang, setLang} = React.useContext(LanguageContext);

    const [avatarValue, onChangeAvatarField] = React.useState(userInfo.avatar);
    const {colors, setColors} = React.useContext(ColorThemeContext);
    settingClick=()=>{
        navigation.navigate ('SettingScreen')
    };
   
    doUpdate = async() =>{
        
        try {
            let response  = await fetch('https://api.itedu.me/user/update-profile', {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : "Bearer " + userToken
              },
              body: JSON.stringify({
                name : usernameValue,
                phone : phoneValue,
                avatar: avatarValue
              })
            })
            let responseJson = await response.json();
            let statusCode = await response.status;
            if (statusCode == 200){
                alert("Update profile successfully")
                userInfoContext.updateUserInfo(responseJson.payload)

            }else {
                alert("Update profile fail")
            }

            return responseJson.payload;
          }catch(error) {
            console.error(error); 
          }
    }
    
    return (
            <>
        <StatusBar barStyle={colors.statusBar} />
        
        <LinearGradient colors={colors.gradientColor} style = { styles.container }>
            <View style = { styles.itemsFrame }>
            <Text style={{...styles.label, color: colors.textPrimary}}>{lang.username}</Text>
            <TextInput
                keyboardAppearance={colors.type}
                style={{...styles.textInput, color : colors.textPrimary}}
                onChangeText={text => onChangeUsername(text)}
                value={usernameValue}
                autoCapitalize = 'none'
            />
            <Text style={{...styles.label, color: colors.textPrimary}}>{lang.avatar}</Text>
            <TextInput
                keyboardAppearance={colors.type}
                style={{...styles.textInput, color : colors.textPrimary}}
                onChangeText={text => onChangeAvatarField(text)}
                value={avatarValue}
                autoCapitalize = 'none'
            />
            <Text style={{...styles.label, color: colors.textPrimary}}>{lang.phone}</Text>
            <TextInput
                keyboardAppearance={colors.type}
                style={{...styles.textInput, color : colors.textPrimary}}
                keyboardType='numeric'
                autoCapitalize = 'none'
                onChangeText={text => onChangePhoneNumber(text)}
                value={phoneValue}
            />
            <CustomButton style={{...styles.button , backgroundColor:colors.backgroundColorButton}} textStyle={styles.whiteText} text="Update" onPress={() => doUpdate()}></CustomButton>
            </View>
            
            
        </LinearGradient>
            
        </>
    );
};
const styles = StyleSheet.create({
    container : {
        flex: 1,
        
    },
    itemsFrame :{
        flex: 1,
        marginTop : 60 * widthRatio,
        width : 350 * widthRatio,
        flexDirection : 'column',
        alignSelf : 'center'
    },
    buttonContainer : {
        flex:1,
        marginTop : 75 * widthRatio,
        
        // aspectRatio : 375 / 191,
        // backgroundColor : '#FAABBB',
        alignSelf : 'center',
        alignContent : 'center',
        // justifyContent : 'center',
    },
    textInput : {
        width : 350 * widthRatio,
        aspectRatio : 350/47,
        borderColor : 'gray',
        borderWidth: 1,
        borderRadius  : 7 * widthRatio,
        paddingHorizontal : 12 * widthRatio
    },
    button: {
        // flex : 1,
        //  margin : 100,
        width : 350 * widthRatio,
        aspectRatio : 350/47,
        backgroundColor : '#FFB74D',
        borderRadius  : 7* widthRatio,
        marginBottom : 16 * widthRatio,
        marginTop : 16 * widthRatio,
        alignItems : "center",
        justifyContent : "center"
    },
    whiteText : {
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 18 * widthRatio,
        lineHeight: 21 * widthRatio,
        color: '#ffffff',
    },
    label :{
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 18 * widthRatio,
        lineHeight: 21 * widthRatio,
        marginBottom : 8 * widthRatio,
        marginTop: 16 * widthRatio,
        
    },
    yellowText : {
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 18 * widthRatio,
        lineHeight: 21 * widthRatio,

        color: '#FFE97D',
    },
    smallYellowText : {
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15 * widthRatio,
        lineHeight: 21 * widthRatio,

        color: '#FFE97D',
    },
    borderButton: {
        width : 350 * widthRatio,
        aspectRatio : 350/47,
        borderColor : '#FFE97D', 
        borderWidth : 1,
        borderRadius  : 7 * widthRatio,
        marginBottom : 10 * widthRatio,
        alignItems : "center",
        justifyContent : "center"
    },
    noneBorderButton: {
        width : 350 * widthRatio,
        aspectRatio : 350/47,
        marginBottom : 10 * widthRatio,
        alignItems : "center",
        justifyContent : "center"
    }
});

