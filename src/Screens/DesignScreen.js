import React, { useState } from 'react';
import {
  StyleSheet,
  View, Text, TextInput,
  TouchableOpacity,ScrollView
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
  
  const apiKeys = [
    {id:'4e18da1c',key:'f3febcf06129e0a997f01ca869a8fc9b'},
    {id:'637f0343',key:'f11ca2c4da5076e81c83b2ba5aed2c56a'},
    {id:'e301e438',key:'10d90fe5af2e277e39179d43cbd2cd09'},
    {id:'9d5826ac',key:'21d803b54cf439280a6a243119672e0d'},
    {id:'53ec4d19',key:'e61fdb3cd19724aa1bd74ce7db12b871'},
    {id:'0dd5e843',key:'3ffcdd627a25d5dbf157a3a3854af603'},
  ]
  const ShowData = () =>{
    if(data){
      return(<CaloriesCard Item={data}/>)
    }else{
      return(null);
    }
  }
   
  const YOUR_APP_ID = 'e301e438';
  const YOUR_APP_KEY = '10d90fe5af2e277e39179d43cbd2cd09';

  const fetchAPI = () => {
    const index = Math.floor(Math.random() * 6);
    console.log('refreshed');
    let Query = query.replace(/\s/g, '%20')
     fetch(`https://api.edamam.com/api/nutrition-data?app_id=${apiKeys[index].id}&app_key=${apiKeys[index].key}&ingr=${Query}`, { 
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
      <ScrollView>
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
      </ScrollView>
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
    right: 40,
    top: 27,
    zIndex: 1,
  },

})
export default DesignScreen;