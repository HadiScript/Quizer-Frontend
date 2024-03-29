import { Button, Card, Input, } from "antd";
import { useEffect } from "react";
import { style } from "../../assets/css/style";
import { _useCommon } from "../../actions/_common";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { GoogleOutlined } from "@ant-design/icons";


const Login = () => {
  const router = useNavigate();
  const [cookies, removeCookie] = useCookies([]);


  const { email, setEmail, password, setPassword, Login, loginwithgoogle, loading } = _useCommon();

  const [auth] = useAuth();

  useEffect(() => {
    if (cookies?.session) {
      return router("/");
    }
  }, [router, auth]);

  return (
    <>
      <div style={{ minHeight: "100vh" }} className="d-flex  flex-column gap-4 justify-content-center align-items-center p-2">
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

            <Button loading={loading} onClick={(e) => Login(e)} className="bg-dark text-light mt-3" >
              Login
            </Button>
            <Button onClick={(e) => loginwithgoogle()} icon={<GoogleOutlined />} className="bg-danger text-light mt-3" >
              Continue with Google
            </Button>
          </form>

          <p className="mt-2">Don't have account? <Link to={'/signup'} className="_link">Register</Link> </p>

        </Card>
      </div>
    </>
  );
};

export default Login;
