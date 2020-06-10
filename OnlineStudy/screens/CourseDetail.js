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
  Platform
  
} from 'react-native';
// import * as ScreenOrientation from 'expo-screen-orientation';
import { ListItem } from 'react-native-elements'

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
    console.log(data)
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
    const headerHeight = scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: 'clamp'
    });
    const headerTitleOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });
    const heroTitleOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

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
    <View style={styles.container}>
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          {/* <Animated.Text style={{textAlign: 'center', fontSize: 18, color: 'black', marginTop: 28, opacity: headerTitleOpacity}}>{headerTitle}</Animated.Text> */}
          {/* <Animated.Text style={{textAlign: 'center', fontSize: 32, color: 'black', position: 'absolute', bottom: 16, left: 16, opacity: heroTitleOpacity}}>{headerTitle}</Animated.Text> */}
          <Text style={{position :'absolute'}}>{data.courseName}</Text>
        </Animated.View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          onScroll={Animated.event(
            [{ nativeEvent: {
                contentOffset: {
                  y: scrollY
                }
              }
            }])
          }
          scrollEventThrottle={16}>
          <Text style={styles.title}>This is Title</Text>
          <Text style={styles.content}>{str}</Text>
        </ScrollView>
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
        marginTop: StatusBarHeight
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
      paddingTop: HEADER_EXPANDED_HEIGHT
    },
    header: {
      backgroundColor: 'lightblue',
      position: 'absolute',
      width: width,
      top: 0,
      left: 0,
      zIndex: 9999
    },
    title: {
      marginVertical: 16,
      color: "black",
      fontWeight: "bold",
      fontSize: 24
    }
});

