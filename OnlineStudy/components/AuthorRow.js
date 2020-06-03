import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions,TouchableOpacity, ImageBackground } from 'react-native';
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375
import {ColorThemeContext} from '../App'
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
    }
});

function AuthorRow ({ authorName, avatarURL }){
    const {colors, setColors} = React.useContext(ColorThemeContext);
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri : avatarURL}}/>
            <Text numberOfLines={1} ellipsizeMode='tail' style={{...styles.title, color : colors.textPrimary}}>{authorName}</Text>
        </View>
    );
}
    
    


export default AuthorRow;