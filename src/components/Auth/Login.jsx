import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { loginUser } from "../../services/api/user";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { signIn } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      // loginUser api
      const userData = {
        email: data.email,
        password: data.password,
      };

      const response = await loginUser(userData);

      if (!response?.user?._id) {
        console.log("Failed to login user");
      }

      // login with firebase
      signIn(data.email, data.password)
        .then((result) => {
          const user = result.user;
          reset();
          navigate(from, { replace: true });
          toast("User logged in successfully");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <Helmet>
        <title>Login | TODO</title>
      </Helmet>
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-600">Email:</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Password:</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <input
          type="submit"
          value="Login"
          className="bg-blue-500 text-white w-full mt-2 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        />
      </form>
      <div className="mt-4 text-center">
        <p>
          New here?
          <Link to="/user/register">
            <span className="text-orange-600 font-bold text-lg">
              {" "}
              Create an account
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
