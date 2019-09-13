import React from "react";
import { View, Text } from "react-native";

import MyHeader from "./MyHeader";

const SettingsScreen = props => {
  return (
    <View>
      <MyHeader navigation={props.navigation} title="Settings" />
      <Text>This is Settings Screen</Text>
    </View>
  );
};

export default SettingsScreen;