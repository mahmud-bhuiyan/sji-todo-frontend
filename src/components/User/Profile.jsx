import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/user";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../services/AuthProvider";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser({});
      navigate("/user/login");
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white rounded shadow-md text-center">
      <Helmet>
        <title>Profile | TODO</title>
      </Helmet>
      <h2 className="text-2xl font-semibold mb-4 uppercase">User Profile</h2>

      <div className="mb-4">
        <p className="mb-2">
          <span className="font-semibold">Name:</span> {user?.name}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Email:</span> {user?.email}
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        <Link
          to="/user/update-profile"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Update Profile
        </Link>
        <Link
          to="/user/update-password"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800"
        >
          Update Password
        </Link>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
