import React from "react";

const TodoItem = ({ todo, onView, onUpdate, onDelete }) => {
  return (
    <tr key={todo._id}>
      <td className="py-2 px-4 border">{todo.title}</td>
      <td className="py-2 px-4 border">{todo.description}</td>
      <td className="py-2 px-4 border">
        {new Date(todo.dueDate).toLocaleDateString("en-GB")}
      </td>
      <td className="py-2 px-4 border">{todo.status}</td>
      <td className="py-2 px-4 border">
        <button
          onClick={() => onView(todo._id)}
          className="bg-blue-500 text-white px-4 rounded hover:underline mx-2"
        >
          View
        </button>
        <button
          onClick={() => onUpdate(todo._id)}
          className="bg-green-500 text-white px-4 rounded hover:underline m-2"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="bg-red-500 text-white px-4 rounded hover:underline mx-2"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
