import React from 'react';
import {
    StyleSheet,
    View, Text,
} from 'react-native';
import { openSettings } from 'react-native-permissions';
import { useSelector } from 'react-redux';
import Colors from '../Constants/Colors';
import FitnessStatus from '../assets/activity.svg'
import ThemeButton from './ThemeButton';
import { ScrollView } from 'react-native-gesture-handler';

const PermissionDenied = () => {
    const isDarkMode = useSelector((state) => state.isDarkMode);
    const styles = StyleSheet.create({
        container: {
            paddingTop: 20,
            flex: 1,
            backgroundColor: isDarkMode
                ? Colors.backgroundColorDark
                : Colors.backgroundColorLight,
        },
        text: {
            textAlign: 'center',
            padding: 5,
            fontFamily: 'Karla-Regular',
            color: isDarkMode ? Colors.textColorDark : Colors.charcoalGreyMediocre,
            fontSize: 13,
        },
        heading: {
            textAlign: 'center',
            marginBottom: 10,
            fontFamily: 'Karla-Bold',
            color: isDarkMode ? Colors.textColorDark : Colors.charcoalGreyMediocre,
            fontSize: 20,
        }
    })
    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.heading}>Access Denied</Text>
                <Text style={styles.text}>{`Please allow Physical Activity Permission\nin app settings then restart the app\n to get your daily step count.`}</Text>
            </View>

            <View style={{ alignSelf: 'center' }}>
                <FitnessStatus />
            </View>

            <View>
                <ThemeButton title="Open Settings" onPress={() => { openSettings().catch(() => console.warn('cannot open settings')); }} />
            </View>
        </ScrollView>
    )
}

export default PermissionDenied;
