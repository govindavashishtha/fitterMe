import React, {useState} from 'react';
import {
  StyleSheet,
  View, FlatList, RefreshControl,
} from 'react-native';
import { useSelector } from 'react-redux';
import NewsCard from '../Components/NewsCard';
import { ScrollView } from 'react-native-gesture-handler';

const News = () => {
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
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <ScrollView style={styles.container} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => { fetchAPI() }} />
      }>
          <View style={{paddingTop:20}}>
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
            </View>
      </ScrollView>
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

export default News