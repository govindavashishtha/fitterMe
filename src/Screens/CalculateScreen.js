import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import BodyMassIndex from '../Components/BodyMassIndex';
import BodyFat from '../Components/BodyFat';
import Header from './../Components/Header';
import MaintenanceCalorie from '../Components/MaintenanceCalorie';
import Colors from '../Constants/Colors';
import { Col } from 'native-base';

const CalculateScreen = () => {
  const [index, setIndex] = useState(0);

  const ComponentRenderer = () => {
    if (index == 0) {
      return (<BodyMassIndex />)
    } else if (index == 1) {
      return(
        <MaintenanceCalorie />
      )  
    } else {
      return (
        <BodyFat />
      )
    }
  }
  return (
    <>
      <Header title={'Calculate'} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.horizontal}>
            <Text style={index == 0 ?styles.activeText:styles.text} onPress={() => { setIndex(0) }}>BMI</Text>
            <Text style={index == 1 ?styles.activeText:styles.text} onPress={() => { setIndex(1) }}>Maintain</Text>
            <Text style={index == 2 ?styles.activeText:styles.text} onPress={() => { setIndex(2) }}>BodyFat</Text>
          </View>
          <ComponentRenderer />
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
  horizontal: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text:{
    width:'33.3%',
    textAlign:'center',
    padding:5,
    fontFamily:'Karla-Regular',
    color:Colors.charcoalGreyMediocre,
    fontSize:14.5,
  },
  activeText:{
    width:'33.3%',
    textAlign:'center',
    borderBottomColor:Colors.primaryColorDark,
    borderBottomWidth:3,
    padding:5,
    color:Colors.primaryColorDark,
    fontFamily:'Karla-Bold',
    fontSize:14.9,
  }
})
export default CalculateScreen;