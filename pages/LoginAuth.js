import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
    AsyncStorage
  } from 'react-native';

  class LoginAuth extends React.Component{
    constructor(props){
        super(props)
        this._loadData();
    }
    render(){
        return(
            <View style={style.container}>
                 <StatusBar backgroundColor="#2D4373" barStyle="light-content"/>
            </View>
        );
    }
    _loadData = async() =>  {
      const logged = await AsyncStorage.getItem('logged');
      this.props.navigation.navigate(logged === '1' ? 'drawer' : 'Login');
    }
  }

  const style = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent:'flex-start',
      alignItems:'center',
      backgroundColor:"#3B5998"
    },
});

export default LoginAuth;