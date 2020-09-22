import React,{useState} from 'react';
import {
  View,Text,Button,StyleSheet
} from 'react-native';
import ThemeButton from '../Components/ThemeButton';
import ThemeTextInput from '../Components/ThemeTextInput';
import ScreenNames from './../Constants/ScreenNames';
import Colors from './../Constants/Colors';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {TextInput} from 'react-native-paper'

const SignUpScreen = ({navigation})=>{
  const [firstName , setFirstName] = useState('');
  const [lastName , setLastName] = useState('');
  const [email , setEmail] = useState('');

  const setUserData=()=>{
    if(firstName && lastName && email){
      let user = {
        firstName : firstName,
        lastName : lastName,
        email : email,
     };
     const phone = auth().currentUser.phoneNumber;
     database().ref('/Users').child(phone).set(user).then(()=>{
       navigation.navigate('Welcome');
     })
    }else{
      alert('please add all the info');
    }    
  }

    return (
      <>
      <View style ={styles.container}>
      <Text style = {styles.heading}>Please Introduce yourself</Text>
      <View style={styles.formContainer} > 
            <TextInput mode = 'outlined' 
                  theme={{ colors: { primary:Colors.primaryColorDark}}}
              label="First Name" value={firstName} onChangeText={(n)=>{setFirstName(n)}}/>
      </View>
      <View style={styles.formContainer} > 
            <TextInput mode = 'outlined' theme={{ colors: { primary:Colors.primaryColorDark}}}  label="Last Name" value={lastName} onChangeText={(n)=>{setLastName(n)}}/>
      </View>
      <View style={styles.formContainer} > 
            <TextInput mode = 'outlined' theme={{ colors: { primary:Colors.primaryColorDark}}}  label="Email" value={email} onChangeText={(n)=>{setEmail(n)}}/>
      </View>
      </View>
      <View style ={{padding:20}}>
        <ThemeButton title={'Sign Up'} onPress={()=>{
          setUserData();
        }}/>
      </View>
      </>  
    )
}
export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
   paddingVertical:20,
   paddingHorizontal:15,
  },
  heading: {
    fontSize:32,
    color:Colors.charcoalGrey80,
    textAlign:'center',
    padding:20,
    marginBottom:20,
    fontFamily: 'Karla-Bold',
  },
  label:{
    fontFamily: 'Karla-Bold',
    fontSize:15,
    paddingHorizontal:5,
    color:Colors.charcoalGrey80,
  },
  formContainer:{
    paddingTop:30,
  }
});