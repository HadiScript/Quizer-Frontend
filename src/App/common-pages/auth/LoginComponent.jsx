import { Button, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { _useCommon } from '../../../actions/_common'
import { useAuth } from '../../../context/authContext'
import { FcGoogle } from 'react-icons/fc'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { Errs } from '../../../helper/Errs'
import axios from 'axios'
import { authApi } from '../../../helper/API'
import toast from 'react-hot-toast'

const LoginComponent = ({
  from = "page",
  email,
  setEmail,
  password,
  setPassword,
  Login,
  loginwithgoogle,
  loading,
  onFinish,
  ResendMsg,
  setResendMsg
}) => {


  const router = useNavigate();
  const [auth] = useAuth();

  useEffect(() => {
    if (auth?.token) {
      return router("/");
    }
  }, [auth]);



  setTimeout(() => {
    setResendMsg(false)
  }, 100000);


  const resendEmail = async () => {
    try {
      const { data } = await axios.put(`${authApi}/resend-verifying-email`, { email: email })
      toast.success(data.message, { position: "bottom-center" });
    } catch (error) {
      Errs(error);
    }
  }



  return (

    <div className={`d-flex flex-column gap-4 justify-content-center align-items-center ${from === "modal" ? "" : "px-3"} `} style={{ width: "400px" }}>

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

        {
          ResendMsg &&
          <div>
            <span>
              We have sent you an email to verify, Please check your
            </span>
            <a className="text-decoration-none mx-2" href="https://mail.google.com/mail" target="_">inbox <FaExternalLinkAlt size={10} /></a>
            <br />
            <span className='text-primary' role='primary' onClick={resendEmail}>Resend</span>
          </div>
        }

      </Form>

      <div className='mt-3 d-flex gap-4'>
        <p className="">
          Have an account? <Link to="/signup" className="_link">Register</Link>
        </p>
        <Link to="/forgot-password" className="_link">Forgot password</Link>
      </div>
    </div>
  )
}

export default LoginComponent