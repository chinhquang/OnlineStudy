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
  Alert,
  TouchableOpacity,
  ImageBackground
  
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LanguageContext} from '../LanguageContext'

import {AuthContext, ColorThemeContext} from '../App'
import {PathList} from './BrowseScreen'
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375
export default function  DownloadScreen({ navigation }){
    const {lang, setLang} = React.useContext(LanguageContext);

    const [isEmpty, setEmpty] = React.useState(true);
    const {colors, setColors} = React.useContext(ColorThemeContext);
    return (
        <>
    <StatusBar barStyle={colors.statusBar} />
    
    <LinearGradient colors={colors.gradientColor} style = { styles.container }>
        {
            isEmpty ? (
                <>
                <View style={styles.noDataContainer}>
                    <Ionicons style={alignSelf='center'} name="md-cloud-download" size={90 * widthRatio} color={'#939cab'}/> 
                    <Text style={styles.boldTitle}>{lang.noDownload}</Text>
                    <Text style={styles.lightDescription}>{lang.courseDownloadWillAppearHere}</Text>
                </View>
                

                </>
            ):(
                <>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            
                </ScrollView>
                </>
            )
        }
        
    </LinearGradient>
        
    </>
    );
  
};

const styles = StyleSheet.create({
    container : {
        flex: 1,
        flexDirection : 'column',
    },
    noDataContainer : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    boldTitle :{ 
        
        
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 20 * widthRatio,
       
        color: '#939cab',
    },
    lightDescription: {
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15 * widthRatio,
       
        color: '#939cab',
    }
});

