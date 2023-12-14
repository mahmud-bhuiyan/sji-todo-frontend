import React, { useEffect, useState } from "react";
import { getUserTodos } from "../services/todo";
import TodoTable from "./TodoTable"; // Import your TodoTable component

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

  return (
    <div className="max-w-screen-lg mx-auto mt-4">
      <h2 className="text-2xl font-semibold mb-4">Todo List</h2>
      {todos.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        <TodoTable todos={todos} />
      )}
    </div>
  );
};

export default TodoList;
