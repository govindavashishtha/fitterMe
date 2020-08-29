import React from 'react';
import {
  StyleSheet,
  View,Text
} from 'react-native';
import ThemeButton from '../Components/ThemeButton';

const HomeScreen = ({navigation})=>{
    return (
      <View>
          <Text style={styles.test}>HomeScreen</Text>
          <ThemeButton onPress={()=>{navigation.navigate('Calculate')}}/>
      </View>  
    )
}


const styles = StyleSheet.create({
  test: {
    fontSize: 24,
    fontFamily: 'Karla-BoldItalic'
  }
})

export default HomeScreen;