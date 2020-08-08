
import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, 
  Dimensions,
  FlatList, 
  Alert,
  TouchableOpacity,
  ImageBackground,
  
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import CourseRow from '../components/CourseRow'
import {CourseRow3} from '../components/CourseRow'
import {AuthContext, ColorThemeContext, UserInfoContext, UserTokenContext, LoginStatusContext} from '../App'
import {PathList} from './BrowseScreen'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LanguageContext} from '../LanguageContext'
const {width, height} = Dimensions.get('window');
const widthRatio = width / 375
export function CourseListVertical ({ itemList, navigation },props) {
    const {colors, setColors} = React.useContext(ColorThemeContext);
    showCourseDetail=(item)=>{
        console.log(item)
        navigation.navigate ('CourseDetail', item)
    };
    
    
    ListEmpty = () => {
        return (
          //View to show when list is empty
          <View style={{...styles.bookmarkEmpty}}>
              <Icon style={alignSelf='center'} type="MaterialIcons" name="bookmark-border" size={70 * widthRatio} color={'#939cab'}/> 
                <Text style={styles.lightDescription}>No courses on this section</Text>
          </View>
        );
      };
    return (
        <View style={styles.bannerList}>
        <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={false}
            
                data={itemList}
                keyExtractor={item => item.key} // 
                ListEmptyComponent={ListEmpty}
                renderItem={({ item }) =>{
                    return (
                        <TouchableOpacity onPress = {()=> showCourseDetail(item)}>
                            <CourseRow3
                            data={item}

                        />
                        </TouchableOpacity>
                        
                    )
                } 
                
            }
            />

    </View>
);
}

export default function  FullCourseScreen({ navigation, route}){
    const {lang, setLang} = React.useContext(LanguageContext);
    const {colors, setColors} = React.useContext(ColorThemeContext);
    const data = route.params
    React.useEffect(() => { 
        navigation.setOptions({ 
            headerTitle: data.headerTitle,
          }) 
    }, [])
    
    console.log(data)
    return (
        <>
        <StatusBar barStyle={colors.statusBar} />
        
        <LinearGradient colors={colors.gradientColor} style = { styles.container }>
            {/* <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                
                
            </ScrollView> */}
            <CourseListVertical itemList={data.courses} navigation={navigation} ></CourseListVertical>
        </LinearGradient>
        
    </>
    );
    
    
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        flexDirection : 'column',
    },
    
    bookmarkEmpty:{
        // flex :1,
        
        // backgroundColor : 'rgba(38, 50, 56, 0.7)',
        alignItems : 'center',
        justifyContent : "center",
        marginVertical : 8 * widthRatio,
        marginHorizontal: 10 * widthRatio,
    },
    
    lightDescription: {
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14 * widthRatio,
        width : '70%',
        color: '#939cab',
        textAlign: 'center'
    }
});

