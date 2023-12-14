import React from "react";
import { useNavigate } from "react-router-dom";

const TodoItems = ({ todo,  handleUpdate, handleDelete }) => {
  const navigate = useNavigate();
  const { _id, title, description, dueDate, status } = todo;
  return (
    <tr>
      <td className="py-2 px-4 border">{title}</td>
      <td className="py-2 px-4 border">{description}</td>
      <td className="py-2 px-4 border">
        {new Date(dueDate).toLocaleDateString("en-GB")}
      </td>
      <td className="py-2 px-4 border">{status}</td>
      <td className="py-2 px-4 border">
        <button
          onClick={() => navigate(`/todo/view/${_id}`)}
          className="bg-blue-500 text-white px-4 rounded hover:underline mx-2"
        >
          View
        </button>
        <button
          onClick={() => handleUpdate(_id)}
          className="bg-green-500 text-white px-4 rounded hover:underline m-2"
        >
          Update
        </button>
        <button
          onClick={() => handleDelete(_id)}
          className="bg-red-500 text-white px-4 rounded hover:underline mx-2"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TodoItems;
