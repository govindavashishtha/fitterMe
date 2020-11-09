import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, Alert, Linking, BackHandler
} from 'react-native';
import Colors from '../Constants/Colors';
import ScreenNames from './../Constants/ScreenNames';
import auth from '@react-native-firebase/auth';
import LoadingDots from "react-native-loading-dots";
import database from '@react-native-firebase/database';
import { useDispatch } from 'react-redux';
import { setData, setUser } from '../react-redux/actions';
import VersionCheck from 'react-native-version-check';
const LoadingScreen = ({ navigation }) => {
  const apiKeys = ['59ed4d1096c14181ac87f374a460e0c1',
    '4885a26a44d14c6cb3bd5aed4a203884',
    '5329bf3ba3b840f9b426171a1bf4221f',
    '927de1a2949a49f9aa2c7e1b973c3df4'];  
  const dispatch = useDispatch();

  const fetchAPI = () => {
    fetch(`https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=${apiKeys[Math.floor(Math.random() * 4)]}`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch(setData(responseJson.articles))
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const checkVersion = async () => {
    try {
      let updateNeeded = await VersionCheck.needUpdate();

      if(updateNeeded && updateNeeded.isNeeded) {
        Alert.alert(
          'New Update',
          'New update available, Update for better performance and bug fixes.',
          [
            {
              text: 'Update Now',
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL('https://play.google.com/store/apps/details?id=com.fitfut');
              },
            },
          ], 
            {cancelable: false},
        );
      }
    } catch(error) {console.log(error)}
  };

  const checkUser = async () => {
    if (auth().currentUser) {
      const phone = await auth().currentUser.phoneNumber;
      await database()
        .ref().child('Users').child(phone)
        .once('value')
        .then(snapshot => {
          if (snapshot.val() && snapshot.val().firstName) {
            console.log(snapshot.val());
            dispatch(setUser(snapshot.val()));
            navigation.navigate(ScreenNames.TabStack);
          } else {
            navigation.navigate(ScreenNames.LogInStack);
          }
        });
    } else {
      navigation.navigate(ScreenNames.LogInStack);
    }
  }
  useEffect(() => {
    fetchAPI();
    setTimeout(checkUser, 2000);
    // checkVersion();
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text onPress={() => {
        navigation.navigate(ScreenNames.LogInStack);
      }} style={styles.logoText}>fitterMe</Text>
      <View style={{ width: '10%', paddingVertical: 30, marginLeft: '45%' }}>
        <LoadingDots dots={3} colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']} size={5} />
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    height: '100%',
    backgroundColor: Colors.primaryColorDark,
    justifyContent: 'center'
  },
  logoText: {
    color: Colors.white,
    fontSize: 40,
    fontFamily: 'Pacifico-Regular',
    textAlign: 'center'
  }
});

export default LoadingScreen;
