import React from 'react';
import {
  View,Text,Button
} from 'react-native';
import ThemeButton from '../Components/ThemeButton';
import ScreenNames from './../Constants/ScreenNames'

const SignUpScreen = ({navigation , rootNavigation})=>{
    return (
      <View>
          <Text>this is SignUpScreen</Text>
          <Button
        title="Pop to top"
        onPress={() => navigation.popToTop()}
      />
      <ThemeButton onPress={()=>{rootNavigation.navigate(ScreenNames.TabStack)}} title={'go to Tab Stack'}/>
      </View>  
    )
}
export default SignUpScreen;