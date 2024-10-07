import { useEffect, useState } from "react";
import Signup from "../Signup/Signup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginScehema } from "../../../Formik/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../../Redux/user/userThunk";
const Login = () => {
  const [changeAuth, setChangeAuth] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userToken } = useSelector((state) => state.user);
  useEffect(() => {
    if (userToken) {
      navigate("/");
    }
  }, []);
  const handleSubmit = async (values) => {
    try {
      await dispatch(userLogin(values)).unwrap();
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error("Login failed: " + error);
    }
  };
  return (
    <section className="flex  justify-center items-center h-screen w-screen bg-[url('https://raw.githubusercontent.com/piyush-eon/mern-chat-app/refs/heads/master/frontend/src/background.png')] bg-cover bg-center  ">
        <div className="w-[95%] relative text-white bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
          {changeAuth === "login" ? (
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
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
                      className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                    >
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className=" bg-slate-100 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none"
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
                  >
                    Login
                  </button>

                  <p
                    className="text-sm font-light text-center text-gray-500 "
                    onClick={() => setChangeAuth("signup")}
                  >
                    Don’t have an account yet?{" "}
                    <span className="font-medium text-primary-600 hover:underline text-black">
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
    </section>
  );
};

export default Login;
