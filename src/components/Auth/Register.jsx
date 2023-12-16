import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/api/user";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/AuthProvider";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { createUser, updateUserProfile } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      // registerUser api
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      const response = await registerUser(userData);

      if (!response?.user?._id) {
        console.log("Failed to register user");
      }

      // register with firebase
      createUser(data.email, data.password)
        .then((result) => {
          const loggedUser = result.user;
          updateUserProfile(data?.name, data?.photo)
            .then(() => {
              // console.log("name and image added");
            })
            .catch((error) => console.log(error.message));
          reset();
          navigate(from, { replace: true });
          toast("User created successfully");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } catch (error) {
      console.error("ERROR:", error.response.data.msg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <Helmet>
        <title>Register | TODO</title>
      </Helmet>
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-600">Name:</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

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
              maxLength: {
                value: 20,
                message: "Password can not be more than 20 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Confirm Password:</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <input
          type="submit"
          value="Register"
          className="bg-blue-500 text-white w-full mt-2 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        />
      </form>
      <div className="mt-4 text-center">
        <p>
          Already have an account?
          <Link to="/user/login">
            <span className="text-orange-600 font-bold text-lg"> Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
