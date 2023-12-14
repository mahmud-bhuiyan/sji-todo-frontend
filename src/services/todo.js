const { axiosSecure } = require("../utils/axios");

// =============================================
//                   Create Todo
// =============================================
export const createTodo = async (taskDetails) => {
  try {
    const response = await axiosSecure.post("/tasks/", taskDetails);
    // console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error creating task:", error.response.data.msg);
    throw error;
  }
};