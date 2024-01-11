import React, { useEffect, useState } from "react";
import { API } from "../../../helper/API";
import axios from "axios";
import { Errs } from "../../../helper/Errs";
import toast from "react-hot-toast";
import { Button, Input } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const StartStep1 = ({ setStep, creatorId, quizId, setAttemptId, step, userInputs, setUserInputs }) => {

  const [loading, setLoading] = useState(false);
  const [notAvailable, setNotAvailable] = useState(null);

  const [info, setInfo] = useState({
    title: "",
    timeLimit: "",
    requiredFields: [],
  });

  const handleInputChange = (field, value) => {
    setUserInputs((prev) => ({ ...prev, [field]: value }));
  };

  const fetchingQuizInfo = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/attempt/info-quiz/${creatorId}/${quizId}`);

      setInfo(res.data.quizData);
    } catch (error) {
      console.log(error);
      Errs(error);
      if (error.response.status === 403) {
        setNotAvailable(error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (creatorId && quizId) {
      fetchingQuizInfo();
    }
  }, [creatorId, quizId]);

  const startQuiz = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API}/attempt/start-quiz`, { quizId, studentDetails: userInputs });
      if (res.status === 201) {
        toast.success(res.data.message);
        setStep(2);
        setAttemptId(res.data.attemptId);
      }
    } catch (error) {
      Errs(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh" }} className="d-flex justify-content-center align-items-center p-2 attempt">
      <div className="my-shadow"></div>
      <div className="d-flex flex-column gap-4 card-shadow">
        {loading && <p className="text-center">loading...</p>}

        {notAvailable && (
          <>
            <span className="main-heading">{notAvailable.message}</span>
            <div className="time-stamp">
              <b>Available From</b> : {moment(notAvailable.availableFrom).format("MMMM Do YYYY, h:mm:ss a")}
            </div>
            <div className="time-stamp">
              <b>Available Until </b> : {moment(notAvailable.availableUntil).format("MMMM Do YYYY, h:mm:ss a")}
            </div>
          </>
        )}

        {!notAvailable && (
          <>
            <span className="main-heading">{info.title}</span>
            <q>
              In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on
              meaningful content.
            </q>
          </>
        )}
        {!notAvailable && <div className="time-stamp"> Timelimit : {info.timeLimit} Minutes </div>}

        <form onSubmit={(e) => startQuiz(e)} className="d-flex flex-column gap-2">
          {info?.requiredFields?.map((field, index) => (
            <React.Fragment key={index}>
              <label className="text-secondary mt-2">{field}</label>
              <Input value={userInputs[field]} onChange={(e) => handleInputChange(field, e.target.value)} />
            </React.Fragment>
          ))}
          {!notAvailable && (
            <div className="text-center">
              <Button onClick={(e) => startQuiz(e)} icon={<ClockCircleOutlined />} className="myBtn text-light mt-3" loading={loading}>
                Start Quiz
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default StartStep1;
