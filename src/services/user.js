import { axiosOpen, axiosSecure } from "../utils/axios";

const apiUrl = "http://localhost:3001/api/v1";

// =============================================
//                     register
// =============================================
export const registerUser = async (user) => {
  try {
    const response = await axiosOpen.post(`${apiUrl}/users/register`, user);

    // Store the token in localStorage
    const { token } = response.data;
    localStorage.setItem("userToken", token);

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response.data.msg);
    throw error;
  }
};

// =============================================
//                      login
// =============================================
export const loginUser = async (credentials) => {
  try {
    const response = await axiosOpen.post(`${apiUrl}/users/login`, credentials);

    // Store the token in localStorage
    const { token } = response.data;
    localStorage.setItem("userToken", token);

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response.data.msg);
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
    console.error("Error logging out:", error.response.data.msg);
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
    console.error("Error fetching user profile:", error.response.data.msg);
    throw error;
  }
};
