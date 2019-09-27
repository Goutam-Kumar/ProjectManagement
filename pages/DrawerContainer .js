import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { NavigationActions } from 'react-navigation'

export default class DrawerContainer extends React.Component {

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
         <Image
          style={styles.logo}
          source={require('../assets/images/pm_logo.png')}/>

        <Text
          onPress={() => navigation.navigate('Home')}
          style={styles.uglyDrawerItem}>
          Home
        </Text>
        <Text
          onPress={() => navigation.navigate('Attendance')}
          style={styles.uglyDrawerItem}>
          Attendance
        </Text>
        <Text
          onPress={() => navigation.navigate('Report')}
          style={styles.uglyDrawerItem}>
          Report
        </Text>
        <Text
          onPress={() => navigation.navigate('Display')}
          style={styles.uglyDrawerItem}>
          Report Display
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  uglyDrawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#354F87',
    padding: 15,
    margin: 10,
    borderRadius: 0,
    borderColor: '#00354F87',
    borderWidth: 0,
    textAlign: 'center'
  },
  logo:{
    height:100,
    width:100,
    marginTop:'10%',
    backgroundColor:'#f6f6f6',
    alignSelf:'center'
    },
})