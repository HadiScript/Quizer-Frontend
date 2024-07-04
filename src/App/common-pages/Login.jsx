import { Button, Card, Col, Form, Input, Row, } from "antd";

import { _useCommon } from "../../actions/_common";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { GoogleOutlined } from "@ant-design/icons";


const Login = () => {
  const router = useNavigate();
  const [cookies, removeCookie] = useCookies([]);


  const { email, setEmail, password, setPassword, Login, loginwithgoogle, loading } = _useCommon();

  const onFinish = (values) => {
    Login();
  };


  const [auth] = useAuth();

  // useEffect(() => {
  //   if (cookies?.session) {
  //     return router("/");
  //   }
  // }, [router, auth]);

  return (
    <>

      <Row style={{ minHeight: "100vh" }} className="auth">
        <Col className="left" lg={18} xs={24}></Col>
        <Col lg={6} xs={24}  >
          <div style={{ minHeight: "100vh" }} className="d-flex flex-column gap-4 justify-content-center align-items-center px-3">
            <div style={{ width: "100%" }}>
              <h2 className="">Login</h2>
              {/* <small className="text-secondary">In publishing and graphic design, Lorem ipsum is a placeholder.</small> */}
            </div>

            <Form
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={onFinish}
              className="d-flex flex-column gap-2 mt-3"
              initialValues={{ email, password }}
            >


              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'The input is not valid E-mail!' }]}
              >
                <Input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                hasFeedback
              >
                <Input.Password onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              </Form.Item>



              <Form.Item style={{ width: "100%" }}>
                <Button style={{ width: "100%" }} loading={loading} type="primary" htmlType="submit" className="primaryBtn mt-3">
                  Login
                </Button>
              </Form.Item>
            </Form>

            <p className="mt-2">
              Have an account? <Link to="/signup" className="_link">Register</Link>
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Login;
