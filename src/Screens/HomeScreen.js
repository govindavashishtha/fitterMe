import React, { useState} from 'react';
import {
  StyleSheet,
  View, Text, FlatList, RefreshControl
} from 'react-native';
import Header from './../Components/Header';
import { useSelector } from 'react-redux';
import NewsCard from '../Components/NewsCard';

import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => {
  const [news, setNews] = useState(useSelector(state => state.data));
  const [refreshing, setRefreshing] = useState(false);
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
        console.log(responseJson.articles)
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
        <FlatList
          data={news}
          renderItem={({ item }) => (
            <NewsCard
              Item={item}
            />
          )}
          scrollEnabled={true}
          horizontal={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        />
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
})

export default HomeScreen;