import { useNavigate } from "react-router-dom"
import { LoginPageCover } from "./Login"
import { IoIosArrowBack } from "react-icons/io"
import { Alert, Button, Form, Input } from "antd"
import { useState } from "react"
import axios from "axios"
import { authApi } from "../../helper/API"
import { Errs } from "../../helper/Errs"

const ForgotPassword = () => {

  const router = useNavigate();
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [showMsg, setShowMsg] = useState(false)


  const onFinish = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`${authApi}/request-password-reset`, { email });
      if (data.ok) {
        setShowMsg(true)
      }
    } catch (error) {
      console.log(error);
      Errs(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginPageCover>

      <div className={`d-flex flex-column gap-4 justify-content-center align-items-center px-3 `} style={{ width: "400px" }}>
        <div style={{ width: "100%" }}>
          <div onClick={() => router(-1)} className="d-flex align-items-center  mb-5 _link text-dark" role="button" style={{ fontSize: "18px" }}>
            <IoIosArrowBack />
            <span>Back</span>
          </div>
          <h2 className="">Forgot Password</h2>
        </div>

        <Form
          layout="vertical"
          style={{ width: "100%" }}
          onFinish={onFinish}
          className="d-flex flex-column gap-2 mt-3"
          initialValues={{ email }}
        >


          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'The input is not valid E-mail!' }]}
          >
            <Input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          </Form.Item>


          <Form.Item style={{ width: "100%" }}>
            <Button style={{ width: "100%" }} loading={loading} type="primary" htmlType="submit" className="primaryBtn mt-3">
              Forgot Password
            </Button>
          </Form.Item>

          {showMsg &&
            <Alert
              message=""
              description="Password reset link sent to your email."
              type="success"
              showIcon
            />
          }
        </Form>

      </div>
    </LoginPageCover>
  )
}

export default ForgotPassword