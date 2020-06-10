/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component, useState, useRef } from 'react';
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
  Animated,
  Platform,
  SectionList
} from 'react-native';
// import * as ScreenOrientation from 'expo-screen-orientation';
import { ListItem } from 'react-native-elements'
import { TabView, SceneMap, TabBar} from 'react-native-tab-view';

import LinearGradient from 'react-native-linear-gradient'
import CourseRow from '../components/CourseRow'
import {AuthContext, ColorThemeContext, mainColors} from '../App'
import {StatusBarHeight} from '../utils/Dimension'
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');
const widthRatio = width / 375
const HEADER_EXPANDED_HEIGHT = 200 * widthRatio;
const HEADER_COLLAPSED_HEIGHT = 60 * widthRatio;
const TabBarHeight = 48;
const HeaderHeight = 300;
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
          <Text>{'Header'}</Text>
        </Animated.View>
      );
    };
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
        <Text style={[styles.label, {opacity: focused ? 1 : 0.8}]}>
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
            style={styles.tab}
            renderLabel={renderLabel}
            indicatorStyle={{backgroundColor : colors.buttonColor}}
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
       flex :1 
    },
    videoContainer : {
        marginTop: StatusBarHeight,
        zIndex : 2
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
      // paddingTop: HEADER_EXPANDED_HEIGHT,
      
    },
    header: {
      backgroundColor: 'rgba(0,0,0,0)',
      position: 'absolute',
      width: width,
      height : HEADER_EXPANDED_HEIGHT,
      left: 0,
      zIndex: -1
    },
    title: {
      marginVertical: 16,
      color: "black",
      fontWeight: "bold",
      fontSize: 24,
      
    },
    label:{
      
      color: "white",
      fontWeight: "bold",
      fontSize: 16 * widthRatio,
    },
    tab: {elevation: 0, shadowOpacity: 0, backgroundColor: "rgba(38, 50, 56, 0.7)"},
    
});

