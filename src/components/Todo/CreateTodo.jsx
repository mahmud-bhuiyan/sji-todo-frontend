import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/AuthProvider";
import { createTodo } from "../../services/api/todo";

const CreateTodo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      // Extracting only the date part
      const dateOnly = data.dueDate.split("T")[0];

      const todoData = {
        title: data.title,
        description: data.description,
        dueDate: dateOnly,
        owner: user._id,
      };

      const response = await createTodo(todoData);

      if (response.task._id) {
        navigate("/");
        console.log("Todo created successfully");
      } else {
        console.log("Failed to create todo");
      }
    } catch (error) {
      console.error("Error creating todo:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto m-4 md:mt-8 p-6 bg-white rounded shadow-md">
      <Helmet>
        <title>Create Todo | TODO</title>
      </Helmet>
      <h2 className="text-2xl font-semibold mb-4">Create Todo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-600">Title:</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-600">Description:</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label className="block text-gray-600">Due Date:</label>
          <input
            type="date"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            {...register("dueDate", {
              required: "Due Date is required",
            })}
          />
          {errors.dueDate && (
            <span className="text-red-500">{errors.dueDate.message}</span>
          )}
        </div>

        {/* button  */}
        <div className="mt-4 flex justify-between">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800"
          >
            Create Todo
          </button>
          <Link
            to="/"
            className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateTodo;
