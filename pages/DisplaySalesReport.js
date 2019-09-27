import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  AsyncStorage,
  TouchableHighlight,
} from 'react-native';
import SalesReportItems from '../views/SalesReportItems';
import SalesReportItem from '../model/SalesReportItem';

export default class DisplaySalesReport extends React.Component{

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
        title: 'Display Sales Report',  
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
      fetch('http://tradingmmo.com/pma/api/get_sales_report', {  
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
        let mSalesReportItem = new SalesReportItem(); 
        mSalesReportItem.sales_report_id = responseJson[i].sale.sales_report_id;
        mSalesReportItem.date = responseJson[i].sale.date;
        mSalesReportItem.name_retailer = responseJson[i].sale.name_retailer;
        mSalesReportItem.project_id = responseJson[i].sale.project_id;
        mSalesReportItem.SalesReportExpandItem = responseJson[i].pro;
        salesArr[i] = mSalesReportItem;
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
            <TouchableHighlight underlayColor="#f1f1f1" onPress = {() => this.handleClick({item,index})}>

            <View style={styles.container_text} >
                <Text style={styles.title}>
                    Retailer Name: {item.name_retailer}
                </Text>
                <Text style={styles.description}>
                    Date: {item.date }
                </Text>
                <Text style={styles.description}>
                    Project: {item.project_id}
                </Text>
                { item.isExpanded ? 
                  //this.state.SalesReportId === item.sales_report_id ?

                    <View>
                        {
                            item.SalesReportExpandItem.map((data) => {
                                return (
                                  <SalesReportItems
                                    itemId={data.item_name}
                                    ctn={data.ctn}
                                    unit={data.unit}
                                  />
                                );
                              })
                        }
                    </View>
                    :
                    null
                }
            </View>
            </TouchableHighlight>
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
    title: {
        fontSize: 20,
        color: '#000',
    },
    container_text: {
        flex: 1,
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