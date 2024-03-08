import { useEffect } from "react";
import SubcriberLayout from "../../components/layouts/Layout";
import { Outlet, useNavigate } from "react-router-dom";

const SubscriberRoutes = ({ haveRight }) => {
  const router = useNavigate();

  useEffect(() => {
    if (!haveRight) {
      return router('/')
    }
  }, [router])

  return <Outlet />;
};

export default SubscriberRoutes;
