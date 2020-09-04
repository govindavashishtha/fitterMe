import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../Constants/Colors';


const ThemeButton = ({title , onPress , textUpperCase}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.button}>
        {textUpperCase ? title.toUpperCase() : title}
      </Text>
    </TouchableOpacity>
  );
};
export default ThemeButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColorDark,
    padding: 5,
    margin: 5,
    borderRadius: 5,
    overflow: 'hidden',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: Colors.white,
    fontSize: 18,
    padding: 3,
    fontFamily:'Karla-Bold',
  },
});
