import SubcriberLayout from "../../components/layouts/Layout";
import { Outlet, useNavigate } from "react-router-dom";

const SubscriberRoutes = ({ haveRight }) => {
  const router = useNavigate();

  return haveRight ? <Outlet /> : router("/");
};

export default SubscriberRoutes;
