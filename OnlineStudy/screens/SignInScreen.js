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
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375

export default function  SignInScreen ({ navigation, route }){
    // const [count, setCount] = React.useState(0);
    settingClick=()=>{
        alert('This button is not implemented yet')
    };
    const [emailValue, onChangeEmailField] = React.useState('');
    const [passwordValue, onChangePassword] = React.useState('');
    const { signIn } = React.useContext(AuthContext);
    const { isPublic } = route.params;
    console.log(" ----------------- SIGN IN SCREEN----------------- " + isPublic)
    doSignIn = () =>{
        signIn({ emailValue, passwordValue })  
        if (!isPublic){
            navigation.goBack()
        } 
        
    }
    
    return (
            <>
        <StatusBar barStyle="light-content" />
        
        <LinearGradient colors={['rgba(38, 50, 56, 1)', 'rgba(38, 50, 56, 0.7)']} style = { styles.container }>
            <View style = { styles.itemsFrame }>
            <Text style={styles.label}>Email or username</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={text => onChangeEmailField(text)}
                value={emailValue}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={text => onChangePassword(text)}
                secureTextEntry={true}
                value={passwordValue}
            />
            <CustomButton style={styles.button} textStyle={styles.whiteText} text="Sign in" onPress={() => doSignIn()}></CustomButton>
            <CustomButton style={styles.noneBorderButton} textStyle={styles.smallYellowText} text="Need help?" ></CustomButton>
            <CustomButton style={styles.borderButton} textStyle={styles.yellowText} text="Use Single Sign-On (SSO)"></CustomButton>
            <CustomButton style={styles.borderButton} textStyle={styles.yellowText} text="Subcribe to Polygon Runway"></CustomButton>
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
        color: '#ffffff',
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

