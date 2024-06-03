import React, { useEffect, useState } from "react";
import { API, attemptApi } from "../../../helper/API";
import axios from "axios";
import { Errs } from "../../../helper/Errs";
import toast from "react-hot-toast";
import { Button, Form, Input, Watermark } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const StartStep1 = ({ setStep, creatorId, quizId, setAttemptId, step, userInputs, setUserInputs }) => {
  const [loading, setLoading] = useState(false);
  const [notAvailable, setNotAvailable] = useState(null);

  const [info, setInfo] = useState({
    title: "",
    timeLimit: "",
    requiredFields: [],
    quizInstructions: null
  });

  const handleInputChange = (field, value) => {
    setUserInputs((prev) => ({ ...prev, [field]: value }));
  };

  const fetchingQuizInfo = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${attemptApi}/info/${creatorId}/${quizId}`);
      if (res.status === 200) {
        setInfo(res.data.quizData);
      } else if (res.status === 202) {
        console.log("not ", res.data.notAvailable);
        setNotAvailable(res.data.notAvailable);
      }
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

  const startQuiz = async () => {
    // e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${attemptApi}/start`, { quizId, studentDetails: userInputs });
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
            <span className="main-heading">{info?.title}</span>
            <p dangerouslySetInnerHTML={{ __html: info.quizInstructions }} />
          </>
        )}
        {!notAvailable && <div className="time-stamp" style={{ width: "100%" }}>
          <div>
            Timelimit : {info?.timeLimit} Minutes
          </div>
          <div className="mt-2">
            <small> Note* Please avoid to refresh page</small>
          </div>

        </div>}

        <Form
          // form={form}
          onFinish={startQuiz}
          className="d-flex flex-column gap-2"
          style={{ width: '100%' }}
        >
          {info?.requiredFields?.map((field, index) => (
            <React.Fragment key={index}>
              <label className="text-secondary mt-2">{field}</label>
              <Form.Item
                name={field}
                rules={[
                  { required: true, message: `${field} is required` },
                  field === 'Email' ? { type: 'email', message: 'Please enter a valid email' } : {},
                  field === 'Phone Number'
                    ? {
                      pattern: /^[0-9]+$/,
                      message: 'Please enter a valid phone number',
                    }
                    : {},
                ]}
              >
                <Input
                  type={field === 'Email' ? 'email' : 'text'}
                  value={userInputs[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                />
              </Form.Item>
            </React.Fragment>
          ))}
          {!notAvailable && (
            <div className="text-center">
              <Button
                htmlType="submit"
                icon={<ClockCircleOutlined />}
                className="myBtn text-light mt-3"
                loading={loading}
              >
                Start Quiz
              </Button>
            </div>
          )}
        </Form>
      </div>



    </div>
  );
};

export default StartStep1;
