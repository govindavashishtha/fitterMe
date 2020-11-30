import React,{useState} from 'react';
import {
  View,Text,StyleSheet,
  ScrollView
} from 'react-native';
import ThemeButton from '../Components/ThemeButton';
import Colors from './../Constants/Colors';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {TextInput, RadioButton} from 'react-native-paper'
import DatePicker from 'react-native-datepicker';
import { setUser } from '../react-redux/actions';
import {useDispatch} from 'react-redux';
import ThemeButtonDisabled from '../Components/ThemeButtonDisabled';
import Loader from '../Components/Loader';

const SignUpScreen = ({navigation})=>{
  const [firstName , setFirstName] = useState('');
  const [lastName , setLastName] = useState('');
  const [email , setEmail] = useState('');
  const [gender , setGender] = useState('Male');
  const [dob , setDob] = useState('');
  const [weight , setWeight] = useState('');
  const [height , setHeight] = useState('');
  const [loader , setLoader] = useState(false);
  const dispatch = useDispatch();

  const setUserData=()=>{
    if(firstName && lastName && email && gender && dob && weight && height){
      let user = {
        firstName : firstName,
        lastName : lastName,
        email : email,
        gender : gender,
        dob : dob,
        weight : weight,
        height : height,
     };
     const phone = auth().currentUser.phoneNumber;
     database().ref('/Users').child(phone).set(user).then(()=>{
       dispatch(setUser(user));
       setLoader(false);
       navigation.navigate('Welcome');
     })
    }else{
      alert('Please Fill all the Details');
    }    
  }

    return (
      <>
      <ScrollView>
      <Loader show={loader} text={'Saving your Details'}/>
      <View style = {styles.container}>
      <Text style = {styles.heading}>Sign Up</Text>
      <View style={styles.formContainer} > 
            <TextInput mode = 'outlined' 
                  theme={{ colors: { primary:Colors.primaryColorDark}}}
              label="First Name" value={firstName} onChangeText={(n)=>{setFirstName(n)}}/>
      </View>
      <View style={styles.formContainer} > 
            <TextInput mode = 'outlined' theme={{ colors: { primary:Colors.primaryColorDark}}}  label="Last Name" value={lastName} onChangeText={(n)=>{setLastName(n)}}/>
      </View>
                <View style={styles.row}>
                    <Text style={styles.title}>Sex:</Text>
                    <View style={styles.button}>
                        <RadioButton
                            value="Male"
                            status={gender === 'Male' ? 'checked' : 'unchecked'}
                            onPress={() => { setGender('Male')}}
                            color={Colors.primaryColorDark}
                        />
                        <Text>Male</Text>
                    </View>
                    <View style={styles.button}>
                        <RadioButton
                            value="Female"
                            status={gender === 'Female' ? 'checked' : 'unchecked'}
                            onPress={() => { setGender('Female')}}
                            color={Colors.primaryColorDark}
                        />
                        <Text>Female</Text>
                    </View>
                </View>
      <View style= {{flexDirection:'row'}}>         
      <View style={styles.formContainer} > 
            <TextInput keyboardType={'number-pad'} mode = 'outlined' theme={{ colors: { primary:Colors.primaryColorDark}}}  label="Weight(in kg)" value={weight} onChangeText={(n)=>{setWeight(n)}}/>
      </View>
      <View style={styles.formContainer} > 
            <TextInput keyboardType={'number-pad'} mode = 'outlined' theme={{ colors: { primary:Colors.primaryColorDark}}}  label="Height(in cm)" value={height} onChangeText={(n)=>{setHeight(n)}}/>
      </View>
      </View> 
      <View style={styles.formContainer} > 
            <TextInput mode = 'outlined' theme={{ colors: { primary:Colors.primaryColorDark}}}  label="Email" value={email} onChangeText={(n)=>{setEmail(n)}}/>
      </View>
      <DatePicker
        style={{width: '100%',paddingTop: 25}}
        date={dob}
        mode="date"
        placeholder="select DOB"
        format="DD-MM-YYYY"
        minDate="01-01-1901"
        maxDate="01-01-2091"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            right: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {

          }
        }}
        onDateChange={(date) => {setDob(date)}}
      />
      </View>
      <View style ={{padding:20}}>
        {firstName && lastName && email && dob && gender && weight && height ?(
          <ThemeButton title={'Sign Up'} onPress={()=>{
            setLoader(true);
          setUserData();
        }}/>
        ):(
          <ThemeButtonDisabled title={'Sign Up'} onPress={()=>{alert('Please Enter all the Details')}}  />
        )}
       
      </View>
      </ScrollView>
      </>  
    )
}
export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
   padding:20,
  },
  heading: {
    fontSize:26,
    color:Colors.charcoalGrey80,
    paddingTop:10,
    paddingLeft:5,
    paddingBottom:5,
    fontFamily: 'Karla-Bold',
  },
  label:{
    fontFamily: 'Karla-Bold',
    fontSize:15,
    paddingHorizontal:5,
    color:Colors.charcoalGrey80,
  },
  formContainer:{
    paddingHorizontal:2.5,
    paddingTop:10,
    flex:1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontFamily: 'Karla-Bold',
    fontSize: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});