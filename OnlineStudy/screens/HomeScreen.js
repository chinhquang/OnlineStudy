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
  TouchableOpacity
  
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

import {AuthContext} from '../App'
import {PathList} from './BrowseScreen'
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375
export default function  HomeScreen({ navigation }){
    getPathData = () =>{
        return [
            {
                key: 1,
                title: 'Querying Data with SQL from PostgreSQL',
                imageURL:'https://cdnassets.hw.net/dims4/GG/d49288d/2147483647/thumbnail/876x580%3E/quality/90/?url=https%3A%2F%2Fcdnassets.hw.net%2Fac%2Fb4%2F139c93ae4d2eb120b534104656ae%2F42f243baab7043b584071214dde4168b.jpg',
                courseCount : 6,
            },
            {
                key: 2,
                title: 'Querying Data with SQL from PostgreSQL',
                imageURL:'https://cdnassets.hw.net/dims4/GG/d49288d/2147483647/thumbnail/876x580%3E/quality/90/?url=https%3A%2F%2Fcdnassets.hw.net%2Fac%2Fb4%2F139c93ae4d2eb120b534104656ae%2F42f243baab7043b584071214dde4168b.jpg',
                courseCount : 6,
            },
        ]
    }
    const {signOut} = React.useContext(AuthContext);
    settingClick=()=>{
        Alert.alert(
            "Setting",
            "This feature have just implemented SIGN OUT",
            [
              {
                text: "Cancel",
                onPress: () => {console.log("Cancel Pressed")},
                style: "cancel"
              },
              { text: "OK", onPress: ()=>{console.log("OK Pressed"); doSignOut()}}
            ],
            { cancelable: false }
          );
    };
    doSignOut = () => {
        
        signOut()
    }
    return (
        <>
    <StatusBar barStyle="light-content" />
    
    <LinearGradient colors={['rgba(38, 50, 56, 1)', 'rgba(38, 50, 56, 0.7)']} style = { styles.container }>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            
           
            <View style={styles.coursePathHeaderContainer}>
                <Text style={styles.headerSection}>Path</Text>
                <TouchableOpacity style={styles.seeAllButton}>
                    <Text style={styles.seeAllButtonText}>See all ></Text>
                </TouchableOpacity>
            </View>
            <PathList itemList={this.getPathData()}></PathList>
            
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
    coursePathHeaderContainer :{
        //    
        // backgroundColor : 'red',
        flexDirection : "row",
        justifyContent: 'space-between',
    },
    headerSection :{
        marginLeft : 12.5 * widthRatio,
        // textAlign : 'center',
        fontFamily: "Arial Rounded MT Bold",
        fontStyle: 'normal',
        // fontWeight: 'bold',
        fontSize: 17 * widthRatio,
        marginTop : 15 * widthRatio,
        color: '#FFFFFF',
    },
    seeAllButtonText : {
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 12 * widthRatio,
        lineHeight: 21 * widthRatio,

        color: '#ffffff',
    },
    seeAllButton : {
        alignSelf : 'center',
        justifyContent : 'center',
        paddingHorizontal : 8 * widthRatio,
        paddingVertical: 1 * widthRatio,
        borderRadius : 1000,
        backgroundColor : "#4f525c",
        marginRight : 12.5 * widthRatio,
        marginTop : 15 * widthRatio,
        
    },
});

