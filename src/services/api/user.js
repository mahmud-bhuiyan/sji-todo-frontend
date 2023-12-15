import { axiosOpen, axiosSecure } from "./axios";
// =============================================
//                     register
// =============================================
export const registerUser = async (user) => {
  try {
    const response = await axiosOpen.post("/users/register", user);

    // Store the token in localStorage
    const { token } = response.data;
    localStorage.setItem("userToken", token);

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error registering user. Error_Status:",
      error.response.status
    );
    throw error;
  }
};

// =============================================
//                      login
// =============================================
export const loginUser = async (credentials) => {
  try {
    const response = await axiosOpen.post("/users/login", credentials);

    // Store the token in localStorage
    const { token } = response.data;
    localStorage.setItem("userToken", token);

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error logging in. Error_Status:", error.response.status);
    throw error;
  }
};

// =============================================
//                     logout
// =============================================
export const logoutUser = async () => {
  try {
    // Clear the token from localStorage
    localStorage.removeItem("userToken");
    return { success: true };
  } catch (error) {
    console.error("Error logging out. Error_Status:", error.response.status);
    throw error;
  }
};

// =============================================
//                  user details
// =============================================
export const getUserProfile = async () => {
  try {
    const response = await axiosSecure.get("/users/me");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user profile. Error_Status:",
      error.response.status
    );

    throw error;
  }
};

// =============================================
//                   update user
// =============================================
export const updateUserProfile = async (updatedUserData) => {
  try {
    const response = await axiosSecure.patch("/users/update", updatedUserData);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating user profile. Error_Status:",
      error.response.status
    );
    throw error;
  }
};

// =============================================
//                 update password
// =============================================
export const updateUserPassword = async (passwordData) => {
  try {
    const response = await axiosSecure.patch(
      "/users/updatePassword",
      passwordData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating user password:",
      error.response?.data?.msg || error.message
    );
    throw error;
  }
};
