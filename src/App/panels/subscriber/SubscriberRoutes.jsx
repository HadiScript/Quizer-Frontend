import React from "react";
import Layout from "../../components/layouts/Layout";
import { Outlet } from "react-router-dom";

const SubscriberRoutes = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default SubscriberRoutes;
