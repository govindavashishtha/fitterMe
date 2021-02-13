import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import Colors from '../Constants/Colors';
import { useSelector } from 'react-redux';


const ThemeNumberInput = ({onChangeText , placeholder, placeholderTextColor , value , keyboard , maxLength , flex}) => {
  const isDarkMode = useSelector((state) => state.isDarkMode);

  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 5,
      paddingLeft: 5,
      borderColor: Colors.primaryColorDark,
      borderBottomWidth: 1.5,
      overflow: 'hidden',
      //flex:1,
    },
    containerFlex: {
      marginHorizontal: 5,
      paddingLeft: 5,
      borderColor: Colors.primaryColorDark,
      borderBottomWidth: 1.5,
      overflow: 'hidden',
      flex:1,
    },
    textInput: {
      paddingHorizontal: 2,
      paddingBottom: 0,
      fontSize: 15,
      fontFamily:'Karla-Regular',
      color: isDarkMode ? Colors.white : Colors.charcoalGreyMediocre,
    },
  });

  return (
    <View style={flex ? styles.containerFlex : styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={value =>
          !isNaN(value) && onChangeText(value)
        }
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        numberOfLines={1}
        keyboardType={keyboard}
        maxLength={maxLength}
      />
    </View>
  );
};
export default ThemeNumberInput;

