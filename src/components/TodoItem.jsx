import React from "react";

const TodoItem = ({ todo, handleView, handleUpdate, handleDelete }) => {
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
          onClick={() => handleView(_id)}
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

export default TodoItem;
