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
import {AuthContext, ColorThemeContext, UserInfoContext} from '../App'
import {PathList} from './BrowseScreen'
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    
export default function  HomeScreen({ navigation }){
    const {colors, setColors} = React.useContext(ColorThemeContext);

    var listCourseCategory = ['Software Development', 'IT Operations', 'Data Professional']
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
        
        doGetTopSellData = async () => {
            dispatch({ type: 'FETCH'});
            let topSellCourses =  await getTopSellCourseData()
            dispatch({ type: 'DONE_FETCH_TOP_SELL', topSellCourses : topSellCourses});
            
        }
        
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
    getBookmarkData = () =>{
        return []
    }
    
    settingClick=()=>{
        navigation.navigate ('SettingScreen')
    };
    userInfoClick = () =>{
        navigation.navigate ('UserInfoScreen')
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
                    <Text style={{...styles.headerSection, color: colors.textPrimary}}>{listCourseCategory[0]}</Text>
                    <TouchableOpacity style={{...styles.seeAllButton, backgroundColor: colors.smallButtonBackgroundColor}}>
                        <Text style={styles.seeAllButtonText}>See all {">"}</Text>
                    </TouchableOpacity>
                </View>
                <CourseList itemList={state.topSellCourses} navigation={navigation} ></CourseList>
            </>
            </View>
        
            
            <View style={styles.coursePathHeaderContainer}>
                <Text style={{...styles.headerSection, color: colors.textPrimary}}>Bookmarks</Text>
                <TouchableOpacity style={{...styles.seeAllButton, backgroundColor: colors.smallButtonBackgroundColor}}>
                    <Text style={styles.seeAllButtonText}>See all {">"}</Text>
                </TouchableOpacity>
            </View>
            <CourseList itemList={this.getBookmarkData()} navigation={navigation} ></CourseList>
            
            
            
            
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

