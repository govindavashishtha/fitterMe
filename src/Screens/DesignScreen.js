import React from 'react';
import {
  StyleSheet,
  View,Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DesignScreen = ()=>{
    return (
      <View>
      <Text>
      <Icon name="rocket" size={500} color="#900" />
      </Text>
      <Icon name="rocket" size={30} color="#900" />
      </View>  
    )
}
export default DesignScreen;