import React from "react";
import {Image} from 'react-native'

const HamburgerMenu = props => {
  return (
    <Image source={require('../assets/images/menu.png')}
      onPress={() => props.navigation.toggleDrawer()}
    />
  );
};

export default HamburgerMenu;
