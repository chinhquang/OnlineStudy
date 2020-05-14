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
  Image
  
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
const {width, height} = Dimensions.get('window');

export default class  StartUpScreen extends Component{
    
    render (){
        return (
            <>
        <StatusBar barStyle="light-content" />
        
        <LinearGradient colors={['rgba(38, 50, 56, 1)', 'rgba(38, 50, 56, 0.7)']} style = { styles.container }>

            <View style={styles.iconContainer}>
                <Image style={styles.icon} source={require('../image/icon.png')}/>
                <Text style={styles.iconTitle}>polygon runway</Text>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton style={styles.button} ></CustomButton>
                <CustomButton style={styles.borderButton} ></CustomButton>
                <CustomButton style={styles.borderButton} ></CustomButton>
            </View>
        </LinearGradient>
            
        </>
        );
    }
  
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
        width: 205/375 * width,
        aspectRatio: 205 / 125,
        // backgroundColor : '#000000'
    },
    icon :{
        flex:1 ,
        width: 100/375 * width,
        aspectRatio : 1,
        resizeMode : 'contain',
        alignSelf : 'center',
        marginTop : 0,
    },
    iconTitle: {
        alignSelf : 'center',
        color : '#ffffff',
        fontFamily: 'Copperplate',
        width : '100%',
        bottom : 0,
        // top : 0,
        textAlign : 'center',
        fontWeight: 'normal',
        fontStyle :'normal',
        lineHeight: 25,
        // backgroundColor : '#FAABBB',
        fontSize: 24 * width/ 375

    },
    buttonContainer : {
        // flex:1,
        marginTop : 75 / 375 * width,
        width : 325 / 375 * width,
        aspectRatio : 375 / 191,
        backgroundColor : '#FAABBB',
        alignSelf : 'center',
        alignContent : 'center',
        justifyContent : 'center',
    },
    button: {
        width : '100%',
        aspectRatio : 325/47,
        backgroundColor : '#FFB74D',
    },
    borderButton: {
        width : '100%',
        aspectRatio : 325/47,
        borderColor : '#FFE97D', 
        borderWidth : 1,
        borderRadius  : 7 / 375 * width,
    }
});

