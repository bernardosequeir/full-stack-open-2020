import { Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';

import SignInForm from './SignInForm';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Name is required'),
  password: yup
    .string()
    .required('Password is required'),
});


const initialValues = { username: '', password: '' };


const onSubmit = (values) => {
  console.log(values);
};

const SignIn = () => {
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