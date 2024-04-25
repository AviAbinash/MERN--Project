import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "@/redux/slices/signupSlice";
import { useRouter } from "next/router";

const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^[0-9]+$/, "OTP must be numeric")
    .min(6, "OTP must be exactly 6 characters")
    .max(6, "OTP must be exactly 6 characters"),
});

const initialValues = {
  otp: "",
};

const OTPForm = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const { signupRes } = useSelector((state: any) => state?.signupSlice);
  console.log(signupRes, "res");
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    // Handle OTP submission here
    console.log(values.otp);
    setSubmitting(false);
    const email = localStorage.getItem("userEmail");
    let body = {};
    if (signupRes?.isRegitser) {
      body = {
        email: email,
        otp: values.otp,
        isRegister: true,
      };
    } else {
      body = {
        email: email,
        otp: values.otp,
        isLogin: true,
      };
    }

   const response =  await dispatch(verifyOtp(body));
   if(response?.payload?.message =="user created successfully"){
     router.push("/")
   }
  };

  return (
    <div>
      <h1>Enter OTP</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="otp">OTP:</label>
              <Field type="text" name="otp" id="otp" className="form-control" />
              <ErrorMessage
                name="otp"
                component="div"
                className="text-danger"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OTPForm;
