import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View, Text,
  Button
} from 'react-native';
import Header from './../Components/Header';
import News from '../Components/News';
import Pedometer from '../Components/Pedometer';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../Constants/Colors';
import {useSelector} from 'react-redux';
import {check, PERMISSIONS, RESULTS, request,openSettings} from 'react-native-permissions';
import PermissionDenied from '../Components/PermissionDenied';

const HomeScreen = ({ navigation }) => {

  const [index, setIndex] = useState(0);
  const isDarkMode = useSelector((state) => state.isDarkMode);
  const [permission, setPermission] = useState(true);

  const styles = StyleSheet.create({
    container: {
      padding: 7,
      marginBottom: 100,
      backgroundColor: isDarkMode
        ? Colors.backgroundColorDark
        : Colors.backgroundColorLight,
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
      color:isDarkMode ? Colors.textColorDark : Colors.charcoalGreyMediocre,
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

  const checkActivityPermission = ()=>{
    check(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION)
    .then((result) => {
     if(result == RESULTS.DENIED || result == RESULTS.BLOCKED) {
       console.log("results>>>>>>>>>>>>>>>>>>>>>>>>>>", result);
       setPermission(false);
     }
    })
    .catch((error) => {
      console.error(error);
      setPermission(true);
    });
  }

  const ComponentRenderer = () => {
    if (index == 0) {
      console.log(":::::::::::::::::::::::::::::::::::::::::::::::::",permission)
      if(!permission) {
        return (
        <PermissionDenied />
      )
      } else {
        console.log(":::::::::::::::::::::::::::::::::::::::::::::::::",permission)
        return (<Pedometer />)
      }
      
    } else {
      return(<News />)  
    }
  }

  useEffect(() => {
    checkActivityPermission();
  }, [index])

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


export default HomeScreen;