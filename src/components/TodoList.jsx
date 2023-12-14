import React, { useEffect, useState } from "react";
import { deleteTodo, getUserTodos } from "../services/todo";
import TodoItem from "./TodoItem";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getUserTodos();
        // console.log(response);

        if (response && response.tasks) {
          setTodos(response.tasks);
        } else {
          console.log("Failed to fetch todos");
        }
      } catch (error) {
        console.error("Error fetching todos:", error.message);
      }
    };

    fetchTodos();
  }, []);

  const handleView = (todoId) => {
    // Todo: view action
    console.log("View todo with id:", todoId);
  };

  const handleUpdate = (todoId) => {
    // Todo: Update action
    console.log("Update todo with id:", todoId);
  };

  const handleDelete = async (todoId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTodo(todoId);

          // If deletion is successful, update the state
          setTodos((prevTodos) =>
            prevTodos.filter((todo) => todo._id !== todoId)
          );

          Swal.fire({
            title: "Deleted!",
            text: "Your todo has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting todo:", error.message);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting todo. Please try again later.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Todo List</h2>
        <Link
          className="font-semibold bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded uppercase "
          to="/todo/create"
        >
          Add Todo
        </Link>
      </div>

      {todos.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        <div className="max-w-screen-lg overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-center">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Description</th>
                <th className="py-2 px-4 border">Due Date</th>
                <th className="py-2 px-4 border">Completed</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  handleView={handleView}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TodoList;
