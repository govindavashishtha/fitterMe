import React ,{useState} from 'react';
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
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchAPI = () => {
    console.log('refreshed');
    fetch('http://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=59ed4d1096c14181ac87f374a460e0c1', {
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