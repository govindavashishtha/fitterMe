import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Colors from '../Constants/Colors';
import ThemeButton from '../Components/ThemeButton'
import Header from './../Components/Header';
import ThemeNumberInput from './../Components/ThemeNumberInput';

const CalculateScreen = ()=>{
  const [units, setUnits] = useState('kg')
  const [checked, setChecked] = useState('first')
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [inches, setInches] = useState();
  const [lbs, setLbs] = useState();
  const [BMI, setBMI] = useState(null);

  const BMIcalculatorKG = () => {
    if(weight !== '0' && height !== '0') {
       setBMI(weight / (height * height));
    } else {
      console.log('weight or height not defined')
    }
  } 
  const BMIcalculatorFeet = () => {
    if(lbs !== '0' && inches !=='0') {
      setBMI((703 * lbs) / (inches * inches));
    } else {
      console.log('weight or height not defined')
    }
  }

     return (
       <View>
       <Header title={'Calculate'} />
       <View style={styles.container}>
      <View style = {styles.childContainer}>
        <Text style={styles.heading}>BMI CALCULATOR</Text>
         {/* /////////////////////////////////////////////////////////////// */}
         <View style={styles.row}>
         <Text style ={styles.title}>Sex:</Text>
          <View style={styles.button}>
            <RadioButton
              value="first"
              status={ checked === 'first' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('first')}
              color={Colors.primaryColorDark}
            />
           <Text>Male</Text>
          </View>
          <View style={styles.button}>
            <RadioButton
              value="second"
              status={ checked === 'second' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('second')}
              color={Colors.primaryColorDark}
            />
        <Text>Female</Text>
        </View>
        </View>
        <View style={styles.row}>
        <Text style ={styles.title}>Unit:</Text>
           <View style={styles.button}>
            <RadioButton
              value="first"
              status={ units === 'kg' ? 'checked' : 'unchecked' }
              onPress={() => setUnits('kg')}
              color={Colors.primaryColorDark}
            />
          <Text>Kg & Metre</Text>
          </View>
          <View style={styles.button}>
            <RadioButton
              value="second"
              status={ units === 'feet' ? 'checked' : 'unchecked' }
              onPress={() => setUnits('feet')}
              color={Colors.primaryColorDark}
            />
        <Text>lbs & Inches</Text>
        </View> 
         </View>
         {units === 'kg' ? 
         (<View style={styles.form}>
          <View style={styles.horizontal}>
            <Text style={styles.label}>Weight:</Text>
            <ThemeNumberInput value={weight} placeholder='Enter Weight in KiloGrams' onChangeText={(val) => {setWeight(val)}} keyboard={'numeric'} />
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.label}>Height:</Text>
            <ThemeNumberInput value={height} placeholder='Enter height in Metre' onChangeText={(val) => {setHeight(val)}} keyboard={'numeric'} />
          </View>
          { BMI && 
            <Text style={styles.calc}>{`Your BMI(Body Mass Index) is ${BMI}`}</Text>
            }
            <View style = {{paddingTop:5}}>
             <ThemeButton title='Calculate' onPress={BMIcalculatorKG} />
             </View>
         </View>)
           :
          (<View>
          <View style={styles.horizontal}>
            <Text style={styles.label}>Weight:</Text>
            <ThemeNumberInput value={lbs} placeholder='Enter Weight in lbs' onChangeText={(val) => {setLbs(val)}} keyboard={'numeric'} />
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.label}>Height:</Text>
            <ThemeNumberInput value={inches} placeholder='Enter height in inches' onChangeText={(val) => {setInches(val)}} keyboard={'numeric'} />
          </View>  
          { BMI && 
            <Text style={styles.calc}>{`Your BMI(Body Mass Index) is ${BMI}`}</Text>
            }
          <View style = {{paddingTop:5}}>
             <ThemeButton title='Calculate' onPress={BMIcalculatorFeet} />
             </View>
          </View>)}
    </View>  
    </View>
    </View>
    )
  } 


const styles = StyleSheet.create({
  container:{
      padding:7,
  },
  form:{
    padding:5,
  },
  calc:{
   textAlign:'center',
   padding:15,
  },
  label:{
    paddingTop:10,
    fontSize:15,
    color:Colors.charcoalGrey80,
    fontFamily:'Karla-Regular'
  },
  childContainer:{
    padding:10,
     borderWidth:.2,
     borderRadius:5,
    elevation:1,
  },
  title:{
    fontFamily:'Karla-Bold',
    fontSize:15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontal:{
  flexDirection:'row',
  alignItems:'center',
  paddingBottom:5,
  paddingHorizontal:20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems:'center',
  },
  heading: {
    fontSize: 15,
    textAlign: 'center',
    padding:15,
  }
})
export default CalculateScreen;