import React from 'react';
import Text from './Text';
import { Link } from 'react-router-native';
import { TouchableWithoutFeedback } from 'react-native';


const AppBarTab = ({ tabName, to }) => (
  <Link to={to} component={TouchableWithoutFeedback}>
    <Text fontSize="subheading" color="textLight">
      {tabName}
    </Text>
  </Link>
);

export default AppBarTab;