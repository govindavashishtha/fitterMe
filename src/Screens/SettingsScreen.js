import React, { useState } from 'react';
import {
  StyleSheet,
  View, Text, ScrollView
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


const SettingsScreen = ({ navigation }) => {
  const user = useSelector(state => state.userDetails);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [loader , setLoader] = useState(false);
  const dispatch = useDispatch();

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!')
        navigation.navigate(ScreenNames.LoadingStack)
      });
  }

  const setUserData = () => {
    if (firstName && lastName && email) {
      let user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
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
        <View style={styles.formContainer} >
          <TextInput mode='outlined' theme={{ colors: { primary: Colors.primaryColorDark } }} label="Email" value={email} onChangeText={(n) => { setEmail(n) }} />
        </View>
        <View style={{ paddingVertical: 30, paddingHorizontal: 10, }}>
          {firstName && lastName && email ? (
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

        <View style={{ position: 'absolute', right: 15, bottom: 10 }}>
          <Text style={{ fontSize: 16, color: Colors.red, fontFamily: 'Karla-Bold' }} onPress={() => {
            ConfirmDialog('Sign Out', 'Sure to SignOut?', signOut)
          }
          }>Sign Out</Text>

        </View>
      </View>
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