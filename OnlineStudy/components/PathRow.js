import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions,TouchableOpacity, ImageBackground } from 'react-native';
import {ColorThemeContext} from "../App"
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375
const styles = StyleSheet.create({
    container: {
        
        width : 200 * widthRatio,
        aspectRatio : 3/2,
        alignItems : 'center',
        backgroundColor : 'white',
        marginVertical : 8 * widthRatio,
        marginHorizontal: 10 * widthRatio,
        
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

function PathRow({ title, imageURL, courseCount }) {
    const {colors, setColors} = React.useContext(ColorThemeContext);
    return(
        <View style={{...styles.container, backgroundColor : "rgba(38, 50, 56, 0.7)"}}>
        <View  style={styles.imageContainer}>
            <Image style={styles.image} source={require('../image/icon.png')}/>
        </View >
        <View style={styles.content}>
            <Text style={{...styles.title, color: "#ffffff",}}>{title}</Text>
            <Text style={styles.courseCountLabel}>{courseCount} courses </Text>       
             </View>
    </View>
    );
}
    


export default PathRow;