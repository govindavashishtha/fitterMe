import React,{useState} from 'react';
import {
  View,Text,Button,StyleSheet
} from 'react-native';
import ThemeButton from '../Components/ThemeButton';
import ThemeTextInput from '../Components/ThemeTextInput';
import ScreenNames from './../Constants/ScreenNames';
import Colors from './../Constants/Colors';

const SignUpScreen = ({navigation})=>{
  const [firstName , setFirstName] = useState('');
  const [lastName , setLastName] = useState('');
  const [email , setEmail] = useState('');


    return (
      <>
      <View style ={styles.container}>
      <Text style = {styles.heading}>Please Introduce yourself</Text>
      <View style={styles.formContainer} > 
            <Text style ={styles.label}>First Name</Text>
            <ThemeTextInput placeholder={'Govinda'} value={firstName} onChangeText={(n)=>{setFirstName(n)}}/>
      </View>
      <View style={styles.formContainer} > 
            <Text style ={styles.label}>Last Name</Text>
            <ThemeTextInput  placeholder={'Vashishtha'} value={lastName} onChangeText={(n)=>{setLastName(n)}}/>
      </View>
      <View style={styles.formContainer} > 
            <Text style ={styles.label}>Email</Text>
            <ThemeTextInput  placeholder={'abcd@xyz.com'} value={email} onChangeText={(n)=>{setEmail(n)}}/>
      </View>
      </View>
      <View>
        <ThemeButton onPress={()=>{
          //todo >>>> make a welcome Screen which can go to TabNavigator
          //navigation.navigate('welcome');
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