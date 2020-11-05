import React, { useState } from 'react';
import {
  StyleSheet,
  View, Text, TextInput,
  TouchableOpacity,Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../Constants/Colors';
import Header from './../Components/Header';
import CaloriesCard from './../Components/CaloriesCard';
import Loader from './../Components/Loader';

const DesignScreen = () => {

  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [loader , setLoader] = useState(false);

  const ShowData = () =>{
    if(data){
      return(<CaloriesCard Item={data}/>)
    }else{
      return(null);
    }
  }

  const fetchAPI = () => {
    console.log('refreshed');
    const YOUR_APP_ID = '0dd5e843';
    const YOUR_APP_KEY = '3ffcdd627a25d5dbf157a3a3854af603';
    let Query = query.replace(/\s/g, '%20')
    fetch(`https://api.edamam.com/api/nutrition-data?app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&ingr=${Query}`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.calories == 0) {
          setError(true);
          setLoader(false);
        } else {
          setError(false);
          console.log(responseJson)
          setData(responseJson);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setLoader(false);
      });
  }

  return (
    <>
     <Loader  show={loader} text={'Searching'}/>
      <Header title={'Design'} />
      <View style={styles.container}>
        <View style={styles.icon}>
          <TouchableOpacity onPress={()=>{setLoader(true); fetchAPI();}}>
            <Icon name={'search'} size={20} color={Colors.charcoalGrey80} />
          </TouchableOpacity>
        </View>
        <TextInput style={styles.search} placeholder='Search...' placeholderTextColor={Colors.charcoalGrey80} onChangeText={(n) => { setQuery(n) }} />
        <Text style={styles.text}>Search food item and get its Nutritional Values (e.g. 1 large apple)</Text>
        { error ? (
        <View style={styles.errorContainer}>
          
          <View style={{padding:10, marginTop:-20}}>
            <Icon name={'paper-plane'} size={50} color={Colors.charcoalGrey80} />
          </View>
          <Text>Sorry, Unable to search for this Query</Text>
          <Text>Try using another keywords</Text>

        </View>) : (
           <ShowData/>
        )
        }
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 0,
  },
  errorContainer: {
    flex: 1,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 13,
    fontFamily: 'Karla-Regular',
    paddingVertical: 10,
    textAlign: 'center',
  },
  search: {
    borderColor: Colors.primaryColorDark,
    borderWidth: 2,
    borderRadius: 50,
    width: '90%',
    marginTop: 10,
    padding: 12,
    textAlign: 'center',
    fontSize: 15,
  },
  icon: {
    position: 'absolute',
    right: 37,
    top: 27,
    zIndex: 1,
  },

})
export default DesignScreen;