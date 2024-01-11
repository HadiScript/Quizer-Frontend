import React, { useEffect, useState } from "react";
import { API } from "../../../helper/API";
import axios from "axios";
import { Errs } from "../../../helper/Errs";
import QuizAttemptingComponent from "../../components/common/QuizAttemptingComponent";
import toast from "react-hot-toast";
import { _quizData } from "../../../data/_quiz";

const StartStep2 = ({ setStep, attemptId, creatorId, quizId, setRemainingTime, remainingTime }) => {
  const [responses, setResponses] = useState([]);

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
        setRemainingTime(res.data.timeLimit * 60);
      }
    } catch (error) {
      Errs(error);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingQuiz();
  }, [creatorId, quizId, attemptId]);

  const handleSubmit = async () => {
    const payload = {
      attemptId,
      responses,
    };

    try {
      const res = await axios.post(`${API}/attempt/finished-quiz`, payload);
      if (res.status === 200) {
        toast.success("finished");
        setStep(3);
        setRemainingTime(null);
      }
    } catch (error) {
      Errs(error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (quizData?.questions) {
      setResponses(
        quizData.questions.map((question) => ({
          questionId: question._id,
          selectedOption: "",
          answer: "",
        }))
      );
    }
  }, [quizData, quizData?.questions]);

  useEffect(() => {
    const timer =
      remainingTime > 0 &&
      setInterval(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);

    // Auto-submit when time is up
    if (remainingTime === 0) {
      handleSubmit();
    }

    return () => clearInterval(timer); // Cleanup
  }, [remainingTime]);

  return (
    <>
      <div style={{ minHeight: "100vh",}} className="d-flex justify-content-center align-items-start attempt">
        {/* <div className="my-shadow"></div> */}
        <div className="d-flex flex-column gap-4 card-shadow2">
          <span className="main-heading text-center mb-4 border-bottom">{quizData.title}</span>

          <QuizAttemptingComponent quizData={quizData} attemptId={attemptId} onFinish={() => {}} handleSubmit={handleSubmit} responses={responses} setResponses={setResponses} />
        </div>
      </div>
    </>
  );
};

export default StartStep2;
