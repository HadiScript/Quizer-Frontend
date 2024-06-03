import { Button, Result } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Thankx = () => {
  const navigate = useNavigate()

  return <div style={{ minHeight: "100vh" }} className="d-flex justify-content-center align-items-center">
    <Result
      status="success"
      title="Thank You For Submitting Survey"
      // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[

        <Button onClick={()=>navigate(-1)} className="myBtn" key="buy">Go Back</Button>,
      ]}
    />
  </div>
}

export default Thankx;
