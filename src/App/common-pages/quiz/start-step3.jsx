import React, { useEffect } from "react";
// import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { useWindow } from "../../../hooks/useWindow";

const StartStep3 = () => {
  const { resize } = useWindow();

  useEffect(() => {
    sessionStorage.removeItem("quizStep");
    sessionStorage.removeItem("attemptId");
  }, []);

  return (
    <div style={{ minHeight: "100vh" }} className="d-flex justify-content-center align-items-center p-2 attempt">
      <Confetti />
      <div className="my-shadow"></div>
      <div className="d-flex flex-column align-items-center gap-4 card-shadow thankx">
        <span className="main">Thank you,</span>
        <span className="main-2">for attempting thiz quiz</span>
      </div>
    </div>
  );
};

export default StartStep3;
