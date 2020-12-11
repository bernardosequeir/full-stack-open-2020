import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import theme from '../theme';
import { Route, Switch } from 'react-router-native';
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/login" exact>
          <SignIn />
        </Route>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
      </Switch>
    </View>
  );
};

export default Main;