import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Thankx = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Replace the current entry in the history stack
    navigate("/thank-you", { replace: true });
  }, [navigate]);

  return <div>Thankx</div>;
};

export default Thankx;
