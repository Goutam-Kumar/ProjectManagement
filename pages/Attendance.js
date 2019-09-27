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
import DatePicker from 'react-native-datepicker';
import Login from './Login';

export default class Attendance extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            staffId: '',
            attendanceResponse: '',
            isProgress: false,
            date:'',
            attendanceListData:'',
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
      this.setState({date:''});
      this.componentDidMount();
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
      //console.warn(responseJson);
      this.setState({attendanceResponse:responseJson});
      this.setState({attendanceListData:responseJson});
    })
    .catch((error) => {
      this.setState({isProgress:false});
      console.error(error);
    });
    this.render();
   }

   getAttendanceOnDate = (selectedDate) => {
     this.setState({date:selectedDate});
     
     if(this.state.date == ''){
        this.setState({attendanceListData:this.state.attendanceResponse});
     }
     else{
        this.setState({attendanceListData:[]});
        for(var i=0;i<this.state.attendanceResponse.length;i++){
          var selectDate = this.state.date;
          
            if(selectDate == this.state.attendanceResponse[i].date){
              //console.warn(this.state.attendanceResponse[i].date);
              this.setState({ attendanceListData: this.state.attendanceListData.concat(this.state.attendanceResponse[i]) });
            }
        }
     }
   }

   getAllAttendance =() => {
    return (
        <PTRView onRefresh={this._refresh} >
          <DatePicker
                      style={{width: 300,marginTop:10,alignSelf:'center'}}
                      date={this.state.date}
                      mode="date"
                      placeholder="select date"
                      format="YYYY-MM-DD"
                      minDate="2019-01-01"
                      maxDate={this.state.todays_date}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0
                        },
                        dateInput: {
                          marginLeft: 35,
                          backgroundColor:"#fff",
                          padding:10,
                          position:'relative',
                          borderRadius:5,
                          color:"#34495E",
                          
                        }
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(selectedDate) => {this.getAttendanceOnDate(selectedDate)}}
                  />
        <View style={style.container}>
            <FlatList
            //data={this.state.attendanceResponse}
            data={this.state.attendanceListData}
            renderItem={({ item }) => <CustomRow
                date={item.date}
                time={item.time}
                location={item.location}
                type={item.type}
                status={item.status}
                check_loc={item.check_loc}
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