import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    ScrollView,
    AsyncStorage,
    Modal,
    ActivityIndicator,
} from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class InBarReport extends React.Component{
    constructor(props){
        super(props);
        this.state={
                isLoading:true,
                cfaCode:'',
                contactPerson:'',
                contactNumber:'',
                terr:'',
                area:'',
                amntSold:0,
                voucher:0,
                freedrinks:0,
                totalIncentive:0,
                isModalVisible:false,
                date:'',
                todays_date:'',
            }
        }
    static navigationOptions = {  
        title: 'InBar Report',  
        headerTintColor: "#FFF",
            headerStyle: {
                backgroundColor: '#354F87',
                height: 56,
                elevation: 2
            }
   }; 

  showModal = () => this.setState({ isModalVisible: true });
  hideModal = () => this.setState({ isModalVisible: false });
  resetAll = () =>{
      this.setState(
          {cfaCode:'',
          contactPerson:'',
          contactNumber:'',
          terr:'',
          area:'',
          amntSold:'',
          voucher:'',
          freedrinks:'',
          totalIncentive:'',
          date:'',
        }

      );
  }

  componentDidMount(){
    var date = new Date();
          var yr = date.getFullYear();
          var mon = date.getMonth();
          var month = ((mon+1)<10)?"0"+(mon+1):(mon+1);
          var dat = date.getDate();
          var datt = ((dat+1)<10)?"0"+(dat):(dat);
          var td = yr +"-"+month+"-"+datt;
          this.setState({  
            todays_date: td,     
          });
  }
   
   SaveItemToServer = async () =>{
     
       this.showModal();
    var userData =  await AsyncStorage.getItem('loggedUser');
    var userDataJSON = JSON.parse(userData);
    var staff_id = userDataJSON.field_staff_id;
    var date = new Date();
    var yr = date.getFullYear();
    var mon = date.getMonth();
    var dat = date.getDate();
    var datee = yr +"-"+mon+"-"+dat;
    var projectId = await AsyncStorage.getItem('project_id');
    let  details ={
      'field_staff_id': staff_id,
      'date':this.state.date,
      'project_id':projectId,
      'cfa_code': this.state.cfaCode,
      'contact_number': this.state.contactNumber,
      'contact_person':this.state.contactPerson,
      'territory':this.state.terr,
      'area':this.state.area,
      'amount_sold': this.state.amntSold,
      'voucher': this.state.voucher,
      'free_drinks': this.state.freedrinks,
      'total_insentives': this.state.totalIncentive,
    };
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //console.warn(formBody);
    fetch('http://tradingmmo.com/pma/api/insert_inbar_report', {  
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
      this.hideModal();
      this.resetAll();
      if(responseJson.responce === true){
        alert("Your InBar report successfully updated.");
      }else{
        alert("Your InBar report not updated. Please try again.");
      }
    })
    .catch((error) => {
        this.hideModal();
      console.error(error);
    });
   }
   render(){
    return (
        <ScrollView style={style.scrollcontainer}>
          <View style={style.container}>

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
                      onDateChange={(date) => {this.setState({date: date})}}
                  />  
            <TextInput style={[style.inputbox]} placeholder="CFA Code" onChangeText={(text) => this.setState({cfaCode:text})} value={this.state.cfaCode}/>
            <TextInput style={[style.inputbox]} placeholder="Contact person" onChangeText={(text) => this.setState({contactPerson:text})} value={this.state.contactPerson}/>
            <TextInput style={[style.inputbox]} placeholder="Contact Number" keyboardType={'phone-pad'} onChangeText={(text) => this.setState({contactNumber:text})} value={this.state.contactNumber}/>
            <TextInput style={[style.inputbox]} placeholder="Territory"  onChangeText={(text) => this.setState({terr:text})} value={this.state.terr}/>
            <TextInput style={[style.inputbox]} placeholder="Area"  onChangeText={(text) => this.setState({area:text})} value={this.state.area}/>
            <TextInput style={[style.inputbox]} placeholder="Amount sold" keyboardType={'numeric'} onChangeText={(text) => this.setState({amntSold:text})} value={this.state.amntSold}/>
            <TextInput style={[style.inputbox]} placeholder="Voucher" keyboardType={'numeric'} onChangeText={(text) => this.setState({voucher:text})} value={this.state.voucher}/>
            <TextInput style={[style.inputbox]} placeholder="Free drinks" keyboardType={'numeric'} onChangeText={(text) => this.setState({freedrinks:text})} value={this.state.freedrinks}/>
            <TextInput style={[style.inputbox]} placeholder="Total Incentives" keyboardType={'numeric'} onChangeText={(text) => this.setState({totalIncentive:text})} value={this.state.totalIncentive}/>
                       
            <TouchableOpacity style={{
                padding:10, 
                backgroundColor: '#202646',
                borderRadius:5,
                width:200,
                marginTop:20,
                alignSelf:"center"
                }} onPress={() => { this.SaveItemToServer() } }>
                  <Text style={style.textStyle}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
    );
}
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'flex-start',
        padding: 20,
        alignContent:'center',
        backgroundColor:'#eaeaea',
      },
    welcometext:{
        fontWeight:'bold',
        fontSize:30,
        color:'#fff'
      },
      
      textStyle:{
        color:"#fff",
        width:200,
        fontSize:15,
        fontFamily:"bold",
        fontWeight:'bold',
        textAlign:'center',
      },
      inputbox:{
        backgroundColor:"#fff",
        padding:10,
        position:'relative',
        borderRadius:5,
        color:"#34495E",
        marginTop:10
      },
    });