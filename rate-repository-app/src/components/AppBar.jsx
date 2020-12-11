import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    padding: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#25292C",
    alignContent: 'center',
    justifyContent: 'space-between'
  },
  text: {
    color: "#FFFFFF"
  }
  // ...
});

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab tabName="Repository" to="/" />
      <AppBarTab tabName="Sign In" to="/login" />
    </ScrollView>
  </View>;
};

export default AppBar;