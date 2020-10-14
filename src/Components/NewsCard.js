import React from 'react';
import {
    StyleSheet,Linking,
    View, Text, Image, ImageBackground,TouchableOpacity,SafeAreaView
} from 'react-native';
import Colors from '../Constants/Colors';


const NewsCard = ({Item}) => {
    return (
        <View style={styles.container}>
              <TouchableOpacity onPress ={()=>{Linking.openURL(Item.url)}}>
              <Image
                style={styles.image}
                source={{
                    uri: Item.urlToImage,
                }}
               />
               <View style={{padding:5,justifyContent:'center', alignContent:'center', justifyContent:'center', alignItems:'center',height:'40%'}}>
               <Text style ={styles.title}>{Item.title}</Text>
               <Text style={styles.desc}>{Item.description}</Text>
               </View>
                </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginVertical:5,
        height:360,
        borderWidth:.5,
        borderRadius: 8,
        overflow:'hidden',
        backgroundColor:Colors.white,
    },
    image: {
        width: '100%',
        height: '60%',
    },
    linearGradient:{
        position:'absolute',
    },
    title:{
        fontFamily:'Karla-Bold', padding:5,
        textAlign:'center',
    },
    desc:{
        fontSize:12,
        paddingHorizontal:5,
        color:Colors.charcoalGrey80,
    }
})
export default NewsCard;