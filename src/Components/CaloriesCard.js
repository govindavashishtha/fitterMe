import React from 'react';
import {
    StyleSheet,
    View, Text,
} from 'react-native';


const CaloriesCard = ({Item}) => {
    return(
        <>
            <View style ={styles.container}>
                {Item.calories ? (
                    <Text style={styles.text}>
                    Total Calories :    {Item.calories} Kcal
                </Text>
                ) : null}

                {Item.totalWeight ? (
                    <Text style={styles.text}>
                    Total Weight :      {Item.totalWeight.toFixed(2)} g
                </Text>
                ) : null}

                {/* <ExtenedLine /> */}
                {Item.totalNutrients.CHOCDF ? (<Text style={styles.text}>
                {Item.totalNutrients.CHOCDF.label} :                   {Item.totalNutrients.CHOCDF.quantity.toFixed(2)} {Item.totalNutrients.CHOCDF.unit}
                </Text>) : (<></>)}
                
                {/* <ExtenedLine /> */}
                {Item.totalNutrients.PROCNT && Item.totalNutrients? (
                    <Text style={styles.text}>
                {Item.totalNutrients.PROCNT.label} :                {Item.totalNutrients.PROCNT.quantity.toFixed(2)} {Item.totalNutrients.PROCNT.unit}
                </Text>
                ) : null}
                
                {/* <ExtenedLine /> */}
                {Item.totalNutrients.FAT ? (<Text style={styles.text}>
                Total {Item.totalNutrients.FAT.label} :              {Item.totalNutrients.FAT.quantity.toFixed(2)} {Item.totalNutrients.FAT.unit}
                </Text>) : (<></>)}
                {Item.totalNutrients.FASAT ? (<Text style={styles.text1}>
                {Item.totalNutrients.FASAT.label} Fat :           {Item.totalNutrients.FASAT.quantity.toFixed(2)} {Item.totalNutrients.FASAT.unit}
                </Text>) : (<></>)}
                {Item.totalNutrients.FAT && Item.totalNutrients.FASAT ? (<Text style={styles.text1}>
                Unsaturated Fat :      {(Item.totalNutrients.FAT.quantity - Item.totalNutrients.FASAT.quantity).toFixed(2)} {Item.totalNutrients.FAPU.unit}
                </Text>) : (<></>)}
                
                {/* <ExtenedLine /> */}
                <Text style={styles.text}>Macros and Micros</Text>
                {Item.totalNutrients.FE ? (<Text style={styles.text1}>
                {Item.totalNutrients.FE.label} :                              {Item.totalNutrients.FE.quantity.toFixed(2)} {Item.totalNutrients.FE.unit}
                </Text>) : (<></>)}
                {Item.totalNutrients.ZN ? (<Text style={styles.text1}>
                {Item.totalNutrients.ZN.label} :                              {Item.totalNutrients.ZN.quantity.toFixed(2)} {Item.totalNutrients.ZN.unit}
                </Text>) : (<></>)}
                {Item.totalNutrients.NA ? (<Text style={styles.text1}>
                {Item.totalNutrients.NA.label} :                       {Item.totalNutrients.NA.quantity.toFixed(2)} {Item.totalNutrients.NA.unit}
                </Text>) : (<></>)}
                {Item.totalNutrients.K ? (<Text style={styles.text1}>
                {Item.totalNutrients.K.label} :                 {Item.totalNutrients.K.quantity.toFixed(2)} {Item.totalNutrients.K.unit}
                </Text>) : (<></>)}
                {Item.totalNutrients.P ? (<Text style={styles.text1}>
                {Item.totalNutrients.P.label} :               {Item.totalNutrients.P.quantity.toFixed(2)} {Item.totalNutrients.P.unit}
                </Text>) : (<></>)}
                {Item.totalNutrients.MG ? (<Text style={styles.text1}>
                {Item.totalNutrients.MG.label} :               {Item.totalNutrients.MG.quantity.toFixed(2)} {Item.totalNutrients.MG.unit}
                </Text>) : (<></>)}
                
                {/* <ExtenedLine /> */}
                <Text style={styles.text}>Vitamins</Text>
                {Item.totalNutrients.VITA_RAE ? (<Text style={styles.text1}>
                {Item.totalNutrients.VITA_RAE.label} :                   {Item.totalNutrients.VITA_RAE.quantity.toFixed(2)} {Item.totalNutrients.VITA_RAE.unit}
                </Text>) : (<></>)}
                {Item.totalNutrients.VITC ? (<Text style={styles.text1}>
                {Item.totalNutrients.VITC.label} :                   {Item.totalNutrients.VITC.quantity.toFixed(2)} {Item.totalNutrients.VITC.unit}
                </Text>) : (<></>)}
                {Item.totalNutrients.VITD ? (<Text style={styles.text1}>
                {Item.totalNutrients.VITD.label} :                   {Item.totalNutrients.VITD.quantity.toFixed(2)} {Item.totalNutrients.VITD.unit}
                </Text>) : (<></>)}
                {Item.totalNutrients.TOCPHA ? (<Text style={styles.text1}>
                {Item.totalNutrients.TOCPHA.label} :                    {Item.totalNutrients.TOCPHA.quantity.toFixed(2)} {Item.totalNutrients.TOCPHA.unit}
                </Text>) : (<></>)}
                
            </View>
        </>
    )
}
const styles =  StyleSheet.create({
    container:{
        borderWidth:1,
        borderRadius: 10,
        alignItems: 'baseline',
        justifyContent: 'center',
        margin:10,
        backgroundColor: "#fff",
        padding: 30,
        shadowColor: "#000",
        width: '100%',
        shadowOffset: {
        width: 1,
        height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 10
    },
    text: {
        fontFamily: 'Karla-Bold',
        fontSize: 16,
        marginTop: 10,
    },
    text1: {
        fontFamily: 'Karla-Regular',
        fontSize: 14,
    }
})

export default CaloriesCard