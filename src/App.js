import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import TodoList from "./pages/TodoList";
import CreateTodo from "./components/Todo/CreateTodo";
import ViewTodo from "./components/Todo/ViewTodo";
import UpdateTodo from "./components/Todo/UpdateTodo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import { AuthContext } from "./shared/context/AuthProvider";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />

          <Route
            path="/user/update-profile"
            element={
              <PrivateRoute>
                <UpdateProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/update-password"
            element={
              <PrivateRoute>
                <UpdatePassword />
              </PrivateRoute>
            }
          />

          <Route
            path="/"
            element={
              user ? (
                <PrivateRoute>
                  <TodoList />
                </PrivateRoute>
              ) : (
                <Home />
              )
            }
          />

          <Route
            path="/todo/create"
            element={
              <PrivateRoute>
                <CreateTodo />
              </PrivateRoute>
            }
          />

          <Route
            path="/todo/view/:id"
            element={
              <PrivateRoute>
                <ViewTodo />
              </PrivateRoute>
            }
          />

          <Route
            path="/todo/update/:id"
            element={
              <PrivateRoute>
                <UpdateTodo />
              </PrivateRoute>
            }
          />

          <Route
            path="/user/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
