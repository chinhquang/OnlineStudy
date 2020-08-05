/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{ useState, useRef } from 'react';
import {
  SafeAreaView,Button,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, 
  Dimensions,
  Image,
  FlatList, 
  Alert,
  Animated,
  Platform,
  SectionList,
  TouchableHighlight,TouchableNativeFeedback, TouchableOpacity, TouchableHighlightComponent,
  Share,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
// import {TouchableOpacity} from 'react-native-gesture-handler'
import { ListItem } from 'react-native-elements'
import { TabView, SceneMap, TabBar} from 'react-native-tab-view';
import { Rating, AirbnbRating } from 'react-native-ratings';

import LinearGradient from 'react-native-linear-gradient'
import CourseRow from '../components/CourseRow'
import {AuthContext, ColorThemeContext, mainColors, UserTokenContext,UserInfoContext} from '../App'
import {LanguageContext} from "../LanguageContext"
import {StatusBarHeight} from '../utils/Dimension'
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Entypo';

import { format } from "date-fns";
import { color } from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375
const TabBarHeight = 48 * widthRatio;
const HeaderHeight = 405 * widthRatio;
function getDateFrom(dateString){
  var date = new Date(dateString);

  var formattedDate = format(date, "MMM dd");
  return formattedDate
}
function TabScene (props){
  const {colors, setColors} = React.useContext(ColorThemeContext);
  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View style={{...styles.bookmarkEmpty, backgroundColor: colors.emptyCellBackgroundColor}}>
          <Icon style={alignSelf='center'} type="MaterialIcons" name="bookmark-border" size={70 * widthRatio} color={'#939cab'}/> 
                <Text style={styles.lightDescription}>No data on this section</Text>
      </View>
    );
  };
  const windowHeight = Dimensions.get('window').height;
    const {
      numCols,
      data,
      renderItem,
      onGetRef,
      scrollY,
      onScrollEndDrag,
      onMomentumScrollEnd,
      onMomentumScrollBegin,
      stickyHeaderIndices
    } = props;

    return (
      <Animated.FlatList
        ListEmptyComponent={this.ListEmpty}
        scrollToOverflowEnabled={true}
        numColumns={numCols}
        ref={onGetRef}
        scrollEventThrottle={16}
        decelerationRate={0}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}

        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        contentContainerStyle={{
          paddingTop: HeaderHeight + TabBarHeight,
          paddingHorizontal: 10,
          minHeight: windowHeight - TabBarHeight,
        }}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={stickyHeaderIndices}
        keyboardShouldPersistTaps='always'
        keyExtractor={(item, index) => index.toString()}
      />
    );
  
}
export default function  CourseDetail({ navigation, route}){
    const videoPlayer = useRef(null);
    const {lang, setLang} = React.useContext(LanguageContext);

    const  userToken = React.useContext(UserTokenContext)
    const [animationValue, setAnimationValue] = React.useState(new Animated.Value(width * 0.5));
    const [viewState, setViewState] = React.useState(true);
    const {colors, setColors} = React.useContext(ColorThemeContext);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [isFullScreen, setIsFullScreen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [paused, setPaused] = React.useState(true);
    const [playerState, setPlayerState] = React.useState(PLAYER_STATES.PAUSED);
    const [screenType, setScreenType] = React.useState('content');
    const [onBookmarkClickOpacity, setOnBookmarkClickOpacity] = React.useState(true)
    const [hightLightItem, setHighlightItem] = React.useState(-1)
    const data = route.params
    const [videoURLDisplay, setVideoURLDisplay] = React.useState(data.promoVidUrl)
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    const [routes] = useState([
      {key: 'tab1', title: lang.content},
      {key: 'tab2', title: lang.comment},
    ]);
    onBookMark = () =>{
      likeCourse()
    }
    const onShare = async () => {
      try {
        const result = await Share.share({
          message:
            'Online Study Application',
          url : "https://itedu.me/course-detail/" + data.id
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };
    const [state, dispatch] = React.useReducer(
      (prevState, action) => {
        switch (action.type) {
          case 'FETCH':
            return {
              ...prevState,
              
              isLoading: true,
              
            };
         
          case 'DONE_FETCH_DETAIL_COURSE':
          return {
              ...prevState,
             
              isLoading: false,
              detailCourses : action.detailCourses
          };
          case 'DONE_FETCH_LESSON_DATA':
          return {
              ...prevState,
             
              isLoading: false,
              lessonData : action.lessonData
          };
          case 'DONE_FETCH_RATING_DATA':
          return {
              ...prevState,
             
              isLoading: false,
              ratingList : action.ratingList
          };
          case 'CHANGE_LIKE_STATUS':
            return {
              ...prevState,
             
              isBookMark : action.isBookMark
          };
        }
      },
      {
          ratingList : null,
          isBookMark : false,
          lessonData : null,
          isLoading: false,
          detailCourses : null,
      }
    );
    React.useEffect(() => {
        
      doGetDetailCourses = async () => {
          dispatch({ type: 'FETCH'});
          let detailCourses =  await getCourseData()
          
          dispatch({ type: 'DONE_FETCH_DETAIL_COURSE', detailCourses : detailCourses.section});
          let t = convertDataToUsableArray(detailCourses.section)
          dispatch({ type: 'DONE_FETCH_LESSON_DATA', lessonData : t});
          //-------------------------------------------------

          var arr = [];

          t.map(obj => {
            if (obj.header == true) {
              arr.push(t.indexOf(obj));
            } 
          });

          arr.push(0);
          setStickyHeaderIndices(arr);
          //-------------------------------------------------
          let x = convertDataToUsableArray2(detailCourses.ratings.ratingList)
          dispatch({ type: 'DONE_FETCH_RATING_DATA', ratingList : x});
          var arr2 = [];
          
          x.map(obj => {
            if (obj.header == true) {
              arr2.push(x.indexOf(obj));
            } 
          });

          arr2.push(0);
          setStickyHeaderIndices_2(arr2);
          console.log("CON COO",x)
          dispatch({ type: 'FETCH'});
          var like = await getLikeStatus()
          dispatch({ type: 'CHANGE_LIKE_STATUS', isBookMark : like});
      };
      
      
      doGetDetailCourses()
      
      
      
    },[])
    getLikeStatus = async () =>{
        
      try {
          let response  = await fetch('https://api.itedu.me/user/get-course-like-status/' + data.id, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization' : 'Bearer ' + userToken
              
            },
          })
          let responseJson = await response.json();
          let statusCode = await response.status;
          return responseJson.likeStatus
        }catch(error) {
          console.error(error); 
        }
    }
    convertDataToUsableArray = (data) =>{
      var array = []
      var index = 0; 
  
      while (index < data.length) { 
        array.push({ name : data[index].name, header: true})
        let lesson = data[index].lesson
        var indexx = 0;
        while (indexx < lesson.length) { 
          array.push({ name : lesson[indexx].name, header: false, videoUrl : lesson[indexx].videoUrl})
          
          indexx++; 
        }

        index++; 
      }
      
      return array
    }
    convertDataToUsableArray2 = (data) =>{
      var array = [{ data : null, header: true}]
      var index = 0;  
      while (index < data.length) { 
        array.push({ data : data[index], header: false})
        index++; 
      }
      return array
    }
    getCourseData = async () =>{
        
      try {
          let response  = await fetch('https://api.itedu.me/course/get-course-detail/'+ data.id +'/' + data.id, {
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

    const [description, setDescriptionExpand ] = useState(0)
    const [stickyHeaderIndices, setStickyHeaderIndices] = React.useState([])
    const [stickyHeaderIndices_2, setStickyHeaderIndices_2] = React.useState([])

    const [tabIndex, setIndex] = useState(0);
   
    const scrollY = useRef(new Animated.Value(0)).current;
    let listRefArr = useRef([]);
    let listOffset = useRef({});
    let isListGliding = useRef(false);
    const syncScrollOffset = () => {
      const curRouteKey = routes[tabIndex].key;
      listRefArr.current.forEach((item) => {
        if (item.key !== curRouteKey) {
          if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: scrollY._value,
                animated: false,
              });
              listOffset.current[item.key] = scrollY._value;
            }
          } else if (scrollY._value >= HeaderHeight) {
            if (
              listOffset.current[item.key] < HeaderHeight ||
              listOffset.current[item.key] == null
            ) {
              if (item.value) {
                item.value.scrollToOffset({
                  offset: HeaderHeight,
                  animated: false,
                });
                listOffset.current[item.key] = HeaderHeight;
              }
            }
          }
        }
      });
    };
  
    const onMomentumScrollBegin = () => {
      isListGliding.current = true;
    };
    const onMomentumScrollEnd = () => {
      isListGliding.current = false;
      syncScrollOffset();
    };
  
    const onScrollEndDrag = () => {
      syncScrollOffset();
    };
    const xxx = (state.isBookMark==true) ? 0.4 : 1
    const renderHeader = () => {
      const y = scrollY.interpolate({
        inputRange: [0, HeaderHeight],
        outputRange: [0, -HeaderHeight],
        extrapolateRight: 'clamp',
      });
      return (
        <Animated.View style={[styles.header, {transform: [{translateY: y}]}]}>
          <Text style={{...styles.courseName, color : colors.textPrimary, marginRight : 10 * widthRatio}}>{data.title}</Text>
          <View style={styles.authorCardContainer}>
              <>
                <View style={{...styles.authorCard, backgroundColor: colors.subjectBackgroundColor}}>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={{color : 'white',fontSize : 12 * widthRatio}}>{data["instructor.user.name"]}</Text>
                </View>
              </>
          </View>

          <View style={styles.star}>
            <Text style={styles.lightText} >{data.price}$  -  {getDateFrom(data.updatedAt)}  -  {data.totalHours}h</Text>
            <AirbnbRating
                showRating = {false}
                count={5}
                defaultRating={ Number(data.ratedNumber)}
                size={9 * widthRatio}
                starContainerStyle={{marginHorizontal : 10 * widthRatio}}
                isDisabled = {true}
            />
            <Text style={styles.lightText}>({data.ratedNumber})</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-evenly', marginVertical : 10 * widthRatio}}>
            <TouchableWithoutFeedback style={{alignItems : 'center', opacity: xxx}} onPress={onBookMark}>
              <View style={{...styles.roundedButton}}>   
                 <Icon style={alignSelf='center'} type="MaterialIcons" name="bookmark-border" size={35} color={colors.textPrimary}/>
              </View>
              <Text style={{color:colors.textPrimary, fontSize : 13 * widthRatio}}>Bookmark</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback style={{alignItems : 'center'}} onPress={ () =>onShare()}>
              <View style={{...styles.roundedButton}}>   
                 <Icon style={alignSelf='center'} type="MaterialIcons" name="share" size={35} color={colors.textPrimary}/>
              </View>
              <Text style={{color:colors.textPrimary, fontSize : 13 * widthRatio}}>Share</Text>
            </TouchableWithoutFeedback>

            {/* <TouchableOpacity style={{alignItems : 'center'}}>
              <View style={{...styles.roundedButton}}>   
                 <Icon style={alignSelf='center'} type="MaterialIcons" name="file-download" size={35} color={colors.textPrimary}/>
              </View>
      <Text style={{color:colors.textPrimary, fontSize : 13 * widthRatio}}>{lang.download}</Text>
            </TouchableOpacity> */}
          </View>
          
          <View style={{height: 1, width: 350 * widthRatio, backgroundColor : '#939cab', marginVertical : 10 * widthRatio, alignSelf : 'center'}}></View>
          <View style={{justifyContent: 'center',flexDirection: 'row', alignSelf: 'stretch', marginTop : 10 * widthRatio, textAlignVertical :'center', height : 55}}>
            <ScrollView>
      <Text numberOfLines={description} ellipsizeMode='tail' style={{fontSize: 15 * widthRatio,marginStart : 10 * widthRatio,width : 350 * widthRatio, color: colors.textPrimary}}>{data.description}</Text>
            </ScrollView>    
          </View>
          <TouchableOpacity style={styles.bigButton}>
              <Icon style={alignSelf='center'} type="MaterialIcons" name="format-list-bulleted" size={35} color={colors.textPrimary}/>
              
              <Text style={{marginLeft: 5 * widthRatio, color: colors.textPrimary, fontSize : 13 * widthRatio}}>Related paths and courses</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bigButton}>
              <Icon style={alignSelf='center'} type="MaterialIcons" name="playlist-add-check" size={35} color={colors.textPrimary}/>
              
              <Text style={{marginLeft: 5 * widthRatio ,color:colors.textPrimary, fontSize : 13 * widthRatio}}>Take a learning check</Text>
          </TouchableOpacity>
        </Animated.View>
      );
    };
    
     likeCourse = async() => {
      console.log("TOKEN  ",userToken)
      try {
        let response  = await fetch('https://api.itedu.me/user/like-course', {
          method: 'POST',
          headers: {
            'Authorization' : 'Bearer ' + userToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          
            courseId: data.id
          
          })
        })
        
        let responseJson = await response.json()
        let statusCode = await response.status;
        if (statusCode != 200){
          alert(responseJson.message)
        }else {
          dispatch({ type: 'CHANGE_LIKE_STATUS', isBookMark : responseJson.likeStatus});
        }
        
        return responseJson;
      }catch(error) {
        console.error(error); 
      }
      
    }
    const renderTab1Item = ({item, index}) => {
      
      onItemPress = (item, index) => {
        if (item.videoUrl){
          setHighlightItem(index)
          setVideoURLDisplay(item.videoUrl)
        } else {
          alert("Bạn chưa đủ quyền để xem bài học này.")

        }
      }
     
      return (
        <View
          style={{
            width: 350 * widthRatio,
            height: item.header ? 140*widthRatio : 60* widthRatio,
            backgroundColor: item.header ? colors.toolBackgroundColor : 'rgba(248, 248, 248, 0)',
            justifyContent: 'center',
            borderRadius : 10 * widthRatio
          }}>
          {
            item.header 
            ? 
            <View style={{flexDirection : 'row', justifyContent: 'space-between'}}>
              
              <Text style={{width : '60%',marginLeft : 15 * widthRatio, color: colors.textPrimary, fontWeight:'bold', fontSize : 15*widthRatio, textAlign: 'left'}}>{item.name}</Text> 
              <TouchableOpacity style={{marginRight : 15 * widthRatio}}>
              <Icon2 style={alignSelf='center'} type="Entypo" name="dots-three-horizontal" size={30 * widthRatio} color={colors.textPrimary}/> 

              </TouchableOpacity>
            </View>
            
            : 
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <TouchableOpacity onPress={()=>onItemPress(item, index)} >
                <Text style={{fontWeight:(hightLightItem == index) ? 'bold' : 'normal', color: colors.textPrimary,textAlign: 'left', fontSize : 12*widthRatio, marginLeft : 20 * widthRatio, width : 250 * widthRatio}}>{item.name}</Text>

              </TouchableOpacity>
              
              <Icon2 style={{alignSelf:'center', marginLeft : 25 * widthRatio}} type="Entypo" name={item.videoUrl ? "eye" : "eye-with-line"} size={13 * widthRatio} color={colors.textPrimary}/>
              {
                item.videoUrl && 
                <Icon style={{alignSelf:'center', marginLeft : 15 * widthRatio}} type="MaterialIcons" name="file-download" size={20 * widthRatio} color={colors.textPrimary}/>

              }

            </View>
            
          }
        </View>
      );
    };
    
    const renderTab2Item = ({item, index}) => {
      return (
        <View
          style={{
            width: 350 * widthRatio,
            height: item.header ? 140*widthRatio : 60* widthRatio,
            backgroundColor: item.header ? colors.toolBackgroundColor : 'rgba(248, 248, 248, 0)',
            justifyContent: 'center',
            borderRadius : 10 * widthRatio
          }}>
          {
            item.header 
            ? 
            <View style={{flexDirection : 'row', justifyContent: 'space-between'}}>
              
              <Text style={{width : '60%',marginLeft : 15 * widthRatio, color: colors.textPrimary, fontWeight:'bold', fontSize : 15*widthRatio, textAlign: 'left'}}>{item.name}</Text> 
              <TouchableOpacity style={{marginRight : 15 * widthRatio}}>
              <Icon2 style={alignSelf='center'} type="Entypo" name="dots-three-horizontal" size={30 * widthRatio} color={colors.textPrimary}/> 

              </TouchableOpacity>
            </View>
            
            : 
            
            <TouchableOpacity onPress={()=>onItemPress(item, index)} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontWeight:(hightLightItem == index) ? 'bold' : 'normal', color: colors.textPrimary,textAlign: 'left', fontSize : 12*widthRatio, marginLeft : 20 * widthRatio, width : '60%'}}>{item.name}</Text>
              <Icon2 style={alignSelf='center'} type="Entypo" name={item.videoUrl ? "eye" : "eye-with-line"} size={13 * widthRatio} color={colors.textPrimary}/>
            </TouchableOpacity>
          }
        </View>
      );
    };
    const renderLabel = ({route, focused}) => {
      return (
        <Text style={[styles.label, {color : colors.textPrimary}, {opacity: focused ? 1 : 0.8}]}>
          {route.title}
        </Text>
      );
    };
    const renderScene = ({route}) => {
      const focused = route.key === routes[tabIndex].key;
      let numCols;
      let data;
      let renderItem;
      let stickyHeader=[]
      switch (route.key) {
        case 'tab1':
          numCols = 1;
          data = state.lessonData;
          renderItem = renderTab1Item;
          stickyHeader = stickyHeaderIndices
          break;
        case 'tab2':
          numCols = 1;
          data = state.ratingList;
          renderItem = renderTab2Item;
          stickyHeader = stickyHeaderIndices_2
          break;
        default: return null;
      }
      return (
        <TabScene
          numCols={numCols}
          data={data}
          renderItem={renderItem}
          scrollY={scrollY}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onScrollEndDrag={onScrollEndDrag}
          onMomentumScrollEnd={onMomentumScrollEnd}
          stickyHeaderIndices={stickyHeader}
          onGetRef={(ref) => {
            if (ref) {
              const found = listRefArr.current.find((e) => e.key === route.key);
              if (!found) {
                listRefArr.current.push({
                  key: route.key,
                  value: ref,
                });
              }
            }
          }}
        />
      );
    };
  
    const renderTabBar = (props) => {
      const y = scrollY.interpolate({
        inputRange: [0, HeaderHeight],
        outputRange: [HeaderHeight, 0],
        extrapolateRight: 'clamp',
      });
      return (
        <Animated.View
          style={{
            top: 0,
            zIndex: 1,
            position: 'absolute',
            transform: [{translateY: y}],
            width: '100%',
          }}>
          <TabBar
            {...props}
            onTabPress={({route, preventDefault}) => {
              if (isListGliding.current) {
                preventDefault();
              }
            }}
            style={{...styles.tab,  backgroundColor: colors.toolBackgroundColor}}
            renderLabel={renderLabel}
            indicatorStyle={{backgroundColor : colors.buttonColor, height : 5}}
          />
        </Animated.View>
      );
    };
  
    const renderTabView = () => {
      return (
        <TabView
          onIndexChange={(index) => setIndex(index)}
          navigationState={{index: tabIndex, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          initialLayout={{
            height: 0,
            width: Dimensions.get('window').width,
          }}
        />
      );
    };
    React.useEffect(() => {
      


      scrollY.addListener(({value}) => {
        const curRoute = routes[tabIndex].key;
        listOffset.current[curRoute] = value;
      });
      return () => {
        scrollY.removeAllListeners();
      };
      
    }, [routes, tabIndex]);
   
   

    dismiss = () =>{
      navigation.goBack()
        
    }   
    
    const onSeek = seek => {
        videoPlayer?.current.seek(seek);
    };
    const onFullScreen = () =>{
        videoPlayer.current.presentFullscreenPlayer()
    }
    const onPaused = playerState => {

        setPaused(!paused);
        setPlayerState(playerState);
    };
    
    const onReplay = () => {
        setPlayerState(PLAYER_STATES.PLAYING);
        videoPlayer?.current.seek(0);
    };

    const onProgress = data => {
    // Video Player will continue progress even if the video already ended
        if (!isLoading) {
            setCurrentTime(data.currentTime);
        }
    };
    
    const onLoad = data => {
       
        setDuration(data.duration);
        setIsLoading(false);
        
    };

    const onLoadStart = () => setIsLoading(true);

    const onEnd = () => {
    };
    
    const onSeeking = currentTime => setCurrentTime(currentTime);

    
    return (
        <>
    <StatusBar barStyle={colors.statusBar} />
    <SafeAreaView style={{ flex:0, backgroundColor: colors.navBackgroundColor }} />
    <LinearGradient colors={colors.gradientColor} style = { styles.container }>
    <Animated.View style = {{...styles.videoContainer, height: animationValue, } }>
    <Video
        onEnd={onEnd}
        onLoad={onLoad} 
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={ref => (videoPlayer.current = ref)}
        resizeMode="cover"
        source={{
          uri:
            videoURLDisplay,
        }}
        repeat
        style={styles.mediaPlayer}
        volume={0.0}
        resizeMode={screenType}

      />
      <MediaControls
        isFullScreen={isFullScreen}
        duration={duration}
        isLoading={isLoading}
        mainColor="orange"
        onFullScreen={onFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        
      >
        <MediaControls.Toolbar>
          <View style={styles.toolbar}>
            <TouchableOpacity onPress={()=>dismiss()}>
            <Icon style={alignSelf='center'} type="MaterialIcons" name="close" size={22 * widthRatio} color={'white'}/> 

            </TouchableOpacity>

          </View>
        </MediaControls.Toolbar>
      </MediaControls>
      </Animated.View>
      <View style={{flex: 1}}>
        {renderTabView()}
        {renderHeader()}
      </View>
    </LinearGradient>
        
    </>
    );
  
};

const styles = StyleSheet.create({
    container : {
       flex :1,
       backgroundColor : "rgba(0,0,0,0)",
    },
    videoContainer : {
        zIndex : 1
    },
    videoFullScreenContainer : {
        flex : 1
    },
    toolbar: {   
 
       
    },
    mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
    },
    scrollContainer: {
      
      padding: 16,
      
    },
    header: {
      backgroundColor: 'rgba(0,0,0,0)',
      position: 'absolute',
      width: width,
      height : 100,
      left: 0,
      zIndex: 1
    },
    title: {
      marginVertical: 16,
      color: "black",
      fontWeight: "bold",
      fontSize: 24,
      
    },
    label:{
      
      
      fontWeight: "bold",
      fontSize: 16 * widthRatio,
    },
    tab: {elevation: 0, shadowOpacity: 0},
    star : {
      justifyContent : 'flex-start',
      width : '100%',
      marginStart : 8 * widthRatio,
      flexDirection : 'row',
      marginStart : 12.5 * widthRatio,

    },
    courseName:{
      fontWeight: "bold",
      fontSize: 20 * widthRatio,
      marginStart : 12.5 * widthRatio,
      marginTop : 12.5 * widthRatio,
    },
    lightText :{ 
    
      fontFamily: "Helvetica Neue",
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 12 * widthRatio,
      color: '#939cab',
    },
    authorCardContainer: {
      flexDirection : 'row',
      marginVertical : 10 * widthRatio
    },
    authorCard: {
      flexDirection : 'row',
      // width : (width / 3) - (24 * widthRatio) - 12 * widthRatio,
      alignItems : 'center',
      marginHorizontal : 8 * widthRatio,
      paddingVertical : 3 * widthRatio,
      paddingHorizontal : 7 * widthRatio,
      borderRadius : 1000,
    },
    avatarImage:{
      height : 15 * widthRatio,
      borderRadius : 1000,
      aspectRatio : 1,
      marginRight : 3 * widthRatio,
    },
    authorName:{
      
    },
    roundedButton: {
      width : 50 * widthRatio,
      aspectRatio : 1,
      borderRadius: 1000,
      backgroundColor: 'rgba(255,255,255, 0.5)',
      alignItems : 'center',
      justifyContent:'center',
      
    },
    bigButton : {
      alignSelf:'center',
      borderRadius: 5 * widthRatio,
      marginTop : 10 * widthRatio,
      alignItems : 'center', 
      flexDirection: 'row',
      justifyContent : 'center', 
      width:350 * widthRatio,
      backgroundColor: 'rgba(255,255,255, 0.5)',
      aspectRatio : 350/47,
    },
    bookmarkEmpty:{
      width : 350 * widthRatio,
      height: 150 * widthRatio,
      // backgroundColor : 'rgba(38, 50, 56, 0.7)',
      alignItems : 'center',
      alignSelf :'center',
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

