import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Colors from '../Constants/Colors';
import ThemeButton from '../Components/ThemeButton'
import Header from './../Components/Header';
import ThemeNumberInput from './../Components/ThemeNumberInput';
import DropDownPicker from 'react-native-dropdown-picker';

const CalculateScreen = () => {
  // useStates for the calculation of the BMI(Body Mass Index)
  const [units, setUnits] = useState('kg')
  const [checked, setChecked] = useState('first')
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [inches, setInches] = useState();
  const [lbs, setLbs] = useState();
  const [BMI, setBMI] = useState(null);
  const [category, setCategory] = useState(null);
  const [errorText, setErrorText] = useState(false);
  // useStates for the calculation of the Maintance Calories and BMR(Basal Metabolic Rate)
  const [mass, setMass] = useState();
  const [length, setLength] = useState();
  const [age, setAge] = useState();
  const [sex, setSex] = useState('Male');
  const [active, setActive] = useState('1');
  const [maintenance, setMaintenance] = useState(null);
  const [error, setError] = useState(false);

  //functions for BMI calculator
  const BMIcalculatorKG = () => {
    if (weight && height && weight !== 0 && height !== 0) {
      setErrorText(false);
      setBMI(weight / (height * height));
      calcCategory(weight / (height * height));
    } else {
      console.log('weight or height not defined');
      setErrorText(true);
    }
  }
  const BMIcalculatorFeet = () => {
    if (lbs && inches && lbs !== 0 && inches != 0) {
      setErrorText(false);
      setBMI((703 * lbs) / (inches * inches));
      calcCategory((703 * lbs) / (inches * inches));
    } else {
      console.log('weight or height not defined');
      setErrorText(true);
    }
  }
  const refresh = () => {
    setWeight(null);
    setBMI(null);
    setCategory(null);
    setHeight(null);
    setInches(null);
    setLbs(null);
    setErrorText(false);
  }

  const refresh1 = () => {
    setMass(null);
    setLength(null);
    setAge(null);
    setActive('1');
    setMaintenance(null);
    setError(false);
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

  // functions for maintenance calories calculator

  const BMRcalculator = () => {
    if (sex === 'Male' && mass && length && age && active) {
      const BMR = 66.47 + (13.75 * mass) + (5.003 * length) - (6.755 * age);
      if (active === 1) {
        setMaintenance(Math.round(1.2 * BMR), 2)
      } else if (active === 2) {
        setMaintenance(Math.round(1.375 * BMR))
      } else if (active === 3) {
        setMaintenance(Math.round(1.55 * BMR))
      } else if (active === 4) {
        setMaintenance(Math.round(1.725 * BMR))
      } else {
        setMaintenance(Math.round(1.9 * BMR))
      }
      console.log(maintenance);

    } else if (sex === 'Female' && mass && length && age && active) {
      const BMR = 655.1 + (9.563 * mass) + (1.85 * length) - (4.676 * age);
      if (active === 1) {
        setMaintenance(Math.round(1.2 * BMR))
      } else if (active === 2) {
        setMaintenance(Math.round(1.375 * BMR))
      } else if (active === 3) {
        setMaintenance(Math.round(1.55 * BMR))
      } else if (active === 4) {
        setMaintenance(Math.round(1.725 * BMR))
      } else {
        setMaintenance(Math.round(1.9 * BMR))
      }
      console.log(maintenance);
    } else {
      console.log('Enter the correct data u dumbass')
      setError(true)
    }
  }

  return (
    <>
     <Header title={'Calculate'} />
      <ScrollView>
        <View style={styles.container}>
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
                  color={Colors.primaryColorDark}
                />
                <Text>Male</Text>
              </View>
              <View style={styles.button}>
                <RadioButton
                  value="second"
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('second')}
                  color={Colors.primaryColorDark}
                />
                <Text>Female</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>Unit:</Text>
              <View style={styles.button}>
                <RadioButton
                  value="first"
                  status={units === 'kg' ? 'checked' : 'unchecked'}
                  onPress={() => { setUnits('kg'); refresh(); }}
                  color={Colors.primaryColorDark}
                />
                <Text>Kg & Metre</Text>
              </View>
              <View style={styles.button}>
                <RadioButton
                  value="second"
                  status={units === 'feet' ? 'checked' : 'unchecked'}
                  onPress={() => { setUnits('feet'); refresh(); }}
                  color={Colors.primaryColorDark}
                />
                <Text>lbs & Inches</Text>
              </View>
            </View>
            {units === 'kg' ?
              (<View style={styles.form}>
                <View style={styles.horizontal}>
                  <Text style={styles.label}>Weight:</Text>
                  <ThemeNumberInput value={weight} placeholder='Enter Weight in KiloGrams' onChangeText={(val) => { setWeight(val) }} keyboard={'numeric'} />
                </View>
                <View style={styles.horizontal}>
                  <Text style={styles.label}>Height:</Text>
                  <ThemeNumberInput value={height} placeholder='Enter height in Metre' onChangeText={(val) => { setHeight(val) }} keyboard={'numeric'} />
                </View>
                <View style={{ marginTop: 10 }}>
                  {BMI &&
                    <Text style={styles.calc}>{`Your BMI(Body Mass Index) is ${BMI}`}</Text>
                  }
                  {category &&
                    <Text style={styles.calc}>{`You are ${category}`}</Text>
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
                  <ThemeNumberInput value={lbs} placeholder='Enter Weight in lbs' onChangeText={(val) => { setLbs(val) }} keyboard={'numeric'} />
                </View>
                <View style={styles.horizontal}>
                  <Text style={styles.label}>Height:</Text>
                  <ThemeNumberInput value={inches} placeholder='Enter height in inches' onChangeText={(val) => { setInches(val) }} keyboard={'numeric'} />
                </View>
                <View style={{ marginTop: 10, }}>
                  {BMI &&
                    <Text style={styles.calc}>{`Your BMI(Body Mass Index) is ${BMI}`}</Text>
                  }
                  {category &&
                    <Text style={styles.calc}>{`You are ${category}`}</Text>
                  }
                </View>
                <View style={{ paddingTop: 5 }}>
                  <ThemeButton title='Calculate' onPress={BMIcalculatorFeet} />
                </View>
                {errorText &&
                  <Text style={styles.errorText}>Please Enter Correct Weight and Height</Text>}
              </View>)}
          </View>


          <View style={styles.childContainer}>
            <Text style={styles.heading}>MAINTENANCE CALORIES CALCULATOR</Text>
            <View style={styles.row}>
              <Text style={styles.title}>Sex:</Text>
              <View style={styles.button}>
                <RadioButton
                  value="Male"
                  status={sex === 'Male' ? 'checked' : 'unchecked'}
                  onPress={() => { setSex('Male'); refresh1(); }}
                  color={Colors.primaryColorDark}
                />
                <Text>Male</Text>
              </View>
              <View style={styles.button}>
                <RadioButton
                  value="Female"
                  status={sex === 'Female' ? 'checked' : 'unchecked'}
                  onPress={() => { setSex('Female'); refresh1(); }}
                  color={Colors.primaryColorDark}
                />
                <Text>Female</Text>
              </View>
            </View>

            <View style={styles.form}>
              <View style={styles.horizontal}>
                <Text style={styles.label}>Age:</Text>
                <ThemeNumberInput value={age} placeholder='Enter Age in Years' onChangeText={(val) => { setAge(val) }} keyboard={'numeric'} />
              </View>
              <View style={styles.horizontal}>
                <Text style={styles.label}>Weight:</Text>
                <ThemeNumberInput value={mass} placeholder='Enter Weight in Kgs' onChangeText={(val) => { setMass(val) }} keyboard={'numeric'} />
              </View>
              <View style={styles.horizontal}>
                <Text style={styles.label}>Height:</Text>
                <ThemeNumberInput value ={length} placeholder='Enter Height in CentiMetres' onChangeText={(val) => { setLength(val) }} keyboard={'numeric'} />
              </View>
            </View>
            <DropDownPicker
              items={[
                { label: 'No Exercise(0 days)', value: '1' },
                { label: 'Little Exercise(1-3 days per week)', value: '2' },
                { label: 'Moderate Exercise(3-5 days a week)', value: '3' },
                { label: 'Very Active(6-7 days a week)', value: '4' },
                { label: 'Extra Active(very active + physical job)', value: '5' },
              ]}
              placeholder="Select your catgeory"
              containerStyle={{ height: 40 }}
              dropDownMaxHeight={100}
              style={{ backgroundColor: Colors.gray }}
              dropDownStyle={{ backgroundColor: Colors.gray }}
              onChangeItem={item => setActive(item)}
            />
            <View style={{ marginTop: 10, }}>
              {maintenance &&
                (<Text style={styles.calc}>{`Your Maintenance Calories are ${maintenance} KCal`}</Text>)
              }
            </View>
            <View style={{ paddingTop: 5 }}>
              <ThemeButton title='Calculate' onPress={BMRcalculator} />
            </View>
            {error &&
              <Text style={styles.errorText}>Please Enter Correct Weight or Height or Age</Text>}
          </View>

        </View>
      </ScrollView>
    </>
  )
}


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
export default CalculateScreen;