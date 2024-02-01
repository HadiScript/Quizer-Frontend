import { Button } from "antd";
import React from "react";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

const Home = () => {
  const [auth] = useAuth();
  return (
    <div>
      Home
      <br />
      {auth?.user?.role === "subscriber" && (
        <Button>
          <Link to={"/subscribe/create-quiz"}>subscriber</Link>
        </Button>
      )}
      {auth?.user?.role === "admin" && <Button>Admin</Button>}
      {auth?.token === "" && <Link to={"/signin"}>Login</Link>}
    </div>
  );
};

export default Home;
