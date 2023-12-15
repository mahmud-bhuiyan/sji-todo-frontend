import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getTodoById, updateTodoById } from "../../services/todo";
import { formatDateToInsert, formatDueToDisplay } from "../../utils/formatDate";

const UpdateTodo = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await getTodoById(id);
        const todoData = response.task;

        setValue("title", todoData.title);
        setValue("description", todoData.description);
        setValue("dueDate", formatDueToDisplay(todoData.dueDate));
        setValue("status", todoData.status);
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };

    fetchTodo();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const dataToUpdate = {
        title: data.title,
        description: data.description,
        dueDate: formatDateToInsert(data.dueDate),
        status: data.status,
      };

      await updateTodoById(id, dataToUpdate);
      navigate("/");
      console.log("Todo updated successfully");
    } catch (error) {
      console.error("Error updating todo:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <Helmet>
        <title>Update Todo | TODO</title>
      </Helmet>
      <h2 className="text-2xl font-semibold mb-4">Update Todo</h2>
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

        {/* Status */}
        <div className="mb-4">
          <label className="block text-gray-600">Status:</label>
          <select
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            {...register("status", {
              required: "Status is required",
            })}
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && (
            <span className="text-red-500">{errors.status.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Update Todo
        </button>
      </form>
    </div>
  );
};

export default UpdateTodo;
