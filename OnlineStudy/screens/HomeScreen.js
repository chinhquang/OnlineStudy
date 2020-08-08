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
  FlatList, 
  Alert,
  TouchableOpacity,
  ImageBackground,
  
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import CourseRow from '../components/CourseRow'
import {CourseRow2} from '../components/CourseRow'
import {AuthContext, ColorThemeContext, UserInfoContext, UserTokenContext, LoginStatusContext} from '../App'
import {PathList} from './BrowseScreen'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LanguageContext} from '../LanguageContext'
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375


export function CourseList ({ itemList, navigation },props) {
    const {colors, setColors} = React.useContext(ColorThemeContext);
   
    
    showCourseDetail=(item)=>{
        console.log(item)
        navigation.navigate ('CourseDetail', item)
    };
    ListEmpty = () => {
        return (
          //View to show when list is empty
          <View style={{...styles.bookmarkEmpty, backgroundColor: colors.emptyCellBackgroundColor}}>
              <Icon style={alignSelf='center'} type="MaterialIcons" name="bookmark-border" size={70 * widthRatio} color={'#939cab'}/> 
                <Text style={styles.lightDescription}>No courses on this section</Text>
          </View>
        );
      };
    return (
        <View style={styles.bannerList}>
        <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            
                data={itemList}
                keyExtractor={item => item.key} // 
                ListEmptyComponent={ListEmpty}
                renderItem={({ item }) =>{
                    return (
                        <TouchableOpacity onPress = {()=> showCourseDetail(item)}>
                            <CourseRow
                            data={item}

                        />
                        </TouchableOpacity>
                        
                    )
                } 
                
            }
            />

    </View>
);
}

// This function to handle bug from backend
export function CourseListAPIBug ({ itemList },props) {
    const {colors, setColors} = React.useContext(ColorThemeContext);
   

    showCourseDetail=(item)=>{
        console.log(item)
        navigation.navigate ('CourseDetail', item)
    };
    ListEmpty = () => {
        return (
          //View to show when list is empty
          <View style={{...styles.bookmarkEmpty, backgroundColor: colors.emptyCellBackgroundColor}}>
              <Icon style={alignSelf='center'} type="MaterialIcons" name="bookmark-border" size={70 * widthRatio} color={'#939cab'}/> 
                <Text style={styles.lightDescription}>No courses on this section</Text>
          </View>
        );
      };
    return (
        <View style={styles.bannerList}>
        <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            
                data={itemList}
                keyExtractor={item => item.key} // 
                ListEmptyComponent={ListEmpty}
                renderItem={({ item }) =>{
                    return (
                        <TouchableOpacity onPress = {()=> showCourseDetail(item)}>
                            <CourseRow2
                            data={item}

                        />
                        </TouchableOpacity>
                        
                    )
                }     
            }
            />

    </View>
);
}
  
export default function  HomeScreen({ navigation }){
    const {lang, setLang} = React.useContext(LanguageContext);
    const {colors, setColors} = React.useContext(ColorThemeContext);
    const  userToken = React.useContext(UserTokenContext)
    const userInfoContext  = React.useContext(UserInfoContext)
    const userInfo = userInfoContext.userInfo
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
          switch (action.type) {
            case 'FETCH':
              return {
                ...prevState,
                
                
              };
           
            case 'DONE_FETCH_PROCESS_COURSE':
            return {
                ...prevState,
               
                processCourses : action.processCourses
            };
            case 'DONE_FETCH_BOOKMARK_COURSE':
            return {
                ...prevState,
               
                bookmarkCourses : action.bookmarkCourses
            };
          }
        },
        {
            bookmarkCourses : null,
            processCourses : null,
        }
      );
    React.useEffect(() => {
        
        doGetProcessCourses = async () => {
            dispatch({ type: 'FETCH'});
            let processCourses =  await getProcessCourseData()
            dispatch({ type: 'DONE_FETCH_PROCESS_COURSE', processCourses : processCourses});
            
        }
        doGetBookmarkCourses = async () => {
            dispatch({ type: 'FETCH'});
            let bookmarkCourses =  await getBookmarkCourseData()
            dispatch({ type: 'DONE_FETCH_BOOKMARK_COURSE', bookmarkCourses : bookmarkCourses});
            
        }
        doGetProcessCourses()
        doGetBookmarkCourses()
    },[])
    getProcessCourseData = async () =>{
        
        try {
            let response  = await fetch('https://api.itedu.me/user/get-favorite-courses', {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Authorization': 'Bearer ' + userToken,
                },
             
            })
            let responseJson = await response.json();
            let statusCode = await response.status;
            
            return responseJson.payload;
          }catch(error) {
            console.error(error); 
          }
    }
    getBookmarkCourseData = async () =>{
        
        try {
            let response  = await fetch('https://api.itedu.me/user/recommend-course/' + userInfo.id +'/10/1', {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
              },
            })
            let responseJson = await response.json();
            let statusCode = await response.status;
            
            return responseJson.payload;
          }catch(error) {
            console.error(error); 
          }
    }
    getBookmarkData = () =>{
        return []
    }
    
    settingClick2=()=>{
        navigation.navigate ('SettingScreen2')
    };
    userInfoClick = () =>{
        navigation.navigate ('UserInfoScreen')
    }
    showAllClick = (data , title) =>{
        navigation.navigate ('FullCourseScreen', {courses : data, headerTitle : title})
    }
    return (
        <>
    <StatusBar barStyle={colors.statusBar} />
    
    <LinearGradient colors={colors.gradientColor} style = { styles.container }>
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
            <>
                <View style={styles.coursePathHeaderContainer}>
                    <Text style={{...styles.headerSection, color: colors.textPrimary}}>My Bookmarks</Text>
                    {/* <TouchableOpacity style={{...styles.seeAllButton, backgroundColor: colors.smallButtonBackgroundColor}}>
                        <Text style={styles.seeAllButtonText}>See all {">"}</Text>
                    </TouchableOpacity> */}
                </View>
                <CourseListAPIBug itemList={state.processCourses} navigation={navigation} ></CourseListAPIBug>
            </>
            </View>
        
            
            <View style={styles.coursePathHeaderContainer}>
                <Text style={{...styles.headerSection, color: colors.textPrimary}}>Recommend courses for you</Text>
                <TouchableOpacity style={{...styles.seeAllButton, backgroundColor: colors.smallButtonBackgroundColor}} onPress={()=>showAllClick(state.bookmarkCourses, "Recommend Courses")}>
                    <Text style={styles.seeAllButtonText}>{lang.seeAll}</Text>
                </TouchableOpacity>
            </View>
            <CourseList itemList={state.bookmarkCourses} navigation={navigation} ></CourseList>
            
            
            
            
        </ScrollView>
    </LinearGradient>
        
    </>
    );
  
};StatusBar

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
    },
    bookmarkEmpty:{
        width : 350 * widthRatio,
        height: 150 * widthRatio,
        // backgroundColor : 'rgba(38, 50, 56, 0.7)',
        alignItems : 'center',
        justifyContent : "center",
        marginVertical : 8 * widthRatio,
        marginHorizontal: 10 * widthRatio,
    },
    
    lightDescription: {
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14 * widthRatio,
        width : '70%',
        color: '#939cab',
        textAlign: 'center'
    }
});

