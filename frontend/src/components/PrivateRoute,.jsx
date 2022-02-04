import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { useAuthStatus } from "../hooks/useAuthStatus";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }
  console.log("Rpr");

  return loggedIn ? <Outlet /> : <Navigate to="/register-employer" />;
};

export default PrivateRoute;
