import React, {Component} from 'react';
import { View, Text,Platform } from 'react-native';
import { createMaterialTopTabNavigator,createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Home from './Home'
import Profile from './Attendance'



// const AppNavigator = createMaterialTopTabNavigator({
//     Screen1 : {screen : Screen1},
//     Screen2 : {screen : Screen2},
//   },
//    {initialRouteName: 'Screen1'}
//   );
var AppNavigator;
if(Platform.OS === 'ios'){
    AppNavigator = createBottomTabNavigator({
        Home : {screen : Home},
        Profile : {screen : Profile},
      },
       {initialRouteName: 'Home'}
      );
}else if(Platform.OS === 'android'){
    AppNavigator = createMaterialTopTabNavigator({
        Home : {screen : Home},
        Profile : {screen : Profile},
      },
       {initialRouteName: 'Home'}
      );
}else{
    AppNavigator = createMaterialTopTabNavigator({
        Home : {screen : Home},
        Profile : {screen : Profile},
      },
       {initialRouteName: 'Home'}
      );
}

export default createAppContainer(AppNavigator);