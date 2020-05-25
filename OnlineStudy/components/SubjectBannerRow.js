import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions,TouchableOpacity, ImageBackground } from 'react-native';
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375
const styles = StyleSheet.create({
    container: {
        
        width : 250 * widthRatio,
        aspectRatio : 3,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : 'white',
        marginVertical : 15 * widthRatio,
        marginHorizontal: 10 * widthRatio,
        
    },
    imageBackground: {
        flex: 1,
        width : '100%',
        alignItems : 'center',
        justifyContent : 'center'
    },
    title : {
        // flex : 1,
        // position: 'absolute',
        textAlign : 'center',
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 20 * widthRatio,
        width : '70%',
        color: '#FFFFFF',
    }
});

const SubjectBannerRow= ({ title, url }) => (
    <TouchableOpacity style={styles.container}>
        <ImageBackground style={styles.imageBackground} source={{  uri: 'https://cdnassets.hw.net/dims4/GG/d49288d/2147483647/thumbnail/876x580%3E/quality/90/?url=https%3A%2F%2Fcdnassets.hw.net%2Fac%2Fb4%2F139c93ae4d2eb120b534104656ae%2F42f243baab7043b584071214dde4168b.jpg', }}>
            <Text style={styles.title}>{title}</Text>
        </ImageBackground>
        
    </TouchableOpacity>
);

export default SubjectBannerRow;