import React, { useState } from 'react'
import { LoginPageCover } from './Login'
import axios from 'axios';
import { authApi } from '../../helper/API';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { IoIosArrowBack } from 'react-icons/io';
import toast from 'react-hot-toast';

const ResetPassword = () => {

  const token = useLocation().search?.split("=")[1];
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const router = useNavigate()

  const onFinish = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`${authApi}/reset-password`, { token, newPassword: password })
      if (data.ok) {
        toast.success("Password has been reset", { position: "bottom-center" })
        router('/signin')
      }
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginPageCover>
      <div className={`d-flex flex-column gap-4 justify-content-center align-items-center px-3 `} style={{ width: "400px" }}>

        <div style={{ width: "100%" }}>
          <div onClick={() => router('/signin')} className="d-flex align-items-center  mb-5 _link text-dark" role="button" style={{ fontSize: "18px" }}>
            <IoIosArrowBack />
            <span>Back</span>
          </div>
          <h2 className="">Reset Password</h2>
        </div>

        <Form
          layout="vertical"
          style={{ width: "100%" }}
          onFinish={onFinish}
          className="d-flex flex-column gap-2 mt-3"
          initialValues={{ password }}
        >


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
              Reset Password
            </Button>
          </Form.Item>




        </Form>
      </div>
    </LoginPageCover>
  )
}

export default ResetPassword