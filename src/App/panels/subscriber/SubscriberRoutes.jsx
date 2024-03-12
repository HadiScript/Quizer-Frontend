
import { LoadingOutlined } from "@ant-design/icons";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/authContext";

const SubscriberRoutes = () => {
  return <Outlet />
};

export default SubscriberRoutes;
