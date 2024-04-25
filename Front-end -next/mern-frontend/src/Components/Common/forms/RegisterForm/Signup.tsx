import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Typography } from '@mui/material';
import * as Yup from 'yup';
import './styles.css'; // Import your CSS file for styling

const RegisterForm = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  // Initial form values
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // Form submission function
  const onSubmit = (values:any, { resetForm }:any) => {
    console.log(values); // You can replace this with your actual submission logic
    resetForm();
  };

  return (
    <div className="form-container">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <Field
              name="firstName"
              label="First Name"
              as={TextField}
              error={errors.firstName && touched.firstName}
              helperText={errors.firstName && touched.firstName && errors.firstName}
              fullWidth
              margin="normal"
            />
            <Field
              name="lastName"
              label="Last Name"
              as={TextField}
              error={errors.lastName && touched.lastName}
              helperText={errors.lastName && touched.lastName && errors.lastName}
              fullWidth
              margin="normal"
            />
            <Field
              name="email"
              label="Email"
              type="email"
              as={TextField}
              error={errors.email && touched.email}
              helperText={errors.email && touched.email && errors.email}
              fullWidth
              margin="normal"
            />
            <Field
              name="password"
              label="Password"
              type="password"
              as={TextField}
              error={errors.password && touched.password}
              helperText={errors.password && touched.password && errors.password}
              fullWidth
              margin="normal"
            />
            <Field
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              as={TextField}
              error={errors.confirmPassword && touched.confirmPassword}
              helperText={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;