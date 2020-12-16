import React, {useState} from 'react';
import {
  StyleSheet,
  View, Text,
} from 'react-native';
import Header from './../Components/Header';
import News from '../Components/News';
import Pedometer from '../Components/Pedometer';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../Constants/Colors';

const HomeScreen = ({ navigation }) => {

  const [index, setIndex] = useState(0);

  const ComponentRenderer = () => {
    if (index == 0) {
      return (<Pedometer />)
    } else {
      return(<News />)  
    }
  }

  return (
    <>
      <Header title={'Home'} />
        <View style={styles.container}>
          <View style={styles.horizontal}>
            <Text style={index == 0 ?styles.activeText:styles.text} onPress={() => { setIndex(0) }}>Pedometer</Text>
            <Text style={index == 1 ?styles.activeText:styles.text} onPress={() => { setIndex(1) }}>News</Text>
          </View>
          <ScrollView>
          <ComponentRenderer />
          </ScrollView>
        </View>
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
    width:'50%',
    textAlign:'center',
    padding:5,
    fontFamily:'Karla-Regular',
    color:Colors.charcoalGreyMediocre,
    fontSize:14.5,
  },
  activeText:{
    width:'50%',
    textAlign:'center',
    borderBottomColor:Colors.primaryColorDark,
    borderBottomWidth:3,
    padding:5,
    color:Colors.primaryColorDark,
    fontFamily:'Karla-Bold',
    fontSize:14.9,
  }
})

export default HomeScreen;