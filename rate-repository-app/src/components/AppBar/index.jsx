import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { GET_AUTH } from '../../graphql/queries';
import AuthStorageContext from '../../contexts/AuthStorageContext';

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
  const { data } = useQuery(GET_AUTH);

  const user = data?.authorizedUser;
  console.log(user);

  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const logout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    console.log(user);
  };

  return <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.container} horizontal>
      <AppBarTab tabName="Repository" to="/" />
      {user ? <AppBarTab onPress={logout} tabName="Sign Out" /> : <AppBarTab tabName="Sign In" to="/login" />}
    </ScrollView>
  </View>;
};

export default AppBar;