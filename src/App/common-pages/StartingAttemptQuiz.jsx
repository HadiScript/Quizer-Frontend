import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../components/common/Heading";
import { Errs } from "../../helper/Errs";
import axios from "axios";
import { API } from "../../helper/API";
import { Button, Card, Col, Input, Row } from "antd";

import "../../assets/css/Attempt.css";
import { ClockCircleOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useQuizContext } from "../../context/quizContext";

const StartingAttemptQuiz = () => {
  const router = useNavigate();
  const { creatorId, quizId } = useParams();
  const [loading, setLoading] = useState(false);
  const [userInputs, setUserInputs] = useState({});
  const { setHasStarted } = useQuizContext();

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

      if (res.status === 200) {
        setInfo(res.data.quizData);
      }
    } catch (error) {
      console.log(error);
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (creatorId && quizId) {
      fetchingQuizInfo();
    }
  }, [creatorId, quizId]);

  useEffect(() => {
    if (info.title) {
      const initialInputs = {};
      info.requiredFields.forEach((field) => {
        initialInputs[field] = "";
      });
      setUserInputs(initialInputs);
    }
  }, [info.requiredFields]);

  const startQuiz = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API}/attempt/start-quiz`, { quizId, studentDetails: userInputs });
      if (res.status === 201) {
        toast.success(res.data.message);
        router(`/attempting-quiz/${creatorId}/${quizId}/${res.data.attemptId}`);
        setHasStarted(true);
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
        <span className="main-heading">{info.title}</span>
        <q>
          In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful
          content.
        </q>
        <div className="time-stamp"> Timelimit : {info.timeLimit} Minutes </div>

        <form onSubmit={(e) => startQuiz(e)} className="d-flex flex-column gap-2">
          {info?.requiredFields?.map((field, index) => (
            <React.Fragment key={index}>
              <label className="text-secondary mt-2">{field}</label>
              <Input value={userInputs[field]} onChange={(e) => handleInputChange(field, e.target.value)} />
            </React.Fragment>
          ))}
          <div className="text-center">
            <Button onClick={(e) => startQuiz(e)} icon={<ClockCircleOutlined />} className="myBtn text-light mt-3" loading={loading}>
              Start Quiz
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StartingAttemptQuiz;
