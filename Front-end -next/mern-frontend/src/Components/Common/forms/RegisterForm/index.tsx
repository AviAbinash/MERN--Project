import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { postSignUp } from "@/redux/slices/signupSlice";
// import './styles.css';
import { useRouter } from "next/router";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="form-container">
      <h1>Register</h1>
      <Formik
        initialValues={{
          username: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          isRegister: true,
        }}
        validationSchema={Yup.object({
          username: Yup.string().required("Username is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          phoneNumber: Yup.string()
            .nullable()
            .required("phone number is required"),
          password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm your password"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const name = values.username?.split(" ");
          const len = name.length;
          const firstname = name?.shift();
          const last = len === 1 ? firstname : name?.join(" ");
          const formValues = {
            firstName: firstname,
            lastName: last,
            email: values?.email,
            phoneNumber: values?.phoneNumber,
            password: values?.password,
            isRegister: true,
          };
          const response = await dispatch(postSignUp(formValues));
          if (response.payload?.data?.otp) {
            router.push("/otp");
          }
          console.log(response.payload);
        }}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Field type="text" name="username" />
            <ErrorMessage name="username" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="number">Number:</label>
            <Field type="number" name="phoneNumber" className="form-control" />
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field type="password" name="confirmPassword" />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error"
            />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
