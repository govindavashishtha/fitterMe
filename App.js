import React, { useState, useEffect } from 'react';
import {
  StyleSheet, StatusBar, Text, TextInput, Modal, View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from "./src/Constants/Colors"
import LoadingNavigationStack from './src/Navigation/SwitchNavigator';
import { Provider } from 'react-redux';
import store from './src/react-redux/store';
import NetInfo from "@react-native-community/netinfo";
import { setConnection } from './src/react-redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
              <Text style={{ fontSize: 14, fontFamily: 'Karla-Bold', marginBottom: 16 }}>You are Offline :(</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontFamily: 'Karla-Bold' }}>Here's a Carrot  </Text>
                <Icon name={'carrot'} size={16} color={'red'} />
              </View>
            </View>
          </View>

        </Modal>
      </View>
  )
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
    // for force Scaling Text and TextInput to default Size

    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;

    if (TextInput.defaultProps == null) TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;

  });
  return (
    <Provider store={store}>
    {isOnline ? 
      <App /> : <OfflineModal />}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
});

export default AppWrapper;
