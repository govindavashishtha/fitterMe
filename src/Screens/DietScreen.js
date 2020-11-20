import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,FlatList,
    ScrollView,SafeAreaView
} from 'react-native';
import Header from './../Components/Header';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import MealCard from '../Components/MealCard';

const DietScreen = ({ setIsDiet }) => {
    const phone = auth().currentUser.phoneNumber;
    const object = [];
    useEffect(() => {
        database()
            .ref('/Users/').child(phone).child('diet').child('Breakfast')
            .once('value')
            .then(snapshot => {
                //console.log('data: ', snapshot.val());
                // setData(snapshot.val());
                dataRenderer(snapshot.val());
            });

    });

    const dataRenderer = (data) => {
        let items = Object.keys(data);
        items.map(key => {
            let value = data[key];
            let single = {
                title: key,
                item: value
            }
            object.push(single);
        });
        console.log(object);
    };

    return (
        <>
            <Header title={'Your Diet'} />
            <Text onPress={() => { setIsDiet(true) }}>Go Back</Text>
            <SafeAreaView style={styles.container}>
            <FlatList
                data={object}
                renderItem={({obj})=>
                  <MealCard Item={obj.item} title={obj.title}/>
                }
                keyExtractor={item => item.id}
            />
            </SafeAreaView>
        </>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
})

export default DietScreen;