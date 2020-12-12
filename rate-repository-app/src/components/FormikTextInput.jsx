import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';
const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: "red"
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    borderColor: theme.colors.primary,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: theme.colors.listItemBackground,
    padding: 3,
    lineHeight: 16
  },
  inputError: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: theme.colors.listItemBackground,
    padding: 3,
    lineHeight: 16
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={styles}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;