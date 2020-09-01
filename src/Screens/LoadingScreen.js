import React,{useEffect} from 'react';
import {
  View,Text,StyleSheet
} from 'react-native';
import Colors from '../Constants/Colors';
import ScreenNames from './../Constants/ScreenNames';
import auth from '@react-native-firebase/auth';
import LoadingDots from "react-native-loading-dots";
import database from '@react-native-firebase/database';

const LoadingScreen = ({navigation})=>{
  const checkUser = async()=>{
    if(auth().currentUser){
      const phone = await auth().currentUser.phoneNumber;
     await database()
      .ref().child('Users').child(phone)
      .once('value')
      .then(snapshot => {
        if(snapshot.val() && snapshot.val().firstName){
          navigation.navigate(ScreenNames.TabStack);
        }else{
          navigation.navigate(ScreenNames.LogInStack);                                                           
        }
      });
    }else{
     navigation.navigate(ScreenNames.LogInStack);
    }
 }
  useEffect(() => {
    setTimeout(checkUser,3000);
  }, [navigation]);
    return (
      <View style={styles.container}>
       <Text onPress={()=>{
         navigation.navigate(ScreenNames.LogInStack);
       }} style={styles.logoText}>fitterMe</Text>
       <View style={{ width:'10%',paddingVertical:30,marginLeft:'45%'}}>
        <LoadingDots dots={3} colors={['#FFFFFF','#FFFFFF','#FFFFFF']} size={5} />
       </View>
       
      </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    height:'100%',
    backgroundColor:Colors.primaryColorDark,
    justifyContent:'center'
  },
  logoText: {
    color: Colors.white,
    fontSize: 40,
    fontFamily:'Pacifico-Regular',
    textAlign:'center'
  }
});

export default LoadingScreen;
