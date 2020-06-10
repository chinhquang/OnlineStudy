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
import { TabView, SceneMap } from 'react-native-tab-view';

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
const str = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel ultrices ante. Duis vulputate lorem non tortor pharetra, aliquet aliquet leo efficitur. Ut sed rutrum nisi. Pellentesque facilisis erat sit amet mi ornare, et dapibus tortor congue. Integer vulputate magna a vehicula accumsan. Cras nec nunc consequat, volutpat felis vitae, pulvinar nibh. Vestibulum lacinia in tortor vel maximus. Suspendisse semper dolor ligula. Praesent pellentesque suscipit enim, at dictum nisl pellentesque non. Phasellus nec consectetur magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed condimentum porttitor elit ut dignissim. Nunc nec libero a orci porttitor accumsan eget sed diam. Cras dignissim, nulla sed laoreet accumsan, mi quam egestas mauris, id posuere purus lorem sagittis purus. Duis sollicitudin neque ac aliquet sollicitudin.
In eros est, sollicitudin sit amet risus eget, porttitor pulvinar ipsum. Nulla eget quam arcu. Mauris vel odio cursus, hendrerit augue et, ultricies massa. Phasellus pharetra et libero id semper. Sed sollicitudin commodo mi, nec efficitur sem congue vitae. Ut pellentesque augue ut lacus finibus sollicitudin. Donec a auctor augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam vitae convallis nulla. Maecenas venenatis lorem at mi commodo pharetra. Mauris finibus hendrerit magna, sit amet ultrices turpis aliquet nec. Proin et diam suscipit, sollicitudin risus ac, porta nibh.
Aliquam pretium, elit maximus vehicula lobortis, neque dolor tempor nisl, sit amet interdum erat turpis eu metus. Sed semper libero ac diam finibus, ac interdum orci placerat. Donec nec erat ac erat rhoncus blandit. Nunc felis dui, semper eu porttitor in, porttitor vitae eros. In vel mattis est, vel molestie dui. Nulla semper nisl tempor scelerisque egestas. Duis faucibus, elit id accumsan aliquet, turpis felis scelerisque felis, quis tincidunt felis massa nec eros. Vivamus pellentesque congue velit finibus porttitor. Pellentesque eu mi lacinia sapien fermentum tincidunt sit amet eu nisl. Suspendisse pharetra ex in magna molestie venenatis.
Suspendisse non gravida tortor. Donec tristique ipsum eget arcu aliquet molestie. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam cursus purus eget accumsan maximus. Duis eu iaculis arcu. Donec iaculis, sem vel condimentum maximus, lectus nisl pellentesque dolor, non ullamcorper sapien lectus sed enim. Aenean et leo nisi. Nulla viverra magna id luctus fermentum. Donec et mauris placerat, mollis elit lacinia, cursus lacus. Donec aliquet libero arcu, non consectetur elit maximus sit amet. Quisque lacinia, libero et fermentum rutrum, lorem arcu tincidunt ante, sed iaculis velit tortor non lacus.
Sed accumsan lectus laoreet mollis cursus. Phasellus sagittis vulputate erat, non tempus dui pellentesque vel. Fusce imperdiet nulla vitae mauris facilisis bibendum. Fusce vestibulum fringilla orci, sit amet euismod nunc eleifend id. Curabitur mattis dolor at odio maximus lacinia. Vivamus ornare lorem sed augue faucibus, vel volutpat lacus elementum. Suspendisse potenti.`


const DATA = [
  {
    title: "Main dishes",
    data: ["Pizza", "Burger", "Risotto"]
  },
  {
    title: "Sides",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"]
  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"]
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"]
  }
];
const initialLayout = { width: Dimensions.get('window').width };

const Item = ({ title }) => (
  <View style={styles.itemSection}>
    <Text style={styles.titleSection}>{title}</Text>
  </View>
);

export default function  CourseDetail({ navigation, route}){
    const videoPlayer = useRef(null);
    const [animationValue, setAnimationValue] = React.useState(new Animated.Value(width * 0.5));
    const [viewState, setViewState] = React.useState(true);
    const [scrollY, setScrollY] = React.useState(new Animated.Value(0));
    const {colors, setColors} = React.useContext(ColorThemeContext);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [isFullScreen, setIsFullScreen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [paused, setPaused] = React.useState(true);
    const [playerState, setPlayerState] = React.useState(PLAYER_STATES.PAUSED);
    const [screenType, setScreenType] = React.useState('content');
    const data = route.params
    const toggleAnimation=()=>{
 
        if(viewState == true){
            StatusBar.setHidden(true);
            Animated.timing(animationValue, {
            toValue : height,
            timing : 1500
            }).start(()=>{
                setViewState(false)
            });
        }
        else{
          Animated.timing(animationValue, {
            toValue : width * 0.5,
            timing : 1500
          }).start(setViewState(true)
          );
        }
    }
    const topConstraint = scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
      outputRange: [0, HEADER_COLLAPSED_HEIGHT - HEADER_EXPANDED_HEIGHT],
      extrapolate: 'clamp'
    });
   
    const first = scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT , 9999],
      outputRange: [0,HEADER_COLLAPSED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      useNativeDrive : true,
      extrapolate: 'clamp'
    });
   
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

    handleScroll = (e) => {
        // if (e.nativeEvent.contentOffset.y > HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT ){
          
        //   // setTop (HEADER_COLLAPSED_HEIGHT)
        // } else {
        //   setTop (0)
        // }
    }
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
    ]);

    
    const FirstRoute = () => (
      <View></View>
    );
    
    const SecondRoute = () => (
        <Animated.SectionList
          contentContainerStyle={{...styles.scrollContainer, paddingTop : HEADER_EXPANDED_HEIGHT }}
          style={{marginTop: first}}
          sections={DATA}
          onScroll={Animated.event(
            [{ nativeEvent: {
                contentOffset: {
                  y: scrollY
                }
              }
            }],
            { 
            
              listener: (event) => handleScroll(event)
            }
            )
          }
          scrollEventThrottle={16}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item title={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.headerSection}>{title}</Text>
          )}
        />
    );
    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
    });
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
    <View style={styles.container}>
        <Animated.View style={[styles.header, { top: topConstraint }]}>
            <Text style={{position :'absolute'}}>{data.courseName}</Text>
        </Animated.View>
        
        {/* <TabView
            style={{ marginTop : HEADER_EXPANDED_HEIGHT}}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
          /> */}
        <Animated.SectionList
          contentContainerStyle={{...styles.scrollContainer, paddingTop : HEADER_EXPANDED_HEIGHT }}
          style={{marginTop: first}}
          sections={DATA}
          onScroll={Animated.event(
            [{ nativeEvent: {
                contentOffset: {
                  y: scrollY
                }
              }
            }],
            { 
            
              listener: (event) => handleScroll(event)
            }
            )
          }
          scrollEventThrottle={16}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item title={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.headerSection}>{title}</Text>
          )}
        />
        
        
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
    itemSection: {
      backgroundColor: "#f9c2ff",
      padding: 20,
      marginVertical: 8
    },
    headerSection: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    titleSection: {
      fontSize: 24
    }
});

