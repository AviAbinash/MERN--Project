import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from '@/redux/slices/loginSlice';
import { useRouter } from "next/router";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values:any) => {
    console.log('Form submitted with values:', values);
     const response  = await  dispatch(postLogin(values))
     if (response.payload?.data?.otp) {
      router.push("/otp");
    }
    // Add your authentication logic here
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <Field
                name="email"
                type="email"
                as={TextField}
                label="Email"
                error={errors.email && touched.email}
                helperText={<ErrorMessage name="email" />}
                fullWidth
              />
            </div>
            <div>
              <Field
                name="password"
                type="password"
                as={TextField}
                label="Password"
                error={errors.password && touched.password}
                helperText={<ErrorMessage name="password" />}
                fullWidth
              />
            </div>
            <div>
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
