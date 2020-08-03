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
import { LanguageContext , mainLanguage} from '../LanguageContext';
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375


export default function  LangSetting({ navigation }){   
    const {colors, setColors} = React.useContext(ColorThemeContext);

    const {lang, setLang} = React.useContext(LanguageContext);
    const list = [
        {
          name: lang.type == 'vie' ? "Tiếng Việt" : "Viẹtnamese",
          type : 'vie',
          isCheck : lang.type == 'vie'
        },
        {
            name: lang.type == 'eng' ? "EngLish" : "Tiếng Anh",
            type : 'eng',
            isCheck : lang.type == 'eng'
        },
      ]
    
   
    changeLang = (langName) =>{
        if (langName == 'vie' && lang.type != 'vie'){
            
            setLang(mainLanguage.vie)
        } 
        if (langName == 'eng' && lang.type != 'eng'){
           
            setLang(mainLanguage.eng)
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
                onPress = {()=> changeLang(l.type)}
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

