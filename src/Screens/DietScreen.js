import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text, FlatList,
    SafeAreaView,
    ScrollView
} from 'react-native';
import Header from './../Components/Header';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import MealCard from '../Components/MealCard';
import Colors from '../Constants/Colors';

const DietScreen = ({ setIsDiet }) => {

    const phone = auth().currentUser.phoneNumber;
    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [preworkout, setPreworkout] = useState([]);
    const [postworkout, setPostworkout] = useState([]);
    const [dinner, setDinner] = useState([]);
    useEffect(() => {
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        let arr4 = [];
        let arr5 = [];

        //Breakfast data 
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
                    arr1.push(single);
                })
            }).then(() => {
                setBreakfast(arr1);
            });
            // Lunch Data
        database()
            .ref('/Users/').child(phone).child('diet').child('Lunch')
            .once('value')
            .then(snapshot => {
                let items = Object.keys(snapshot.val());
                items.map(key => {
                    let value = snapshot.val()[key];
                    let single = {
                        title: key,
                        item: value
                    }
                    arr2.push(single);
                })
            }).then(() => {
                setLunch(arr2);
            });
            // Pre-Workout Data
            database()
            .ref('/Users/').child(phone).child('diet').child('Pre-Workout')
            .once('value')
            .then(snapshot => {
                let items = Object.keys(snapshot.val());
                items.map(key => {
                    let value = snapshot.val()[key];
                    let single = {
                        title: key,
                        item: value
                    }
                    arr3.push(single);
                })
            }).then(() => {
                setPreworkout(arr3);
            });
            // Post-Workout Data
            database()
            .ref('/Users/').child(phone).child('diet').child('Post-Workout')
            .once('value')
            .then(snapshot => {
                let items = Object.keys(snapshot.val());
                items.map(key => {
                    let value = snapshot.val()[key];
                    let single = {
                        title: key,
                        item: value
                    }
                    arr4.push(single);
                })
            }).then(() => {
                setPostworkout(arr4);
            });
            // Dinner Data
            database()
            .ref('/Users/').child(phone).child('diet').child('Dinner')
            .once('value')
            .then(snapshot => {
                let items = Object.keys(snapshot.val());
                items.map(key => {
                    let value = snapshot.val()[key];
                    let single = {
                        title: key,
                        item: value
                    }
                    arr5.push(single);
                })
            }).then(() => {
                setDinner(arr5);
            });
    }, []);

    return (
        <>
            <Header title={'Your Diet'} />
            <Text onPress={() => { setIsDiet(true) }}>Go Back</Text>
            <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator ={false}>
            <View stlye={styles.datacontainer}>
                <Text style={styles.text}>Breakfast</Text>
                <FlatList
                    data={breakfast}
                    renderItem={({item}) =>
                           <MealCard Item={item.item} title={item.title}/>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
                <Text style={styles.text}> </Text>
            </View>

            <View stlye={styles.datacontainer}>
                <Text style={styles.text}>Lunch</Text>
                <FlatList
                    data={lunch}
                    renderItem={({item}) =>
                           <MealCard Item={item.item} title={item.title}/>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
                <Text style={styles.text}> </Text>
            </View>

            <View stlye={styles.datacontainer}>
                <Text style={styles.text}>Pre-Workout</Text>
                <FlatList
                    data={preworkout}
                    renderItem={({item}) =>
                           <MealCard Item={item.item} title={item.title}/>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
                <Text style={styles.text}> </Text>
            </View>

            <View stlye={styles.datacontainer}>
                <Text style={styles.text}>Post-Workout</Text>
                <FlatList
                    data={postworkout}
                    renderItem={({item}) =>
                           <MealCard Item={item.item} title={item.title}/>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
                <Text style={styles.text}> </Text>
            </View>

            <View stlye={styles.datacontainer}>
                <Text style={styles.text}>Dinner</Text>
                <FlatList
                    data={dinner}
                    renderItem={({item}) =>
                           <MealCard Item={item.item} title={item.title}/>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
                <Text style={styles.text}> </Text>
            </View>
            </ScrollView>
            </View>
        </>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 2,
        borderColor: Colors.primaryColorDark,
        borderRadius: 10,
        margin: '2%',
    },
    datacontainer: {

    },
    text: {
        fontFamily: 'Karla-Bold',
        textAlign: 'center',
        fontSize: 15,
        letterSpacing: 2,
        paddingBottom: 10,
        paddingTop: 10,
    }
})

export default DietScreen;