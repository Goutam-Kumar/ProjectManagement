import React from "react";
import { View, Text } from "react-native";
import MyHeader from "./MyHeader";

const HomeScreen = props => {
  return (
    <View>
      <MyHeader navigation={props.navigation} title="Home" />
      <Text>This is Home Screen</Text>
    </View>
  );
};

export default HomeScreen;