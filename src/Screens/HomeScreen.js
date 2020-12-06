import React, {useState} from 'react';
import {
  StyleSheet,
  View, Text, FlatList, RefreshControl,
} from 'react-native';
import Header from './../Components/Header';
import { useSelector } from 'react-redux';
import NewsCard from '../Components/NewsCard';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import ThemeButton from './../Components/ThemeButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../Constants/Colors';
import FitImage from '../Components/FitImage';

const HomeScreen = ({ navigation }) => {

  const [news, setNews] = useState(useSelector(state => state.data));
  const [refreshing, setRefreshing] = useState(false);
  const steps = useSelector(state => state.steps);
  const stepsGoal = 5000;

  const [calories, setCalories] = useState();

  const apiKeys = ['59ed4d1096c14181ac87f374a460e0c1',
    '4885a26a44d14c6cb3bd5aed4a203884',
    '5329bf3ba3b840f9b426171a1bf4221f',
    '927de1a2949a49f9aa2c7e1b973c3df4'];

  const fetchAPI = () => {
    console.log('refreshed');
    fetch(`https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=${apiKeys[Math.floor(Math.random() * 4)]}`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setNews(responseJson.articles);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <>
      <Header title={'Home'} />

      <ScrollView style={styles.container} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => { fetchAPI() }} />
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
                <Text style={styles.text}>{steps}</Text>
              </View>
              <Text style={styles.label}>Calories</Text>
              </View>
             
            </View>

          </View>
        </View>
        <View style={{paddingTop:20}}>
        <FlatList
          data={news}
          renderItem={({ item }) => (
            <NewsCard
              Item={item}
            />
          )}
          scrollEnabled={true}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        />
        </View>
        
      </ScrollView>
    </>
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

export default HomeScreen;