import React ,{useEffect } from 'react';
import {
  StyleSheet,
  View,Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './../Components/Header';

const DesignScreen = ()=>{

  useEffect(() => {
    fetch("https://rapidapi.p.rapidapi.com/nutrients", {
	"method": "POST",
	"headers": {
		"content-type": "application/json",
		"x-rapidapi-host": "nutri-s1.p.rapidapi.com",
		"x-rapidapi-key": "47ec513a1emsh2eff7ed26773166p17efeejsn9f532cf0209a"
	},
	"body": {
		"query": "100 grams of chicken and two eggs"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});
  },[])
    return (
      <>
       <Header title={'Design'}/>
       <View style={styles.container}></View>
      </>  
    )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
})
export default DesignScreen;