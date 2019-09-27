import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';



export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            numInput:[],
        };
    }
    AddMoreDiv = () => {
        var newStateArray = this.state.numInput.slice();
        newStateArray.push("");
        this.setState({numInput: newStateArray});
        console.warn(this.state.numInput);
    }

    updateState = (text,index) => {
        var arr = this.state.numInput;
        arr[index] = text;
        this.setState({numInput:arr});
        console.warn(this.state.numInput);
    }

    addAllViews = () => {
        return(
            <View>
                    {
                        this.state.numInput.map((input,index)=>{
                            return(
                                <View>
                                <TextInput style={style.inputText} value={this.state.numInput[index]} onChangeText={(text) => this.updateState(text,index)}/>
                            </View>
                            );
                             
                        })
                    }
                </View>
        );
    }

    render(){
        return(
            <View style={style.container}>
                {this.addAllViews()}
                <TouchableOpacity style={style.textStyle} onPress={() => this.AddMoreDiv()}>
                    <Text>Add More</Text>
                </TouchableOpacity>
                
            </View>
          );
    }
}

const style = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'flex-start',
      alignItems:'center',
      backgroundColor:"#3B5998",
    },
    textStyle:{
        color:'#fff',
        fontSize:20,
        fontWeight:'bold',
    },
    inputText:{
        backgroundColor:'#fff',
        borderColor:'#f00',
        borderRadius:10,
        width:400,
        height:50,
    },
  });