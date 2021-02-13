import React from 'react';
import {
    StyleSheet,Linking,
    View, Text, Image, ImageBackground,TouchableOpacity,SafeAreaView
} from 'react-native';
import Colors from '../Constants/Colors';
import {useSelector} from 'react-redux';


const NewsCard = ({Item}) => {
    const isDarkMode = useSelector((state) => state.isDarkMode);

    const styles = StyleSheet.create({
        container: {
            marginVertical:5,
            height:360,
            borderWidth:.5,
            borderRadius: 8,
            borderColor: isDarkMode ? 
            Colors.textColorDark
            : 'black',
            overflow:'hidden',
            backgroundColor: isDarkMode
            ? Colors.lightGray
            : Colors.backgroundColorLight,
        },
        image: {
            width: '100%',
            height: '60%',
        },
        linearGradient:{
            position:'absolute',
        },
        title:{
            fontFamily:'Karla-Bold',
            padding:5,
            textAlign:'center',
            color:isDarkMode ? Colors.textColorDark : Colors.charcoalGreyMediocre
        },
        desc:{
            fontSize:12,
            paddingHorizontal:5,
            color: isDarkMode? Colors.gray : Colors.charcoalGrey80,
        }
    })

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

export default NewsCard;