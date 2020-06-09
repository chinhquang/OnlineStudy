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
import {StatusBarHeight} from '../utils/Dimension'

import { SearchBar } from 'react-native-elements'
import {ColorThemeContext} from '../App'
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375

export default function  SearchScreen ({ navigation }){
    const {colors, setColors} = React.useContext(ColorThemeContext);

    const [searchText, onChangeSearchText] = React.useState('');
    
    return (
        <>
           
        <StatusBar barStyle={colors.statusBar} />
        <LinearGradient colors={colors.gradientColor} style = { styles.gradient }>
                <SearchBar style={styles.searchBox}
                    platform='default'
                    lightTheme={colors.type === 'dark' ? false : true}
                    placeholder='Type Here...'  
                    onChangeText={text=>onChangeSearchText(text)}          
                    value={searchText}/>
                
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
    }
});

