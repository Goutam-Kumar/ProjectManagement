import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  AsyncStorage,
  TouchableHighlight,
} from 'react-native';
import InBarReportItem from '../model/InBarReportItem';

export default class DisplayInbarReport extends React.Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.renderSales = this.renderSales.bind(this);
        this.state = {
            staffId: '1',
            salesResponse: [],
            isProgress: false,
            collapse:false,
            SalesReportId:0,
        }
    }
    static navigationOptions = {  
        title: 'Display Inbar Report',  
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
    this.GetSalesReport();
   }
   _refresh = () => {
    return new Promise((resolve) => {
        
      setTimeout(()=>{resolve()}, 2000);
      
    });
  }

  GetSalesReport = () => {

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
      fetch('http://tradingmmo.com/pma/api/get_inbar_report', {  
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
      let salesArr = [];
      for(let i=0;i<responseJson.length;i++){

        let mInBarReportItem = new InBarReportItem(); 
        mInBarReportItem.inber_report_id = responseJson[i].inber_report_id;
        mInBarReportItem.date = responseJson[i].date;
        mInBarReportItem.project_id = responseJson[i].project_id;
        mInBarReportItem.cfa_code = responseJson[i].cfa_code;
        mInBarReportItem.contact_number = responseJson[i].contact_number;
        mInBarReportItem.contact_person = responseJson[i].contact_person;
        mInBarReportItem.amount_sold = responseJson[i].amount_sold;
        mInBarReportItem.voucher = responseJson[i].voucher;
        mInBarReportItem.free_drinks = responseJson[i].free_drinks;
        mInBarReportItem.total_insentives = responseJson[i].total_insentives;
        salesArr[i] = mInBarReportItem;
      }
      this.setState({salesResponse:salesArr.reverse()});
      //console.warn(this.state.salesResponse);
    })
    .catch((error) => {
      console.error(error);
    });
    this.render();
   }

  handleClick = ({item,index}) => {
     let sales = this.state.salesResponse;
     let targetSalesResponse = sales[index];
     targetSalesResponse.isExpanded = !targetSalesResponse.isExpanded;
     this.setState({salesResponse:sales});
     //console.warn(targetSalesResponse);
  }

   renderSales({ item, index }){
        return <View style={styles.containerbox}>
            {/* <TouchableHighlight underlayColor="#f1f1f1"> */}

            <View style={styles.container_text} >
                <Text style={styles.title}>
                    CFA CODE: {item.cfa_code}
                </Text>
                <Text style={styles.description}>
                    CONTACT PERSON: {item.contact_person }
                </Text>
                <Text style={styles.description}>
                    CONTACT NUMBER: {item.contact_number}
                </Text>
                <Text style={styles.description}>
                    AMOUNT SOLD: {item.amount_sold}
                </Text>
                <Text style={styles.description}>
                    VOUCHER: {item.voucher}
                </Text>
                <Text style={styles.description}>
                    FREE DRINKS: {item.free_drinks}
                </Text>
                <Text style={styles.description}>
                    TOTAL INSENTIVE: {item.total_insentives}
                </Text>
            </View>
            {/* </TouchableHighlight> */}
          </View>
   }

   

    render(){
      return (
        <View style={styles.container}>
            <FlatList
            data={this.state.salesResponse}
            extraData = {this.state}
            renderItem={this.renderSales}/>
        </View>
      );
      
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        
      },
      welcometext:{
        fontWeight:'bold',
        fontSize:30,
        color:'#fff'
      },
      containerbox: {
        flex:1,
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
    title: {
        width:"100%",
        fontSize: 20,
        color: '#000',
    },
    container_text: {
        width:"100%",
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 16,
        fontStyle: 'italic',
        color:"#777778"
    },
    });