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
        flex: 0.8,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },

    delete:{
        flex:0.2,
        flexDirection: 'column',
        justifyContent:'center',
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

deleteItem =() => {
    alert('Delete');
}

const CustomAddItem = ({ itemId, ctn, unit }) => (
    <View >
        <View style={styles.container_text}>
            <Text style={styles.title}>
            ITEM ID: {itemId}
            </Text>
            <Text style={styles.description}>
            CTN Number: {ctn}
            </Text>
            <Text style={styles.description}>
            UNIT NUMBER: {unit}
            </Text>
        </View>

        {/* <View style={styles.delete} onPress={() => this.deleteItem()}>
                <Image source={require('../assets/images/bin.png')}/>
        </View> */}

    </View>
);

export default CustomAddItem;