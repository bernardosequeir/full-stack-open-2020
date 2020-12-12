import React from 'react';

import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  form: {
    display: 'flex',
  },

  button: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.textLight,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 3,
    padding: 3,
    lineHeight: 16,
    display: 'flex',
    justifyContent: 'center'
  }
});

const SignInForm = ({ onSubmit }) => (
  <View style={styles.form}>
    <View style={styles.input}>
      <FormikTextInput name="username" placeholder="Username" />
    </View>
    <View style={styles.input}>
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
    </View>
    <TouchableWithoutFeedback onPress={onSubmit} >
      <Text style={styles.button}>Sign In</Text>
    </TouchableWithoutFeedback>
  </View>
);

export default SignInForm;