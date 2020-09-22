import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../Constants/Colors';

const ThemeButtonDisabled = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.button}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default ThemeButtonDisabled;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray,
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
  },
});