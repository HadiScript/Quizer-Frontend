import { Button, Col, Form, Input, Row, } from "antd";

import { _useCommon } from "../../actions/_common";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

import itsImg from '../../assets/imgs/login.webp'
import { FaLongArrowAltRight } from "react-icons/fa";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { CheckOutlined, LoginOutlined } from "@ant-design/icons";

import { IoIosArrowBack } from "react-icons/io";
import LoginComponent from "./auth/LoginComponent";


export const LoginPageCover = ({ children }) => {
  return (
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
            <div className="d-flex flex-column justify-content-center" style={{ maxWidth: "400px" }}>
              <h1 className="text-white mt-5">Get Started for Free with Sawal.</h1>

              <div className="d-flex flex-column gap-3 text-white mt-4 mb-3" style={{ fontSize: "18px" }}>
                <span className="d-flex gap-2"><CheckOutlined /> Quick Sign-Up</span>
                <span className="d-flex gap-2"><CheckOutlined /> Create quiz and share instantly</span>
                <span className="d-flex gap-2"><CheckOutlined /> Analyze results with Dashboards</span>
                <span className="d-flex gap-2"><CheckOutlined /> Upgrade Anytime</span>
              </div>

              <p className="text-white my-3" style={{ fontSize: "18px" }}>Discover endless possibilities with Sawal's diverse features.</p>
              <Link to={'/how-it-works'} className="d-flex gap-2 align-items-center text-white _link my-3" style={{ fontSize: "16px" }}>
                <span>How it works</span>
                <FaLongArrowAltRight />
              </Link>


            </div>
          </Col>
        </Row>

      </Col>
      <Col lg={8} xs={24}  >
        <div style={{ minHeight: "100vh", }} className="d-flex justify-content-center" >
          {children}
        </div>
      </Col>
    </Row>
  )
}


const Login = () => {
  const router = useNavigate();
  const [auth] = useAuth();

  useEffect(() => {
    if (auth?.token) {
      return router("/");
    }
  }, [auth]);


  const { email, setEmail, password, setPassword, Login, loginwithgoogle, loading, ResendMsg, setResendMsg, } = _useCommon();

  const onFinish = (values) => {
    Login(true);
  };



  return (
    <>

      <LoginPageCover >
        <LoginComponent
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          Login={Login}
          loginwithgoogle={loginwithgoogle}
          loading={loading}
          onFinish={onFinish}
          ResendMsg={ResendMsg}
          setResendMsg={setResendMsg}
        />
      </LoginPageCover>

      {/* <Row style={{ minHeight: "100vh" }} className="auth">
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
              <div className="d-flex flex-column justify-content-center" style={{ maxWidth: "400px" }}>
                <h1 className="text-white mt-5">Get Started for Free with Sawal.</h1>

                <div className="d-flex flex-column gap-3 text-white mt-4 mb-3" style={{ fontSize: "18px" }}>
                  <span className="d-flex gap-2"><CheckOutlined /> Quick Sign-Up</span>
                  <span className="d-flex gap-2"><CheckOutlined /> Create quiz and share instantly</span>
                  <span className="d-flex gap-2"><CheckOutlined /> Analyze results with Dashboards</span>
                  <span className="d-flex gap-2"><CheckOutlined /> Upgrade Anytime</span>
                </div>

                <p className="text-white my-3" style={{ fontSize: "18px" }}>Discover endless possibilities with Sawal's diverse features.</p>
                <Link to={'/how-it-works'} className="d-flex gap-2 align-items-center text-white _link my-3" style={{ fontSize: "16px" }}>
                  <span>How it works</span>
                  <FaLongArrowAltRight />
                </Link>


              </div>
            </Col>
          </Row>

        </Col>
        <Col lg={8} xs={24}  >
          <div style={{ minHeight: "100vh", }} className="d-flex justify-content-center" >

            <LoginComponent
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              Login={Login}
              loginwithgoogle={loginwithgoogle}
              loading={loading}
              onFinish={onFinish}
              ResendMsg={ResendMsg}
              setResendMsg={setResendMsg}
            />



          </div>
        </Col>
      </Row> */}
    </>
  );
};

export default Login;
