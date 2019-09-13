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

const CustomRow = ({ date, time, location,type }) => (
    <View style={styles.container}>
        <View style={styles.container_text}>
            <Text style={styles.title}>
                Date: {date}
            </Text>
            <Text style={styles.description}>
                Time: {time}
            </Text>
            <Text style={styles.description}>
                Location: {location}
            </Text>
            <Text style={styles.description}>
                Type: {this.getTypeDef(type)}
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

export default CustomRow;