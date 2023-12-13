import axios from "axios";

const apiUrl = "http://localhost:3001/api/v1/users";

const token = localStorage.getItem("userToken");

// =============================================
//                     register
// =============================================
export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${apiUrl}/register`, user, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

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
    const response = await axios.post(`${apiUrl}/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

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
    const response = await axios.get(`${apiUrl}/me`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error.response.data.msg);
    throw error;
  }
};
