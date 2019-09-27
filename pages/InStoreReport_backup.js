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
    AsyncStorage,
} from 'react-native';
import InStoreItem from '../model/InStoreItem';
import CustomIsStoreItem from './CustomIsStoreItem'

export default class InStoreReport extends React.Component{
    constructor(props){
        super(props);
        this.state={
                isLoading:true,
                PickerValueHolder:'',
                dataSource:[],
                Alert_Visibility: false,
                prefAmnt:0,
                rollAmnt:0,
                totalUnit:0,
                inStoreArray:[],
                outletName:'',
                area:'',
                location:'',
                total:0,
                isModalVisible:false,
            }
        }

    showModal = () => this.setState({ isModalVisible: true });
    hideModal = () => this.setState({ isModalVisible: false });
    resetAll = () => {
      this.setState({
                prefAmnt:'',
                rollAmnt:'',
                totalUnit:'',
                inStoreArray:[],
                outletName:'',
                area:'',
                location:'',
                total:'',
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
      Show_Custom_Alert(visible) {
        this.setState({Alert_Visibility: visible});
      }
     
      ok_Button=()=>{
        if(this.state.prefAmnt != 0 && this.state.rollAmnt != 0 && this.state.PickerValueHolder != ''){
          this.saveInStoreItem();
          this.setState({prefAmnt:0,rollAmnt:0,PickerValueHolder:''});
        }else{
          alert('Please enter all the required data.');
        }
        this.Show_Custom_Alert(!this.state.Alert_Visibility)
        
      }
      GetPickerSelectedItemValue=()=>{
        alert(this.state.PickerValueHolder);
      }
      saveInStoreItem = () =>{
        instoreItem = new InStoreItem();
        instoreItem.it_id = this.state.PickerValueHolder;
        instoreItem.prefAmnt = this.state.prefAmnt;
        instoreItem.rollAmnt = this.state.rollAmnt;
        instoreItem.totalUnit = this.state.totalUnit;

        var newInStoreArray = this.state.inStoreArray.slice();
        newInStoreArray.push(instoreItem);
        this.setState({inStoreArray: newInStoreArray});
      }

      addedItemList = () =>{
        return this.state.inStoreArray.map((data) => {
          return (
            <CustomIsStoreItem

              itemId={data.it_id}
              prefAmnt={data.prefAmnt}
              rollAmnt={data.rollAmnt}
              // totalUnit={data.totalUnit}
            />
          );
        })
      }

      SaveItemToServer = async () => {

        if(this.state.outletName != '' && this.state.area != '' 
          && this.state.location != '' && this.state.totalUnit != 0 
          && this.state.total != 0 && this.state.inStoreArray.length != 0){
            this.showModal();
            let item_id_ar = []; let pref_ar = []; let roll_ar = []; let total_ar = [];
              for(let i=0;i<this.state.inStoreArray.length;i++){
                item_id_ar[i] = this.state.inStoreArray[i].it_id;
                pref_ar[i] = this.state.inStoreArray[i].prefAmnt;
                roll_ar[i] = this.state.inStoreArray[i].rollAmnt;
                total_ar[i] = this.state.inStoreArray[i].totalUnit;
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
                'outlate_name': this.state.outletName,
                'area': this.state.area,
                'location':this.state.location,
                'total_unit':this.state.totalUnit,
                'total':this.state.total,
                'item_id': item_id_ar,
                'perf':pref_ar,
                'roll':roll_ar,
              };
              let formBody = [];
              for (let property in details) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
              }
              formBody = formBody.join("&");
              //console.warn(formBody);
              fetch('http://tradingmmo.com/pma/api/insert_instore_report', {  
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
                  alert("Your InStore Items successfully updated.");
                }else{
                  alert("Your InStore Items not updated. Please try again.");
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

    static navigationOptions = {  
        title: 'InStore Report',  
        headerTintColor: "#FFF",
            headerStyle: {
                backgroundColor: '#354F87',
                height: 56,
                elevation: 2
            }
   };  
    render(){
        if (this.state.isLoading) {
            return (
              <View style={{flex: 1, paddingTop: 20}}>
                <ActivityIndicator />
              </View>
            );
        }
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


              <Modal
                    visible={this.state.Alert_Visibility}
                    transparent={true}
                    animationType={"fade"}
                    onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } >
                        <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={style.Alert_Main_View}>

                                <Text style={style.Alert_Title}>Add Items information.</Text>

                                <View style={style.item_container}>
                                    <Picker style={style.spinner}
                                        selectedValue={this.state.PickerValueHolder}
                                        onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
                                        { this.state.dataSource.map((item, key)=>(
                                            <Picker.Item label={item.item_name} value={item.item_id} key={key} />)
                                        )}
                                    </Picker> 
                                    <TextInput style={[style.inputbox]} placeholder="Enter perf. amount" keyboardType={'numeric'} onChangeText={(text) => this.setState({prefAmnt:text})} />
                                    <TextInput style={[style.inputbox]} placeholder="Enter roll amount" keyboardType={'numeric'} onChangeText={(text) => this.setState({rollAmnt:text})} />
                                    {/* <TextInput style={[style.inputbox]} placeholder="Total in units" keyboardType={'numeric'} onChangeText={(text) => this.setState({totalUnit:text})} /> */}
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

                <TextInput style={[style.inputbox]} placeholder="Outlet Name" onChangeText={(text) => this.setState({outletName:text})} value={this.state.outletName}/>
                <TextInput style={[style.inputbox]} placeholder="Area" onChangeText={(text) => this.setState({area:text})} value={this.state.area}/>
                <TextInput style={[style.inputbox]} placeholder="Location" onChangeText={(text) => this.setState({location:text})} value={this.state.location}/>
                <TextInput style={[style.inputbox]} placeholder="Total Unit" keyboardType={'numeric'} onChangeText={(text) => this.setState({totalUnit:text})} value={this.state.totalUnit}/>
                <TextInput style={[style.inputbox]} placeholder="Total" keyboardType={'numeric'} onChangeText={(text) => this.setState({total:text})} value={this.state.total}/>
                <View>
                  {this.addedItemList()}
                </View>
                
                <TouchableOpacity onPress={() => { this.Show_Custom_Alert(true) } } activeOpacity={0.7} >
                      <Text style={style.addButton}> Add Instore Item </Text>
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
        scrollcontainer:{
            flex:1,
        }
    });