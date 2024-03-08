import React, { useEffect, useState } from "react";
import { API, attemptApi } from "../../../helper/API";
import axios from "axios";
import { Errs } from "../../../helper/Errs";
import QuizAttemptingComponent from "../../components/common/QuizAttemptingComponent";
import toast from "react-hot-toast";
import { _quizData } from "../../../data/_quiz";
import OneByOneQuestions from "../OneByOneQuestions";
import OneByOneOnBigScr from "../OneByOneOnBigScr";
import { useQueryClient } from "react-query";

const StartStep2 = ({ setStep, attemptId, creatorId, quizId, setRemainingTime, remainingTime }) => {
  const [responses, setResponses] = useState([]);
  const queryClient = useQueryClient()

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
      const res = await axios.get(`${attemptApi}/quiz/${creatorId}/${quizId}`);
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

  const handleSubmit = async (x) => {
    const payload = {
      attemptId,
      responses,
      submitType: x === "time-up" ? "time-up" : "within-time",
    };

    try {
      const res = await axios.post(`${attemptApi}/finish`, payload);
      if (res.status === 200) {
        toast.success("finished");
        setStep(3);
        setRemainingTime(null);
        queryClient.invalidateQueries(["attemptSummary"]);
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

    if (remainingTime === 0) {
      handleSubmit("time-up");
    }

    return () => clearInterval(timer); // Cleanup
  }, [remainingTime]);

  return (
    <>
      {quizData?.displaySetting === "all-at-once" ? (
        <>
          <div className="d-flex justify-content-center align-items-start attempt">
            <div style={{ minHeight: "100vh" }} className="d-flex flex-column  gap-4 card-shadow2">
              <span className="main-heading text-center mb-4 border-bottom">{quizData.title}</span>
              <QuizAttemptingComponent
                quizData={quizData}
                attemptId={attemptId}
                onFinish={() => { }}
                handleSubmit={handleSubmit}
                responses={responses}
                setResponses={setResponses}
              />
            </div>
          </div>
        </>
      ) : quizData?.displaySetting === "one-by-one-1-col" ? (
        <div className="d-flex justify-content-center align-items-start attempt">
          <div style={{ minHeight: "100vh" }} className="d-flex flex-column  gap-4 card-shadow2">
            <span className="main-heading text-center mb-4 border-bottom">{quizData.title}</span>
            <OneByOneQuestions quizData={quizData} setResponses={setResponses} responses={responses} handleSubmit={handleSubmit} />
          </div>
        </div>
      ) : (
        quizData?.displaySetting === "one-by-one-2-col" && <OneByOneOnBigScr quizData={quizData} setResponses={setResponses} responses={responses} handleSubmit={handleSubmit} />
      )}
    </>
  );
};

export default StartStep2;
