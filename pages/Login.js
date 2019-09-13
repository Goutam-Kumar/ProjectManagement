
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  AsyncStorage,
  Modal,
  ActivityIndicator,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

export default class Login extends React.Component{
  constructor(){
    super();
    this.state = {
      username:'',
      usernameValidate:false,
      password:'',
      device_id:'',
      passwordValidate:false,
      loggedUserData:'',
      loggedUserProjectName:'',
      isModalVisible:false,
    }
  }

  showModal = () => this.setState({ isModalVisible: true });
  hideModal = () => this.setState({ isModalVisible: false });
  
  componentDidMount() {
    this.getDeviceUniqueID();
  }

  getDeviceUniqueID = () => {
    const uniqueId = DeviceInfo.getUniqueID();
    if(uniqueId !== ''){
      this.setState({device_id:uniqueId});
    }
  }
  NavigateToHomePage = () => {
    this.props.navigation.navigate('drawer');
  }

  ValidateAll = async() => {
    if(this.state.username != '' && this.state.password != ''){
      this.LoginApiCall();
      //////TODO: remove below lines in server
      //await AsyncStorage.setItem('logged','1');
      //this.NavigateToHomePage();
    }else{
      alert('Please enter username and password');
    }
  }

 
  LoginApiCall = () => {
    //Show progress dialog
    this.showModal();

    let  details ={
      'username': this.state.username,
      'password': this.state.password,
      'device_id':this.state.device_id,
    };
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('http://tradingmmo.com/pma/api/login_check', {  
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.hideModal();
      //console.warn(responseJson.responce);
      if(responseJson.responce !== false){
        this.setState({loggedUserData:JSON.stringify(responseJson.responce)});
        this.setState({loggedUserProjectName:responseJson.project_name});
        this.SaveLoginResponse();
      }else{
        alert("Please enter valid username and password.");
      }
    })
    .catch((error) => {
      this.hideModal();
      console.error(error);
    });
  }

  SaveLoginResponse = async() => {
    await AsyncStorage.setItem('loggedUser',this.state.loggedUserData);
    await AsyncStorage.setItem('loggedUserProjectName',this.state.loggedUserProjectName);
    await AsyncStorage.setItem('logged','1');
    this.NavigateToHomePage();
  }

  RetriveLoginResponse = async() => {
     await AsyncStorage.getItem('loginResponse');
     await AsyncStorage.getItem('logged');
  }

render(){
    return(
      

      <View style={style.container}>
      <StatusBar backgroundColor="#2D4373" barStyle="light-content"/>
       <Image
          style={style.logo}
          source={require('../assets/images/pm_logo.png')}
        /> 
      {/* This is added for progress dialog */}
      <Modal visible={this.state.isModalVisible}
              transparent={true}
              animationType={"fade"} >
              <View style={{ flex: 1, backgroundColor: '#00dcdcdc', alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
                  <Text style={{ fontSize: 20, fontWeight: '200' }}>Loading</Text>
                  <ActivityIndicator size="large" />
                  </View>
              </View>
        </Modal>

        {/* <Text style={style.welcometext}>Project Management</Text> */}
        <TextInput style={[style.username,this.state.usernameValidate ? style.errorusername : null]} placeholder="Username" onChangeText={(text) => this.setState({username:text})} value={this.state.username}/>
        <TextInput style={[style.password]} placeholder="Password" secureTextEntry onChangeText={(text) => this.setState({password:text})} value={this.state.password}/>

          <TouchableOpacity style={style.buttonStyle}>
              <Text style={style.textStyle} onPress = { this.ValidateAll }>Login</Text>
          </TouchableOpacity>
      </View>
    );
  }

}

const style = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:"#3B5998"
  },
    logo:{
        height:200,
        width:200,
        marginTop:'10%',
        backgroundColor:'#3B5998'
    },
    welcome:{
      fontSize:30,
      fontWeight:'bold',
      fontFamily:'bold',
      color: '#fff',
      marginTop:'10%'
    },
    username:{
      backgroundColor:"#fff",
      padding:10,
      width:300,
      marginTop:"10%",
      borderRadius:5,
      color:"#34495E",
      fontWeight:'bold'
    },
    errorusername:{
      backgroundColor:"#fff",
      padding:10,
      width:300,
      marginTop:"10%",
      borderRadius:5,
      borderColor:'red',
      color:"#34495E",
      fontWeight:'bold'
    },
    password:{
      backgroundColor:"#fff",
      padding:10,
      width:300,
      marginTop:"5%",
      borderRadius:5,
      color:"#34495E",
      fontWeight:'bold'
    },
    flexcontainer:{
      flexDirection:'row',
      width:'90%'
    },
    buttonStyle: {
      padding:10,
      backgroundColor: '#202646',
      borderRadius:5,
      marginTop:"10%"
      },
    textStyle:{
      color:"#fff",
      width:100,
      fontSize:15,
      fontFamily:"bold",
      fontWeight:'bold',
      textAlign:'center'
    },
    welcometext:{
      fontWeight:'bold',
      fontSize:30,
      color:'#fff',
      marginTop:200
    }
  });

  
  