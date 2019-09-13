import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CustomAddItem from '../pages/CustomAddItem';

const styles = StyleSheet.create({
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
    photo: {
        height: 50,
        width: 50,
    },
});
this.state = {
    isExpanded : false,
}
GetAlert = () => {
    isExpanded = !isExpanded;
    //this.setState({isExp:!this.state.isExp});
}

const CustomRow = ({ 
                    date,
                    name_retailer,
                    project_id,
                    sales_report_id,
                    isExpanded,
                    SalesReportExpandItem 
}) => (
    <View style={styles.containerbox}>
        <TouchableOpacity onPress = {() => {isExpanded = !isExpanded; }}>

        <View style={styles.container_text} >
            <Text style={styles.title}>
                Retailer Name: {name_retailer}
            </Text>
            <Text style={styles.description}>
                Date: {date}
            </Text>
            <Text style={styles.description}>
                Project ID: {project_id}
            </Text>
            {isExpanded &&
               
                <View>
                    {
                        SalesReportExpandItem.map((data) => {
                            return (
                              <CustomAddItem
                                itemId={data.item_name}
                                ctn={data.ctn}
                                unit={data.unit}
                              />
                            );
                          })
                    }
                </View>
            }
        </View>

        </TouchableOpacity>
        

    </View>
);




export default CustomRow;