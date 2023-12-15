import { axiosSecure } from "./axios";

// =============================================
//                   Create Todo
// =============================================
export const createTodo = async (taskDetails) => {
  try {
    const response = await axiosSecure.post("/tasks/", taskDetails);
    // console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error creating task. Error_Status:", error.response.status);
    throw error;
  }
};

// =============================================
//                Get Todos for User
// =============================================
export const getUserTodos = async () => {
  try {
    const response = await axiosSecure.get("/tasks/");

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching todos for user. Error_Status:",
      error.response.status
    );
    throw error;
  }
};

// =============================================
//                 Get Todo by ID
// =============================================
export const getTodoById = async (todoId) => {
  try {
    const response = await axiosSecure.get(`/tasks/${todoId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching todo with ID ${todoId}. Error_Status:`,
      error.response.status
    );
    throw error;
  }
};

// =============================================
//                Update Todo by ID
// =============================================
export const updateTodoById = async (taskId, taskDetails) => {
  try {
    const response = await axiosSecure.patch(`/tasks/${taskId}`, taskDetails);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error updating task. Error_Status:", error.response.status);
    throw error;
  }
};

// =============================================
//                  Delete Todo
// =============================================
export const deleteTodo = async (todoId) => {
  try {
    const response = await axiosSecure.delete(`/tasks/${todoId}`);

    return response.data;
  } catch (error) {
    console.error("Error deleting todo. Error_Status:", error.response.status);
    throw error;
  }
};
