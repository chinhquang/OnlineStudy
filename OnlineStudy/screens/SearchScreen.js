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
  View,
  Text,
  StatusBar, 
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,FlatList
  
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { SearchBar } from 'react-native-elements'
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375

export default function  SearchScreen ({ navigation }){
    const [searchText, onChangeSearchText] = React.useState('');
    
    return (
        <>
        
        <LinearGradient colors={['rgba(38, 50, 56, 1)', 'rgba(38, 50, 56, 0.7)']} style = { styles.gradient }>
                <SearchBar style={styles.searchBox}
                placeholder='Type Here...'  
                onChangeText={text=>onChangeSearchText(text)}          
                value={searchText}/>
                <Text>Hello</Text>
            </LinearGradient>
        
        
        
        </>
    );
};

const styles = StyleSheet.create({
    
    container : {
        flex : 1,
        
        // backgroundColor: 'rgba(55, 71, 79, 0.92)',
    },

    gradient:{
        flex : 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }
});

