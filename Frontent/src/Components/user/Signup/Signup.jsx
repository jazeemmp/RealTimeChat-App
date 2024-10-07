import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupSchema } from "../../../Formik/validationSchema";
import axios from "axios";
import { toast } from "sonner";
const Signup = ({ onClick }) => {
  const navigate = useNavigate(false);
  const [loading, setLoading] = useState();

  const handleSubmit = async (values) => {
    if (loading) return;
    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:3000/signup", values);
      if (data.success) {
        toast.success("Signup success now login", {
          onClose: () => navigate("/"),
        });
        onClick('login')
      } else if (data.userExiting) {
        toast.error("User already exists. Please login.", {
          onClose: () => onClick("login"),
        });
      } else {
        console.log("Unknown response:", data);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An error occurred during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6  space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Signup in to your account
      </h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4 md:space-y-6">
          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your name
            </label>
            <Field
              type="text"
              name="name"
              id="text"
              className=" bg-slate-100 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none"
              placeholder="Your name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-xs absolute"
            />
          </div>
          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className=" bg-slate-100 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none"
              placeholder="name@company.com"
              required=""
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-xs mt-1 absolute"
            />
          </div>
          <div>
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className=" bg-slate-100 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none"
              required=""
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-xs mt-1 absolute"
            />
          </div>
          <div>
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Confrim Password
            </label>
            <Field
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="••••••••"
              className=" bg-slate-100 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none"
              required=""
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-xs mt-1 absolute"
            />
          </div>
          <div className="flex items-center justify-end">
            <a href="#" className="text-gray-600">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full  bg-blue-600 rounded-lg p-3 hover:bg-blue-500"
            disabled={loading}
          >
            {loading ? "Loading.." : " Sign up"}
          </button>
          <p
            className="text-sm font-light text-center text-gray-500 "
            onClick={() => onClick("login")}
          >
            Alredy have an account?{" "}
            <a
              className="font-medium text-primary-600 hover:underline text-black"
            >
              Sign in
            </a>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
