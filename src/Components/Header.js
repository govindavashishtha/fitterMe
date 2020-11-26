import {Text, View} from 'react-native';
import React from 'react';
import Colors from '../Constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({title , backPress}) =>{

 return(
    <View style = {{height:'7%',flexDirection:'row', backgroundColor:Colors.primaryColorDark, alignItems:'center' ,justifyContent: backPress ?'space-between':'center',}}>
         {backPress && 
            <View style={{paddingLeft:10,}}>
              <Text style={{fontSize:40, color:Colors.white}} onPress={()=>{backPress()}} >￩</Text>
            </View>
          }
          
        <Text style = {{marginLeft: backPress? "-7%":0, textAlign:'center',color:Colors.white,fontSize:20,fontFamily:'Pacifico-Regular' }}>{title}</Text>   
        {backPress && 
            <Text style = {{textAlign:'center',color:Colors.white,fontSize:20,fontFamily:'Pacifico-Regular' }}></Text>   }
        
    </View>
    )
}
export default Header;