import * as Yup from "yup";

export const LoginScehema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required"),
});

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});


export const EditProfileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.number().required('Age is required').min(1, 'Invalid age'),
  job: Yup.string().required('Job is required'),
  address: Yup.string().required('Address is required'),
  about: Yup.string().required('About you is required'),
});
