import { useEffect, useState } from "react";
import { API, attemptApi } from "../../../helper/API";
import axios from "axios";
import { Errs } from "../../../helper/Errs";
import QuizAttemptingComponent from "../../components/common/QuizAttemptingComponent";
import toast from "react-hot-toast";
import { _quizData } from "../../../data/_quiz";
import OneByOneQuestions from "../OneByOneQuestions";
import OneByOneOnBigScr from "../OneByOneOnBigScr";
import { useQueryClient } from "react-query";
import Timer from "./timer";
import { Affix } from "antd";

const StartStep2 = ({ setStep, attemptId, creatorId, quizId, setRemainingTime, remainingTime }) => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const [quizData, setQuizData] = useState({});

  useEffect(() => {
    const handleKeydown = (event) => {
      if (
        (event.key === "F5") ||
        (event.ctrlKey && event.key === "r") ||
        (event.metaKey && event.key === "r")
      ) {
        event.preventDefault();
        event.returnValue = "Refreshing is disabled.";
        return false;
      }
    };

    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("contextmenu", handleContextMenu);
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
    setLoading(true)

    const emptyResponses = responses.some(response => response.selectedOption === "");
    console.log(emptyResponses, "here is")
    if (emptyResponses) {
      toast.error("I think you missed a question, Please review it. All questions must be answered before submitting.", { position: "bottom-left" });
      setLoading(false);
      return;
    }


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
    } finally {
      setLoading(false)
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
    return () => clearInterval(timer);
  }, [remainingTime]);

  return (
    <>
      {quizData?.displaySetting === "all-at-once" ? (
        <>
          <div className="d-flex justify-content-center align-items-start attempt">
            <div style={{ minHeight: "100vh" }} className="d-flex flex-column  gap-4 card-shadow2">
              <div className="border-bottom d-flex flex-wrap justify-content-between align-items-center pb-4">
                <span className="main-heading text-center">{quizData.title}</span>
                <Affix offsetTop={10}>
                  <Timer remainingTime={remainingTime} />
                </Affix>
              </div>
              <QuizAttemptingComponent
                submitLoading={loading}
                quizData={quizData}
                attemptId={attemptId}
                onFinish={() => { }}
                handleSubmit={handleSubmit}
                responses={responses}
                setResponses={setResponses}
                remainingTime={remainingTime}
              />
            </div>
          </div>
        </>
      ) : quizData?.displaySetting === "one-by-one-1-col" ? (
        <div className="d-flex justify-content-center align-items-start attempt">
          <div style={{ minHeight: "100vh" }} className="d-flex flex-column  gap-4 card-shadow2">
            <div className="border-bottom d-flex flex-wrap justify-content-between align-items-center pb-4">
              <span className="main-heading text-center">{quizData.title}</span>
              <Affix offsetTop={10}>
                <Timer remainingTime={remainingTime} />
              </Affix>
            </div>
            <OneByOneQuestions submitLoading={loading} quizData={quizData} setResponses={setResponses} responses={responses} handleSubmit={handleSubmit} />
          </div>
        </div>
      ) : (
        quizData?.displaySetting === "one-by-one-2-col" && <>
          <div className="container border-bottom d-flex flex-wrap justify-content-between align-items-center pb-4">
            <span className="main-heading text-center">{quizData.title}</span>
            <Affix offsetTop={10}>
              <Timer remainingTime={remainingTime} />
            </Affix>
          </div>
          <OneByOneOnBigScr submitLoading={loading} quizData={quizData} setResponses={setResponses} responses={responses} handleSubmit={handleSubmit} />

        </>
      )}

    </>
  );
};

export default StartStep2;
