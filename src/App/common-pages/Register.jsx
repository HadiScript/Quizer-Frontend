import { Button, Card, Input } from "antd";
import React from "react";
import { _useCommon } from "../../actions/_common";
import { style } from "../../assets/css/style";
import { GoogleOutlined } from "@ant-design/icons";

const Register = () => {
  const { Register, name, setName, email, setEmail, password, setPassword, signupwithgoogle } = _useCommon();
  return (
    <>
      <div style={{ minHeight: "100vh" }} className="d-flex  flex-column gap-4 justify-content-center align-items-center p-2">
        <Card style={{ width: "400px", boxShadow: style.boxShadow1 }}>
          <div>
            <h3 className="text-dark">Register</h3>
            <small className="text-secondary">In publishing and graphic design, Lorem ipsum is a placeholder.</small>
          </div>

          <form onSubmit={(e) => Register(e)} className="d-flex flex-column gap-2 mt-5">
            <label className="text-secondary">Email</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name:" />

            <label className="text-secondary">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email:" />

            <label className="text-secondary">Password</label>
            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

            <Button onClick={(e) => Register(e)} className="bg-dark text-light mt-3" >
              Register
            </Button>

            <Button onClick={(e) => signupwithgoogle()} icon={<GoogleOutlined />} className="bg-danger text-light mt-3" >
              Continue with Google
            </Button>
          </form>
        </Card>

      </div>
    </>
  );
};

export default Register;
