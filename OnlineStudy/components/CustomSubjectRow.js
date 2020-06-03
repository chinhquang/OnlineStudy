import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { colors } from 'react-native-elements';
import {ColorThemeContext} from '../App'
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375
const styles = StyleSheet.create({
    container: {
        // flex : 1,
        alignSelf : 'center',
        justifyContent : 'center',
        paddingHorizontal : 8 * widthRatio,
        paddingVertical: 5 * widthRatio,
        
        borderRadius : 1000,
        marginTop : 8 * widthRatio,
        marginLeft  :  12.5 * widthRatio,
    },
    title : {
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15 * widthRatio,
        color: '#ffffff',
        lineHeight: 21 * widthRatio,

    }
});

function  CustomSubjectRow({ title }) {
    const {colors, setColors} = React.useContext(ColorThemeContext);

    return (
        <View style={{...styles.container, backgroundColor:colors.subjectBackgroundColor}}>
        <Text style={styles.title}>{title}</Text>
        </View>
    );
}
   

export default CustomSubjectRow;