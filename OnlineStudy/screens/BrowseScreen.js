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
  ImageBackground,FlatList, List
  
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import CustomRow from '../components/CustomSubjectRow'
import SubjectBannerRow from '../components/SubjectBannerRow'
import PathRow  from '../components/PathRow'
import AuthorRow from '../components/AuthorRow'
import {ColorThemeContext} from '../App.js'

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
export const CustomListSubjectView = ({ itemList }) => (
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
export const SubjectBannerList = ({ itemList }) => (
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
export const PathList = ({ itemList }) => (
    <View style={styles.bannerList}>
        <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            
                data={itemList}
                keyExtractor={item => item.key} // 
                renderItem={({ item }) => <PathRow
                
                    title={item.title}

                    imageURl={item.imgURL} 
                    courseCount={item.courseCount}
                />
            }
            />

    </View>
);
export const CourseList = ({ itemList }) => (
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
export const TopAuthorList = ({ itemList }) => (
    <View style={styles.bannerList}>
        <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            
                data={itemList}
                keyExtractor={item => item.key} // 
                renderItem={({ item }) => <AuthorRow
                
                    authorName={item.authorName}

                    avatarURL={item.avatarURL} 
                />
            }
            />

    </View>
);
export default function  BrowseScreen ({ navigation }){
    const {colors, setColors} = React.useContext(ColorThemeContext);

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
            url:"https://cdnassets.hw.net/dims4/GG/d49288d/2147483647/thumbnail/876x580%3E/quality/90/?url=https%3A%2F%2Fcdnassets.hw.net%2Fac%2Fb4%2F139c93ae4d2eb120b534104656ae%2F42f243baab7043b584071214dde4168b.jpg",
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
    getPathData = () =>{
        return [
            {
                key: 1,
                title: 'Querying Data with SQL from PostgreSQL',
                imageURL:'https://cdnassets.hw.net/dims4/GG/d49288d/2147483647/thumbnail/876x580%3E/quality/90/?url=https%3A%2F%2Fcdnassets.hw.net%2Fac%2Fb4%2F139c93ae4d2eb120b534104656ae%2F42f243baab7043b584071214dde4168b.jpg',
                courseCount : 6,
            },
            {
                key: 2,
                title: 'Querying Data with SQL from PostgreSQL',
                imageURL:'https://cdnassets.hw.net/dims4/GG/d49288d/2147483647/thumbnail/876x580%3E/quality/90/?url=https%3A%2F%2Fcdnassets.hw.net%2Fac%2Fb4%2F139c93ae4d2eb120b534104656ae%2F42f243baab7043b584071214dde4168b.jpg',
                courseCount : 6,
            },
        ]
    }

    getAuthorData = () =>{
        return [
            {
                key: 1,
                authorName: 'Blender Guru',
                avatarURL: 'https://miro.medium.com/max/3150/1*_MCtd8Oxiy2kR-MdaBp7hQ.jpeg'
            },
            {
                key: 2,
                authorName: 'Blender Guru',
                avatarURL: 'https://miro.medium.com/max/3150/1*_MCtd8Oxiy2kR-MdaBp7hQ.jpeg'
            },
            {
                key: 3,
                authorName: 'Blender Guru',
                avatarURL: 'https://miro.medium.com/max/3150/1*_MCtd8Oxiy2kR-MdaBp7hQ.jpeg'
            },
          
        ]
    }
    return (
        <>
        <StatusBar barStyle={colors.statusBar}/>
        
        <LinearGradient colors={colors.gradientColor} style = { styles.container }>
            
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            
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
            <Text style={{...styles.headerSection, color: colors.textPrimary}} >Popular skills</Text>
            <CustomListSubjectView itemList={this.getSubjectData()} />
            <SubjectBannerList itemList={this.getSubjectBannerData()}/>
            <View style={styles.coursePathHeaderContainer}>
                <Text style={{...styles.headerSection, color: colors.textPrimary}}>Path</Text>
                <TouchableOpacity style={{...styles.seeAllButton, backgroundColor: colors.smallButtonBackgroundColor}}>
                    <Text style={styles.seeAllButtonText}>See all ></Text>
                </TouchableOpacity>
            </View>
            <PathList itemList={this.getPathData()}></PathList>
            <Text style={{...styles.headerSection, color: colors.textPrimary}}>Top Authors</Text>
            <TopAuthorList itemList={this.getAuthorData()}></TopAuthorList>
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
        justifyContent: 'space-between',
    },
    previewImageButton:{
        
        width : 350 * widthRatio,
        aspectRatio : 200/50 * widthRatio,
        marginVertical : 10 * widthRatio,  
        alignItems : 'center',
        justifyContent : 'center',
        

    },
    
    headerSection :{
        marginLeft : 12.5 * widthRatio,
        // textAlign : 'center',
        fontFamily: "Arial Rounded MT Bold",
        fontStyle: 'normal',
        // fontWeight: 'bold',
        fontSize: 17 * widthRatio,
        marginTop : 15 * widthRatio,
    },
    seeAllButtonText : {
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 12 * widthRatio,
        lineHeight: 21 * widthRatio,

        color: '#ffffff',
    },
    seeAllButton : {
        alignSelf : 'center',
        justifyContent : 'center',
        paddingHorizontal : 8 * widthRatio,
        paddingVertical: 1 * widthRatio,
        borderColor : "#939cab",
        borderWidth : 1,
        backgroundColor : "#4f525c",
        borderRadius : 1000,
        
        marginRight : 12.5 * widthRatio,
        marginTop : 15 * widthRatio,
        
    },
    title : {
        textAlign : 'center',
        fontFamily: "Helvetica Neue",
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 25 * widthRatio,
        width : '70%',
        color: '#FFFFFF',
    }

});

