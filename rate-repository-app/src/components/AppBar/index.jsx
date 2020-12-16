import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';
import { useQuery } from '@apollo/react-hooks';
import { GET_AUTH } from '../../graphql/queries';

const styles = StyleSheet.create({
  container: {
    padding: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#25292C",
    alignContent: 'center',
    justifyContent: 'flex-start'
  },
  bar: {
    display: "flex",
  },
  text: {
    color: "#FFFFFF"
  }
});

const AppBar = () => {
  const { data, error, loading } = useQuery(GET_AUTH, {
    fetchPolicy: "cache-and-network"
  });

  const user = data?.authorizedUser;
  console.log(user);

  return <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.container} horizontal>
      <AppBarTab tabName="Repository" to="/" />
      {user ? <AppBarTab tabName="Sign Out" /> : <AppBarTab tabName="Sign In" to="/login" />}
    </ScrollView>
  </View>;
};

export default AppBar;