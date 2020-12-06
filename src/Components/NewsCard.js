import React from 'react';
import {
    StyleSheet,Linking,
    View, Text, Image, ImageBackground,TouchableOpacity,SafeAreaView,Dimensions
} from 'react-native';
import Colors from '../Constants/Colors';

const screen = Dimensions.get("screen");

const NewsCard = ({Item}) => {
    return (
        <View style={styles.container}>
              <TouchableOpacity onPress ={()=>{Linking.openURL(Item.url)}}>
              <Image
                style={styles.image}
                source={{
                    uri: Item.urlToImage ? Item.urlToImage : 'https://firebasestorage.googleapis.com/v0/b/fitterme-39927.appspot.com/o/fitterMe-Black.png?alt=media&token=62122a1e-07ac-4904-b2e1-e46aa7bb4ec4',
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
        width:screen.width-100,
        marginVertical:5,
        height:360,
        margin:5,
        borderWidth:.5,
        borderRadius: 8,
        overflow:'hidden',
        backgroundColor:Colors.white,
        flex:1,
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