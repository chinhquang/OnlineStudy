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
const widthRatio = width / 375
export default class  HomeScreen extends Component{
    constructor(props) {
        super(props)
    }
    goToMain = () => {
        this.props.navigation.navigate('Main')
    }
    render (){
        

        return (
            <>
        <StatusBar barStyle="light-content" />
        
        <LinearGradient colors={['rgba(38, 50, 56, 1)', 'rgba(38, 50, 56, 0.7)']} style = { styles.container }>

            {/* <View style={styles.iconContainer}>
                <Image style={styles.icon} source={require('../image/icon.png')}/>
                <Text style={styles.iconTitle}>polygon runway</Text>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton style={styles.button} textStyle={styles.whiteText} text="Sign in" ></CustomButton>
                <CustomButton style={styles.borderButton} textStyle={styles.yellowText} text="Subcribe to Polygon Runway" ></CustomButton>
                <CustomButton style={styles.borderButton} textStyle={styles.yellowText} text="Explore without subcription"onPress={() => this.goToMain()}></CustomButton>
            </View> */}
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
        color : '#ffffff',
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
        width : 325 * widthRatio,
        aspectRatio : 325/47,
        backgroundColor : '#FFB74D',
        borderRadius  : 7* widthRatio,
        // borderWidth : 1,
        marginBottom : 35 * widthRatio,
        alignItems : "center",
        justifyContent : "center"
    },
    whiteText : {
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 18 * widthRatio,
        lineHeight: 21 * widthRatio,

        color: '#FFFFFF',
    },
    yellowText : {
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 18 * widthRatio,
        lineHeight: 21 * widthRatio,

        color: '#FFE97D',
    },
    borderButton: {
        width : 325 * widthRatio,
        aspectRatio : 325/47,
        borderColor : '#FFE97D', 
        borderWidth : 1,
        borderRadius  : 7 * widthRatio,
        marginBottom : 10 * widthRatio,
        alignItems : "center",
        justifyContent : "center"
    }
});

