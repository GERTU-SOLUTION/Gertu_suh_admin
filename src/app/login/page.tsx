/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    // .min(8, "Password is too short - should be 8 chars minimum.")
    // .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    .required("required"),
});

const Login = () => {
  const router = useRouter();

  const getLogin = async (values: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        "https://api.gertu.mn:3000/api/auth/login",
        values,
        {
          withCredentials: true,
        }
      );

      if (response.data.access_token) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        localStorage.setItem("expires_in", response.data.expires_in);
      }

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex w-full justify-center h-screen">
      <div className="max-w-[960px] min-w-[960px] h-full flex justify-center items-center text-gray-500 text-sm">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            getLogin(values);
          }}
        >
          {({ errors }) => (
            <Form className="w-2/5 h-1/3 flex flex-col gap-6">
              <div>
                <h3 className="text-black text-lg">Log In</h3>
              </div>
              <div>
                <Field
                  name="email"
                  placeholder="Enter your email address"
                  className="border rounded-xl p-2 w-full"
                />
                {errors.email ? (
                  <div className="text-red-500">{errors.email}</div>
                ) : null}
              </div>
              <div>
                <Field
                  name="password"
                  placeholder="Password"
                  className="border rounded-xl p-2 w-full"
                />
                {errors.password ? (
                  <div className="text-red-500">{errors.password}</div>
                ) : null}
              </div>
              <button className="bg-gray-400 rounded-xl p-2" type="submit">
                Log in
              </button>
              <p className="text-center mt-2">
                I dont have a account? <a href="#">SignUp</a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
      <div className="w-3/5 h-screen border-l border-gray-200 flex justify-center items-center">
        <img
          alt="as"
          src="https://play-lh.googleusercontent.com/lRf7Q9KtUJQctmqhdtFKJnzLfXpC91RpiPTN2kglDJvfreaZp5z6SKr2qZMlHxQEYHsLWPI531PrZhwTE1VXaA=w240-h480-rw"
        />
      </div>
    </div>
  );
};
export default Login;
