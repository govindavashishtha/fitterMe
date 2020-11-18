import React, { useState } from 'react';
import {
  StyleSheet,
  View, Text, TextInput,
  TouchableOpacity, ScrollView
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../Constants/Colors';
import Header from './../Components/Header';
import CaloriesCard from './../Components/CaloriesCard';
import Loader from './../Components/Loader';
import DropDownPicker from "react-native-dropdown-picker";
import ThemeButton from './../Components/ThemeButton';
import ThemeButtonDisabled from './../Components/ThemeButtonDisabled';
import toast from './../Components/Toast';
import database from '@react-native-firebase/database';

const DesignScreen = () => {

  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [mealTime, setMealTime] = useState();
  const phone = auth().currentUser.phoneNumber;

  const apiKeys = [
    { id: '4e18da1c', key: 'f3febcf06129e0a997f01ca869a8fc9b' },
    { id: '637f0343', key: 'f11ca2c4da5076e81c83b2ba5aed2c56a' },
    { id: 'e301e438', key: '10d90fe5af2e277e39179d43cbd2cd09' },
    { id: '9d5826ac', key: '21d803b54cf439280a6a243119672e0d' },
    { id: '53ec4d19', key: 'e61fdb3cd19724aa1bd74ce7db12b871' },
    { id: '0dd5e843', key: '3ffcdd627a25d5dbf157a3a3854af603' },
  ];

  const addToDiet = () => {
    console.log(mealTime);
    console.log(data);
    console.log(query);
    database().ref('/Users').child(phone).child('diet').child(mealTime).child(query).set(data);
  }
  const ShowData = () => {
    if (data) {
      return (
        <>
          <CaloriesCard Item={data} />
          <Text style={styles.text1}>Add to the diet:</Text>
          <View style={styles.list}>
            <DropDownPicker
              items={[
                { label: 'Breakfast', value: 'Breakfast' },
                { label: 'Lunch', value: 'Lunch' },
                { label: 'Pre-Workout', value: 'Pre-Workout' },
                { label: 'Post-Workout', value: 'Post-Workout' },
                { label: 'Dinner', value: 'Dinner' },
              ]}
              placeholder="Select a meal time..."
              containerStyle={{ height: 40 }}
              dropDownMaxHeight={100}
              style={{ backgroundColor: Colors.gray }}
              dropDownStyle={{ backgroundColor: Colors.gray }}
              onChangeItem={item => setMealTime(item.value)}
            />
            <View>
              {mealTime ?
                <ThemeButton onPress={addToDiet} title={'Add'} /> :
                <ThemeButtonDisabled onPress={() => { toast("Please select a meal time") }} title={'Add'} />}
            </View>
          </View>
        </>
      )
    } else {
      return (null);
    }
  }

  const fetchAPI = () => {
    const index = Math.floor(Math.random() * 6);
    let query0 = query.replace(/[^a-zA-Z0-9]/g, ' ');
    let query1 = query0.replace(/^\s+|\s+$/gm,'');
    let Query = query1.replace(/\s/g, '%20');
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
      <Loader show={loader} text={'Searching'} />
      <Header title={'Design'} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.icon}>
            <TouchableOpacity onPress={() => {
              if (query == 0) {
                toast('Please add a query');
              } else { setLoader(true); fetchAPI(); }
            }}>
              <Icon name={'search'} size={20} color={Colors.charcoalGrey80} />
            </TouchableOpacity>
          </View>
          <TextInput style={styles.search} placeholder='Search...' placeholderTextColor={Colors.charcoalGrey80} onChangeText={(n) => { setQuery(n) }} />
          <Text style={styles.text}>Search food item and get its Nutritional Values (e.g. 1 large apple)</Text>
          {error ? (
            <View style={styles.errorContainer}>

              <View style={{ padding: 10, marginTop: '40%' }}>
                <Icon name={'paper-plane'} size={50} color={Colors.charcoalGrey80} />
              </View>
              <Text>Sorry, Unable to search for this Query</Text>
              <Text>Try using another keywords</Text>

            </View>) : (
              <View>
                <ShowData />
              </View>
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
    position: 'relative',
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
  text1: {
    fontSize: 13,
    fontFamily: 'Karla-Bold',
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
  list: {
    position: 'relative',
    marginBottom: 60,
    flex: 1,
    marginHorizontal: "-20%",
  }

})
export default DesignScreen;