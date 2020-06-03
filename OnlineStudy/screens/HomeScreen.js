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
  ImageBackground
  
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import CourseRow from '../components/CourseRow'
import {AuthContext} from '../App'
import {PathList} from './BrowseScreen'

const {width, height} = Dimensions.get('window');
const widthRatio = width / 375


export const CourseList = ({ itemList }) => (
    <View style={styles.bannerList}>
        <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            
                data={itemList}
                keyExtractor={item => item.key} // 
                renderItem={({ item }) => <CourseRow
                    data={item}
                    
                />
            }
            />

    </View>
);
export default function  HomeScreen({ navigation }){
    var listCourseCategory = ['Software Development', 'IT Operations', 'Data Professional']
    getCourseData = () =>{
        return [
            {
                key: 1,
                courseName : 'Angular Fundamental',
                courseLevel : 'Intermediate',
                authorName : ['Joe Eames', 'Jim Cooper'],
                averageRating : 4.5,
                totalRating : 832,
                totalDuration : '10h',
                date : 'Feb 2019',
                imageURL:'https://cdnassets.hw.net/dims4/GG/d49288d/2147483647/thumbnail/876x580%3E/quality/90/?url=https%3A%2F%2Fcdnassets.hw.net%2Fac%2Fb4%2F139c93ae4d2eb120b534104656ae%2F42f243baab7043b584071214dde4168b.jpg',
                courseCount : 6,
            },
            {
                key: 2,
                courseName : 'Angular Fundamental',
                courseLevel : 'Intermediate',
                authorName : ['Joe Eames', 'Jim Cooper'],
                averageRating : 4.5,
                totalRating : 832,
                totalDuration : '10h',
                date : 'Feb 2019',
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
            
            <View  style={styles.descriptionContainer}>
                <ImageBackground style={styles.previewImageButton} source={{  uri: 'https://cdn.shopify.com/s/files/1/0588/6745/products/sfc1_1480x800.jpg', }}>
                    <Text style={styles.title}>Welcome to Polygon Runway</Text>
                </ImageBackground>
                <Text style={styles.description}>
                    With Polygon Runway, you can build and apply skills in top technologies. You have free access to skill IQ, Role IQ, a limited library of courses and a weekly rotation of new courses.
                </Text>
            </View>
            
            <View>
            {
                listCourseCategory.map(( item, key ) =>
                (
                    <>
                    <View style={styles.coursePathHeaderContainer}>
                        <Text style={styles.headerSection}>{item}</Text>
                        <TouchableOpacity style={styles.seeAllButton}>
                            <Text style={styles.seeAllButtonText}>See all ></Text>
                        </TouchableOpacity>
                    </View>
                    <CourseList itemList={this.getCourseData()}></CourseList>
                    </>
                    
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
        borderColor : "#939cab",
        borderWidth : 1,
        backgroundColor : "#4f525c",
        marginRight : 12.5 * widthRatio,
        marginTop : 15 * widthRatio,
        
    },
    previewImageButton:{
        width : '100%',
        aspectRatio : 150/50 * widthRatio,
        marginVertical : 10 * widthRatio, 
        justifyContent :'flex-end' 
    },
    title : {
        textAlign : 'left',
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 25 * widthRatio,
        width : '70%',
        color: '#FFFFFF',
        marginBottom : 10 * widthRatio ,
        marginLeft : 10 * widthRatio
    },
    description : {
    
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15 * widthRatio,
        color: '#939cab',
        alignSelf : 'center'
    },
    descriptionContainer: {
        alignSelf : 'center',
        width : 350 * widthRatio,
    }
});

