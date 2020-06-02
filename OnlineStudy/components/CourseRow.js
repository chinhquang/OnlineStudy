import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions,TouchableOpacity, ImageBackground } from 'react-native';
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375
import { Rating, AirbnbRating } from 'react-native-ratings';

const styles = StyleSheet.create({
    container: {
        
        width : 200 * widthRatio,
        aspectRatio : 3/3.2,
        alignItems : 'center',
        backgroundColor : 'white',
        marginVertical : 8 * widthRatio,
        marginHorizontal: 10 * widthRatio,
        backgroundColor : "rgba(38, 50, 56, 0.7)",
        
    },
    imageContainer :{
        flex : 0.4,
        // height : '55%',
        width : '100%',
        alignItems: 'center',
        justifyContent : 'center',
        backgroundColor : "rgba(0, 0, 0, 0.2)",
    },
    image : {

        width : '100%',
        height : '100%',
        
        resizeMode : 'cover',
       
    },
    content : {
        flex : 0.6,
        width : '100%',
        
    },
    title : {
        width : '90%',
        marginTop : 8 * widthRatio,
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14 * widthRatio,
        marginStart : 8 * widthRatio,
        color: '#ffffff',
    },
    courseCountLabel :{ 
        width : '90%',
        marginTop : 3 * widthRatio,
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 12 * widthRatio,
        marginStart : 8 * widthRatio,
        color: '#939cab',
    },
    star : {
        justifyContent : 'flex-start',
        width : '50%',
        marginStart : 8 * widthRatio,
        flexDirection : 'row',
        alignItems : 'center'
    }
});
const ConcatString = (stringList) => {
    str = ""
    

    for (let i = 0; i < stringList.length; i++) 
    {
        str += stringList[i] 
        if (i != stringList.length - 1){
            str +=  ", "
        }
    }
    return str
 
}

const CourseRow= ({ data }) => (
    
    <View style={styles.container}>
        <View  style={styles.imageContainer}>
            <Image style={styles.image} source={{uri : 'https://cdn.shopify.com/s/files/1/0588/6745/products/sfc1_1480x800.jpg'}}/>
        </View >
        <View style={styles.content}>
            <Text style={styles.title}>{data.courseName}</Text>
            <Text style={styles.courseCountLabel}>{ConcatString(data.authorName)}</Text>    
            <Text style={styles.courseCountLabel}>{data.courseLevel}  -  {data.date}  -  {data.totalDuration}</Text>  
            <View style={styles.star}>
                <AirbnbRating
                    showRating = {false}
                    count={5}
                    defaultRating={ Number(data.averageRating) }
                    size={15 * widthRatio}
                    isDisabled = {true}
                    
                />
                <Text style={styles.courseCountLabel}>({data.totalRating})</Text>  
            </View>
            
        </View>
    </View>
);

export default CourseRow;