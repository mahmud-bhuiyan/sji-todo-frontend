import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTodoById } from "../../services/todo";
import { formatDueToDisplay } from "../../utils/formatDate";

const ViewTodo = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await getTodoById(id);
        if (response && response.task) {
          setTodo(response.task);
        } else {
          console.log("Failed to fetch todo");
        }
      } catch (error) {
        console.error("Error fetching todo:", error.message);
      }
    };

    fetchTodo();
  }, [id]);

  if (!todo) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-lg mx-auto bg-base-100 shadow-xl p-4 my-16 text-center rounded">
      <h2 className="text-2xl font-semibold mb-4">{todo.title}</h2>
      <table className="table table-zebra border-2 text-center">
        <tbody>
          <tr>
            <td className="font-semibold border-r-2">Description:</td>
            <td>{todo.description}</td>
          </tr>
          <tr>
            <td className="font-semibold border-r-2">Due Date:</td>
            <td>{formatDueToDisplay(todo.dueDate)}</td>
          </tr>
          <tr>
            <td className="font-semibold border-r-2">Status:</td>
            <td>{todo.status}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        <Link
          to="/"
          className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default ViewTodo;
