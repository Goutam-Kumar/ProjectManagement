import React, {Component} from 'react';
import {
    AppRegistry,
  StyleSheet,
  View,
  TextInput,
  Picker, 
  ActivityIndicator,
  TouchableOpacity,
  Text,
  ScrollView,
  Modal,
  Alert,
  AsyncStorage,
  Image,
} from 'react-native';
import SalesItem from '../model/SalesItem';
import CustomAddItem from './CustomAddItem'

export default class SalesReport extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            PickerValueHolder:'',
            dataSource:[],
            salesArray:[], 
            Alert_Visibility: false,
            it_id : 0,
            unitNumber : 0,
            ctnNumber : 0,
            nameRetailer : '',
            address:'',
            landmark:'',
            phone:'',
            channel:'',
            isModalVisible:false,
          }
    }
    showModal = () => this.setState({ isModalVisible: true });
    hideModal = () => this.setState({ isModalVisible: false });
    resetAll = () => {
      this.setState({
            PickerValueHolder:'',
            salesArray:[], 
            it_id : '',
            unitNumber : '',
            ctnNumber : '',
            nameRetailer : '',
            address:'',
            landmark:'',
            phone:'',
            channel:'',
      });
    }
    componentDidMount(){
      //uncomment below line in server
      this.GetAllItemDetails();
    }

    GetAllItemDetails=()=>{
      return fetch('http://tradingmmo.com/pma/api/get_item')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.responce,
        }, function() {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }

    GetPickerSelectedItemValue=()=>{
        alert(this.state.PickerValueHolder);
    }

    saveSalesReport = () =>{
        mSalesItem = new SalesItem();
        mSalesItem.it_id = this.state.PickerValueHolder;
        mSalesItem.unitNumber = this.state.unitNumber;
        mSalesItem.ctnNumber = this.state.ctnNumber;

        var newStateArray = this.state.salesArray.slice();
        newStateArray.push(mSalesItem);
        this.setState({salesArray: newStateArray});
        //console.warn(JSON.stringify(this.state.salesArray));
    }

    static navigationOptions = {  
        title: 'SalesReport',  
        headerTintColor: "#FFF",
            headerStyle: {
                backgroundColor: '#354F87',
                height: 56,
                elevation: 2
            }
        }; 

        Show_Custom_Alert(visible) {
          this.setState({Alert_Visibility: visible});
        }
       
        ok_Button=()=>{
          if(this.state.ctnNumber != 0 && this.state.unitNumber != 0 && this.state.PickerValueHolder != ''){
            this.saveSalesReport();
            this.setState({ctnNumber:0,unitNumber:0,PickerValueHolder:''});
          }else{
            alert('Please enter all the required data.');
          }
          this.Show_Custom_Alert(!this.state.Alert_Visibility)
        }

        deleteRow(index){
          console.warn(this.state.salesArray);
          this.setState(prevState => ({
            salesArray: prevState.salesArray.splice(index, 1),
          }));
        }

        addedItemList =() => {
            return this.state.salesArray.map((data,index) => {
              return (
                <View style={style.cardContainer}>
                  <View style={style.dataaView}>
                    <CustomAddItem
                        itemId={data.it_id}
                        ctn={data.ctnNumber}
                        unit={data.unitNumber}
                    />
                  </View>
                  <TouchableOpacity onPress={() => {this.deleteRow(index)}} activeOpacity={0.7} style={style.delete}>
                    <View  >
                      <Image source={require('../assets/images/bin.png')}/>
                    </View>
                  </TouchableOpacity>
                  
                </View>
              );
            })
        }

        


        SaveItemToServer = async () => {
          if(this.state.nameRetailer != '' && this.state.address != '' 
          && this.state.landmark != '' && this.state.phone != '' 
          && this.state.channel != '' && this.state.salesArray.length != 0){

            this.showModal();
            let item_id_ar = []; let ctn_ar = []; let unit_ar = [];
            for(let i=0;i<this.state.salesArray.length;i++){
              item_id_ar[i] = this.state.salesArray[i].it_id;
              ctn_ar[i] = this.state.salesArray[i].ctnNumber;
              unit_ar[i] = this.state.salesArray[i].unitNumber;
            }
  
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
              'date':datee,
              'project_id':projectId,
              'name_retailer': this.state.nameRetailer,
              'address': this.state.address,
              'landmark':this.state.landmark,
              'phone':this.state.phone,
              'channel':this.state.channel,
              'item_id': item_id_ar,
              'ctn':ctn_ar,
              'unit':unit_ar,
            };
            let formBody = [];
            for (let property in details) {
              let encodedKey = encodeURIComponent(property);
              let encodedValue = encodeURIComponent(details[property]);
              formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            //console.warn(formBody);
            fetch('http://tradingmmo.com/pma/api/insert_sales_report', {  
              method: 'POST',
              headers: {
                'Accept': '*/*',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              },
              body: formBody
            })
            .then((response) => response.json())
            .then((responseJson) => {
              this.resetAll();
              this.hideModal();
              //console.warn(responseJson);
              if(responseJson.responce === true){
                alert("Your sales report successfully updated.");
              }else{
                alert("Your sales report not updated. Please try again.");
              }
            })
            .catch((error) => {
              this.hideModal();
              console.error(error);
            });
          }else{
            alert("Please enter all the required data.");
          }
          
        }


    render(){
        if (this.state.isLoading) {
            return (
              <View style={{flex: 1, paddingTop: 20}}>
                <ActivityIndicator />
              </View>
            );
        }
        return (
          <ScrollView>
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


              {/* alert dialog to add item */}
                <Modal
                  visible={this.state.Alert_Visibility}
                  transparent={true}
                  animationType={"fade"}
                  onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } >
                    <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={style.Alert_Main_View}>

                            <Text style={style.Alert_Title}>Add Sales Items information.</Text>

                            <View style={style.item_container}>
                                <Picker style={style.spinner}
                                    selectedValue={this.state.PickerValueHolder}
                                    onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
                                    { this.state.dataSource.map((item, key)=>(
                                        <Picker.Item label={item.item_name} value={item.item_id} key={key} />)
                                    )}
                                </Picker> 
                                <TextInput style={[style.inputbox]} placeholder="Enter ctn qty." keyboardType={'numeric'} onChangeText={(text) => this.setState({ctnNumber:text})} clearButtonMode="always"/>
                                <TextInput style={[style.inputbox]} placeholder="Enter unit qty" keyboardType={'numeric'} onChangeText={(text) => this.setState({unitNumber:text})} clearButtonMode="always"/>
                                <View style={{flexDirection: 'row', height: 40, marginTop:20}}>
        
                                <TouchableOpacity 
                                    style={style.buttonStyle}
                                    onPress={this.ok_Button} 
                                    activeOpacity={0.7} >
            
                                    <Text style={style.TextStyle}> OK </Text>
                        
                                </TouchableOpacity>
        
        
                                <TouchableOpacity 
                                    style={style.buttonStyle} 
                                    onPress={() => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } 
                                    activeOpacity={0.7} >
                                    <Text style={style.TextStyle}> CANCEL </Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                            
                        </View>
                    </View>
                </Modal>
         
         
                <TextInput style={[style.inputbox]} placeholder="Name of Retailer" onChangeText={(text) => this.setState({nameRetailer:text})} value={this.state.nameRetailer}/>
                <TextInput style={[style.inputbox]} placeholder="Address" onChangeText={(text) => this.setState({address:text})} value={this.state.address}/>
                <TextInput style={[style.inputbox]} placeholder="Landmark" onChangeText={(text) => this.setState({landmark:text})} value={this.state.landmark}/>
                <TextInput style={[style.inputbox]} placeholder="Phone Number" keyboardType={'phone-pad'} onChangeText={(text) => this.setState({phone:text})} value={this.state.phone}/>
                <TextInput style={[style.inputbox]} placeholder="Channel"  onChangeText={(text) => this.setState({channel:text})} value={this.state.channel}/>
                <View>
                  {this.addedItemList()}
                </View>
                <TouchableOpacity onPress={() => { this.Show_Custom_Alert(true) } } activeOpacity={0.7} >
                      <Text style={style.addButton}> Add Sales Item </Text>
                </TouchableOpacity>
                
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
      },
      welcometext:{
        fontWeight:'bold',
        fontSize:30,
        color:'#fff'
      },
      spinner:{
        height: 45,   
        color: '#344953',  
        justifyContent: 'center',  
        position:'relative',
        borderBottomWidth:1, 
        borderColor: 'rgb(204, 204, 204)',
        backgroundColor:"#FFF",
      },
      inputbox:{
        backgroundColor:"#fff",
        padding:10,
        position:'relative',
        borderRadius:5,
        color:"#34495E",
        marginTop:10
      },
      textStyle:{
        color:"#fff",
        width:200,
        fontSize:15,
        fontFamily:"bold",
        fontWeight:'bold',
        textAlign:'center',
      },
      Alert_Main_View:{
        backgroundColor : "#28416b", 
        height: '80%' ,
        width: '90%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius:7,
       
      },
       
      Alert_Title:{
       
        fontSize: 20, 
        color: "#fff",
        textAlign: 'center',
        padding: 10,
        height: '28%'
       
      },
       
      Alert_Message:{
       
          fontSize: 22, 
          color: "#fff",
          textAlign: 'center',
          padding: 10,
          height: '42%'
         
        },
       
      buttonStyle: {
          width: '50%',
          height: '80%',
          justifyContent: 'center',
          alignItems: 'center'
       
      },
         
      TextStyle:{
          color:'#fff',
          textAlign:'center',
          fontSize: 22,
          marginTop: -5
      },
      addButtonStyle:{
        backgroundColor:'#c28108',
        fontSize:10,
        marginTop:10,
      },
      item_container:{
        height:90,
        width:"100%",
        padding:20,
      },

      addButton: {
        padding:10,
        backgroundColor: '#a37d0b',
        borderRadius:5,
        marginTop:10,
        color:'white',
        alignContent:'center',
        alignSelf:'center'
        },
        cardContainer: {
          flex: 1,
          flexDirection: 'row',
          padding: 10,
          marginLeft:16,
          marginRight:16,
          marginTop: 8,
          marginBottom: 8,
          borderRadius: 5,
          backgroundColor: '#FFF',
          elevation: 2,
        },
        delete:{
          flex:0.2,
          flexDirection: 'column',
          justifyContent:'center',
      },

      dataaView:{
        flex: 0.8,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
      },
    });