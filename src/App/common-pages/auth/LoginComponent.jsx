import { Button, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { _useCommon } from '../../../actions/_common'
import { useAuth } from '../../../context/authContext'
import { FcGoogle } from 'react-icons/fc'

const LoginComponent = ({
  from = "page",
  email,
  setEmail,
  password,
  setPassword,
  Login,
  loginwithgoogle,
  loading,
  onFinish, }) => {


  const router = useNavigate();
  const [auth] = useAuth();

  useEffect(() => {
    if (auth?.token) {
      return router("/");
    }
  }, [auth]);






  return (

    <div className="d-flex flex-column gap-4 justify-content-center align-items-center px-3 " style={{ width: "400px" }}>

      <div style={{ width: "100%" }}>
        {from === "page" && <div onClick={() => router(-1)} className="d-flex align-items-center  mb-5 _link text-dark" role="button" style={{ fontSize: "18px" }}>
          <IoIosArrowBack />
          <span>Back</span>
        </div>}
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

          <Button icon={<FcGoogle size={20} />} onClick={loginwithgoogle} style={{ width: "100%" }} className="googleBtn mt-3">
            Login with Google
          </Button>
        </Form.Item>
      </Form>

      <p className="mt-2">
        Have an account? <Link to="/signup" className="_link">Register</Link>
      </p>
    </div>
  )
}

export default LoginComponent