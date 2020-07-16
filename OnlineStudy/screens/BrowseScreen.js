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
  ImageBackground,FlatList, List, ActivityIndicator
  
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import CustomRow from '../components/CustomSubjectRow'
import SubjectBannerRow from '../components/SubjectBannerRow'
import PathRow  from '../components/PathRow'
import AuthorRow from '../components/AuthorRow'
import {ColorThemeContext} from '../App.js'
import {CourseList} from './HomeScreen'

const {width, height} = Dimensions.get('window');
const widthRatio = width / 375
export const CustomListSubjectView = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={itemList}
                keyExtractor={item => item.key} // 
                renderItem={({ item }) => <CustomRow
                    title={item.title}
                />}
            />

    </View>
);
export const SubjectBannerList = ({ itemList }) => (
    <View style={styles.bannerList}>
        <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            
                data={itemList}
                keyExtractor={item => item.key} // 
                renderItem={({ item }) => <SubjectBannerRow
                    url={item.url}
                    title={item.title}
                />
            }
            />

    </View>
);
export const PathList = ({ itemList }) => (
    <View style={styles.bannerList}>
        <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            
                data={itemList}
                keyExtractor={item => item.key} // 
                renderItem={({ item }) => <PathRow
                
                    title={item.title}

                    imageURl={item.imgURL} 
                    courseCount={item.courseCount}
                />
            }
            />

    </View>
);

export const TopAuthorList = ({ itemList }) => (
    <View style={styles.bannerList}>
        <FlatList
                nestedScrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            
                data={itemList}
                keyExtractor={item => item.key} // 
                renderItem={({ item }) => <AuthorRow
                
                    authorName={item["user.name"]}

                    avatarURL={item["user.avatar"]} 
                />
            }
            />

    </View>
);
export default function  BrowseScreen ({ navigation }){
    const {colors, setColors} = React.useContext(ColorThemeContext);
    var listCourseCategory = ['Top Sell', 'Newest Courses', 'Top Rate']

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
          switch (action.type) {
            case 'FETCH':
              return {
                ...prevState,
                
                isLoading: true,
                
              };
            case 'DONE_FETCH_AUTHOR':
            return {
                ...prevState,
               
                isLoading: false,
                authorData : action.authorData,
            };
            case 'DONE_FETCH_TOP_SELL':
            return {
                ...prevState,
               
                isLoading: false,
                topSellCourses : action.topSellCourses
            };
          }
        },
        {
            isLoading: false,
            authorData: null,
            topSellCourses : null,
        }
      );
   
    React.useEffect(() => {
        doGetAuthorData = async () => {
            dispatch({ type: 'FETCH'});
            let authorData =  await getAuthorData()
            dispatch({ type: 'DONE_FETCH_AUTHOR', authorData : authorData});
            
            
        }
        doGetTopSellData = async () => {
            dispatch({ type: 'FETCH'});
            let topSellCourses =  await getTopSellCourseData()
            dispatch({ type: 'DONE_FETCH_TOP_SELL', topSellCourses : topSellCourses});
            
        }
        doGetAuthorData()
        doGetTopSellData()
    },[])
    getTopSellCourseData = async () =>{
        
        try {
            let response  = await fetch('https://api.itedu.me/course/top-sell', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "limit": 10,
                "page": 1
              })
            })
            let responseJson = await response.json();
            let statusCode = await response.status;
            
            return responseJson.payload;
          }catch(error) {
            console.error(error); 
          }
    }
    getAuthorData = async () =>{
        try {
            let response  = await fetch('https://api.itedu.me/instructor', {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                
              }
            })
            let responseJson = await response.json();
            let statusCode = await response.status;
            
            return responseJson.payload;
          }catch(error) {
            console.error(error); 
          }
    }

    return (
        <>
        <StatusBar barStyle={colors.statusBar}/>
        
        <LinearGradient colors={colors.gradientColor} style = { styles.container }>
            
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {   
                state.isLoading && (
                    <>
                        <ActivityIndicator style={{position:'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex : 2, color:"#0000ff"}} size="large" animating={state.isLoading}/>

                    </>
                )
                
            }
            <>
                <View style={styles.coursePathHeaderContainer}>
                    <Text style={{...styles.headerSection, color: colors.textPrimary}}>{listCourseCategory[0]}</Text>
                    <TouchableOpacity style={{...styles.seeAllButton, backgroundColor: colors.smallButtonBackgroundColor}}>
                        <Text style={styles.seeAllButtonText}>See all {">"}</Text>
                    </TouchableOpacity>
                </View>
                <CourseList itemList={state.topSellCourses} navigation={navigation} ></CourseList>
            </>
            
            <Text style={{...styles.headerSection, color: colors.textPrimary}}>Top Authors</Text>
            <TopAuthorList itemList={state.authorData}></TopAuthorList>
        </ScrollView>

        </LinearGradient>
            
        </>
    );
};

const styles = StyleSheet.create({
    bannerList :{
        flex: 1,
        // backgroundColor : 'white',
        
    },
    container : {
        flex : 1,
    },
    scrollView:{
        // backgroundColor : 'rgba(38, 50, 56, 1)'
        flex :1
    },
    preview : {
        alignSelf : 'center',
    },
    coursePathHeaderContainer :{
    //    
        // backgroundColor : 'red',
        flexDirection : "row",
        justifyContent: 'space-between',
    },
    previewImageButton:{
        
        width : 350 * widthRatio,
        aspectRatio : 200/50 * widthRatio,
        marginVertical : 10 * widthRatio,  
        alignItems : 'center',
        justifyContent : 'center',
        

    },
    
    headerSection :{
        marginLeft : 12.5 * widthRatio,
        // textAlign : 'center',
        fontFamily: "Arial Rounded MT Bold",
        fontStyle: 'normal',
        // fontWeight: 'bold',
        fontSize: 17 * widthRatio,
        marginTop : 15 * widthRatio,
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
        borderColor : "#939cab",
        borderWidth : 1,
        backgroundColor : "#4f525c",
        borderRadius : 1000,
        
        marginRight : 12.5 * widthRatio,
        marginTop : 15 * widthRatio,
        
    },
    title : {
        textAlign : 'center',
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 25 * widthRatio,
        width : '70%',
        color: '#FFFFFF',
    }

});

