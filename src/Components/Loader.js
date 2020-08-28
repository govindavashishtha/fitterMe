import {StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../Constants/Colors';
import Spinner from 'react-native-loading-spinner-overlay';
const Loader =({show,text})=>{
   return(
    <Spinner
        visible={show}
        textContent={text}
        textStyle={styles.spinnerTextStyle}
    />);
}
export default Loader;

const styles = StyleSheet.create({
    spinnerTextStyle: {
       color: Colors.white,
    },
});