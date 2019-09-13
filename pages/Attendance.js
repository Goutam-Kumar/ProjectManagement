import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  AsyncStorage,
  
} from 'react-native';
import CustomRow from '../pages/CustomRow'
import PTRView from 'react-native-pull-to-refresh';

export default class Attendance extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            staffId: '',
            attendanceResponse: '',
            isProgress: false,
        }
    }
    static navigationOptions = {  
        title: 'Attendance',  
        headerTintColor: "#FFF",
            headerStyle: {
                backgroundColor: '#354F87',
                height: 56,
                elevation: 2
            }
   };  
   async componentDidMount(){
        var userData =  await AsyncStorage.getItem('loggedUser');
        var userDataJSON = JSON.parse(userData);
        var staff_id = userDataJSON.field_staff_id;
        this.setState({staffId:staff_id});
        this.GetAttendanceForYou();
   }
   _refresh = () => {
    return new Promise((resolve) => {
        
      setTimeout(()=>{resolve()}, 2000);
      
    });
  }

   GetAttendanceForYou = () => {
     this.setState({isProgress:true});
    let  details ={
        'staff_id': this.state.staffId,
      };
      let formBody = [];
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      fetch('http://tradingmmo.com/pma/api/get_attandance', {  
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({isProgress:false});
      console.warn(responseJson);
      this.setState({attendanceResponse:responseJson});
    })
    .catch((error) => {
      this.setState({isProgress:false});
      console.error(error);
    });
    this.render();
   }

   getAllAttendance =() => {
    return (
        <PTRView onRefresh={this._refresh} >
        <View style={style.container}>
            <FlatList
            data={this.state.attendanceResponse}
            renderItem={({ item }) => <CustomRow
                date={item.date}
                time={item.time}
                location={item.location}
                type={item.type}
            />}
        />
        </View>
        </PTRView>
    );
    }

    render(){
        return this.getAllAttendance();
      
    }
}


const style = StyleSheet.create({
    container:{
        flex: 1,
        
      },
      welcometext:{
        fontWeight:'bold',
        fontSize:30,
        color:'#fff'
      }
    });