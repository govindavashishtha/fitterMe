import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text, FlatList,
    SafeAreaView
} from 'react-native';
import Header from './../Components/Header';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import MealCard from '../Components/MealCard';

const DietScreen = ({ setIsDiet }) => {

    const phone = auth().currentUser.phoneNumber;
    const [object, setObject] = useState([]);
    useEffect(() => {
        let arr = [];
        database()
            .ref('/Users/').child(phone).child('diet').child('Breakfast')
            .once('value')
            .then(snapshot => {
                let items = Object.keys(snapshot.val());
                items.map(key => {
                    let value = snapshot.val()[key];
                    let single = {
                        title: key,
                        item: value
                    }
                    arr.push(single);
                    console.log('heyy');
                })
            }).then(() => {
                console.log(arr);
                setObject(arr);
            });
    }, []);

    return (
        <>
            <Header title={'Your Diet'} />
            <Text onPress={() => { setIsDiet(true) }}>Go Back</Text>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={object}
                    renderItem={({item}) =>
                           <MealCard Item={item.item} title={item.title}/>
                    }
                    keyExtractor={(item, index) => index.toString()}
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