import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  StatusBar,
  Image,
  PermissionsAndroid,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';


export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleString(),
            colors:['#202646', '#DE8B0B', '#EC123D'],
            buttonColor:'#202646',
            btnText:['Clock-in/Clocked-in','Mid Day Clock/Mid Day Clocked','Clock Out/Clocked out'],
            buttonText:'Clock-in/Clocked-in',
            currentFlag:0,
            deviceID:'',
            loggedUser_name:'',
            loggedUser_projectName:'',
            hasLocationPermission:false,
            userLat:0.0,
            userLng:0.0,
            staffId:'',
            attandanceToday:[],
            type:0,
            attandance_today_count:0,
            isButtonVisible:false,
        };
      }

      async requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              'title': 'Location Permission',
              'message': 'Location Permission Required to access your current location.',
              'buttonPositive':'OK',
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              this.setState({hasLocationPermission:true});
          } else {
            this.setState({hasLocationPermission:false});
            console.warn("location permission denied")
          }
        } catch (err) {
          console.warn(err);
        }
      }

      async componentDidMount() {
        await this.requestLocationPermission();
        this.getLoggedUserDetails();
        this.getDeviceUniqueID();
        this.intervalID = setInterval(
          () => this.tick(),
          1000
        );
          this.getCurrentLocationLatLng();
      }

    componentWillUnmount() {
        clearInterval(this.intervalID);
      }

      tick() {
          var date = new Date();
          var yr = date.getFullYear();
          var mon = date.getMonth();
          var month = ((mon+1)<10)?"0"+(mon+1):(mon+1);
          var dat = date.getDate();
          var hr = date.getHours();
          var hour = (hr<10)?"0"+hr:hr;
          var mins = date.getMinutes();
          var minutes = (mins<10)?"0"+mins:mins;
          var sec = date.getSeconds();
          var seconds = (sec<10)?"0"+sec:sec;

        this.setState({  
          time: dat +"-"+month+"-"+yr+"\n"+hour+":"+minutes+":"+seconds        
        });
      }

      logout= async() => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('LoginAuth');
      }

      getCurrentLocationLatLng = () => {
        if (this.state.hasLocationPermission) {
          Geolocation.getCurrentPosition(
              (position) => {
                  // console.warn(position.coords);
                  this.setState({userLat:position.coords.latitude,userLng:position.coords.longitude}); 
              },
              (error) => {
                  // See error code charts below.
                  console.log(error.code, error.message);
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
      }
      }
    
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Home',
            headerTintColor: "#FFF",
            headerStyle: {
                backgroundColor: '#354F87',
                height: 56,
                elevation: 2
            }
        };
    };
    changeColor = () => {
        //var param = this.state.type;
        const colorArray= this.state.colors;
        const btnTextArray = this.state.btnText;
        
        // switch(param) {
        //     case "0":
        //             this.state.type = "1";
        //         break;
        //     case "1":
        //             this.state.type = "2";
        //         break;
        //     case "2":
        //             this.state.type = "3";
        //         break;
        // }
        
        var currentColor = colorArray[this.state.type];
        var currentText = btnTextArray[this.state.type];
        this.setState({buttonColor:currentColor,buttonText:currentText}); 
        this.PostAttandance();
      }

    getDeviceUniqueID = () => {
      const uniqueId = DeviceInfo.getUniqueID();
      if(uniqueId !== ''){
        this.setState({deviceID:uniqueId});
        //TODO uncomment this code in server
        this.fetchDeviceID();
      }
    }

    getLoggedUserDetails = async() => {
      this.setState({loggedUser_projectName: await AsyncStorage.getItem('loggedUserProjectName')});
      var userData =  await AsyncStorage.getItem('loggedUser');
      var userDataJSON = JSON.parse(userData);
      this.setState({loggedUser_name:userDataJSON.name})
    }

    fetchDeviceID = async() => {
      var userData =  await AsyncStorage.getItem('loggedUser');
      var userDataJSON = JSON.parse(userData);
      var staff_id = userDataJSON.field_staff_id;
      this.setState({staffId:staff_id});
      let  details ={
        'device_id': this.state.deviceID,
        'staff_id': staff_id,
      };
      let formBody = [];
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      fetch('http://tradingmmo.com/pma/api/login_after', {  
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.warn(responseJson);
      if(responseJson.status !== "true"){
        alert("You'r using non-registered device. Please use your registered device.");
        this.logout();
      }else{
        var projId = responseJson.timing_today[0].project_id;
        AsyncStorage.setItem('project_id',projId);
        this.setState({attandance_today_count:responseJson.attandance_today_count});

        if(this.state.attandance_today_count < 3){
          this.setState({isButtonVisible:true});
          var mtype = parseInt(this.state.attandance_today_count) + 1;
          this.setState({type:mtype});
          var currentColor = this.state.colors[parseInt(this.state.attandance_today_count)];
          var currentText = this.state.btnText[parseInt(this.state.attandance_today_count)];
          this.setState({buttonColor:currentColor,buttonText:currentText}); 
        }else{
          this.setState({isButtonVisible:false});
          // var currentColor = this.state.colors[4];
          // var currentText = this.state.btnText[4];
          // this.setState({buttonColor:currentColor,buttonText:currentText}); 
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
    }

    saveProjectID = async({projectId}) =>{
        await AsyncStorage.setItem('project_id',projectId);
    }

    PostAttandance = async() => {
      //alert(this.state.type);
        var type = this.state.type;
        var date = new Date();
        var hr = date.getHours();
        var mins = date.getMinutes();
        var sec = date.getMinutes();
        let  param_details ={
          'staff_id': this.state.staffId,
          'type':type,
          'location':this.state.userLng+','+this.state.userLat,
          'time': hr + ':'+ mins + ':' + sec,
        }
        let formBody = [];
      for (let property in param_details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(param_details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      fetch('http://tradingmmo.com/pma/api/insert_attandance', {  
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody
    })
    .then((response) => response.json())
    .then((responseJson) => {
      //console.warn(responseJson);
      if(responseJson.status === true){
        this.fetchDeviceID();
        alert("Thank you!! You have posted your attendance successfully.");
      }else{
        alert("Sorry!! Your attendance not posted.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
    }

    render(){
        return (
            <View style={style.container}>
            <StatusBar backgroundColor="#2D4373" barStyle="light-content"/>

            <Text style={style.largeText}>Welcome {this.state.loggedUser_name}</Text>
            <View style={style.twoPartScreen}>
                    <Text style={style.textStyle}> {this.state.time}</Text>
            </View>

            <View>
                <Text style={style.largeText}>Project: {this.state.loggedUser_projectName}</Text>
            </View>

            <View>
              {
                this.state.isButtonVisible && 
                <TouchableOpacity style={{
                  padding:10, 
                  backgroundColor: '#202646',
                  borderRadius:5,
                  marginTop:"10%",
                  backgroundColor:this.state.buttonColor
                  }} onPress={this.changeColor}>
              <Text style={style.textStyle}>{this.state.buttonText}</Text>
              </TouchableOpacity>
              }
                

             
                <TouchableOpacity style={style.buttonStyle}>
			              <Text style={style.textStyle} onPress = { this.logout }>Logout</Text>
                </TouchableOpacity>
                
                
            </View>
            {/* <Geolocation/> */}
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
      largeText:{
          fontSize:25,
          fontWeight:'bold',
          color: "#FFF",
          alignContent:'center',
          alignItems:'center',
          shadowColor:'#000',
          shadowRadius:5,
          shadowOffset:{ width: 2, height: 2 },
          marginTop:10
      },
      twoPartScreen:{
          flexDirection:'row',
          marginTop:20
      },
      leftText:{
          flex:1,
          alignContent:'flex-start',
          textAlign:'left',
          color:"#fff",
          fontSize:25
      },
      rightText:{
          flex:1,
          alignContent:'flex-end',
          textAlign:'right',
          color:"#fff",
          fontSize:25
      },
      textStyle:{
        color:"#fff",
        width:300,
        fontSize:20,
        fontFamily:"bold",
        fontWeight:'bold',
        textAlign:'center'
      },

      buttonStyle:{
        color:"#fff",
        width:300,
        fontSize:20,
        fontFamily:"bold",
        fontWeight:'bold',
        textAlign:'center',
        marginTop:20,
        fontWeight:'bold',
        borderColor:'#fff',
        borderRadius:5,
        borderWidth:2,
        padding:10,
        alignSelf:'center',
      }

});