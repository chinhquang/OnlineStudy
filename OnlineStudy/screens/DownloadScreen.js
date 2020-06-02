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

import {AuthContext} from '../App'
import {PathList} from './BrowseScreen'
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375
export default function  DownloadScreen({ navigation }){
    
    return (
        <>
    <StatusBar barStyle="light-content" />
    
    <LinearGradient colors={['rgba(38, 50, 56, 1)', 'rgba(38, 50, 56, 0.7)']} style = { styles.container }>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            
        </ScrollView>
    </LinearGradient>
        
    </>
    );
  
};

const styles = StyleSheet.create({
    container : {
        flex: 1,
        flexDirection : 'column',
    },
    
});

