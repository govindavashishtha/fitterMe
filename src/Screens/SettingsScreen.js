import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View, Text, ScrollView, Keyboard
} from 'react-native';
import auth from '@react-native-firebase/auth';
import ThemeButton from './../Components/ThemeButton'
import ScreenNames from '../Constants/ScreenNames';
import Header from './../Components/Header';
import ConfirmDialog from '../Components/ConfirmDialog';
import { useSelector } from 'react-redux'
import { TextInput } from 'react-native-paper';
import database from '@react-native-firebase/database';
import Colors from './../Constants/Colors';
import { useDispatch } from 'react-redux';
import ThemeButtonDisabled from './../Components/ThemeButtonDisabled';
import Loader from '../Components/Loader';
import { setUser } from '../react-redux/actions';
import toast from '../Components/Toast';
import Icon from 'react-native-vector-icons/FontAwesome';


const SettingsScreen = ({ navigation }) => {
  const user = useSelector(state => state.userDetails);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [gender , setGender] = useState('Male');
  const [dob , setDob] = useState('');
  const [weight , setWeight] = useState('');
  const [height , setHeight] = useState('');
  const [loader , setLoader] = useState(false);
  const [isKeyboardVisible,setKeyboardVisible] = useState(false);
  const dispatch = useDispatch();

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!')
        navigation.navigate(ScreenNames.LoadingStack)
      });
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);


  const setUserData = () => {
    if (firstName && lastName && email && gender && weight && height && dob) {
      let user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        height: height,
        weight: weight,
        dob: dob,
      };
      const phone = auth().currentUser.phoneNumber;
      database().ref('/Users').child(phone).set(user).then(() => {
        dispatch(setUser(user));
        setLoader(false);
        navigation.navigate('Welcome');
      })
    } else {
      alert('Please Fill all the Details');
    }
  }

  return (
    <>
    <ScrollView>
      <Loader show={loader} text={'Updating Details'}/>
      <Header title={'Settings'} />
      <View style={styles.container}>

        <Text style={styles.heading}>Your Profile</Text>
        <View style={styles.formContainer} >
          <TextInput mode='outlined'
            theme={{ colors: { primary: Colors.primaryColorDark } }}
            label="First Name" value={firstName} onChangeText={(n) => { setFirstName(n) }} />
        </View>
        <View style={styles.formContainer} >
          <TextInput mode='outlined' theme={{ colors: { primary: Colors.primaryColorDark } }} label="Last Name" value={lastName} onChangeText={(n) => { setLastName(n) }} />
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
        <View style={styles.formContainer} > 
              <TextInput mode = 'outlined' theme={{ colors: { primary:Colors.primaryColorDark}}}  label="Weight(in KGs)" value={weight} onChangeText={(n)=>{setWeight(n)}}/>
        </View>
        <View style={styles.formContainer} > 
              <TextInput mode = 'outlined' theme={{ colors: { primary:Colors.primaryColorDark}}}  label="Height(in CentiMeters)" value={height} onChangeText={(n)=>{setHeight(n)}}/>
        </View>
        <View style={styles.formContainer} >
          <TextInput mode='outlined' theme={{ colors: { primary: Colors.primaryColorDark } }} label="Email" value={email} onChangeText={(n) => { setEmail(n) }} />
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
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {setDob(date)}}
      />
        <View style={{ paddingVertical: 30, paddingHorizontal: 10, }}>
          {firstName && lastName && email && gender && weight && height && dob ? (
            <ThemeButton title={'Update Details'} onPress={() => {
              setLoader(true);
              setUserData();
          }
          } />
          ):(
            <ThemeButtonDisabled title={'Update Details'} onPress={() => {
               //todo add toast
               toast('Please Fill all the Details');
          }
          } />
          )}   
          
        </View>
        {!isKeyboardVisible && 
        <View style={{ position: 'absolute', right: 15, bottom: 10, alignItems:'center' }}>
          <Icon name={'sign-out'} size={18} color={Colors.charcoalGreyMediocre} />
          <Text style={{ fontSize: 15, color: Colors.charcoalGreyMediocre, fontFamily: 'Karla-Bold' }} onPress={() => {
            ConfirmDialog('Sign Out', 'Sure to SignOut?', signOut)
          }
          }>Sign Out</Text>

        </View>
        }
      </View>
      </ScrollView>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 25,
    color: Colors.charcoalGrey80,
    textAlign: 'center',
    padding: 5,
    fontFamily: 'Karla-Bold',
  },
  formContainer: {
    paddingTop: 30,
  }
})
export default SettingsScreen;