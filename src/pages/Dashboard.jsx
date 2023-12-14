import React from "react";
import { Helmet } from "react-helmet-async";
import TodoList from "../components/TodoList";

const Dashboard = () => {
  return (
    <div>
      <Helmet>
        <title>Dashboard | TODO</title>
      </Helmet>
      <TodoList />
    </div>
  );
};

export default Dashboard;
