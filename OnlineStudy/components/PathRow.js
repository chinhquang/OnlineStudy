import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions,TouchableOpacity, ImageBackground } from 'react-native';
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375
const styles = StyleSheet.create({
    container: {
        
        width : 200 * widthRatio,
        aspectRatio : 3/2,
        alignItems : 'center',
        backgroundColor : 'white',
        marginVertical : 15 * widthRatio,
        marginHorizontal: 10 * widthRatio,
        backgroundColor : "rgba(38, 50, 56, 0.7)",
        
    },
    imageContainer :{
        flex : 0.55,
        // height : '55%',
        width : '100%',
        alignItems: 'center',
        justifyContent : 'center',
        backgroundColor : "rgba(0, 0, 0, 0.2)",
    },
    image : {

        width : '70%',
        height : '100%',
        
        resizeMode : 'contain',
       
    },
    content : {
        flex : 0.45,
        width : '100%',
        
    },
    title : {
        width : '90%',
        marginTop : 5 * widthRatio,
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 12 * widthRatio,
        marginStart : 8 * widthRatio,
        color: '#ffffff',
    },
    courseCountLabel :{ 
        width : '90%',
        marginTop : 3 * widthRatio,
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 10 * widthRatio,
        marginStart : 8 * widthRatio,
        color: '#939cab',
    }
});

const PathRow= ({ title, imageURL, courseCount }) => (
    <View style={styles.container}>
        <View  style={styles.imageContainer}>
            <Image style={styles.image} source={require('../image/icon.png')}/>
        </View >
        <View style={styles.content}>
            <Text  style={styles.title}>{title}</Text>
            <Text style={styles.courseCountLabel}>{courseCount} courses </Text>       
             </View>
    </View>
);

export default PathRow;