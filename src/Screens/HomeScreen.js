import React from 'react';
import {
  StyleSheet,
  View,Text
} from 'react-native';
import ThemeButton from '../Components/ThemeButton';

const HomeScreen = ({navigation})=>{
    return (
      <View>
          <Text>HomeScreen</Text>
          <ThemeButton onPress={()=>{navigation.navigate('Calculate')}}/>
      </View>  
    )
}
export default HomeScreen;