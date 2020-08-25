import React from 'react';
import {
  View,Text,ImageBackground,StyleSheet,Dimensions
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ThemeButton from '../Components/ThemeButton';
import ScreenNames from './../Constants/ScreenNames'
const screen = Dimensions.get("screen");
const renderItem = ({item , index}) =>{
  return (
    <View style={{
        backgroundColor:'floralwhite',
        borderRadius: 5,
        height: 400,
        padding: 50,
        marginLeft: 25,
        marginRight: 25, }}>
      {/* todo */}
      <Text style={{fontSize: 30}}>{item.title}</Text>
      <Text>{item.text}</Text>
    </View>
  )
}
const  carouselItems =  [
  {
      title:"Item 1",
      text: "Text 1",
  },
  {
      title:"Item 2",
      text: "Text 2",
  },
  {
      title:"Item 3",
      text: "Text 3",
  },
  {
      title:"Item 4",
      text: "Text 4",
  },
  {
      title:"Item 5",
      text: "Text 5",
  },
]
const LoadingScreen = ({navigation})=>{
    const loginHandler = ()=>{
      
    }
    return (
      <View style={styles.container}>
    <ImageBackground source={require('./../assets/loading.jpg')} style={styles.image}>
        <View style={styles.ImageContainer}> 
        <Text style={styles.text}>Inside</Text>
        <View style ={ { flex: 1, flexDirection:'row', justifyContent: 'center', }}>
        <Carousel
              layout={'stack'}
              data={carouselItems}
              renderItem={renderItem}
              sliderWidth={screen.width}
              itemWidth={350}
              autoplay={true}
              autoplayInterval={1500}
            />
        </View>
       
        <View>
        <ThemeButton onPress={()=>{navigation.navigate(ScreenNames.LogInStack)}} title={'Log In'}/>
        </View>
        
        </View>
      {/* <Text style={styles.text}>Inside</Text> */}
      {/* <ThemeButton onPress={()=>{navigation.navigate(ScreenNames.LogInStack)}} title={'go to login Stack'}/>
          <ThemeButton onPress={()=>{navigation.navigate(ScreenNames.TabStack)}} title={'go to Tab Stack'}/> */}

    </ImageBackground>
  </View>
    )
}
const styles = StyleSheet.create({
  ImageContainer: {
    paddingVertical:20,
    paddingHorizontal:10,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold"
  }
});

export default LoadingScreen;
