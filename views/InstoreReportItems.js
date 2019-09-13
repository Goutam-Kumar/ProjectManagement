import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import InStoreReportItem from '../model/InStoreReportItem';

const styles = StyleSheet.create({
    container: {
        flex: 0.8,
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
        flex: 1,
        fontSize: 16,
        fontStyle: 'italic',
        color:"#777778"
    },
    photo: {
        height: 50,
        width: 50,
    },
});

const InStoreReportItems = ({ itemId, ctn, unit }) => (
    <View style={styles.container}>
        <View style={styles.container_text}>
            <Text style={styles.title}>
            ITEM NAME: {itemId}
            </Text>
            <Text style={styles.description}>
            PREF: {ctn}
            </Text>
            <Text style={styles.description}>
            Roll: {unit}
            </Text>
            
        </View>

    </View>
);

export default InStoreReportItems;