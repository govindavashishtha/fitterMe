import React, {useState} from 'react';
import {
  StyleSheet,
  View,Text,TextInput,
  Button
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Colors from '../Constants/Colors';
import ThemeButton from '../Components/ThemeButton'

const CalculateScreen = ()=>{
  const [units, setUnits] = useState('kg')
  const [checked, setChecked] = useState('first')
  const [weight, setWeight] = useState('0')
  const [height, setHeight] = useState('0')
  const [inches, setInches] = useState('0')
  const [lbs, setLbs] = useState('0')

  const BMIcalculatorKG = () => {
    if(weight !== '0' && height !== '0') {
      const BMIKG = weight / (height * height);
      console.log(BMIKG);
    } else {
      console.log('weight or height not defined')
    }
  } 
  const BMIcalculatorFeet = () => {
    if(lbs !== '0' && inches !=='0') {
      const BMIFeet = (703 * lbs) / (inches * inches)
      console.log(BMIFeet)
    } else {
      console.log('weight or height not defined')
    }
  }

  if(units === 'kg') {
     return (
      <View>
        <Text style={styles.heading}>BMI CALCULATOR</Text>
         {/* /////////////////////////////////////////////////////////////// */}
         <View style={styles.row}>
           <View style={styles.button}>
            <RadioButton
              value="first"
              status={ units === 'kg' ? 'checked' : 'unchecked' }
              onPress={() => setUnits('kg')}
              color={Colors.primaryColor}
            />
          <Text>Kilograms & Metre</Text>
          </View>
          <View style={styles.button}>
            <RadioButton
              value="second"
              status={ units === 'feet' ? 'checked' : 'unchecked' }
              onPress={() => setUnits('feet')}
              color={Colors.primaryColor}
            />
        <Text>lbs & Inches</Text>
        </View> 
         </View>
         
        <View style={styles.row}>
          <View style={styles.button}>
            <RadioButton
              value="first"
              status={ checked === 'first' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('first')}
              color={Colors.primaryColor}
            />
          <Text>Male</Text>
          </View>
          <View style={styles.button}>
            <RadioButton
              value="second"
              status={ checked === 'second' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('second')}
              color={Colors.primaryColor}
            />
        <Text>Female</Text>
        </View>
        </View>
            
      
      <TextInput placeholder='Enter Weight in KiloGrams' onChangeText={(val) => {setWeight(val)}} keyboardType='numeric' />
      <TextInput placeholder='Enter height in Metre' onChangeText={(val) => {setHeight(val)}} keyboardType='numeric' />
      <ThemeButton title='Calculate' onPress={BMIcalculatorKG} />
    </View>  
    )
  } 
  else if (units === 'feet') {
    return (
      <View>
        <Text style={styles.heading}>BMI CALCULATOR</Text>
        {/* /////////////////////////////////////////////////////////////// */}
        <View style={styles.row}>
          <View style={styles.button}>
            <RadioButton
              value="first"
              status={ units === 'kg' ? 'checked' : 'unchecked' }
              onPress={() => setUnits('kg')}
              color={Colors.primaryColor}
            />
          <Text>Kilograms & Metre</Text>
          </View>
          <View style={styles.button}>
            <RadioButton
              value="second"
              status={ units === 'feet' ? 'checked' : 'unchecked' }
              onPress={() => setUnits('feet')}
              color={Colors.primaryColor}
            />
        <Text>lbs & Inches</Text>
        </View> 

        </View>
        
        <View style={styles.row}>
          <View style={styles.button}>
            <RadioButton
              value="first"
              status={ checked === 'first' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('first')}
              color={Colors.primaryColor}
            />
          <Text>Male</Text>
          </View>
          <View style={styles.button}>
            <RadioButton
              value="second"
              status={ checked === 'second' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('second')}
              color={Colors.primaryColor}
            />
        <Text>Female</Text>
        </View>
        </View>
        
      
      <TextInput placeholder='Enter Weight in lbs' onChangeText={(val) => {setLbs(val)}} keyboardType='numeric' />
      <TextInput placeholder='Enter height in inches' onChangeText={(val) => {setInches(val)}} keyboardType='numeric' />
      <ThemeButton title='Calculate' onPress={BMIcalculatorFeet} />
    </View>  
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  heading: {
    fontFamily: 'Karla-BoldItalic',
    fontSize: 24,
    textAlign: 'center'
  }
})
export default CalculateScreen;