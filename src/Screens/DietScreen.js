import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
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
                    setObject([...object, single]);
                });
            });

    });

    return (
        <>
            <Header title={'Your Diet'} />
            <Text onPress={() => { setIsDiet(true) }}>Go Back</Text>
            <SafeAreaView style={styles.container}>
                {
                    object.map((obj) => {
                        console.log(obj);
                        return (
                            <View>
                                <MealCard Item={obj.item} title={obj.title} />
                            </View>
                        )
                    })}
            </SafeAreaView>
        </>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default DietScreen;