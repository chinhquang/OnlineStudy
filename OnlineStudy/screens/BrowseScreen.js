/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar, 
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,FlatList
  
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import CustomButton from '../components/CustomButton'
import CustomRow from '../components/CustomSubjectRow'
import SubjectBannerRow from '../components/SubjectBannerRow'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');
const widthRatio = width / 375
const CustomListSubjectView = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={itemList}
                keyExtractor={item => item.key} // 
                renderItem={({ item }) => <CustomRow
                    title={item.title}
                />}
            />

    </View>
);
const SubjectBannerList = ({ itemList }) => (
    <View style={styles.bannerList}>
        <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            
                data={itemList}
                keyExtractor={item => item.key} // 
                renderItem={({ item }) => <SubjectBannerRow
                    url={item.url}
                    title={item.title}
                />
            }
            />

    </View>
);
export default function  BrowseScreen ({ navigation }){
    getSubjectData = () => {
        return [
          {
            key: 1, title: 'VFX',
            },
          {
            key: 2,
            title: 'Architecture visualizer',
            },
          {
            key: 3, 
            title: 'Hard-surface Modeling',
            },
        {
            key: 4, 
            title: 'Texture',
            },
        ]
    }
    getSubjectBannerData = () => {
        return [
          {
            key: 1,
            title: 'VFX',
            url:'https://cdnassets.hw.net/dims4/GG/d49288d/2147483647/thumbnail/876x580%3E/quality/90/?url=https%3A%2F%2Fcdnassets.hw.net%2Fac%2Fb4%2F139c93ae4d2eb120b534104656ae%2F42f243baab7043b584071214dde4168b.jpg',
            },
          {
            key: 2,
            title: 'Architecture visualizer',
            url: 'https://cdnassets.hw.net/dims4/GG/d49288d/2147483647/thumbnail/876x580%3E/quality/90/?url=https%3A%2F%2Fcdnassets.hw.net%2Fac%2Fb4%2F139c93ae4d2eb120b534104656ae%2F42f243baab7043b584071214dde4168b.jpg',
            
            },
          {
            key: 3, 
            title: 'Hard-surface Modeling',
            url: 'https://cdnassets.hw.net/dims4/GG/d49288d/2147483647/thumbnail/876x580%3E/quality/90/?url=https%3A%2F%2Fcdnassets.hw.net%2Fac%2Fb4%2F139c93ae4d2eb120b534104656ae%2F42f243baab7043b584071214dde4168b.jpg',
            
            },
        {
            key: 4, 
            title: 'Texture', 
            url: 'https://cdnassets.hw.net/dims4/GG/d49288d/2147483647/thumbnail/876x580%3E/quality/90/?url=https%3A%2F%2Fcdnassets.hw.net%2Fac%2Fb4%2F139c93ae4d2eb120b534104656ae%2F42f243baab7043b584071214dde4168b.jpg',
            
            },
        ]
    }
    return (
        <>
        <StatusBar barStyle="light-content" />
        <LinearGradient colors={['rgba(38, 50, 56, 1)', 'rgba(38, 50, 56, 0.7)']} style = { styles.container }>
            
        <ScrollView style={styles.scrollView}>
            
            <View style={styles.preview }>
                <TouchableOpacity>
                    <ImageBackground style={styles.previewImageButton} source={{  uri: 'https://cdnassets.hw.net/dims4/GG/d49288d/2147483647/thumbnail/876x580%3E/quality/90/?url=https%3A%2F%2Fcdnassets.hw.net%2Fac%2Fb4%2F139c93ae4d2eb120b534104656ae%2F42f243baab7043b584071214dde4168b.jpg', }}>
                        <Text style={styles.title}>NEW RELEASES</Text>
                    
                    </ImageBackground>
                    
                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground style={styles.previewImageButton} source={{  uri: 'https://cdn.shopify.com/s/files/1/0588/6745/products/sfc1_1480x800.jpg', }}>
                        <Text style={styles.title}>RECOMMENDED FOR YOU</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            <Text style={styles.headerSection} >Popular skills</Text>
            <CustomListSubjectView itemList={this.getSubjectData()} />
            <SubjectBannerList itemList={this.getSubjectBannerData()}/>
            <View style={styles.coursePathHeaderContainer}>
                <Text style={styles.headerSection}>Path</Text>
                <TouchableOpacity style={styles.seeAllButton}>
                    <Text style={styles.seeAllButtonText}>See all ></Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

        </LinearGradient>
            
        </>
    );
};

const styles = StyleSheet.create({
    bannerList :{
        flex: 1,
        // backgroundColor : 'white',
        
    },
    container : {
        flex : 1,
    },
    scrollView:{
        // backgroundColor : 'rgba(38, 50, 56, 1)'
        flex :1
    },
    preview : {
        alignSelf : 'center',
    },
    coursePathHeaderContainer :{
    //    
        // backgroundColor : 'red',
        flexDirection : "row",
        justifyContent: 'space-between'
    },
    previewImageButton:{
        
        width : 350 * widthRatio,
        aspectRatio : 200/50 * widthRatio,
        marginVertical : 10 * widthRatio,  
        alignItems : 'center',
        justifyContent : 'center'

    },
    
    headerSection :{
        marginLeft : 12.5 * widthRatio,
        // textAlign : 'center',
        fontFamily: "Arial Rounded MT Bold",
        fontStyle: 'normal',
        // fontWeight: 'bold',
        fontSize: 17 * widthRatio,
        marginTop : 18 * widthRatio,
        color: '#FFFFFF',
    },
    seeAllButtonText : {
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15 * widthRatio,
        lineHeight: 21 * widthRatio,

        color: '#939cab',
    },
    seeAllButton : {
        alignSelf : 'center',
        justifyContent : 'center',
        paddingHorizontal : 8 * widthRatio,
        paddingVertical: 5 * widthRatio,
        borderColor : '#FFE97D',
        borderWidth : 0,
        borderRadius : 1000,
        backgroundColor : "rgba(38, 50, 56, 0.7)",
        marginRight : 12.5 * widthRatio,
        marginTop : 18 * widthRatio,
    },
    title : {
        // flex : 1,
        // position: 'absolute',
        textAlign : 'center',
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 25 * widthRatio,
        width : '70%',
        color: '#FFFFFF',
    }

});

