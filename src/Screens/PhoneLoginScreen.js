import React, { useState, useEffect } from 'react';
import { Button, TextInput, View, Text,StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import ThemeButton from './../Components/ThemeButton'
import ThemeNumberInput from '../Components/ThemeNumberInput';
import Colors from '../Constants/Colors';
import Loader from '../Components/Loader';
import database from '@react-native-firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../react-redux/actions';

const PhoneLoginScreen = ({navigation})=>{
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [phone, setPhone] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [loader, setLoader] = useState(false);
  const [code, setCode] = useState('');
  const [invalidOTP,setInvalidOTP] = useState(false);
  const dispatch = useDispatch();
  
  const isDarkMode = useSelector((state) => state.isDarkMode);

  const styles = StyleSheet.create({
    container: {
     paddingVertical:20,
     paddingHorizontal:15,
     backgroundColor: isDarkMode
        ? Colors.backgroundColorDark
        : Colors.backgroundColorLight,
     height: '100%',
    },
    heading: {
      fontSize:30,
      color:isDarkMode ? Colors.gray : Colors.charcoalGrey80,
      textAlign:'center',
      padding:20,
      marginBottom:20,
      fontFamily: 'Karla-Bold',
    },
    text:{
      textAlign:'center',
      fontSize:12.5,
      paddingHorizontal:10,
      fontFamily: 'Karla-Regular',
      color: isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80,
    },
    horizontal:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'flex-end',
      marginTop:10,
    },
  });

  const checkUser = () => {
    database()
    .ref('/Users').child(`+91${phone}`)
    .once('value')
    .then(snapshot => {
      if(snapshot.val() && snapshot.val().firstName){
        dispatch(setUser(snapshot.val()));
        navigation.navigate('Welcome');
      }else{
        navigation.navigate('SignUp')
      }
    });
  }

  async function signInWithPhoneNumber(phoneNumber) {
    setLoader(true);
    if(phone.length < 10){
      setLoader(false);
      setIsValidPhone(false);
    }else{
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setIsOtpSent(true);
      setLoader(false);
      setConfirm(confirmation);
    }
  }

  async function confirmCode() {
    setLoader(true);
    setInvalidOTP(false);
    if(code) {
        try {
        await confirm.confirm(code);
        setLoader(false);
        checkUser();
      } catch (error) {
        setLoader(false);
        setInvalidOTP(true);
      }
    } else {
      console.log("enter the OTP u dumb fuck")
      setLoader(false);
      setInvalidOTP(true);
    }
    
  }
  function onAuthStateChanged(user) {
    if (user) {
      setLoader(false);
      checkUser();
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  if (!isOtpSent) {
    return (
      <>
       <Loader show={loader} text={"Please Wait..."}/>
      <View style ={styles.container}>
      <Text style = {styles.heading}>Log In</Text>
      <Text style = {styles.text}>Enter your 10 digits Phone Number:</Text>
          <View style = {styles.horizontal}>
          <Text style={{fontSize:16, paddingBottom:6.5,fontFamily:'Karla-Regular',color: isDarkMode ? Colors.textColorDark : Colors.charcoalGreyMediocre}}>+91 -</Text>
          <View style={{minWidth:'30%'}}>
          <ThemeNumberInput keyboard={'number-pad'} maxLength={10} onChangeText = {(text)=>{setPhone(text)}} placeholder={' 9876543210 '} placeholderTextColor={isDarkMode ? '#666666' : Colors.charcoalGrey80} value={phone}/>
          </View>
          </View>
              {!isValidPhone && <Text style={{color:'red', fontSize:10,padding:5, textAlign:'center'}}>Invalid Phone Number!</Text>}
            <View style={{marginTop:50,marginHorizontal:20,}}>
            <ThemeButton
            title="Send OTP"
            onPress={() => signInWithPhoneNumber(`+91${phone}`)}
          />
          </View>
        </View>
      </>
    );
  }

  return (
    <View style ={styles.container}>
    <Loader show={loader} text={"Logging you In..."}/>
      <Text style = {styles.heading}>Verify your Mobile</Text>
      <Text style = {styles.text}>Enter the OTP sent to +91-{phone}</Text>
          <View style = {styles.horizontal}>
          <View style={{minWidth:'21%'}}>
          <ThemeNumberInput keyboard={'number-pad'} maxLength={6} value={code} onChangeText={text => setCode(text)} placeholder={' 123456 '} placeholderTextColor={isDarkMode ? '#666666' : Colors.charcoalGrey80} />
          </View>
          </View>
          {invalidOTP && <Text style={{color:'red', fontSize:10,padding:5, textAlign:'center'}}>Invalid OTP! Try Again...</Text>}

         
         <View style={{marginTop:50,marginHorizontal:20,}}>
         <ThemeButton
        title="Log In"
        onPress={() => confirmCode()}
      />
         </View>
       <Text onPress={()=>{setIsOtpSent(false)}} style={{color:Colors.primaryColorDark , textAlign:'center', fontSize:13,padding:15}}>Change Phone Number</Text>
      </View>
  );
}
export default PhoneLoginScreen;
