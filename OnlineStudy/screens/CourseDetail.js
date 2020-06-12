/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component, useState, useRef } from 'react';
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
  TouchableHighlight,TouchableNativeFeedback, TouchableOpacity
} from 'react-native';

// import {TouchableOpacity} from 'react-native-gesture-handler'
const str = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel ultrices ante. Duis vulputate lorem non tortor pharetra, aliquet aliquet leo efficitur. Ut sed rutrum nisi. Pellentesque facilisis erat sit amet mi ornare, et dapibus tortor congue. Integer vulputate magna a vehicula accumsan. Cras nec nunc consequat, volutpat felis vitae, pulvinar nibh. Vestibulum lacinia in tortor vel maximus. Suspendisse semper dolor ligula. Praesent pellentesque suscipit enim, at dictum nisl pellentesque non. Phasellus nec consectetur magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed condimentum porttitor elit ut dignissim. Nunc nec libero a orci porttitor accumsan eget sed diam. Cras dignissim, nulla sed laoreet accumsan, mi quam egestas mauris, id posuere purus lorem sagittis purus. Duis sollicitudin neque ac aliquet sollicitudin.
In eros est, sollicitudin sit amet risus eget, porttitor pulvinar ipsum. Nulla eget quam arcu. Mauris vel odio cursus, hendrerit augue et, ultricies massa. Phasellus pharetra et libero id semper. Sed sollicitudin commodo mi, nec efficitur sem congue vitae. Ut pellentesque augue ut lacus finibus sollicitudin. Donec a auctor augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam vitae convallis nulla. Maecenas venenatis lorem at mi commodo pharetra. Mauris finibus hendrerit magna, sit amet ultrices turpis aliquet nec. Proin et diam suscipit, sollicitudin risus ac, porta nibh.
Aliquam pretium, elit maximus vehicula lobortis, neque dolor tempor nisl, sit amet interdum erat turpis eu metus. Sed semper libero ac diam finibus, ac interdum orci placerat. Donec nec erat ac erat rhoncus blandit. Nunc felis dui, semper eu porttitor in, porttitor vitae eros. In vel mattis est, vel molestie dui. Nulla semper nisl tempor scelerisque egestas. Duis faucibus, elit id accumsan aliquet, turpis felis scelerisque felis, quis tincidunt felis massa nec eros. Vivamus pellentesque congue velit finibus porttitor. Pellentesque eu mi lacinia sapien fermentum tincidunt sit amet eu nisl. Suspendisse pharetra ex in magna molestie venenatis.
Suspendisse non gravida tortor. Donec tristique ipsum eget arcu aliquet molestie. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam cursus purus eget accumsan maximus. Duis eu iaculis arcu. Donec iaculis, sem vel condimentum maximus, lectus nisl pellentesque dolor, non ullamcorper sapien lectus sed enim. Aenean et leo nisi. Nulla viverra magna id luctus fermentum. Donec et mauris placerat, mollis elit lacinia, cursus lacus. Donec aliquet libero arcu, non consectetur elit maximus sit amet. Quisque lacinia, libero et fermentum rutrum, lorem arcu tincidunt ante, sed iaculis velit tortor non lacus.
Sed accumsan lectus laoreet mollis cursus. Phasellus sagittis vulputate erat, non tempus dui pellentesque vel. Fusce imperdiet nulla vitae mauris facilisis bibendum. Fusce vestibulum fringilla orci, sit amet euismod nunc eleifend id. Curabitur mattis dolor at odio maximus lacinia. Vivamus ornare lorem sed augue faucibus, vel volutpat lacus elementum. Suspendisse potenti.`
import { ListItem } from 'react-native-elements'
import { TabView, SceneMap, TabBar} from 'react-native-tab-view';
import { Rating, AirbnbRating } from 'react-native-ratings';

import LinearGradient from 'react-native-linear-gradient'
import CourseRow from '../components/CourseRow'
import {AuthContext, ColorThemeContext, mainColors} from '../App'
import {StatusBarHeight} from '../utils/Dimension'
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');
const widthRatio = width / 375
const TabBarHeight = 48 * widthRatio;
const HeaderHeight = 405 * widthRatio;
const tab1ItemSize = (Dimensions.get('window').width - 30) / 2;
const tab2ItemSize = (Dimensions.get('window').width - 40) / 3;

class TabScene extends React.Component {
  render = () => {
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
    } = this.props;
    console.log('Sticky ' + stickyHeaderIndices)
    return (
      <Animated.FlatList
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
        // ListHeaderComponent={() => <View style={{height: 10}} />}
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
  };
}
export default function  CourseDetail({ navigation, route}){
    const videoPlayer = useRef(null);
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
    const data = route.params
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    console.log(data)
    const [tab1Data, setData1]=  useState([
      { name: "Movies", header: true },
      { name: "Interstellar", header: false },
      { name: "Dark Knight", header: false },
      { name: "Pop", header: false },
      { name: "Pulp Fiction", header: false },
      { name: "Burning Train", header: false },
      { name: "Music", header: true },
      { name: "Adams", header: false },
      { name: "Nirvana", header: false },
      { name: "Amrit Maan", header: false },
      { name: "Oye Hoye", header: false },
      { name: "Eminem", header: false },
      { name: "Places", header: true },
      { name: "Jordan", header: false },
      { name: "Punjab", header: false },
      { name: "Ludhiana", header: false },
      { name: "Jamshedpur", header: false },
      { name: "India", header: false },
      { name: "People", header: true },
      { name: "Jazzy", header: false },
      { name: "Appie", header: false },
      { name: "Baby", header: false },
      { name: "Sunil", header: false },
      { name: "Arrow", header: false },
      { name: "Things", header: true },
      { name: "table", header: false },
      { name: "chair", header: false },
      { name: "fan", header: false },
      { name: "cup", header: false },
      { name: "cube", header: false }
    ])
    const [description, setDescriptionExpand ] = useState(0)
    const [stickyHeaderIndices, setStickyHeaderIndices] = React.useState([])
    const [tabIndex, setIndex] = useState(0);
    const [routes] = useState([
      {key: 'tab1', title: 'Content'},
      {key: 'tab2', title: 'Transcript'},
    ]);
    // const [tab1Data] = useState(Array(40).fill(0));
    const [tab2Data] = useState(Array(30).fill(0));
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
  
    const renderHeader = () => {
      const y = scrollY.interpolate({
        inputRange: [0, HeaderHeight],
        outputRange: [0, -HeaderHeight],
        extrapolateRight: 'clamp',
      });
      return (
        <Animated.View style={[styles.header, {transform: [{translateY: y}]}]}>
          <Text style={{...styles.courseName, color : colors.textPrimary}}>{data.courseName}</Text>
          <View style={styles.authorCardContainer}>
            {
              data.author.map(( item, key ) =>(
                <>
                  <View style={{...styles.authorCard, backgroundColor: colors.subjectBackgroundColor}}>
                    <Image style={styles.avatarImage} source={{uri : item.avatarURL}}/>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{color : 'white',fontSize : 12 * widthRatio}}>{item.authorName}</Text>
                  </View>
                </>
              )  
              )   
            }
          </View>

          <View style={styles.star}>
            <Text style={styles.lightText} >{data.courseLevel} - {data.date} - {data.totalDuration}</Text>
            <AirbnbRating
                showRating = {false}
                count={5}
                defaultRating={ Number(data.averageRating)}
                size={9 * widthRatio}
                starContainerStyle={{marginHorizontal : 10 * widthRatio}}
                isDisabled = {true}
            />
            <Text style={styles.lightText}>({data.totalRating})</Text>  
          </View>
          {/* <View style={{justifyContent: 'center',flexDirection: 'row', alignSelf: 'stretch', marginTop : 10 * widthRatio, textAlignVertical :'center'}}>
            <Text numberOfLines={description} ellipsizeMode='tail' style={{...styles.lightText,marginStart : 10* widthRatio,width : 320 * widthRatio}}>{str}</Text>
            <TouchableOpacity style={{width: 30 * widthRatio, borderRadius : 4 * widthRatio, backgroundColor : 'rgba(255,255,255, 0.5)', alignItems: 'center',justifyContent: 'center', marginLeft : 10 * widthRatio, height : '100%'}} onPress={()=>this.expandText()}>
              <Icon type="MaterialIcons" name="keyboard-arrow-down" size={22 * widthRatio} color={colors.textPrimary}/> 

            </TouchableOpacity>
          </View> */}
          <View style={{flexDirection:'row', justifyContent:'space-evenly', marginVertical : 10 * widthRatio}}>
            <TouchableOpacity style={{alignItems : 'center'}}>
              <View style={{...styles.roundedButton}}>   
                 <Icon style={alignSelf='center'} type="MaterialIcons" name="bookmark-border" size={35} color={colors.textPrimary}/>
              </View>
              <Text style={{color:colors.textPrimary, fontSize : 13 * widthRatio}}>Bookmark</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems : 'center'}}>
              <View style={{...styles.roundedButton}}>   
                 <Icon style={alignSelf='center'} type="MaterialIcons" name="wifi-tethering" size={35} color={colors.textPrimary}/>
              </View>
              <Text style={{color:colors.textPrimary, fontSize : 13 * widthRatio}}>Add to channel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems : 'center'}}>
              <View style={{...styles.roundedButton}}>   
                 <Icon style={alignSelf='center'} type="MaterialIcons" name="file-download" size={35} color={colors.textPrimary}/>
              </View>
              <Text style={{color:colors.textPrimary, fontSize : 13 * widthRatio}}>Download</Text>
            </TouchableOpacity>
          </View>
          
          <View style={{height: 1, width: 350 * widthRatio, backgroundColor : '#939cab', marginVertical : 10 * widthRatio, alignSelf : 'center'}}></View>
          <View style={{justifyContent: 'center',flexDirection: 'row', alignSelf: 'stretch', marginTop : 10 * widthRatio, textAlignVertical :'center', height : 55}}>
            <ScrollView>
              <Text numberOfLines={description} ellipsizeMode='tail' style={{fontSize: 15 * widthRatio,marginStart : 10 * widthRatio,width : 350 * widthRatio, color: colors.textPrimary}}>{str}</Text>
            </ScrollView>    
          </View>
          <TouchableOpacity style={styles.bigButton}>
              <Icon style={alignSelf='center'} type="MaterialIcons" name="format-list-bulleted" size={35} color={colors.textPrimary}/>
              
              <Text style={{marginLeft: 5 * widthRatio, color:colors.textPrimary, fontSize : 13 * widthRatio}}>Related paths and courses</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bigButton}>
              <Icon style={alignSelf='center'} type="MaterialIcons" name="playlist-add-check" size={35} color={colors.textPrimary}/>
              
              <Text style={{marginLeft: 5 * widthRatio ,color:colors.textPrimary, fontSize : 13 * widthRatio}}>Take a learning check</Text>
          </TouchableOpacity>
        </Animated.View>
      );
    };

    expandText = () => {
      if (description == 0){
        setDescriptionExpand (3)
      }else {
        setDescriptionExpand (0)
      }
    }
    const renderTab1Item = ({item, index}) => {
      return (
        <View
          style={{
            
            width: 350 * widthRatio,

            height: tab1ItemSize,
            backgroundColor: '#000000',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {
              item.header 
              ? <Text style={{color : 'white', fontWeight:'bold', fontSize : 20*widthRatio}}>{item.name}</Text> 
              : <Text style={{color : 'white'}}>{item.name}</Text>
            }
          
        </View>
      );
    };
  
    const renderTab2Item = ({item, index}) => {
      return (
        <View
          style={{
            marginLeft: index % 3 === 0 ? 0 : 10,
            borderRadius: 16,
            width: tab2ItemSize,
            height: tab2ItemSize,
            backgroundColor: '#aaa',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>{index}</Text>
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
          data = tab1Data;
          renderItem = renderTab1Item;
          stickyHeader = stickyHeaderIndices
          break;
        case 'tab2':
          numCols = 1;
          data = tab2Data;
          renderItem = renderTab2Item;
          break;
        default:
          return null;
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
      var arr = [];
      tab1Data.map(obj => {
        if (obj.header == true) {
          arr.push(tab1Data.indexOf(obj));
        }
      });
      arr.push(0);
      setStickyHeaderIndices(arr);


      scrollY.addListener(({value}) => {
        const curRoute = routes[tabIndex].key;
        listOffset.current[curRoute] = value;
      });
      return () => {
        scrollY.removeAllListeners();
      };
      
    }, [routes, tabIndex]);
   
    // const [top, setTop] = useState( new Animated.Value(0))
   

    const headerTitle = 'HEADER'
    dismiss = () =>{
      navigation.goBack()
        
    }   
    
    const onSeek = seek => {
        videoPlayer?.current.seek(seek);
    };
    const onFullScreen = () =>{
        // if (screenType == 'content'){
        //     setScreenType('cover')
        // }else {
        //     setScreenType('content')
        // }
        videoPlayer.current.presentFullscreenPlayer()
        // toggleAnimation()
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
    // Uncomment this line if you choose repeat=false in the video player
    // setPlayerState(PLAYER_STATES.ENDED);
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
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
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
      //  marginTop: StatusBarHeight,
    },
    videoContainer : {
        // marginTop: StatusBarHeight,
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
      paddingHorizontal : 4 * widthRatio,
      borderRadius : 1000,
      paddingRight : 4 * widthRatio,
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
});

