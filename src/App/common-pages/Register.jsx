import { Button, Col, Input, Row, Form } from "antd";

import { _useCommon } from "../../actions/_common";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { FaLongArrowAltRight } from "react-icons/fa";
import itsImg from '../../assets/imgs/register.webp'


const Register = () => {
  const router = useNavigate()
  const { Register, name, setName, email, setEmail, password, setPassword, signupwithgoogle, loading } = _useCommon();


  const [auth] = useAuth();

  useEffect(() => {
    if (auth?.token) {
      return router("/");
    }
  }, [auth]);

  const onFinish = () => {
    Register();
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
                <h2 className="">Register</h2>
              </div>



              <Form
                layout="vertical"
                style={{ width: "100%" }}
                onFinish={onFinish}
                className="d-flex flex-column gap-2 mt-2"
                initialValues={{ name, email, password }}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <Input onChange={(e) => setName(e.target.value)} placeholder="Name" />
                </Form.Item>

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

                <Form.Item
                  label="Confirm Password"
                  name="confirm"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>

                <Form.Item style={{ width: "100%" }}>
                  <Button style={{ width: "100%" }} loading={loading} type="primary" htmlType="submit" className="primaryBtn mt-3">
                    Register
                  </Button>
                </Form.Item>
              </Form>


              <div style={{ width: "100%" }} className="">
                <span>
                  Already have an account? <Link to="/signin" className="_link">Login</Link>
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Register;

