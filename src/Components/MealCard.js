import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Colors from '../Constants/Colors';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import ConfirmDialog from './ConfirmDialog';
import {useSelector} from 'react-redux';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/Ionicons';

const MealCard = ({Item, title, mealTime, refresh}) => {
  const phone = auth().currentUser.phoneNumber;
  const isDarkMode = useSelector((state) => state.isDarkMode);

  const styles = StyleSheet.create({
    horizontalFar: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    container: {
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
      borderColor: Colors.primaryColorDark,
      paddingVertical: 5,
      paddingLeft: 15,
      paddingRight: 5,
      marginBottom: 2,
    },
    label: {
      fontSize: 12,
      paddingRight: 10,
      color: isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80,
    },
    title: {
      fontFamily: 'Karla-Bold',
      fontSize: 15,
      paddingBottom: 2,
      color: isDarkMode ? Colors.textColorDark : Colors.charcoalGrey80,
    },
  });

  const deleteItem = async () => {
    await database()
      .ref('/Users/')
      .child(phone)
      .child('diet')
      .child(mealTime)
      .child(title)
      .set(null)
      .then(() => {
        refresh();
      });
  };
  const actionButton = [
    <TouchableOpacity
      onPress={() => {
        ConfirmDialog('Delete', 'Sure to delete this item?', deleteItem);
      }}
      style={{backgroundColor: '#c9514b', flex: 1}}>
      <View style={{padding: 10}}>
        <Icon name={'trash-outline'} size={25} color={Colors.white} />
      </View>
    </TouchableOpacity>,
  ];
  return (
    <Swipeable rightButtonWidth={48} rightButtons={actionButton}>
      <View style={styles.container}>
        <View style={styles.horizontalFar}>
          <Text style={styles.title}>{title}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.label}>
              Carbs: {Item.totalNutrients.CHOCDF.quantity.toFixed(3)} gm
            </Text>
            <Text style={styles.label}>
              Protein : {Item?.totalNutrients?.PROCNT?.quantity.toFixed(3)} gm
            </Text>
          </View>
        </View>
        <View style={styles.horizontalFar}>
          <Text style={styles.label}>
            Total Calories : {Item.calories} Kcal
          </Text>
          <Text style={styles.label}>
            Fats : {Item.totalNutrients.FAT.quantity.toFixed(3)} gm
          </Text>
        </View>
      </View>
    </Swipeable>
  );
};
export default MealCard;
