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
  FlatList, 
  Alert,
  TouchableOpacity,
  AsyncStorage
  
} from 'react-native';
import { ListItem } from 'react-native-elements'

import LinearGradient from 'react-native-linear-gradient'
import CourseRow from '../components/CourseRow'
import {AuthContext, ColorThemeContext, mainColors} from '../App'
import CustomButton from '../components/CustomButton'
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375



export default function  ThemeSetting({ navigation }){
    const {colors, setColors} = React.useContext(ColorThemeContext);
    const list = [
        {
          name: 'Dark',
          isCheck : colors.type == 'dark'
        },
        {
          name: 'Light',
          isCheck : colors.type == 'light'
        },
      ]
    const {signOut} = React.useContext(AuthContext);
    
    doSignOut = () => {
        
        signOut()
    }
    changeTheme = (themeName) =>{
        if (themeName == 'Dark' && colors.type != 'dark'){
            
            setColors(mainColors.darkTheme)
            // AsyncStorage.setItem('theme', colors.type);
        } 
        if (themeName == 'Light' && colors.type != 'light'){
           
            setColors(mainColors.lightTheme)
            // AsyncStorage.setItem('theme', colors.type);
        }
    }
    return (
        <>
    <StatusBar barStyle={colors.statusBar} />
    
    <LinearGradient colors={colors.gradientColor} style = { styles.container }>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
         
        <View style={{width : 350 * widthRatio}}>
        {
            list.map((l, i) => (
            <ListItem
                key={i}
                underlayColor="#807c7c"
                containerStyle={{ backgroundColor :'rgba(0,0,0,0)' }}
                onPress = {()=> changeTheme(l.name)}
                // leftAvatar={{ source: { uri: l.avatar_url } }}
                titleStyle={{ color: colors.textPrimary, fontWeight: 'normal' }}
                title={l.name}
                // subtitle={l.subtitle}
                checkmark={l.isCheck}
                
                rightSubtitle={l.value}
                rightSubtitleStyle={{color: colors.textPrimary}}
                bottomDivider

            />
            ))
        }
        </View>
        
        </ScrollView>
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
    
    
});

