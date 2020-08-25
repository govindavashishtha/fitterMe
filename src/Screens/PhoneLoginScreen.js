import React from 'react';
import {
  StyleSheet,
  View,Text,Button
} from 'react-native';

const PhoneLoginScreen = ({navigation})=>{
    return (
      <View>
          <Text>this is PhoneLoginScreen</Text>
          <Button
        title="Go to SignUp"
        onPress={() => navigation.navigate('SignUp')}
      />
      </View>  
    )
}
export default PhoneLoginScreen;