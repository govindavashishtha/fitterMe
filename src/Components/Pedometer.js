import React, {useState} from 'react';
import {
  StyleSheet,
  View, Text, RefreshControl,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../Constants/Colors';
import FitImage from '../Components/FitImage';

const Pedometer = () => {
    const [refreshing, setRefreshing] = useState(false);
    const steps = useSelector(state => state.steps);
    const user = useSelector(state => state.userDetails);
   
    const [height,setHeight] =useState(user.height);
    const [weight,setWeight] =useState(user.weight);
    const speed = 2.01168;
    const stride = height*0.43*0.0328084;
    const dist = stride*steps;
    const [stepsGoal, setStepGoals] = useState(user.steps);
    

   const calories =  ((0.035 * weight) + (speed)) / ((height/100) * (0.029 * weight))

   console.log(calories);

    return (
        <ScrollView style={styles.container} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => { console.log('refresh') }} />
          }>
            <View>
              <View>
                <FitImage outerCircleFillPercentage={(steps/stepsGoal)*100} />
              </View>
              <View>
                <View style={styles.row}>
                <View style={{alignItems:'center',margin: 15,left: '0%',}}>
                <View style={styles.row}>
                    <Icon name={'walk'} size={30} color={Colors.charcoalGrey80} />
                    <Text style={styles.text}>{steps}</Text>
                  </View>
                  <Text style={styles.label}>Steps Taken</Text>
                </View>
                <View style={{alignItems:'center',margin: 15,left: '0%',}}>
                  <View style={styles.row}>
                    <Icon name={'compass'} size={28} color={Colors.charcoalGrey80} />
                    <Text style={styles.text}>{Math.round(dist * 0.26)} m </Text>
                  </View>
                  <Text style={styles.label}>Distance Covered</Text>
                  </View>                 
                </View>
                
                <View style={styles.row}>
                <View style={{alignItems:'center',margin: 15,}}>
                <View style={styles.row}>
                    <Icon name={'fire'} size={30} color={Colors.charcoalGrey80} />
                    <Text style={styles.text}>{calories.toFixed(2)} KCals</Text>
                  </View>
                  <Text style={styles.label}>Calories Burnt</Text>
                </View>

                </View>
              </View>
              <View style={{position : 'absolute', top: '32%', left: '32%'}}>
                    <Text style={styles.text1}>{steps} / {stepsGoal} </Text>
                  </View>
            </View>
          </ScrollView>
    )
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      paddingHorizontal: 10,
    },
    row: {
      alignItems:'center',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    text:{
      fontFamily:'Karla-Bold',
      fontSize:16,
      paddingHorizontal:10
    },
    label:{
       fontSize:14,
       fontStyle: 'italic',
    },
    text1: {
      fontFamily:'Karla-Bold',
      fontSize:22,
      paddingHorizontal:10,
      color: Colors.primaryColorDark,
    }
  })

export default Pedometer
