import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginScehema } from "../../../Formik/validationSchema";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../../Redux/admin/adminThuk";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminToken } = useSelector((state) => state.admin);
  useEffect(() => {
    if (adminToken) {
      navigate("/admin/dashboard");
    }
  }, []);

  const handleSubmit = async (values) => {
    try {
      await dispatch(adminLogin(values)).unwrap();
      toast.success("Login successful");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error);
    }
  };

  return (
    <div>
      <section className="fixed left-0 top-0 h-screen w-screen z-10">
        <div className="flex flex-col bg-transparent items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full relative text-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
                  >
                    login
                  </button>

                  <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Sign up
                    </span>
                  </p>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminLogin;
