import React ,{useEffect } from 'react';
import {
  StyleSheet,
  View,Text,
  Image
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
       <View style={styles.container}>
       <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/fitterme-39927.appspot.com/o/coming_soon.jpg?alt=media&token=b5352822-2f37-4209-abe7-06c2f63e3127'}}
             style={{width:'100%',height: '80%', borderRadius: 10}} />
        <Text style={styles.text}>We are currenlty working on this Feature. It will be out shortly.</Text>
        <Text style={styles.text}>Thanks for your patience:)</Text>
       </View>
      </>  
    )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Karla-BoldItalic',
    padding: 10,
    textAlign: 'center'
  }
})
export default DesignScreen;