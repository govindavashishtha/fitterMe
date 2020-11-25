import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text, FlatList,
    ScrollView
} from 'react-native';
import Header from './../Components/Header';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import MealCard from '../Components/MealCard';
import Colors from '../Constants/Colors';
import Loader from './../Components/Loader';

const DietScreen = ({ setIsDiet }) => {

    const phone = auth().currentUser.phoneNumber;
    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [preworkout, setPreworkout] = useState([]);
    const [postworkout, setPostworkout] = useState([]);
    const [dinner, setDinner] = useState([]);
    const [loader, setLoader] = useState(true);
    const [calorie, setCalorie] = useState(0);
    useEffect(() => {
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        let arr4 = [];
        let arr5 = [];

        //Breakfast data 
        database()
            .ref('/Users/').child(phone).child('diet')
            .once('value')
            .then(snapshot => {
                if (snapshot.val().Breakfast) {
                    Object.keys(snapshot.val().Breakfast).map(key => {
                        let value = snapshot.val().Breakfast[key];
                        let single = {
                            title: key,
                            item: value
                        }
                        arr1.push(single);
                        setCalorie(calorie + single.item.calories);
                    });
                }
                if (snapshot.val().Lunch) {
                    Object.keys(snapshot.val().Lunch).map(key => {
                        let value = snapshot.val().Lunch[key];
                        let single = {
                            title: key,
                            item: value
                        }
                        arr2.push(single);
                        setCalorie(calorie + single.item.calories);
                    });
                }
                 if(snapshot.val().PreWorkout){
                Object.keys(snapshot.val().PreWorkout).map(key => {
                    let value = snapshot.val().PreWorkout[key];
                    let single = {
                        title: key,
                        item: value
                    }
                    arr3.push(single);
                    setCalorie(calorie + single.item.calories);
                });}
                
                if(snapshot.val().PostWorkout){
                Object.keys(snapshot.val().PostWorkout).map(key => {
                    let value = snapshot.val().PostWorkout[key];
                    let single = {
                        title: key,
                        item: value
                    }
                    arr4.push(single);
                    setCalorie(calorie + single.item.calories);
                });}

                if(snapshot.val().Dinner){
                Object.keys(snapshot.val().Dinner).map(key => {
                    let value = snapshot.val().Dinner[key];
                    let single = {
                        title: key,
                        item: value
                    }
                    arr5.push(single);
                    setCalorie(calorie + single.item.calories);
                })}

            }).then(() => {
                setBreakfast(arr1);
                setLunch(arr2);
                setPreworkout(arr3);
                setPostworkout(arr4);
                setDinner(arr5);
                setLoader(false);
            });
    }, []);

    const onBackPress = () => {
        setIsDiet(true);
    }

    return (
        <>
            <Loader show={loader} text={'Please wait...'} />
            <Header title={'Your Diet'} backPress={onBackPress} />
            {/* <View style={{padding:5,}}>
              <Icon onPress={() => { setIsDiet(true) }} name={'arrow-left'} size={30} color={Colors.primaryColorDark} />
            </View> */}
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.datacontainer}>
                        <Text style={styles.text}>Breakfast</Text>
                        {breakfast.length != 0 ? (
                            <FlatList
                                data={breakfast}
                                renderItem={({ item }) =>
                                    <MealCard Item={item.item} title={item.title} />
                                }
                                keyExtractor={(item, index) => index.toString()}
                            />
                        ) : (
                                <Text style={styles.emptyText}>Seems like Empty in here</Text>
                            )}

                    </View>

                    <View style={styles.datacontainer}>
                        <Text style={styles.text}>Lunch</Text>
                        {lunch.length != 0 ? (
                            <FlatList
                                data={lunch}
                                renderItem={({ item }) =>
                                    <MealCard Item={item.item} title={item.title} />
                                }
                                keyExtractor={(item, index) => index.toString()}
                            />
                        ) : (
                                <Text style={styles.emptyText}>Seems like Empty in here</Text>
                            )}
                    </View>

                    <View style={styles.datacontainer}>
                        <Text style={styles.text}>Pre-Workout</Text>
                        {preworkout.length != 0 ? (
                            <FlatList
                                data={preworkout}
                                renderItem={({ item }) =>
                                    <MealCard Item={item.item} title={item.title} />
                                }
                                keyExtractor={(item, index) => index.toString()}
                            />
                        ) : (
                                <Text style={styles.emptyText}>Seems like Empty in here</Text>
                            )}

                    </View>

                    <View style={styles.datacontainer}>
                        <Text style={styles.text}>Post-Workout</Text>
                        {postworkout.length != 0 ? (
                            <FlatList
                                data={postworkout}
                                renderItem={({ item }) =>
                                    <MealCard Item={item.item} title={item.title} />
                                }
                                keyExtractor={(item, index) => index.toString()}
                            />
                        ) : (
                                <Text style={styles.emptyText}>Seems like Empty in here</Text>
                            )}

                    </View>

                    <View style={styles.datacontainer}>
                        <Text style={styles.text}>Dinner</Text>
                        {dinner.length != 0 ? (
                            <FlatList
                                data={dinner}
                                renderItem={({ item }) =>
                                    <MealCard Item={item.item} title={item.title} />
                                }
                                keyExtractor={(item, index) => index.toString()}
                            />
                        ) : (
                                <Text style={styles.emptyText}>Seems like Empty in here</Text>
                            )}

                    </View>
                </ScrollView>
            </View>
        </>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: '2%',
    },
    datacontainer: {
        paddingBottom: 20,
    },
    emptyText: {
        fontSize: 11,
        color: Colors.charcoalGrey,
        paddingVertical: 7,
        textAlign: 'center',
        borderTopWidth: .5,
        borderBottomWidth: .5,
        borderColor: Colors.primaryColorDark,
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