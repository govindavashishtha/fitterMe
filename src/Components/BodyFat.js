import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    ScrollView
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Colors from '../Constants/Colors';
import ThemeButton from '../Components/ThemeButton'
import ThemeNumberInput from './../Components/ThemeNumberInput';

const BodyFat = () => {

    const [gender, setGender] = useState('Male');
    const [waist, setWaist] = useState();
    const [hip, setHip] = useState();
    const [neck, setNeck] = useState();
    const [heights, setHeights] = useState();
    const [fat, setFat] = useState();
    const [err, setErr] = useState(false);

    const refresh = () => {
        setFat(null);
        setErr(false);
        setHip(null);
        setHeights(null);
        setNeck(null);
        setWaist(null);
    }

    const BodyFatCalculator = () => {
        if (gender === 'Male' && waist && neck && heights) {
            setFat(495 / (1.29579 - ((.35004 * Math.log10(waist - neck)) + (.22100 * Math.log10(heights)))) - 450)
            console.log(fat)
        } else if (gender === 'Female' && waist && neck && heights && hip) {
            setFat(495 / (1.29579 - ((.35004 * Math.log10((waist + hip) - neck)) + (.22100 * Math.log10(heights)))) - 450)
        } else {
            console.log('Enter the correct data')
            setErr(true)
        }
    }
    return (

        <View style={styles.childContainer}>
            <Text style={styles.heading}>BODY FAT PERCENTAGE CALCULATOR</Text>
            <View style={styles.row}>
                <Text style={styles.title}>Sex:</Text>
                <View style={styles.button}>
                    <RadioButton
                        value="Male"
                        status={gender === 'Male' ? 'checked' : 'unchecked'}
                        onPress={() => { setGender('Male'); refresh() }}
                        color={Colors.primaryColorDark}
                    />
                    <Text>Male</Text>
                </View>
                <View style={styles.button}>
                    <RadioButton
                        value="Female"
                        status={gender === 'Female' ? 'checked' : 'unchecked'}
                        onPress={() => { setGender('Female'); refresh() }}
                        color={Colors.primaryColorDark}
                    />
                    <Text>Female</Text>
                </View>
            </View>
            {gender === "Male" ?
                (<>
                    <View style={styles.horizontal}>
                        <Text style={styles.label}>Height:</Text>
                        <ThemeNumberInput value={heights} placeholder='Enter Height in Inches' onChangeText={(val) => { setHeights(val) }} keyboard={'numeric'} />
                    </View>
                    <View style={styles.horizontal}>
                        <Text style={styles.label}>Neck:</Text>
                        <ThemeNumberInput value={neck} placeholder='Enter Neck Parameter in Inches' onChangeText={(val) => { setNeck(val) }} keyboard={'numeric'} />
                    </View>
                    <View style={styles.horizontal}>
                        <Text style={styles.label}>Waist:</Text>
                        <ThemeNumberInput value={waist} placeholder='Enter Waist in Inches' onChangeText={(val) => { setWaist(val) }} keyboard={'numeric'} />
                    </View>
                    <View style={{ marginTop: 10, }}>
                        {fat &&
                            (<Text style={styles.calc}>{`Your Fat Percentage is ${fat} %`}</Text>)
                        }
                    </View>
                    <View style={{ paddingTop: 5 }}>
                        <ThemeButton title='Calculate' onPress={BodyFatCalculator} />
                    </View>
                    {err &&
                        <Text style={styles.errorText}>Please Enter Correct Details</Text>}

                </>)
                :
                (
                    <>
                        <View style={styles.horizontal}>
                            <Text style={styles.label}>Height:</Text>
                            <ThemeNumberInput value={heights} placeholder='Enter Height in Inches' onChangeText={(val) => { setHeights(val) }} keyboard={'numeric'} />
                        </View>
                        <View style={styles.horizontal}>
                            <Text style={styles.label}>Neck:</Text>
                            <ThemeNumberInput value={neck} placeholder='Enter Neck Parameter in Inches' onChangeText={(val) => { setNeck(val) }} keyboard={'numeric'} />
                        </View>
                        <View style={styles.horizontal}>
                            <Text style={styles.label}>Waist:</Text>
                            <ThemeNumberInput value={waist} placeholder='Enter Waist Parameter in Inches' onChangeText={(val) => { setWaist(val) }} keyboard={'numeric'} />
                        </View>
                        <View style={styles.horizontal}>
                            <Text style={styles.label}>Hip:</Text>
                            <ThemeNumberInput value={hip} placeholder='Enter Hip Parameter in Inches' onChangeText={(val) => { setHip(val) }} keyboard={'numeric'} />
                        </View>
                        <View style={{ marginTop: 10, }}>
                            {fat &&
                                (<Text style={styles.calc}>{`Your Fat Percentage is ${fat} %`}</Text>)
                            }
                        </View>
                        <View style={{ paddingTop: 5 }}>
                            <ThemeButton title='Calculate' onPress={BodyFatCalculator} />
                        </View>
                        {err &&
                            <Text style={styles.errorText}>Please Enter Correct Details</Text>}
                    </>
                )}
        </View>
    );
}

export default BodyFat;

const styles = StyleSheet.create({
    container: {
      padding: 7,
      marginBottom: 100,
    },
    errorText: {
      color: Colors.warning,
      textAlign: 'center',
      padding: 3,
      fontSize: 12,
    },
    form: {
      padding: 5,
    },
    calc: {
      textAlign: 'center',
      padding: 5,
    },
    label: {
      paddingTop: 10,
      fontSize: 15,
      color: Colors.charcoalGrey80,
      fontFamily: 'Karla-Regular'
    },
    childContainer: {
      padding: 10,
      borderWidth: .2,
      borderRadius: 5,
      elevation: 1,
      marginBottom: 20,
    },
    title: {
      fontFamily: 'Karla-Bold',
      fontSize: 15,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    horizontal: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 5,
      paddingHorizontal: 20,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    heading: {
      fontSize: 15,
      textAlign: 'center',
      padding: 15,
    }
  })