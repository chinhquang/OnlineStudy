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
  Alert,
  AsyncStorage
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
import {AuthContext} from "../App.js"
import {ColorThemeContext} from "../App.js"
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375

export default function  ForgotPassScreen ({ navigation, route }){
    // const [count, setCount] = React.useState(0);
    const {colors, setColors} = React.useContext(ColorThemeContext);
    settingClick=()=>{
        alert('This button is not implemented yet')
    };
    const [emailValue, onChangeEmailField] = React.useState("");
    const { signUp } = React.useContext(AuthContext);
   
    forgetPassRequest = async (email) => {
        
        let response  = await fetch('https://api.itedu.me/user/forget-pass/send-email', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
            })
        })
        let responseJson = await response.json();
        let statusCode = await response.status;
        alert (responseJson.message)
    }
    doResetPassword = () =>{
        forgetPassRequest(emailValue)
    }
    return (
            <>
        <StatusBar barStyle={colors.statusBar} />
        
        <LinearGradient colors={colors.gradientColor} style = { styles.container }>

            <View style = { styles.itemsFrame }>
            <Text style={{...styles.label, color: colors.textPrimary}}>Enter your email to reset password</Text>
            <TextInput
                keyboardAppearance={colors.type}
                style={{...styles.textInput, color : colors.textPrimary}}
                onChangeText={text => onChangeEmailField(text)}
                value={emailValue}
                autoCapitalize = 'none'
            />
            
            <CustomButton style={{...styles.button , backgroundColor:colors.backgroundColorButton}} textStyle={styles.whiteText} text="Send email" onPress={() => doResetPassword()} ></CustomButton>
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
        fontWeight: 'bold',
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

