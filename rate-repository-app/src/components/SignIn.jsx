import { Formik } from 'formik';
import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';

const styles = StyleSheet.create({
  form: {
    display: 'flex'
  }
});
const initialValues = { username: '', password: '' };


const onSubmit = (values) => {
  console.log(values);
};

const SignIn = () => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} style={styles.form}>
      <View style={styles.form}>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" secureTextEntry />
        <TouchableWithoutFeedback onPress={onSubmit}>
          <Text>Sign In</Text>
        </TouchableWithoutFeedback>
      </View>
    </Formik>
  );
};

export default SignIn;