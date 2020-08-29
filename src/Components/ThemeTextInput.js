import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import Colors from '../Constants/Colors';


const ThemeTextInput = ({onChangeText , placeholder , value , maxLength}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={value =>
          onChangeText(value)
        }
        value={value}
        placeholder={placeholder}
        numberOfLines={1}
        maxLength={maxLength}
      />
    </View>
  );
};
export default ThemeTextInput;

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
    fontFamily:'Karla-Regular',
  },
});
