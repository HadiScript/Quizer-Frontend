import { Button, Col, Form, Input, Row, } from "antd";

import { _useCommon } from "../../actions/_common";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

import itsImg from '../../assets/imgs/login.webp'
import { FaLongArrowAltRight } from "react-icons/fa";
import { useEffect } from "react";


const Login = () => {
  const router = useNavigate();
  const [auth] = useAuth();

  useEffect(() => {
    if (auth?.token) {
      return router("/");
    }
  }, [auth]);


  const { email, setEmail, password, setPassword, Login, loginwithgoogle, loading } = _useCommon();

  const onFinish = (values) => {
    Login();
  };



  return (
    <>

      <Row style={{ minHeight: "100vh" }} className="auth">
        <Col className="d-none d-lg-block left" lg={16} xs={24}>
          <Row className="row ">
            <Col md={14} lg={14} className="" style={{
              height: "100vh",
              backgroundImage: `url(${itsImg})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}>


            </Col>
            <Col md={10} lg={10} className="d-flex justify-content-center"  >
              <div className="d-flex flex-column " style={{ maxWidth: "400px" }}>
                <h1 className="text-white mt-5">MongoDB.local is coming to a city near you!</h1>
                <p className="text-white" style={{ fontSize: "16px" }}>
                  Enjoy technical deep-dives, one-on-one expert advice, and product tutorials to elevate your skills.
                </p>
                <p className="text-white my-3" style={{ fontSize: "16px" }}>Enjoy a 50% discount with code WEB50.</p>
                <Link to={'/how-it-works'} className="d-flex gap-2 align-items-center text-white _link my-3" style={{ fontSize: "16px" }}>
                  <span>How it works</span>
                  <FaLongArrowAltRight />
                </Link>

                <Link to={'/'} className="d-flex gap-2 align-items-center text-white _link my-3" style={{ fontSize: "16px" }}>
                  <span>Home</span>
                  <FaLongArrowAltRight />
                </Link>

              </div>
            </Col>
          </Row>

        </Col>
        <Col lg={8} xs={24}  >
          <div style={{ minHeight: "100vh", }} className="d-flex justify-content-center" >

            <div className="d-flex flex-column gap-4 justify-content-center align-items-center px-3 " style={{ width: "400px" }}>

              <div style={{ width: "100%" }}>
                <h2 className="">Login</h2>
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
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Login;
