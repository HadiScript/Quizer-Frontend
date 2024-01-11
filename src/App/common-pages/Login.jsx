import { Button, Card, Input } from "antd";
import React, { useEffect } from "react";
import { style } from "../../assets/css/style";
import { _useCommon } from "../../actions/_common";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const router = useNavigate();

  const { loading, email, setEmail, password, setPassword, Login } = _useCommon();

  const [auth] = useAuth();

  useEffect(() => {
    if (auth?.token) {
      return router("/");
    }
  }, [router, auth]);

  return (
    <>
      <div style={{ minHeight: "100vh" }} className="d-flex justify-content-center align-items-center p-2">
        <Card style={{ width: "400px", boxShadow: style.boxShadow1 }}>
          <div>
            <h3 className="text-dark">Login</h3>
            <small className="text-secondary">In publishing and graphic design, Lorem ipsum is a placeholder.</small>
          </div>

          <form onSubmit={(e) => Login(e)} className="d-flex flex-column gap-2 mt-5">
            <label className="text-secondary">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email:" />

            <label className="text-secondary">Password</label>
            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

            <Button onClick={(e) => Login(e)} className="bg-dark text-light mt-3" loading={loading}>
              Login
            </Button>
          </form>
        </Card>
      </div>

      {/* {JSON.stringify(auth)} */}
    </>
  );
};

export default Login;
