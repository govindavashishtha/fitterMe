import React from 'react';
import {
    StyleSheet,
    View, Text,
    Button
  } from 'react-native';
import {openSettings} from 'react-native-permissions';
import {useSelector} from 'react-redux';
import Colors from '../Constants/Colors';
import FitnessStatus from '../assets/activity.svg'
import ThemeButton from './ThemeButton';

const PermissionDenied= () => {
    const isDarkMode = useSelector((state) => state.isDarkMode);
    const styles = StyleSheet.create({
        container: {
            padding: 7,
            backgroundColor: isDarkMode
            ? Colors.backgroundColorDark
            : Colors.backgroundColorLight,
        },
        text: {
            textAlign:'center',
            padding:5,
            fontFamily:'Karla-Regular',
            color:isDarkMode ? Colors.textColorDark : Colors.charcoalGreyMediocre,
            fontSize:14.5,
        },
        heading: {
            textAlign:'center',
            padding:5,
            fontFamily:'Karla-Regular',
            color:isDarkMode ? Colors.textColorDark : Colors.charcoalGreyMediocre,
            fontSize:24,
        }
    })
    return (
        <View style={styles.container}>
          <Text style={styles.heading}>Access Denied</Text>
          <Text style={styles.text}>Please Allow Permission in settings</Text>
          <Text style={styles.text}>and restart the fitterMe app</Text>
          <Text style={styles.text}>to use the ACTIVITY RECOGNITION</Text>

          <View style={{alignSelf: 'center'}}>
              <FitnessStatus />
          </View>

          <View>
              <ThemeButton title="Open Settings" onPress={() => {openSettings().catch(() => console.warn('cannot open settings'));}} />
          </View>
        </View>
    )
}

export default PermissionDenied;
