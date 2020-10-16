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

  const fetchAPI = () => {
    console.log('refreshed');
    fetch(`https://saurav.tech/NewsAPI/top-headlines/category/health/in.json`, {
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