import React from 'react';
import {
    StyleSheet,
    View, Text
} from 'react-native';
import Colors from '../Constants/Colors';


const MealCard = ({ Item, title }) => {
    return (
        <View style={styles.container}>
            <View style={styles.horizontalFar}>
                <Text style={styles.title}>{title}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.label}>Carbs: {Item.totalNutrients.CHOCDF.quantity.toFixed(3)} gm</Text>
                    <Text style={styles.label}>Protein : {Item.totalNutrients.PROCNT.quantity.toFixed(3)} gm</Text>
                </View>
            </View>
            <View style={styles.horizontalFar}>
                <Text style={styles.label}>Total Calories : {Item.calories} Kcal</Text>
                <Text style={styles.label}>Fats : {Item.totalNutrients.FAT.quantity.toFixed(3)} gm</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    horizontalFar: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    container: {
        borderTopWidth: .5,
        borderBottomWidth: .5,
        borderColor: Colors.primaryColorDark,
        paddingVertical: 5,
        paddingLeft: 15,
        paddingRight: 5,
    },
    label: {
        fontSize: 12,
        paddingRight: 10,
    },
    title: {
        fontFamily: 'Karla-Bold',
        fontSize: 15,
        paddingBottom: 2,
    }
})

export default MealCard;