import React from 'react';
import Text from '../Text';
import { Link } from 'react-router-native';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

const styles = StyleSheet.create({
  tab: {
    marginRight: 10
  }
});
const AppBarTab = ({ tabName, to }) => (
  <Link to={to} component={TouchableWithoutFeedback}>
    <Text style={styles.tab} fontSize="subheading" color="textLight">
      {tabName}
    </Text>
  </Link>
);

export default AppBarTab;