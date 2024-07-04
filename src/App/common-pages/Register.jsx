import { Button, Card, Col, Input, Row, Form } from "antd";

import { _useCommon } from "../../actions/_common";
import { GoogleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Register = () => {
  const { Register, name, setName, email, setEmail, password, setPassword, signupwithgoogle, loading } = _useCommon();


  const onFinish = () => {
    Register();
  };


  return (
    <>
      <Row style={{ minHeight: "100vh" }} className="auth">
        <Col className="left" lg={18} xs={24}></Col>
        <Col lg={6} xs={24}>
          <div style={{ minHeight: "100vh" }} className="d-flex flex-column  justify-content-center align-items-center px-3">
            <div style={{ width: "100%" }}>
              <h2 className="">Register</h2>
              {/* <small className="text-secondary">In publishing and graphic design, Lorem ipsum is a placeholder.</small> */}
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

            <p className="mt-2">
              Already have an account? <Link to="/signin" className="_link">Login</Link>
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Register;





{/* <Button onClick={(e) => signupwithgoogle()} icon={<GoogleOutlined />} className="bg-danger text-light mt-3" >
  Continue with Google
</Button> */}