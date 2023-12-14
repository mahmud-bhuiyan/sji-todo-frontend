import React, { useEffect, useState } from "react";
import { getUserTodos } from "../services/todo";
import TodoItem from "./TodoItem";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getUserTodos();

        console.log(response);

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

  const onView = (todoId) => {
    // Todo: view action
    console.log("View todo with id:", todoId);
  };

  const onUpdate = (todoId) => {
    // Todo: Update action
    console.log("Update todo with id:", todoId);
  };

  const onDelete = (todoId) => {
    // Todo: delete action
    console.log("Delete todo with id:", todoId);
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
                  onView={onView}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
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
