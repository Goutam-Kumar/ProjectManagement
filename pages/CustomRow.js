import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
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

const CustomRow = ({ date, time, location,type, status, check_loc }) => (
    <View style={styles.container}>
        <View style={styles.container_text}>
            <Text style={styles.title}>
                Date: {date}
            </Text>
            <Text style={styles.description}>
                Time: {time}
            </Text>
            {/* <Text style={styles.description}>
                Location: {location}
            </Text> */}
            <Text style={styles.description}>
                Type: {this.getTypeDef(type)}
            </Text>
            <Text style={styles.description}>
                Status: {this.getStatus(status)}
            </Text>
            <Text style={styles.description}>
                Checked Location: {this.getCheckLocation(check_loc)}
            </Text>
        </View>

    </View>
);


getTypeDef = (type) =>{
    if(type === "1"){
        return "CLOCKED IN";
    }else if(type === "2"){
        return "MID DAY CLOCKED";
    }else if(type === "3"){
        return "CLOCKED OUT";
    }else{
        return "";
    }
}

getStatus = (status) => {
    var st = '';
    switch(status){
        case '1':
            st = 'Present';
            break;
        case '2':
            st = 'Wrong Location';
            break;
        case '3':
            st = 'Late';
            break;
        case '4':
            st = 'Early Closing';
            break;
        case '5':
            st = 'Wrong location & Late'
            break;
        default:
            st ='';
            break;
    }
    return st;
}

getCheckLocation = (check_loc) => {
    if(getCheckLocation === ''){
        return '';
    }else{
        return check_loc;
    }
}

export default CustomRow;