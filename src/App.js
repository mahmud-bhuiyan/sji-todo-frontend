import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Profile from "./components/User/Profile";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./services/AuthProvider";
import { getUserProfile } from "./services/user";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import TodoList from "./pages/TodoList";
import CreateTodo from "./components/Todo/CreateTodo";
import ViewTodo from "./components/Todo/ViewTodo";

function App() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
        console.log(userData);
      } catch (error) {
        console.error(
          "Failed to fetch user profile. Error_Status:",
          error.response.status
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <TodoList /> : <Home />} />
          <Route path="/todo/create" element={<CreateTodo />} />
          <Route path="/todo/view/:id" element={<ViewTodo />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/update-profile" element={<UpdateProfile />} />
          <Route path="/user/update-password" element={<UpdatePassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
