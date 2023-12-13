import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserProfile } from "../utils/user";

const Profile = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await getUserProfile();
        console.log(user);
        setUserData(user);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white rounded shadow-md text-center">
      <h2 className="text-2xl font-semibold mb-4 uppercase">User Profile</h2>

      <div className="mb-4">
        <p className="mb-2">
          <span className="font-semibold">Name:</span> {userData.name}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Email:</span> {userData.email}
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
          onClick={() => console.log("Logout button clicked")}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
