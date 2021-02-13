import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Linking,
  BackHandler,
} from 'react-native';
import Colors from '../Constants/Colors';
import ScreenNames from './../Constants/ScreenNames';
import auth from '@react-native-firebase/auth';
import LoadingDots from 'react-native-loading-dots';
import database from '@react-native-firebase/database';
import { useDispatch } from 'react-redux';
import { setData, setReduxSteps, setUser } from '../react-redux/actions';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import VersionCheck from 'react-native-version-check';

const LoadingScreen = ({ navigation }) => {
  const apiKeys = [
    '59ed4d1096c14181ac87f374a460e0c1',
    '4885a26a44d14c6cb3bd5aed4a203884',
    '5329bf3ba3b840f9b426171a1bf4221f',
    '927de1a2949a49f9aa2c7e1b973c3df4',
  ];
  const dispatch = useDispatch();

  const getDistance = () => {
    let yesterday = new Date(Date.now() - 86400000).toISOString();
    const opt = {
      startDate: yesterday, // required
      endDate: new Date().toISOString(), // required
      basalCalculation: true, // optional, to calculate or not basalAVG over the week
      bucketUnit: "DAY", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
      bucketInterval: 1, // optional - default 1. 
    };
    GoogleFit.getDailyCalorieSamples(opt).then((res) => {
      console.log('Distance', res);
    });
  };
  const getSteps = () => {
   
    const opt = {
      endDate: new Date().toISOString(), // required ISO8601Timestamp
      bucketUnit: 'DAY', // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
      bucketInterval: 1, // optional - default 1.
    };
    
    GoogleFit.getDailyStepCountSamples(opt)
      .then((res) => {
        console.log('steps  ', res);
        res.map((item) => {
          if (item.steps[0]) {
            if (item.steps[0].value) {
              dispatch(setReduxSteps(item.steps[0].value));
              console.log('steps  ', item.steps[0]);
            }
          }
        });
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_ACTIVITY_WRITE,
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_BODY_WRITE,
    ],
  };

  const fitAuth = () => {
    GoogleFit.authorize(options)
      .then((authResult) => {
        if (authResult.success) {
          console.log('AUTH_SUCCESS');
          GoogleFit.startRecording((callback) => {
            console.log('getting Fit data');
            getSteps();
            getDistance();
          });
        } else {
          console.log('AUTH_DENIED', authResult.message);
          fitAuth();
        }
      })
      .catch(() => {
        console.error('AUTH_ERROR');
      });
  };

  const fetchAPI = () => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=${apiKeys[Math.floor(Math.random() * 4)]
      }`,
      {
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch(setData(responseJson.articles));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const checkVersion = async () => {
    try {
      let updateNeeded = await VersionCheck.needUpdate();

      if (updateNeeded && updateNeeded.isNeeded) {
        Alert.alert(
          'New Update',
          'New update available, Update for better performance and bug fixes.',
          [
            {
              text: 'Update Now',
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.fitfut',
                );
              },
            },
          ],
          { cancelable: true },
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkUser = async () => {
    if (auth().currentUser) {
      const phone = await auth().currentUser.phoneNumber;
      await database()
        .ref()
        .child('Users')
        .child(phone)
        .once('value')
        .then((snapshot) => {
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
  };
  useEffect(() => {
    fetchAPI();
    setTimeout(() => {
      checkUser();
      fitAuth();
    }, 2000);
    //checkVersion();
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.logoText}>fitterMe</Text>
        <View style={{ width: '10%', paddingVertical: 30, marginLeft: '45%' }}>
          <LoadingDots dots={4} colors={['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']} size={5} />
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Handcrafted in India </Text>
        {/* <Flag 
          id={'IN'}
          width={24}
          height={24}
          onPress={() => {
            Linking.openURL('https://en.wikipedia.org/wiki/India');
          }}
        /> */}
      </View>
    </View>
    
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    backgroundColor: Colors.primaryColorDark,
    justifyContent: 'center',
  },
  logoText: {
    color: Colors.white,
    fontSize: 40,
    fontFamily: 'Pacifico-Regular',
    textAlign: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '5%',
    right: '25%',
  },
  text: {
    fontSize: 18,
    fontFamily: 'Karla-Bold',
    color: Colors.white,
  }
});

export default LoadingScreen;
