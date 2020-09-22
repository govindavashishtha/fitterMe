import {Text, View} from 'react-native';
import React from 'react';
import Colors from '../Constants/Colors';

const Header = ({title}) =>{

 return(
    <View style = {{height:'7%', backgroundColor:Colors.primaryColorDark, justifyContent:'center'}}>
        <Text style = {{textAlign:'center',color:Colors.white,fontSize:20,fontFamily:'Pacifico-Regular' }}>{title}</Text>    
    </View>
    )
}
export default Header;