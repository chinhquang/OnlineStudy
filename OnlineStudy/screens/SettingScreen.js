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
  
} from 'react-native';
import { ListItem } from 'react-native-elements'

import LinearGradient from 'react-native-linear-gradient'
import CourseRow from '../components/CourseRow'
import {AuthContext, ColorThemeContext,LoginStatusContext} from '../App'
import CustomButton from '../components/CustomButton'
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375
import {LanguageContext} from '../LanguageContext'


export default function  SettingScreen({ navigation }){
    const {colors, setColors} = React.useContext(ColorThemeContext);
    const isSignout  = React.useContext(LoginStatusContext)
    const {lang, setLang} = React.useContext(LanguageContext);

    const list = [
        {
            id : 1,
            name: "Theme",
            value : colors.type == 'dark' ? 'Dark' : 'Light'
            
        },
        {
            id : 3,
            name: lang.language,
            value : lang.type == 'vie' ? "Tiếng Việt" : "English"
            
        },
        {
            id : 2,
            name: 'App version',
            value :'1.0.1'
          
        },
      ]
    const {signOut} = React.useContext(AuthContext);
    
    doSignOut = () => {
        
        signOut()
    }

    selectItem = (i) => {
        if (i==1){
            navigation.navigate ('ThemeSettingScreen')
        }
        if (i==3){
            navigation.navigate ('LangSettingScreen')
        }
        
    }
    
    return (
        <>
    <StatusBar barStyle={colors.statusBar} />
    
    <LinearGradient colors={colors.gradientColor} style = { styles.container }>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
         
        <View >
        {
            list.map((l, i) => (
            <ListItem 
                key={i}
                underlayColor="#807c7c"
                onPress={() => selectItem(l.id)} 
                containerStyle={{ backgroundColor :'rgba(0,0,0,0)'}}
                contentContainerStyle={{ backgroundColor :'rgba(0,0,0,0)'}}
                // leftAvatar={{ source: { uri: l.avatar_url } }}
                titleStyle={{ color: colors.textPrimary, fontWeight: 'normal' }}
                title={l.name}
                // subtitle={l.subtitle}
                rightSubtitle={l.value}
                rightSubtitleStyle={{color: colors.textPrimary}}
                bottomDivider
                chevron
            
            />
            ))
        }
        </View>
        {
            !isSignout ? 
            <>
                <CustomButton style={{...styles.borderButton, borderColor : colors.buttonColor}} textStyle={{...styles.yellowText, color: colors.buttonColor}} text="Sign out"onPress={() => doSignOut()}></CustomButton>

            </> : 
            <>
                <CustomButton style={{...styles.borderButton, borderWidth : 0}} ></CustomButton>

            </>
        }

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
    
    yellowText : {
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 18 * widthRatio,
        lineHeight: 21 * widthRatio,

        
    },
    borderButton: {
        marginTop : 10 * widthRatio,
        width : 350 * widthRatio,
        aspectRatio : 350/47,
        
        borderWidth : 1,
        borderRadius  : 7 * widthRatio,
        marginBottom : 10 * widthRatio,
        alignItems : "center",
        justifyContent : "center"
    }
});

