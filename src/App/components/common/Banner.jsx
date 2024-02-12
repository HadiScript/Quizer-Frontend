import { Button } from "antd";
import "../../../assets/css/landing.css";
import { CompassOutlined, DoubleRightOutlined, LoginOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/authContext";

const Banner = () => {
  const [auth] = useAuth();
  return (

    <div className="landing-page">
      <h1>Quizer App</h1>
      <i>We are team of talented designers making websites with Bootstrap</i>
      <div className="d-flex justify-content-center align-items-center gap-4 mt-3">
        {!auth?.user ?
          <> <Link to={'/signin'}>  <button className="loginBtn">Login</button> </Link>
            <Link>  <button className="registerBtn">Register</button></Link>
          </> : <>
            <Link to={'/subscribe/quizes'}> <button className="loginBtn">Get Started</button> </Link>
            <Link>  <button className="registerBtn">Logout</button></Link>
          </>}
      </div>
    </div>


  );
};

export default Banner;
