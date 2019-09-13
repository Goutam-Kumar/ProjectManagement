import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default class Reports extends React.Component{
    static navigationOptions = {  
        title: 'Reports',  
        headerTintColor: "#FFF",
            headerStyle: {
                backgroundColor: '#354F87',
                height: 56,
                elevation: 2
            }
   };  
    render(){
        return (
            <View style={style.container}>
                <Text style={style.welcometext}>Under Construction</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#3B5998",
        padding:20
      },
      welcometext:{
        fontWeight:'bold',
        fontSize:30,
        color:'#fff'
      }
    });