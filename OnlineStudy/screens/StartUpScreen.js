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
  Image,
  TouchableOpacity
  
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import CustomButton from '../components/CustomButton'
import {ColorThemeContext} from "../App.js"

const {width, height} = Dimensions.get('window');
const widthRatio = width / 375
export default function  StartUpScreen ({navigation}){
    const {colors, setColors} = React.useContext(ColorThemeContext);
    
    goToMain = () => {
        navigation.navigate('MainPublic')
    }
    
    goToSignIn = () => {
        navigation.navigate ('SignInStack')
    }
    goToSignUp = () => {
        navigation.navigate ('SignUpStack')
    }
        
    return (
        <>
    <StatusBar barStyle={colors.statusBar} />
    
    <LinearGradient colors={colors.gradientColor} style = { styles.container }>

        <View style={styles.iconContainer}>
            <Image style={styles.icon} source={require('../image/icon.png')}/>
            <Text style={{...styles.iconTitle, color:colors.textPrimary}}>polygon runway</Text>
        </View>
        <View style={styles.buttonContainer}>
            
            <CustomButton style={{...styles.button , backgroundColor:colors.backgroundColorButton}} textStyle={styles.whiteText} text="Sign In" onPress={() => this.goToSignIn()}></CustomButton>

            <CustomButton style={{...styles.borderButton, borderColor : colors.buttonColor}} textStyle={{...styles.yellowText, color: colors.buttonColor}} text="Sign up"  onPress={()=>this.goToSignUp()}></CustomButton>

            <CustomButton style={{...styles.borderButton, borderColor : colors.buttonColor}} textStyle={{...styles.yellowText, color: colors.buttonColor}} text="Explore without subcription"onPress={() => this.goToMain()}></CustomButton>
        </View>
    </LinearGradient>
        
    </>
    );
    
  
};

const styles = StyleSheet.create({
    container : {
        flex: 1,
        flexDirection : 'column',
    },
    iconContainer : {
        // display: 'flex',
        // position : 'absolute',
        // flexDirection : 'row',
        marginTop : 0.26 * width,
        alignSelf : 'center',
        justifyContent : 'center',
        width: 205 * widthRatio,
        aspectRatio: 205 / 125,
        // backgroundColor : '#000000'
    },
    icon :{
        flex:1 ,
        width: 100 * widthRatio,
        aspectRatio : 1,
        resizeMode : 'contain',
        alignSelf : 'center',
        marginTop : 0,
    },
    iconTitle: {
        alignSelf : 'center',
       
        fontFamily: 'Copperplate',
        width : '100%',
        bottom : 0,
        // top : 0,
        textAlign : 'center',
        fontWeight: 'normal',
        fontStyle :'normal',
        lineHeight: 25 * widthRatio,
        // backgroundColor : '#FAABBB',
        fontSize: 24 * widthRatio

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
    button: {
        // flex : 1,
        //  margin : 100,
        width : 350 * widthRatio,
        aspectRatio : 350/47,
        // backgroundColor:'#FFB74D',
        borderRadius  : 7* widthRatio,
        // borderWidth : 1,
        marginBottom : 35 * widthRatio,
        alignItems : "center",
        justifyContent : "center"
    },
   
    yellowText : {
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 18 * widthRatio,
        lineHeight: 21 * widthRatio,

        
    },
    
    whiteText : {
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 18 * widthRatio,
        lineHeight: 21 * widthRatio,

        color: '#FFFFFF',
    },
    // yellowText : {
    //     fontFamily: "Helvetica Neue",
    //     fontStyle: 'normal',
    //     fontWeight: 'normal',
    //     fontSize: 18 * widthRatio,
    //     lineHeight: 21 * widthRatio,

    //     color: '#FFE97D',
    // },
    borderButton: {
        width : 350 * widthRatio,
        aspectRatio : 350/47,
        
        borderWidth : 1,
        borderRadius  : 7 * widthRatio,
        marginBottom : 10 * widthRatio,
        alignItems : "center",
        justifyContent : "center"
    }
});

