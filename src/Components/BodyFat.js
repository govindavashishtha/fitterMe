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
            setFat((86.01 * Math.log10(parseInt(waist) - parseInt(neck)) - 70.041 * Math.log10(parseInt(heights)) + 36.76).toFixed(2))
            console.log(fat)
        } else if (gender === 'Female' && waist && neck && heights && hip) {
            setFat((163.205 * Math.log10(parseInt(waist) + parseInt(hip) - parseInt(neck)) - 97.684 * Math.log10(parseInt(heights)) - 78.387).toFixed(2))
        } else {
            console.log('Enter the correct data')
            setErr(true)
        }
    }
    return (
        <ScrollView>
            <>
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
                            <Text style={styles.label}>Height: </Text>
                            <ThemeNumberInput flex={true} value={heights} placeholder='Height in Inches' onChangeText={(val) => { setHeights(val) }} keyboard={'numeric'} />
                        </View>
                        <View style={styles.horizontal}>
                            <Text style={styles.label}>Neck:    </Text>
                            <ThemeNumberInput flex={true} value={neck} placeholder='Neck Parameter in Inches' onChangeText={(val) => { setNeck(val) }} keyboard={'numeric'} />
                        </View>
                        <View style={styles.horizontal}>
                            <Text style={styles.label}>Waist:  </Text>
                            <ThemeNumberInput flex={true} value={waist} placeholder='Waist Parameter in Inches' onChangeText={(val) => { setWaist(val) }} keyboard={'numeric'} />
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
                                <Text style={styles.label}>Height: </Text>
                                <ThemeNumberInput flex={true} value={heights} placeholder='Height in Inches' onChangeText={(val) => { setHeights(val) }} keyboard={'numeric'} />
                            </View>
                            <View style={styles.horizontal}>
                                <Text style={styles.label}>Neck:    </Text>
                                <ThemeNumberInput flex={true} value={neck} placeholder='Neck Parameter in Inches' onChangeText={(val) => { setNeck(val) }} keyboard={'numeric'} />
                            </View>
                            <View style={styles.horizontal}>
                                <Text style={styles.label}>Waist:  </Text>
                                <ThemeNumberInput flex={true} value={waist} placeholder='Waist Parameter in Inches' onChangeText={(val) => { setWaist(val) }} keyboard={'numeric'} />
                            </View>
                            <View style={styles.horizontal}>
                                <Text style={styles.label}>Hip:      </Text>
                                <ThemeNumberInput flex={true} value={hip} placeholder='Hip Parameter in Inches' onChangeText={(val) => { setHip(val) }} keyboard={'numeric'} />
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
            <View style={styles.text}>
            <Text style={styles.title}>How to measure:-</Text>
            <Text style ={{color: Colors.charcoalGrey80, fontSize: 12}}>1) Measure the circumference of the subject's waist at a horizontal level around the navel for men, and at the level with the smallest width for women. Ensure that the subject does not pull their stomach inwards to obtain accurate measurements.</Text>
            <Text style ={{color: Colors.charcoalGrey80, fontSize: 12}}>2) Measure the circumference of the subject's neck starting below the larynx, with the tape sloping downward to the front. The subject should avoid flaring their neck outwards.</Text>
            <Text style ={{color: Colors.charcoalGrey80, fontSize: 12}}>3) <Text style={{fontWeight: "bold"}}>For women only:-</Text> Measure the circumference of the subject's hips at the largest horizontal measure.</Text>
            </View>
            </>
        </ScrollView>
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
    },
    text: {
        paddingHorizontal:15
    }
  })