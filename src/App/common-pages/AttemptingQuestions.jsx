import React, { useEffect, useState } from "react";

import "../../assets/css/Attempt.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../helper/API";
import { Errs } from "../../helper/Errs";
import QuizAttemptingComponent from "../components/common/QuizAttemptingComponent";

const AttemptingQuestions = () => {
  const { creatorId, quizId, attemptId } = useParams();
  const [quizData, setQuizData] = useState({});

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.returnValue = "Are you sure you want to leave?";
      return "Are you sure you want to leave?";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const fetchingQuiz = async () => {
    try {
      const res = await axios.get(`${API}/attempt/get-quiz/${creatorId}/${quizId}`);
      if (res.status === 200) {
        setQuizData(res.data);
      }
    } catch (error) {
      Errs(error);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingQuiz();
  }, [creatorId, quizId, attemptId]);

  console.log(quizData, "here is the quizData");

  return (
    <>
      <div style={{ minHeight: "100vh", marginTop: "100px", marginBottom: "100px" }} className="d-flex justify-content-center align-items-start p-2 attempt">
        <div className="my-shadow"></div>
        <div className="d-flex flex-column gap-4 card-shadow2">
          <span className="main-heading text-center mb-4">{quizData.title}</span>
          {JSON.stringify(quizData)}
          <QuizAttemptingComponent quizData={quizData} attemptId={attemptId} onFinish={() => {}} />
        </div>
      </div>
    </>
  );
};

export default AttemptingQuestions;
