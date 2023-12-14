import React from "react";

const TodoTable = ({ todos, onView, onEdit, onDelete }) => {
  return (
    <div className="max-w-screen-lg overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Due Date</th>
            <th className="py-2 px-4 border-b">Completed</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo._id}>
              <td className="py-2 px-4 border-b">{todo.title}</td>
              <td className="py-2 px-4 border-b">{todo.description}</td>
              <td className="py-2 px-4 border-b">
                {new Date(todo.dueDate).toLocaleDateString("en-GB")}
              </td>
              <td className="py-2 px-4 border-b">{todo.status}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => onView(todo._id)}
                  className="text-blue-500 hover:underline mx-2"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(todo._id)}
                  className="text-green-500 hover:underline mx-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(todo._id)}
                  className="text-red-500 hover:underline mx-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoTable;
