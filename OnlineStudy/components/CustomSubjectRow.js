import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375
const styles = StyleSheet.create({
    container: {
        // flex : 1,
        alignSelf : 'center',
        justifyContent : 'center',
        paddingHorizontal : 8 * widthRatio,
        paddingVertical: 5 * widthRatio,
        borderColor : '#FFE97D',
        borderWidth : 0,
        borderRadius : 1000,
        marginTop : 8 * widthRatio,
        marginLeft  :  12.5 * widthRatio,
        backgroundColor : "rgba(38, 50, 56, 0.7)",
    },
    title : {
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15 * widthRatio,
        color: '#939cab',
        lineHeight: 21 * widthRatio,

    }
});

const CustomSubjectRow= ({ title }) => (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

export default CustomSubjectRow;