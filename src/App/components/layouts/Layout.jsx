import { Col, Row } from "antd";
import React, { useEffect } from "react";
import LeftCol from "./LeftCol";
import LayoutHeader from "./LayoutHeader";

import "../../../assets/css/layout.css";
import "../../../assets/css/darkBlue.css";
import "../../../assets/css/darkPurple.css";
import useTheme from "../../../hooks/useTheme";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const { whichTheme } = useTheme();
  const [auth] = useAuth();
  const router = useNavigate();

  // useEffect(() => {
  //   if (!auth.token) {
  //     return router("/");
  //   }
  // }, [auth?.token, router]);

  return (
    <>
      <Row style={{ minHeight: "100vh" }} className={whichTheme()}>
        <Col md={4} xs={0} className="fixedColumn leftColumn border-end">
          <LeftCol />
        </Col>
        <Col md={20} xs={24} className="centerColumn ">
          <LayoutHeader />
          <div className="p-3"> {children}</div>
        </Col>
      </Row>
    </>
  );
};

export default Layout;
