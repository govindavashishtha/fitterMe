import React, { useState, useEffect } from 'react';
import {
  StyleSheet, StatusBar, Text, TextInput, Modal, View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from "./src/Constants/Colors"
import LoadingNavigationStack from './src/Navigation/SwitchNavigator';
import {Provider} from 'react-redux';
import store from './src/react-redux/store';
import NetInfo from "@react-native-community/netinfo";
import { setConnection } from './src/react-redux/actions';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PushNotification from 'react-native-push-notification';
import {triggerWaterReminderNotifications} from './src/Utils/index';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';


PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

export const initialLocalChannel = () => {
  PushNotification.createChannel({
    channelId: 'LOCALNOTIFICATIONCHANNEL',
    channelName: 'Local Notification Channel',
  });
  triggerWaterReminderNotifications();
};

const OfflineModal = ()=>{
  return (
    <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={true}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{marginBottom: 30}}>
                <Icon1 name={'hammer-wrench'} size={58} color={Colors.charcoalGrey80} />
              </View>
              <Text style={{ fontSize: 20, fontFamily: 'Karla-Bold' }}>OOPS! NO INTERNET</Text>
              <Text style={{ fontSize: 15, fontFamily: 'Karla-Bold', marginBottom: 30 }}>Please check your network connection.</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontFamily: 'Karla-Bold' }}>Anyways here's a dog  </Text>
                <Icon name={'dog'} size={16} color={Colors.charcoalGrey80} />
              </View>
            </View>
          </View>

        </Modal>
      </View>
  )
}


const checkActivityPermission = ()=>{
  check(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION)
  .then((result) => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log('This feature is not available (on this device / in this context)');
        break;
      case RESULTS.DENIED:
        request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then((result) => {
          console.log(result);
        });
        console.log('The permission has not been requested / is denied but requestable');
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        break;
      case RESULTS.BLOCKED:
        request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then((result) => {
          console.log(result);
        });
        console.log('The permission is denied and not requestable anymore');
        break;
    }
  })
  .catch((error) => {
    console.error(error);
  });
}

const AppWrapper = () => {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('isOnline' ,state);
      setIsOnline(state.isConnected);
      store.dispatch(setConnection(state.isConnected));
    });
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    initialLocalChannel();
    checkActivityPermission();

    if (Text.defaultProps == null) {
      Text.defaultProps = {};
    }
    Text.defaultProps.allowFontScaling = false;

    if (TextInput.defaultProps == null) {
      TextInput.defaultProps = {};
    }
    TextInput.defaultProps.allowFontScaling = false;

  });
  return (
    <Provider store={store}>
    {isOnline ? 
      <App /> : <OfflineModal />   }
    </Provider>
  );
}

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={Colors.primaryColorDark}
        barStyle="light-content"
      />
      <NavigationContainer>
        <LoadingNavigationStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#282c34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.cloudyWhite30,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
});

export default AppWrapper;
