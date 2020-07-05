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
import {ColorThemeContext} from "../App.js"
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375

export default function  SignUpScreen ({ navigation, route }){
    // const [count, setCount] = React.useState(0);
    const {colors, setColors} = React.useContext(ColorThemeContext);
    settingClick=()=>{
        alert('This button is not implemented yet')
    };
    const [emailValue, onChangeEmailField] = React.useState('');
    const [passwordValue, onChangePassword] = React.useState('');
    const [usernameValue, onChangeUsername] = React.useState('');
    const [phoneValue, onChangePhoneNumber] = React.useState('');
    const { signIn } = React.useContext(AuthContext);
    const { isPublic } = route.params;
    console.log(" ----------------- SIGN Up SCREEN----------------- " + isPublic)
    doSignIn = () =>{
        signIn({ emailValue, passwordValue })  
        if (!isPublic){
            navigation.goBack()
        } 
        
    }
    
    return (
            <>
        <StatusBar barStyle={colors.statusBar} />
        
        <LinearGradient colors={colors.gradientColor} style = { styles.container }>
            <View style = { styles.itemsFrame }>
            <Text style={{...styles.label, color: colors.textPrimary}}>Username</Text>
            <TextInput
                keyboardAppearance={colors.type}
                style={styles.textInput}
                onChangeText={text => onChangeUsername(text)}
                value={usernameValue}
            />
            <Text style={{...styles.label, color: colors.textPrimary}}>Email</Text>
            <TextInput
                keyboardAppearance={colors.type}
                style={styles.textInput}
                onChangeText={text => onChangeEmailField(text)}
                value={emailValue}
            />
            <Text style={{...styles.label, color: colors.textPrimary}}>Phone</Text>
            <TextInput
                keyboardAppearance={colors.type}
                style={styles.textInput}
                keyboardType='numeric'
                
                onChangeText={text => onChangePhoneNumber(text)}
                value={phoneValue}
            />
            <Text style={{...styles.label, color: colors.textPrimary}}>Password</Text>
            <TextInput
                keyboardAppearance={colors.type}
                style={styles.textInput}
                onChangeText={text => onChangePassword(text)}
                secureTextEntry={true}
                value={passwordValue}
            />
            <CustomButton style={{...styles.button , backgroundColor:colors.backgroundColorButton}} textStyle={styles.whiteText} text="Create Account" onPress={() => doSignIn()}></CustomButton>
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

