import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        
    },
    title: {
        flex:1,
        flexDirection: 'row',
        fontSize: 20,
        color: '#3B5998',
        fontWeight:'bold',
        alignSelf:'flex-start'
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

const SalesReportItems = ({ itemId, ctn, unit }) => (
    <View style={styles.container}>
        <View style={styles.container_text}>
            <Text style={styles.title}>
            ITEM NAME: {itemId}
            </Text>
            <Text style={styles.description}>
            CTN Number: {ctn}
            </Text>
            <Text style={styles.description}>
            UNIT NUMBER: {unit}
            </Text>
            
        </View>

    </View>
);

export default SalesReportItems;