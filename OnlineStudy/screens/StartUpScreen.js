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
            
        </LinearGradient>
        
        </>
        );
    }
  
};

const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : '100%'
       
    },
    iconContainer : {
        // display: 'flex',
        // position : 'absolute',
        // flexDirection : 'row',
        top : 0.26 * width,
        alignSelf : 'center',
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
        top : 0,
    },
    iconTitle: {
        alignSelf : 'center',
        color : '#ffffff',
        fontFamily: 'Copperplate',
        width : '100%',
        bottom : 0,
        top : 0,
        textAlign : 'center',
        fontWeight: 'normal',
        fontStyle :'normal',
        lineHeight: 25,
        // backgroundColor : '#FAABBB',
        fontSize: 24 * width/ 375

    }
});

