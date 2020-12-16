import { Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { useSignIn } from '../hooks/useSignIn';

import SignInForm from './SignInForm';
const SignIn = () => {
  const [signIn] = useSignIn();

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Name is required'),
    password: yup
      .string()
      .required('Password is required'),
  });


  const initialValues = { username: '', password: '' };


  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log(values);
    try {
      const { authorize } = await signIn({ username, password });
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;