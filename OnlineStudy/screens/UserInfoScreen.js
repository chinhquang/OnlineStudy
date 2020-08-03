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
import {AuthContext, ColorThemeContext, UserInfoContext} from '../App'
import CustomButton from '../components/CustomButton'
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375



export default function  UserInfoScreen({ navigation }){
    const {colors, setColors} = React.useContext(ColorThemeContext);
    const userInfo  = React.useContext(UserInfoContext).userInfo
    const list = [
        {
            id : 1,
            name: userInfo.email,
            
            
        },
        {
            id : 2,
            name: userInfo.phone,
            
          
        },
      ]
    const {signOut} = React.useContext(AuthContext);
    
    doEditProfile = () => {
        navigation.navigate("UpdateProfileScreen")
    }

    selectItem = (i) => {
        if (i==1){
        }
        
    }
    
    return (
        <>
    <StatusBar barStyle={colors.statusBar} />
    
    <LinearGradient colors={colors.gradientColor} style = { styles.container }>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Image style={{ marginVertical  : 16 * widthRatio, alignSelf : 'center' ,width : 200 * widthRatio, aspectRatio : 1, borderRadius : 1000, resizeMode:'cover'}} source={{uri : userInfo.avatar}}/>
        <Text style={{color: colors.textPrimary, fontWeight: '800', fontSize : 15 * widthRatio, alignSelf : 'center', marginBottom : 16 *widthRatio}}>{userInfo.name}</Text>
        <View >
        {
            list.map((l, i) => (
            <ListItem 
                key={i}
                underlayColor="#807c7c"
                onPress={() =>this.selectItem(l.id)} 
                containerStyle={{ backgroundColor :'rgba(0,0,0,0)'}}
                contentContainerStyle={{ backgroundColor :'rgba(0,0,0,0)'}}
                // leftAvatar={{ source: { uri: l.avatar_url } }}
                titleStyle={{ color: colors.textPrimary, fontWeight: 'normal' }}
                title={l.name}
                // subtitle={l.subtitle}
                rightSubtitle={l.value}
                rightSubtitleStyle={{color: colors.textPrimary}}
                bottomDivider
                // chevron
            
            />
            ))
        }
        </View>
        <CustomButton style={{...styles.borderButton, borderColor : colors.buttonColor}} textStyle={{...styles.yellowText, color: colors.buttonColor}} text="Edit Profile"onPress={() => doEditProfile()}></CustomButton>

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

