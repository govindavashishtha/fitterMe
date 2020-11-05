import React from 'react';
import {
    StyleSheet,Linking,
    View, Text, Image, ImageBackground,TouchableOpacity,SafeAreaView
} from 'react-native';
import Colors from '../Constants/Colors';

const CaloriesCard = ({Item}) => {
    return(
        <>
            <View style ={styles.container}>
                <Text>
                {Item.totalNutrients.PROCNT.label} : {Item.totalNutrients.PROCNT.quantity} {Item.totalNutrients.PROCNT.unit}
                </Text>
                <Text>
                {Item.totalNutrients.CHOCDF.label} : {Item.totalNutrients.CHOCDF.quantity} {Item.totalNutrients.CHOCDF.unit}
                </Text>
                <Text>
                {Item.totalNutrients.ENERC_KCAL.label} : {Item.totalNutrients.ENERC_KCAL.quantity} {Item.totalNutrients.ENERC_KCAL.unit}
                </Text>
                <Text>
                {Item.totalNutrients.FAT.label} : {Item.totalNutrients.FAT.quantity} {Item.totalNutrients.FAT.unit}
                </Text>
                <Text>
                {Item.totalNutrients.FATRN.label} : {Item.totalNutrients.FATRN.quantity} {Item.totalNutrients.FATRN.unit}
                </Text>
                <Text>
                {Item.totalNutrients.FASAT.label} : {Item.totalNutrients.FASAT.quantity} {Item.totalNutrients.FASAT.unit}
                </Text>
                <Text>
                {Item.totalNutrients.FAPU.label} : {Item.totalNutrients.FAPU.quantity} {Item.totalNutrients.FAPU.unit}
                </Text>
                <Text>
                {Item.totalNutrients.FAMS.label} : {Item.totalNutrients.FAMS.quantity} {Item.totalNutrients.FAMS.unit}
                </Text>
                <Text>
                {Item.totalNutrients.FE.label} : {Item.totalNutrients.FE.quantity} {Item.totalNutrients.FE.unit}
                </Text>
                <Text>
                {Item.totalNutrients.K.label} : {Item.totalNutrients.K.quantity} {Item.totalNutrients.K.unit}
                </Text>
                <Text>
                {Item.totalNutrients.MG.label} : {Item.totalNutrients.MG.quantity} {Item.totalNutrients.MG.unit}
                </Text>
                <Text>
                {Item.totalNutrients.NA.label} : {Item.totalNutrients.NA.quantity} {Item.totalNutrients.NA.unit}
                </Text>
                <Text>
                {Item.totalNutrients.ZN.label} : {Item.totalNutrients.ZN.quantity} {Item.totalNutrients.ZN.unit}
                </Text>
                <Text>
                {Item.totalNutrients.P.label} : {Item.totalNutrients.P.quantity} {Item.totalNutrients.P.unit}
                </Text>
                <Text>
                {Item.totalNutrients.VITA_RAE.label} : {Item.totalNutrients.VITA_RAE.quantity} {Item.totalNutrients.VITA_RAE.unit}
                </Text>
                <Text>
                {Item.totalNutrients.VITC.label} : {Item.totalNutrients.VITC.quantity} {Item.totalNutrients.VITC.unit}
                </Text>
                <Text>
                {Item.totalNutrients.VITD.label} : {Item.totalNutrients.VITD.quantity} {Item.totalNutrients.VITD.unit}
                </Text>
                <Text>
                {Item.totalNutrients.TOCPHA.label} : {Item.totalNutrients.TOCPHA.quantity} {Item.totalNutrients.TOCPHA.unit}
                </Text>
                <Text>
                {Item.totalNutrients.WATER.label} : {Item.totalNutrients.WATER.quantity} {Item.totalNutrients.WATER.unit}
                </Text>
            </View>
        </>
    )
}
const styles =  StyleSheet.create({
    container:{
        borderWidth:1,
    }
})

export default CaloriesCard