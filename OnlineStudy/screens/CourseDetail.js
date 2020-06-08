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
  
} from 'react-native';
import { ListItem } from 'react-native-elements'

import LinearGradient from 'react-native-linear-gradient'
import CourseRow from '../components/CourseRow'
import {AuthContext, ColorThemeContext, mainColors} from '../App'
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

const {width, height} = Dimensions.get('window');
const widthRatio = width / 375


  const noop = () => {};
export default function  CourseDetail({ navigation, route}){
    const videoPlayer = useRef(null);

    const {colors, setColors} = React.useContext(ColorThemeContext);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [isFullScreen, setIsFullScreen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [paused, setPaused] = React.useState(false);
    const [playerState, setPlayerState] = React.useState(PLAYER_STATES.PLAYING);
    const [screenType, setScreenType] = React.useState('content');
    const {signOut} = React.useContext(AuthContext);
   
    
    const onSeek = seek => {
        videoPlayer?.current.seek(seek);
      };
    
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
    
    const data = route.params
    console.log(data.authorName)
    const videosample = require('../image/broadchurch.mp4');
    return (
        <>
    <StatusBar barStyle={colors.statusBar} />
    
    <LinearGradient colors={colors.gradientColor} style = { styles.container }>
    
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
      />
      <MediaControls
        isFullScreen={isFullScreen}
        duration={duration}
        isLoading={isLoading}
        mainColor="orange"
        onFullScreen={noop}
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
    </LinearGradient>
        
    </>
    );
  
};

const styles = StyleSheet.create({
    container : {
        flex: 1
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
        backgroundColor: 'rgba(0,0,0,0)',
      },
    
});

