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
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';

import { SearchBar } from 'react-native-elements'
import {ColorThemeContext} from '../App'
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375
import {LanguageContext} from '../LanguageContext'

export default function  SearchScreen ({ navigation }){
    const {colors, setColors} = React.useContext(ColorThemeContext);
    const {lang, setLang} = React.useContext(LanguageContext);

    const [searchText, onChangeSearchText] = React.useState('');
    textDidChange = (text) =>{
        onChangeSearchText(text)
        getCourseData(text)
        
    }
    getCourseData = async (text) =>{
        if (text.length == 0){
          setList([])
          return 
        }
        try {
            let response  = await fetch('https://api.itedu.me/course/search/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
          
                keyword: text,
                limit  : 100,
                offset : 1
              })
            })
            let responseJson = await response.json();
            let statusCode = await response.status;
            console.log (responseJson)
            setList(responseJson.payload.rows)
            return responseJson.payload.rows;
          }catch(error) {
            console.error(error); 
          }
    }
    const [list, setList] = React.useState([])
    selectItem = (i) => {
      navigation.navigate ('CourseDetail', i)
      
    }
    return (
        <>
           
        <StatusBar barStyle={colors.statusBar} />
        <SearchBar style={{width : "100%"}}
                platform='default'
                lightTheme={colors.type === 'dark' ? false : true}
                placeholder='Type Here...'  
                onChangeText={text=>textDidChange(text)}          
                value={searchText}/>
        <LinearGradient colors={colors.gradientColor} style = { styles.container }>
        {
          list.length == 0 ?
          <>
            <View style={styles.noDataContainer}>
              <Icon style={alignSelf='center'} type="MaterialIcons" name="search" size={90 * widthRatio} color={'#939cab'}/> 
              <Text style={styles.boldTitle}>{lang.currentSearchHistory}</Text>
              <Text style={styles.lightDescription}>{lang.noHistory}</Text>
            </View>
          </> 
          :
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            
              <View >
                {
                  list.map((l, i) => (
                  <ListItem 
                      key={i}
                      underlayColor="#807c7c"
                      onPress={() =>this.selectItem(l)} 
                      containerStyle={{ backgroundColor :'rgba(0,0,0,0)'}}
                      contentContainerStyle={{ backgroundColor :'rgba(0,0,0,0)'}}
                      // leftAvatar={{ source: { uri: l.avatar_url } }}
                      titleStyle={{ color: colors.textPrimary, fontWeight: 'normal' }}
                      title={l.title}
                      // subtitle={l.subtitle}
                      rightSubtitle={l.value}
                      rightSubtitleStyle={{color: colors.textPrimary}}
                      bottomDivider
                      chevron
                  
                  />
                  ))
                }
              </View>
              <View style={{...styles.borderButton, borderWidth : 0}} ></View>


          </ScrollView>
        }
        
        </LinearGradient>
        
        
        </>
    );
};

const styles = StyleSheet.create({
    
    container : {
        flex: 1,
        flexDirection : 'column',
        alignItems : 'center'
    },
    
    yellowText : {
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 18 * widthRatio,
        lineHeight: 21 * widthRatio,

        
    },
    borderButton: {
        marginTop : 10 * widthRatio,
        width : 375 * widthRatio,
        aspectRatio : 350/47,
        
        borderWidth : 1,
        borderRadius  : 7 * widthRatio,
        marginBottom : 10 * widthRatio,
        alignItems : "center",
        justifyContent : "center"
    },

    gradient:{
        flex : 1,
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

