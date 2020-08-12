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
  ImageBackground,
  AsyncStorage
} from 'react-native';
import { ListItem } from 'react-native-elements'

import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LanguageContext} from '../LanguageContext'

import FileViewer from 'react-native-file-viewer';
var RNFS = require('react-native-fs');

import {AuthContext, ColorThemeContext} from '../App'
import {PathList} from './BrowseScreen'
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375


export default function  DownloadScreen({ navigation }){
    const {lang, setLang} = React.useContext(LanguageContext);
    openFile = async(fileURL) =>{
        var dirType=null;
        if(Platform.OS === 'ios'){
            dirType = RNFS.DocumentDirectoryPath;

        }else{
            await this.requestStoragePermission();
            dirType = RNFS.ExternalStorageDirectoryPath+'/AppName';
        }
        FileViewer.open(dirType + fileURL)
        .then(() => {
          // success
        })
        .catch(error => {
          // error
        });
      }
    const [isEmpty, setEmpty] = React.useState(true);
    const {colors, setColors} = React.useContext(ColorThemeContext);
    const [list,setList] = React.useState([])
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getLocalDownLoad()
        });
        
        return unsubscribe;
    },[navigation])
    getLocalDownLoad = async() => {
        var lessons = await AsyncStorage.getItem("Lesson");
        var lessonJSON = {}
        if (lessons == null){
            return 
        }else {
            lessonJSON = JSON.parse(lessons)
        }
        var array = []
        for (var key in lessonJSON){
            console.log(key)
            array.push(lessonJSON[key])
            console.log(lessonJSON[key])
        
        }
        setList(array)
    }
    
    return (
        <>
    <StatusBar barStyle={colors.statusBar} />
    
    <LinearGradient colors={colors.gradientColor} style = { styles.container }>
        {
            list.length==0 ? (
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
                    {
                        list.map((l, i) => (
                            <ListItem 
                                key={i}
                                underlayColor="#807c7c"
                                onPress={() =>{openFile(l.fileUrl)}} 
                                containerStyle={{ backgroundColor :'rgba(0,0,0,0)'}}
                                contentContainerStyle={{ backgroundColor :'rgba(0,0,0,0)'}}
                                leftAvatar={{ source: { uri: colors.type == 'dark' ? "https://icon-library.com/images/play-icon-white-png/play-icon-white-png-9.jpg" : "https://icon-library.net/images/play-icon-white-png/play-icon-white-png-5.jpg"} }}
                                titleStyle={{ color: colors.textPrimary, fontWeight: 'normal' }}
                                title={l.lessonName}
                                // subtitle={l.subtitle}
                                rightSubtitle={l.value}
                                rightSubtitleStyle={{color: colors.textPrimary}}
                                bottomDivider
                                chevron
                            
                            />
                            ))
                    }
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

