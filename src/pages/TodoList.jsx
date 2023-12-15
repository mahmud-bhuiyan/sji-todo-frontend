import React, { useEffect, useState } from "react";
import { deleteTodo, getUserTodos } from "../services/api/todo";
import TodoItems from "../components/Todo/TodoItems";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <title>Dashboard | TODO</title>
      </Helmet>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Todo List</h2>
        <Link
          className="font-semibold bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-4 rounded uppercase"
          to="/todo/create"
        >
          Add Todo
        </Link>
      </div>

      {todos.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        <div className="max-w-screen-lg overflow-x-auto">
          <table className="table text-center">
            <thead>
              <tr className="text-white font-semibold">
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Description</th>
                <th className="py-2 px-4 border">Due Date</th>
                <th className="py-2 px-4 border">Completed</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <TodoItems
                  key={todo._id}
                  todo={todo}
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
