import { Button } from "antd";
import React from "react";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import Banner from "../components/common/Banner";

const Home = () => {
  const [auth] = useAuth();
  return (
    <>
      <Banner />
    </>
  );
};

export default Home;
