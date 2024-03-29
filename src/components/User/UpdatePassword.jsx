import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { updateUserPassword } from "../../services/api/user";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const passwordData = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      };

      const response = await updateUserPassword(passwordData);
      toast("Password updated successfully");
      navigate("/user/profile");
    } catch (error) {
      toast("Something went wrong!");
      console.error(
        "Error updating user password:",
        error.response?.data?.msg || error.message
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <Helmet>
        <title>Update Password | TODO</title>
      </Helmet>
      <h2 className="text-2xl font-semibold mb-4">Update Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-600">Current Password:</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            {...register("currentPassword", {
              required: "Current Password is required",
            })}
          />
          {errors.currentPassword && (
            <span className="text-red-500">
              {errors.currentPassword.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">New Password:</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            {...register("newPassword", {
              required: "New Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.newPassword && (
            <span className="text-red-500">{errors.newPassword.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Confirm New Password:</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            {...register("confirmPassword", {
              required: "Password confirmation is required",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* button  */}
        <div className="mt-4 flex justify-between">
          <input
            type="submit"
            value="Update Password"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800"
          />
          <Link
            to="/user/profile"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
