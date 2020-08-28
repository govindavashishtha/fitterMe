import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import Colors from '../Constants/Colors';


const ThemeNumberInput = ({onChangeText , placeholder , value , keyboard , maxLength}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={value =>
          !isNaN(value) && onChangeText(value)
        }
        value={value}
        placeholder={placeholder}
        numberOfLines={1}
        keyboardType={keyboard}
        maxLength={maxLength}
      />
    </View>
  );
};
export default ThemeNumberInput;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    paddingLeft: 5,
    borderColor: Colors.primaryColorDark,
    borderBottomWidth: 1.5,
    overflow: 'hidden',
  },
  textInput: {
    paddingHorizontal: 2,
    paddingBottom: 0,
    fontSize: 15,
    fontFamily: 'Nunito-Regular',
  },
});
