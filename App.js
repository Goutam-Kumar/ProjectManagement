/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { createStackNavigator, createAppContainer, createSwitchNavigator, createMaterialTopTabNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import Login from './pages/Login'
import LoginAuth from './pages/LoginAuth'
import Home from './pages/Home'
import Attandance from './pages/Attendance'
import SalesReport from './pages/SalesReport'
import InBarReport from './pages/InBarReport'
import InStoreReport from './pages/InStoreReport'
import DisplaySalesReport from './pages/DisplaySalesReport'
import DisplayInbarReport from './pages/DisplayInbarReport'
import DisplayInStoreReport from './pages/DisplayInStoreReport'
import { DrawerActions } from 'react-navigation';
import DrawerContainer from './pages/DrawerContainer ';

class App extends React.Component{
  
  render(){
    return(
      <View style={style.container}>
          
          <Login />
          <LoginAuth/>
      </View>
    ); 
  }
}

const style = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:"#3B5998",
  },
});

const stacker = createSwitchNavigator({
  LoginAuth: {screen: LoginAuth, navigationOptions:{header:null}},
  Login: { screen: Login , navigationOptions:{header:null}},
});

var TabNavigator;
var DisplayNavigator;
if(Platform.OS === 'ios'){
  TabNavigator = createBottomTabNavigator({
    SalesReport : {screen : SalesReport},
    InBarReport : {screen : InBarReport},
    InStoreReport : {screen : InStoreReport},
  },
  {
    intialRouteName: 'SalesReport',
    navigationOptions: {
      title:'Report',
      headerStyle : {
        backgroundColor: '#354F87',
        height: 56,
        elevation: 2
      },
      headerTintColor: '#fff',
       },
     }
  );

  DisplayNavigator = createBottomTabNavigator({
    DisplaySalesReport : {screen : DisplaySalesReport},
    DisplayInbarReport : {screen : DisplayInbarReport},
    DisplayInStoreReport : {screen : DisplayInStoreReport},
  },
  {
    intialRouteName: 'DisplaySalesReport',
    navigationOptions: {
      title:'Display Report',
      headerStyle : {
        backgroundColor: '#354F87',
        height: 56,
        elevation: 2
      },
      headerTintColor: '#fff',
       },
     }
  );
}else if(Platform.OS === 'android'){
  TabNavigator = createMaterialTopTabNavigator({
    SalesReport : {screen : SalesReport},
    InBarReport : {screen : InBarReport},
    InStoreReport : {screen : InStoreReport},
  },
  {
    intialRouteName: 'SalesReport',
    navigationOptions: {
      title:'Report',
      headerStyle : {
        backgroundColor: '#354F87',
        height: 56,
        elevation: 2
      },
      headerTintColor: '#fff',
       },
      tabBarOptions: {
        labelStyle: {
          fontSize: 12,
          position:'relative',
        },
      tabStyle: {
        height: 45,
      },
      style: {
        backgroundColor: '#354F87',
      },
    },
     }
  );

  DisplayNavigator = createMaterialTopTabNavigator({
    DisplaySalesReport : {screen : DisplaySalesReport},
    DisplayInbarReport : {screen : DisplayInbarReport},
    DisplayInStoreReport : {screen : DisplayInStoreReport},
  },
  {
    intialRouteName: 'DisplaySalesReport',
    navigationOptions: {
      title:'Display Report',
      headerStyle : {
        backgroundColor: '#354F87',
        height: 56,
        elevation: 2
      },
      headerTintColor: '#fff',
       },
      tabBarOptions: {
        labelStyle: {
          fontSize: 12,
          position:'relative',
        },
      tabStyle: {
        height: 45,
      },
      style: {
        backgroundColor: '#354F87',
      },
    },
     }
  );
}else{
  TabNavigator = createMaterialTopTabNavigator({
    SalesReport : {screen : SalesReport},
    InBarReport : {screen : InBarReport},
    InStoreReport : {screen : InStoreReport},
  },
  {
    intialRouteName: 'SalesReport',
    navigationOptions: {
      title:'Report',
      headerStyle : {
        backgroundColor: '#354F87',
        height: 56,
        elevation: 2
      },
      headerTintColor: '#fff',
       },
     }
  );
}


const HomeStackNavigator = createStackNavigator(  
  {  
      HomeNavigator: Home  
  },  
  {  
      defaultNavigationOptions: ({ navigation }) => {  
      return {  
          headerLeft: (  
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={require('./assets/images/menu.png')} />  
              </TouchableOpacity>
          )  
      };  
      }  
  }  
);  

const AttandanceStackNavigator = createStackNavigator(  
  {  
    AttandanceNavigator: Attandance  
  },  
  {  
      defaultNavigationOptions: ({ navigation }) => {  
      return {  
          headerLeft: (  
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={require('./assets/images/menu.png')} />  
              </TouchableOpacity>
          )  
      };  
      }  
  }  
);  

const ReportStackNavigator = createStackNavigator(  
  {  
    ReportNavigator: TabNavigator  
  },  
  {  
      defaultNavigationOptions: ({ navigation }) => {  
      return {  
          headerLeft: (  
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={require('./assets/images/menu.png')} />  
              </TouchableOpacity>
          )  
      };  
      }  
  }  
);

const ReportDisplayStackNavigator = createStackNavigator(  
  {  
    ReportDisplayNavigator: DisplayNavigator  
  },  
  {  
      defaultNavigationOptions: ({ navigation }) => {  
      return {  
          headerLeft: (  
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={require('./assets/images/menu.png')} />  
              </TouchableOpacity>
          )  
      };  
      }  
  }  
);

const AppDrawerNavigator = createDrawerNavigator({  
  Home: {  
      screen: HomeStackNavigator  
  },  
  Attendance: {  
      screen: AttandanceStackNavigator  
  },
  Report: {  
      screen: ReportStackNavigator  
  },  
  Display:{
      screen: ReportDisplayStackNavigator
  }
},{
  drawerWidth:200,
  drawerBackgroundColor:'#c5d3f0',
  contentComponent:DrawerContainer,
  overlayColor:'rgba(52, 52, 52, 0.8)',
}); 

const AppNavigator = createSwitchNavigator({  
  drawer: { screen: AppDrawerNavigator },  
  stacker:{screen:stacker},  

},{initialRouteName: 'stacker'});  

// const AppNavigator = createSwitchNavigator({
//   stacker:{screen:stacker},
//   tabber:{screen:tabber},
// },
//  {initialRouteName: 'stacker'}
// );



export default createAppContainer(AppNavigator);


