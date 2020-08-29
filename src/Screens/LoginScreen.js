import React from 'react';
import {
  View,Text,ImageBackground,StyleSheet,Dimensions,Image
} from 'react-native';
import ThemeButton from '../Components/ThemeButton';
import Carousel from 'react-native-snap-carousel';
import ScreenNames from './../Constants/ScreenNames';
import Colors from '../Constants/Colors';

const screen = Dimensions.get("screen");
const renderItem = ({item , index}) =>{
  return (
    <View style={{
        backgroundColor:'floralwhite',
        borderRadius: 10,
        height: 400,
        marginLeft: 25,
        marginRight: 30, }}>
      <View style={{marginBottom:-22}}>
      <Image
        style={{ width: '100%',
    height: '90%',borderTopLeftRadius:10,
    borderTopRightRadius:10,}}
        source={{uri:item.title}}
      />
      </View>

      <Text style={styles.text}>{item.text}</Text>
    </View>
  )
}
const  carouselItems =  [
  {
    title:"https://firebasestorage.googleapis.com/v0/b/fitterme-39927.appspot.com/o/food.jpg?alt=media&token=05e7d672-5cc6-46bf-a96d-7fcf6feb9c1f",
      text: "Explore Foods and Dishes",
    
  },
  {
      title:"https://firebasestorage.googleapis.com/v0/b/fitterme-39927.appspot.com/o/diet.jpg?alt=media&token=ddcbc379-6353-45bf-870a-e9230f31572e",
      text: "Plan your own Diet",
  },
  {
    title: "https://firebasestorage.googleapis.com/v0/b/fitterme-39927.appspot.com/o/calculate.jpg?alt=media&token=382e4f41-9807-4d71-aed6-9aa407f407ed",
    text: "Stay Updated in Numbers",
  },
]
const LoginScreen = ({navigation})=>{
  const loginHandler = ()=>{
      
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./../assets/loading.jpg')} style={styles.image}>
      <View style={styles.ImageContainer}> 
      <View style ={ { flex: 1, flexDirection:'row', justifyContent: 'center',marginTop:40, }}>
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
      <Text style ={{fontSize:30,color:'white', fontFamily:'Pacifico-Regular', textAlign:'center',}}>fitterMe</Text>
      </View>
      <View style={{margin:10,}}>
      <ThemeButton  onPress={()=>{
        navigation.navigate('PhoneLogIn')}} title={'Log In'}/>
      </View>
      </View>

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
  flexDirection: "column",
  justifyContent:'space-evenly',
},
image: {
  flex: 1,
  resizeMode: "contain",
  justifyContent: "center"
},
text: {
  textAlign:'center',
  color: Colors.charcoalGrey80,
  fontSize: 20,
  fontWeight: "bold",
  paddingHorizontal:10,
}
});
export default LoginScreen;