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
  Animated
  
} from 'react-native';
// import * as ScreenOrientation from 'expo-screen-orientation';
import { ListItem } from 'react-native-elements'

import LinearGradient from 'react-native-linear-gradient'
import CourseRow from '../components/CourseRow'
import {AuthContext, ColorThemeContext, mainColors} from '../App'
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

const {width, height} = Dimensions.get('window');
const widthRatio = width / 375




export default function  CourseDetail({ navigation, route}){
    const videoPlayer = useRef(null);
    const [animationValue, setAnimationValue] = React.useState(new Animated.Value(width * 0.5));
    const [viewState, setViewState] = React.useState(true);
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

    
    const {colors, setColors} = React.useContext(ColorThemeContext);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [isFullScreen, setIsFullScreen] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(true);
    const [paused, setPaused] = React.useState(true);
    const [playerState, setPlayerState] = React.useState(PLAYER_STATES.PAUSED);
    const [screenType, setScreenType] = React.useState('content');
    const {signOut} = React.useContext(AuthContext);
   
    
    const onSeek = seek => {
        videoPlayer?.current.seek(seek);
    };
    const onFullScreen = () =>{
        // if (screenType == 'content'){
        //     setScreenType('cover')
        // }else {
        //     setScreenType('content')
        // }

        toggleAnimation()
    }
    const onPaused = playerState => {
        setPaused(!paused);
        setPlayerState(playerState);
    };
    // const isPortrait = () => {
    //     const dim = Dimensions.get('screen');
    //     return dim.height >= dim.width;
    //   };
   
    // const [orientation, setOrientation] = React.useState(isPortrait() ? 'portrait' : 'landscape')
    // Dimensions.addEventListener('change', () => {
    //     setOrientation(isPortrait() ? 'portrait' : 'landscape')
    // });
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
          {/* <View style={styles.toolbar}>
            <Text>I'm a custom toolbar </Text>
          </View> */}
        </MediaControls.Toolbar>
      </MediaControls>
    </Animated.View>
    
    </LinearGradient>
        
    </>
    );
  
};

const styles = StyleSheet.create({
    container : {
        flex: 1
    },
    videoContainer : {
        
    },
    videoFullScreenContainer : {
        flex : 1
    },
    toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
    },
    
});

