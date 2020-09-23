import React from 'react';
import {
  StyleSheet,
  View, Text, FlatList
} from 'react-native';
import Header from './../Components/Header';
import ThemeButton from '../Components/ThemeButton';
import { useSelector } from 'react-redux';
import NewsCard from '../Components/NewsCard';

const HomeScreen = ({ navigation }) => {
  const news = useSelector(state => state.data)
  return (
    <>
      <Header title={'Home'} />
      <View style={styles.container}>
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
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    height: '100%',
    paddingHorizontal: 10,
  },
})

export default HomeScreen;