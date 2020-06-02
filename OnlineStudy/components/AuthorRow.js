import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions,TouchableOpacity, ImageBackground } from 'react-native';
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375
const styles = StyleSheet.create({
    container: {
        
        flex : 1,
        flexDirection : 'column',
        alignItems : 'center', 
        marginTop : 8 * widthRatio,
        marginLeft  :  12.5 * widthRatio,
    },
    image: {
        width : 70 * widthRatio, 
        aspectRatio : 1,
        borderRadius : 1000
    },
    title : {
        
        width : '90%',
        
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 12 * widthRatio,
        textAlign : 'center',
        color: '#ffffff',
    }
});

const AuthorRow = ({ authorName, avatarURL }) => (
    <View style={styles.container}>
        <Image style={styles.image} source={{uri : avatarURL}}/>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>{authorName}</Text>
    </View>
);

export default AuthorRow;