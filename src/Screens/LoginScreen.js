import React from 'react';
import {
  StyleSheet,
  View,Text,Button
} from 'react-native';
import ThemeButton from '../Components/ThemeButton';

const LoginScreen = ({navigation})=>{
    return (
      <View>
          <Text>this is LoginScreen</Text>
          <ThemeButton  title="Go to PhoneLogin"
        onPress={() => navigation.navigate('PhoneLogIn')} />
          <Button
        title="Go to PhoneLogin"
        onPress={() => navigation.navigate('PhoneLogIn')}
      />
      </View>  
    )
}
export default LoginScreen;