import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Keyboard,
  Share,
  TouchableOpacity,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import ThemeButton from './../Components/ThemeButton';
import ScreenNames from '../Constants/ScreenNames';
import Header from './../Components/Header';
import ConfirmDialog from '../Components/ConfirmDialog';
import {useSelector} from 'react-redux';
import DatePicker from 'react-native-datepicker';
import {TextInput, RadioButton} from 'react-native-paper';
import database from '@react-native-firebase/database';
import Colors from './../Constants/Colors';
import {useDispatch} from 'react-redux';
import ThemeButtonDisabled from './../Components/ThemeButtonDisabled';
import Loader from '../Components/Loader';
import {setIsDarkMode, setUser} from '../react-redux/actions';
import toast from '../Components/Toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import Variables from '../Constants/Variables';

const SettingsScreen = ({navigation}) => {
  const user = useSelector((state) => state.userDetails);
  const isDarkMode = useSelector((state) => state.isDarkMode);
  console.log('dark mode', isDarkMode);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);
  const [dob, setDob] = useState(user.dob);
  const [weight, setWeight] = useState(user.weight);
  const [height, setHeight] = useState(user.height);
  const [steps, setSteps] = useState(user.steps);
  const [loader, setLoader] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isDark, setIsDark] = useState(isDarkMode);
  const [themeLoader, setThemeLoader] = useState(false);
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDarkMode
        ? Colors.backgroundColorDark
        : Colors.backgroundColorLight,
    },
    heading: {
      fontSize: 26,
      color: isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80,
      paddingHorizontal: 10,
      paddingBottom: 15,
      paddingTop: 5,
      fontFamily: 'Karla-Bold',
    },
    formContainer: {
      padding: 5,
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      color: isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80,
    },
  });

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'https://play.google.com/store/apps/details?id=com.fitfut',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate(ScreenNames.LoadingStack);
      });
  };

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

  const toggleTheme = async (value) => {
    setIsDark(value);
    dispatch(setIsDarkMode(value));
    try {
      await AsyncStorage.setItem(Variables.isDarkMode, `${value}`);
      setThemeLoader(false);
    } catch (e) {
      console.log('unable to make changes to async storage');
      setThemeLoader(false);
    }
  };

  const setUserData = () => {
    if (
      firstName &&
      lastName &&
      email &&
      gender &&
      weight &&
      height &&
      dob &&
      steps
    ) {
      let user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        height: height,
        weight: weight,
        dob: dob,
        steps: steps,
      };
      const phone = auth().currentUser.phoneNumber;
      database()
        .ref('/Users')
        .child(phone)
        .update(user)
        .then(() => {
          dispatch(setUser(user));
          setLoader(false);
          navigation.navigate('Welcome');
        });
    } else {
      alert('Please Fill all the Details');
    }
  };

  return (
    <>
      <Loader show={loader} text={'Updating Details'} />
      <Loader show={themeLoader} text={'Setting Up theme'} />
      <Header title={'Settings'} />
      <ScrollView>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.heading}>Profile</Text>
            <TouchableOpacity
              style={{paddingTop: 12, paddingRight: 10}}
              onPress={() => {
                onShare();
              }}>
              <Icon
                name={'share-alt'}
                size={20}
                color={
                  isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80
                }
              />
            </TouchableOpacity>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                setThemeLoader(true);
                toggleTheme(!isDark);
              }}
              value={isDark}
            />
          </View>
          <View style={styles.formContainer}>
            <TextInput
              mode="outlined"
              theme={{colors: {primary: Colors.primaryColorDark}}}
              label="First Name"
              value={firstName}
              onChangeText={(n) => {
                setFirstName(n);
              }}
            />
          </View>
          <View style={styles.formContainer}>
            <TextInput
              mode="outlined"
              theme={{colors: {primary: Colors.primaryColorDark}}}
              label="Last Name"
              value={lastName}
              onChangeText={(n) => {
                setLastName(n);
              }}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Gender:</Text>
            <View style={styles.button}>
              <RadioButton
                value="Male"
                status={gender === 'Male' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setGender('Male');
                }}
                color={Colors.primaryColorDark}
              />
              <Text style={styles.title}>Male</Text>
            </View>
            <View style={styles.button}>
              <RadioButton
                value="Female"
                status={gender === 'Female' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setGender('Female');
                }}
                color={Colors.primaryColorDark}
              />
              <Text style={styles.title}>Female</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.formContainer}>
              <TextInput
                keyboardType={'number-pad'}
                mode="outlined"
                theme={{colors: {primary: Colors.primaryColorDark}}}
                label="Weight(in Kg)"
                value={weight}
                onChangeText={(n) => {
                  setWeight(n);
                }}
              />
            </View>
            <View style={styles.formContainer}>
              <TextInput
                keyboardType={'number-pad'}
                mode="outlined"
                theme={{colors: {primary: Colors.primaryColorDark}}}
                label="Height(in cm)"
                value={height}
                onChangeText={(n) => {
                  setHeight(n);
                }}
              />
            </View>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              mode="outlined"
              theme={{colors: {primary: Colors.primaryColorDark}}}
              label="Email"
              value={email}
              onChangeText={(n) => {
                setEmail(n);
              }}
            />
          </View>
          <View style={styles.formContainer}>
            <TextInput
              mode="outlined"
              theme={{colors: {primary: Colors.primaryColorDark}}}
              label="Target Steps"
              value={steps}
              onChangeText={(n) => {
                setSteps(n);
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 11.5,
              marginTop: 10,
              paddingLeft: 7,
              color: isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80,
            }}>
            Date of Birth
          </Text>
          <DatePicker
            style={{width: '100%', padding: 5}}
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
                marginLeft: 0,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
              setDob(date);
            }}
          />
          <View style={{paddingVertical: 30, paddingHorizontal: 10}}>
            {firstName &&
            lastName &&
            email &&
            gender &&
            weight &&
            height &&
            dob &&
            steps ? (
              <ThemeButton
                title={'Update Details'}
                onPress={() => {
                  setLoader(true);
                  setUserData();
                }}
              />
            ) : (
              <ThemeButtonDisabled
                title={'Update Details'}
                onPress={() => {
                  //todo add toast
                  toast('Please Fill all the Details');
                }}
              />
            )}
          </View>
          {!isKeyboardVisible && (
            <View
              style={{
                position: 'absolute',
                right: 15,
                bottom: 10,
                alignItems: 'center',
              }}>
              <Icon
                name={'sign-out'}
                size={18}
                color={Colors.charcoalGreyMediocre}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: Colors.charcoalGreyMediocre,
                  fontFamily: 'Karla-Bold',
                }}
                onPress={() => {
                  ConfirmDialog('Sign Out', 'Sure to SignOut?', signOut);
                }}>
                Sign Out
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};
export default SettingsScreen;
