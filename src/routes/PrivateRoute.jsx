import { useContext } from "react";
import { AuthContext } from "../services/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user?.email) {
    return children;
  }

  return <Navigate state={{ from: location }} to="/user/login" replace></Navigate>;
};

export default PrivateRoute;
