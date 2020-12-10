import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 15,
    paddingLeft: 10,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#25292C",
    alignItems: 'center',
  },
  text: {
    color: "#FFFFFF"
  }
  // ...
});

const AppBar = () => {
  return <View style={styles.container}>
    <TouchableWithoutFeedback>
      <Text fontSize="subheading" color="textLight">
        Repositories
      </Text>
    </TouchableWithoutFeedback>
  </View>;
};

export default AppBar;