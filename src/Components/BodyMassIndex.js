import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Colors from '../Constants/Colors';
import ThemeButton from './ThemeButton'
import ThemeNumberInput from './ThemeNumberInput';
import {useSelector} from 'react-redux';

const BodyMassIndex = () => {
  const [units, setUnits] = useState('kg')
  const [checked, setChecked] = useState('first')
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [inches, setInches] = useState();
  const [lbs, setLbs] = useState();
  const [BMI, setBMI] = useState(null);
  const [category, setCategory] = useState(null);
  const [errorText, setErrorText] = useState(false);

  const isDarkMode = useSelector((state) => state.isDarkMode);

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
      fontSize: 13,
      color: isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80,
      fontFamily: 'Karla-Bold'
    },
    childContainer: {
      borderRadius: 5,
      margin:20,
      backgroundColor: isDarkMode
      ? Colors.backgroundColorDark50
      : Colors.backgroundColorLight,
      padding: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 1,
        height: 2
      },
      shadowOpacity: 1,
      shadowRadius: 3.84,
      elevation: 10
    },
    title: {
      fontFamily: 'Karla-Bold',
      fontSize: 15,
      color: isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80,
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
      color: isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80,
    }
  })

  const refresh = () => {
    setWeight(null);
    setBMI(null);
    setCategory(null);
    setHeight(null);
    setInches(null);
    setLbs(null);
    setErrorText(false);
  }

  const BMIcalculatorKG = () => {
    if (weight && height && weight !== 0 && height !== 0) {
      setErrorText(false);
      setBMI(((weight * 10000) / (height * height)).toFixed(3));
      calcCategory(((weight * 10000) / (height * height)).toFixed(3));
    } else {
      console.log('weight or height not defined');
      setErrorText(true);
    }
  }
  const BMIcalculatorFeet = () => {
    if (lbs && inches && lbs !== 0 && inches != 0) {
      setErrorText(false);
      setBMI(((703 * lbs) / (inches * inches)).toFixed(3));
      calcCategory(((703 * lbs) / (inches * inches)).toFixed(3));
    } else {
      console.log('weight or height not defined');
      setErrorText(true);
    }
  }

  const calcCategory = (BMI) => {
    if (BMI) {
      if (BMI < 18.5) {
        setCategory('UnderWeight');
      } else if (BMI >= 18.5 && BMI < 25) {
        setCategory("Normal Weight");
      } else if (BMI >= 25 && BMI < 30) {
        setCategory('OverWeight');
      } else {
        setCategory('Obese');
      }
    }
  }

  const categoryText = () => {
    switch (category) {
      case 'UnderWeight':
        return (<Text style={{ color: Colors.underWeightYellow, fontWeight:'bold', fontSize:15 }}>UnderWeight</Text>)
      case 'Normal Weight':
        return (<Text style={{ color: Colors.normalWeightGreen, fontWeight:'bold', fontSize:15 }}>Normal</Text>)
      case 'OverWeight':
        return (<Text style={{ color: Colors.overWeightOrange, fontWeight:'bold' , fontSize:15 }}>OverWeight</Text>)
      default:
        return (<Text style={{ color: Colors.obeseRed, fontWeight:'bold', fontSize:15 }}>Obese</Text>)
    }
  }
  return (
    <View style={styles.childContainer}>
      <Text style={styles.heading}>BMI CALCULATOR</Text>
      {/* /////////////////////////////////////////////////////////////// */}
      <View style={styles.row}>
        <Text style={styles.title}>Sex:</Text>
        <View style={styles.button}>
          <RadioButton
            value="first"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('first')}
            uncheckedColor={isDarkMode && Colors.gray}
            color={Colors.primaryColorDark}
          />
          <Text style={{color:isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80,}}>Male</Text>
        </View>
        <View style={styles.button}>
          <RadioButton
            value="second"
            status={checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('second')}
            uncheckedColor={isDarkMode && Colors.gray}
            color={Colors.primaryColorDark}
          />
          <Text style={{color:isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80,}}>Female</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Unit:</Text>
        <View style={styles.button}>
          <RadioButton
            value="first"
            status={units === 'kg' ? 'checked' : 'unchecked'}
            onPress={() => { setUnits('kg'); refresh(); }}
            uncheckedColor={isDarkMode && Colors.gray}
            color={Colors.primaryColorDark}
          />
          <Text style={{color:isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80,}}>Kg & cm</Text>
        </View>
        <View style={styles.button}>
          <RadioButton
            value="second"
            status={units === 'feet' ? 'checked' : 'unchecked'}
            onPress={() => { setUnits('feet'); refresh(); }}
            uncheckedColor={isDarkMode && Colors.gray}
            color={Colors.primaryColorDark}
          />
          <Text style={{color:isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80,}}>lbs & Inches</Text>
        </View>
      </View>
      {units === 'kg' ?
        (<View style={styles.form}>
          <View style={styles.horizontal}>
            <Text style={styles.label}>Weight:</Text>
            <ThemeNumberInput flex={true} value={weight} placeholder='Weight in Kilograms'
              placeholderTextColor={isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80}
              onChangeText={(val) => { setWeight(val) }} keyboard={'numeric'} />
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.label}>Height:</Text>
            <ThemeNumberInput flex={true} value={height} placeholder='Height in centimeters'
              placeholderTextColor={isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80}
              onChangeText={(val) => { setHeight(val) }} keyboard={'numeric'} />
          </View>
          <View style={{ marginTop: 10 }}>
            {BMI &&
              <Text style={styles.calc}>{`Your BMI(Body Mass Index) is ${BMI}`}</Text>
            }
            {category &&
               <View style={{flexDirection:'row', justifyContent:"center", alignItems:'center'}}>
              <Text style={styles.calc}>{`You are`}</Text>
              {categoryText()}
              </View>
            }
          </View>
          <View style={{ paddingTop: 5 }}>
            <ThemeButton title='Calculate' onPress={BMIcalculatorKG} />
          </View>
          {errorText &&
            <Text style={styles.errorText}>Please Enter Correct Weight and Height</Text>}
        </View>)
        :
        (<View style={styles.form}>
          <View style={styles.horizontal}>
            <Text style={styles.label}>Weight:</Text>
            <ThemeNumberInput flex={true} value={lbs} placeholder='Weight in lbs'
             placeholderTextColor={isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80}
              onChangeText={(val) => { setLbs(val) }} keyboard={'numeric'} />
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.label}>Height:</Text>
            <ThemeNumberInput flex={true} value={inches} placeholder='Height in inches'
             placeholderTextColor={isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80}
              onChangeText={(val) => { setInches(val) }} keyboard={'numeric'} />
          </View>
          <View style={{ marginTop: 10, }}>
            {BMI &&
              <Text style={styles.calc}>{`Your BMI(Body Mass Index) is ${BMI}`}</Text>
            }
            {category &&
               <View style={{flexDirection:'row', justifyContent:"center", alignItems:'center'}}>
              <Text style={styles.calc}>{`You are`}</Text>
              {categoryText()}
              </View>
            }
          </View>
          <View style={{ paddingTop: 5 }}>
            <ThemeButton title='Calculate' onPress={BMIcalculatorFeet} />
          </View>
          {errorText &&
            <Text style={styles.errorText}>Please Enter Correct Weight and Height</Text>}
        </View>)}
    </View>
  )
}

export default BodyMassIndex;
