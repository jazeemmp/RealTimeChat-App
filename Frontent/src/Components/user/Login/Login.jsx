import React, { useState } from "react";
import Signup from "../Signup/Signup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginScehema } from "../../../Formik/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../Redux/userSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [changeAuth, setChangeAuth] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading,} = useSelector((state) => state.user);
 const handleSubmit = async (values) => {
  try {
    await dispatch(userLogin(values)).unwrap();
    toast.success("Login successful")
    navigate('/')
  } catch (error) {
    toast.error("Login failed: " + error);
  }
};
  return (
    <section className="fixed left-0 top-0 h-screen w-screen z-10">
      <div className="flex flex-col bg-transparent items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full relative text-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          {changeAuth === "login" ? (
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginScehema}
                onSubmit={handleSubmit}
              >
                <Form className="space-y-4 md:space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 rounded-lg p-3 hover:bg-blue-500"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>

                  <p
                    className="text-sm font-light text-center text-gray-500 dark:text-gray-400"
                    onClick={() => setChangeAuth("signup")}
                  >
                    Don’t have an account yet?{" "}
                    <span
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </span>
                  </p>
                </Form>
              </Formik>
            </div>
          ) : (
            <Signup onClick={setChangeAuth} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
