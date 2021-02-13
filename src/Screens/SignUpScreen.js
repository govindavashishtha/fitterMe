import React,{useState} from 'react';
import {
  View,Text,StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native';
import ThemeButton from '../Components/ThemeButton';
import Colors from './../Constants/Colors';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {TextInput, RadioButton} from 'react-native-paper'
import DatePicker from 'react-native-datepicker';
import { setUser } from '../react-redux/actions';
import {useDispatch, useSelector} from 'react-redux';
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
  const [steps , setSteps] = useState('');
  const [loader , setLoader] = useState(false);
  const dispatch = useDispatch();

  const windowHeight = Dimensions.get('window').height;

  const isDarkMode = useSelector((state) => state.isDarkMode);

const styles = StyleSheet.create({
  container: {
   padding:20,
   backgroundColor: isDarkMode
        ? Colors.backgroundColorDark
        : Colors.backgroundColorLight,
   height:windowHeight,
  },
  heading: {
    fontSize:26,
    color: isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80,
    paddingTop:10,
    paddingLeft:5,
    paddingBottom:5,
    fontFamily: 'Karla-Bold',
  },
  label:{
    fontFamily: 'Karla-Bold',
    fontSize:15,
    paddingHorizontal:5,
    color: isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80,
  },
  formContainer:{
    paddingHorizontal:2.5,
    padding:20,
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
    color: isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});


  const setUserData=()=>{
    if(firstName && lastName && email && gender && dob && weight && height && steps){
      let user = {
        firstName : firstName,
        lastName : lastName,
        email : email,
        gender : gender,
        dob : dob,
        weight : weight,
        height : height,
        steps : steps
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
                  theme={{ colors: {
                    text: isDarkMode ? Colors.textColorDark : Colors.black,
                    primary: Colors.primaryColorDark,
                    background: isDarkMode
                      ? Colors.backgroundColorDark50
                      : Colors.backgroundColorLight,
                    placeholder: isDarkMode
                      ? Colors.gray
                      : Colors.charcoalGreyMediocre,
                  },}}
              label="First Name" value={firstName} onChangeText={(n)=>{setFirstName(n)}}/>
      </View>
      <View style={styles.formContainer} > 
            <TextInput mode = 'outlined'
             theme={{  colors: {
              text: isDarkMode ? Colors.textColorDark : Colors.black,
              primary: Colors.primaryColorDark,
              background: isDarkMode
                ? Colors.backgroundColorDark50
                : Colors.backgroundColorLight,
              placeholder: isDarkMode
                ? Colors.gray
                : Colors.charcoalGreyMediocre,
            },
          }} 
             label="Last Name" value={lastName} onChangeText={(n)=>{setLastName(n)}}/>
      </View>
                <View style={styles.row}>
                    <Text style={styles.title}>Sex:</Text>
                    <View style={styles.button}>
                        <RadioButton
                            value="Male"
                            status={gender === 'Male' ? 'checked' : 'unchecked'}
                            onPress={() => { setGender('Male')}}
                            uncheckedColor={isDarkMode && Colors.gray}
                            color={Colors.primaryColorDark}
                        />
                        <Text style={{color: isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80,}}>Male</Text>
                    </View>
                    <View style={styles.button}>
                        <RadioButton
                            value="Female"
                            status={gender === 'Female' ? 'checked' : 'unchecked'}
                            onPress={() => { setGender('Female')}}
                            uncheckedColor={isDarkMode && Colors.gray}
                            color={Colors.primaryColorDark}
                        />
                        <Text style={{color: isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80,}}>Female</Text>
                    </View>
                </View>
      <View style= {{flexDirection:'row'}}>         
      <View style={styles.formContainer} > 
            <TextInput keyboardType={'number-pad'} mode = 'outlined'
             theme={{ colors: {
              text: isDarkMode ? Colors.textColorDark : Colors.black,
              primary: Colors.primaryColorDark,
              background: isDarkMode
                ? Colors.backgroundColorDark50
                : Colors.backgroundColorLight,
              placeholder: isDarkMode
                ? Colors.gray
                : Colors.charcoalGreyMediocre,
            },
          }}  
             label="Weight(in kg)" value={weight} onChangeText={(n)=>{setWeight(n)}}/>
      </View>
      <View style={styles.formContainer} > 
            <TextInput keyboardType={'number-pad'} mode = 'outlined'
             theme={{ colors: {
              text: isDarkMode ? Colors.textColorDark : Colors.black,
              primary: Colors.primaryColorDark,
              background: isDarkMode
                ? Colors.backgroundColorDark50
                : Colors.backgroundColorLight,
              placeholder: isDarkMode
                ? Colors.gray
                : Colors.charcoalGreyMediocre,
            },
          }} 
              label="Height(in cm)" value={height} onChangeText={(n)=>{setHeight(n)}}/>
      </View>
      </View> 
      <View style={styles.formContainer} > 
            <TextInput mode = 'outlined' 
            theme={{ colors: {
              text: isDarkMode ? Colors.textColorDark : Colors.black,
              primary: Colors.primaryColorDark,
              background: isDarkMode
                ? Colors.backgroundColorDark50
                : Colors.backgroundColorLight,
              placeholder: isDarkMode
                ? Colors.gray
                : Colors.charcoalGreyMediocre,
            },
          }}  
            label="Email" value={email} onChangeText={(n)=>{setEmail(n)}}/>
      </View>
      <View style={styles.formContainer} >
            <TextInput mode='outlined' keyboardType={'number-pad'} 
            theme={{ colors: {
              text: isDarkMode ? Colors.textColorDark : Colors.black,
              primary: Colors.primaryColorDark,
              background: isDarkMode
                ? Colors.backgroundColorDark50
                : Colors.backgroundColorLight,
              placeholder: isDarkMode
                ? Colors.gray
                : Colors.charcoalGreyMediocre,
            },
           }} 
            label="Target Steps" value={steps} onChangeText={(n) => { setSteps(n) }} />
      </View>
      <DatePicker
        style={{
          width: '100%',
          padding: 15,
          color: isDarkMode && Colors.textColorDark,
        }}
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
          dateText: {
            color: isDarkMode && Colors.textColorDark,
          }
        }}
        onDateChange={(date) => {setDob(date)}}
      />

      <View style ={{padding:20}}>
        {firstName && lastName && email && dob && gender && weight && height && steps ?(
          <ThemeButton title={'Sign Up'} onPress={()=>{
            setLoader(true);
          setUserData();
        }}/>
        ):(
          <ThemeButtonDisabled title={'Sign Up'} onPress={()=>{alert('Please Enter all the Details')}}  />
        )}
       
      </View>
      </View>
      
      </ScrollView>
      </>  
    )
}
export default SignUpScreen;
