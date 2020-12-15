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
    const stride = height*0.43*0.0328084;
    const dist = stride*steps;
   ;
    const distGoal =stride*500;
    const stepsGoal = 5000;
    const distGoals = stride*5000;
    const [calories, setCalories] = useState();

    return (
        <ScrollView style={styles.container} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => { console.log('refresh') }} />
          }>
            <View>
              <View>
                <FitImage innerCircleFillPercentage={(steps/stepsGoal)*100} outerCircleFillPercentage={(steps/stepsGoal)*100} />
              </View>
              <View>
                <View style={styles.row}>
                <View style={{alignItems:'center'}}>
                <View style={styles.row}>
                    <Icon name={'walk'} size={30} color={Colors.charcoalGrey80} />
                    <Text style={styles.text}>{steps}</Text>
                  </View>
                  <Text style={styles.label}>Steps</Text>
                </View>
                <View style={{alignItems:'center'}}>
                  <View style={styles.row}>
                    <Icon name={'fire'} size={30} color={Colors.charcoalGrey80} />
                    <Text style={styles.text}>{dist}</Text>
                  </View>
                
                  <Text style={styles.label}>Distance</Text>
                  </View>   


                  <View style={{alignItems:'center'}}>
                  <View style={styles.row}>
                    <Icon name={'fire'} size={30} color={Colors.charcoalGrey80} />
                    <Text style={styles.text}>{steps}</Text>
                  </View>
                
                  <Text style={styles.label}>Calories</Text>
                  </View>          
                </View>
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
      justifyContent: 'space-evenly',
    },
    text:{
      fontFamily:'Karla-Bold',
      fontSize:16,
      paddingHorizontal:10
    },
    label:{
       fontSize:13,
    }
  })

export default Pedometer
