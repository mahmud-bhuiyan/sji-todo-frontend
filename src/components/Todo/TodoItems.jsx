import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDueToDisplay } from "../../utils/formatDate";

const TodoItems = ({ todo, handleDelete }) => {
  const navigate = useNavigate();
  const { _id, title, description, dueDate, status } = todo;
  return (
    <tr>
      <td className="py-2 px-4 border">{title}</td>
      <td className="py-2 px-4 border">{description}</td>
      <td className="py-2 px-4 border">{formatDueToDisplay(dueDate)}</td>
      <td className="py-2 px-4 border">{status}</td>
      <td className="py-2 px-4 border">
        <button
          onClick={() => navigate(`/todo/view/${_id}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          View
        </button>
        <button
          onClick={() => navigate(`/todo/update/${_id}`)}
          className="m-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800"
        >
          Update
        </button>
        <button
          onClick={() => handleDelete(_id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TodoItems;
