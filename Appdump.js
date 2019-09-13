import React, { Component } from 'react';
import { View, Image, TouchableOpacity,Text } from 'react-native';
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
  DrawerActions,
} from 'react-navigation';

import Home from './pages/Home'
import Profile from './pages/Profile'

class MainActivity extends Component{
    toggleDrawer = () => {
        this.props.navigationProps.toggleDrawer();
      };
      render() {
        return (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
              {/*Donute Button Image */}
              <Image
                source={require('./assets/images/menu.png')}
                style={{ width: 25, height: 25, marginLeft: 5 }}
              />
            </TouchableOpacity>
          </View>
        );
      }
}

const Home_StackNavigator = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    First: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        title: 'Home',
        //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerLeft: <Text onPress={() => 
          this.props.navigation.dispatch(DrawerActions.openDrawer())}>Menu</Text>,
        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
      }),
    },
  });

  const Profile_StackNavigator = createStackNavigator({
    //All the screen from the Screen2 will be indexed here
    Second: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        title: 'Profile',
        //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerLeft: <Text onPress={() => 
         this.props.navigation.dispatch(DrawerActions.openDrawer())}>Menu</Text>,
        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
      }),
    },
  });

  const DrawerNavigatorExample = createDrawerNavigator({
    //Drawer Optons and indexing
    Screen1: {
      //Title
      screen: Home_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Home',
      },
    },
    Screen2: {
      //Title
      screen: Profile_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Profile',
      },
    },
  });
  export default createAppContainer(DrawerNavigatorExample);