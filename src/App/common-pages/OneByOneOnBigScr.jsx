import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Input, Radio, List, Row, Col, Button } from "antd";
import React, { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../assets/css/rich.css";

const OneByOneOnBigScr = ({ quizData, handleSubmit, responses, setResponses }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  useEffect(() => {
    const currentResponse = responses.find((response) => response.questionId === quizData.questions[currentQuestionIndex]._id);
    if (currentResponse && (currentResponse.selectedOption || currentResponse.answer)) {
      setIsOptionSelected(true);
    } else {
      setIsOptionSelected(false);
    }
  }, [currentQuestionIndex, responses, quizData.questions]);

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return <div>Loading...</div>;
  }

  const handleOptionChange = (questionId, value, isShortAnswer = false) => {
    setIsOptionSelected(true);
    const updatedResponses = responses.map((response) => {
      if (response.questionId === questionId) {
        return {
          ...response,
          selectedOption: isShortAnswer ? "" : value,
          answer: isShortAnswer ? value : "",
          question: questionId,
        };
      }
      return response;
    });
    setResponses(updatedResponses);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsOptionSelected(false);
    } else {
      handleSubmit();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setIsOptionSelected(true);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const currentResponse = responses.find((response) => response.questionId === currentQuestion._id);
  return (
    <>
      <Row style={{ minHeight: "100vh" }}>
        <Col md={12} xs={24} className="px-5 border-end">
          <div className="d-flex justify-content-start align-items-start gap-2 pt-5">
            <b className="mt-2">Q:</b>
            <ReactQuill style={{ width: "100%" }} modules={{ toolbar: null }} placeholder="Type your question here" readOnly theme="snow" value={currentQuestion.text} />
            {/* <p style={{ fontSize: "20px" }}>{currentQuestion.text}</p> */}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-5">
            <Button className="myBtn" icon={<RightOutlined />} onClick={goToNextQuestion} disabled={!isOptionSelected}>
              {currentQuestionIndex === quizData.questions.length - 1 ? "Submit" : "Next"}
            </Button>
            {currentQuestionIndex > 0 && (
              <Button icon={<LeftOutlined />} onClick={goToPreviousQuestion}>
                Previous
              </Button>
            )}
          </div>
        </Col>
        <Col md={12} xs={24} className="px-5 pt-5">
          {currentQuestion.type === "short-answer" ? (
            <Input.TextArea onChange={(e) => handleOptionChange(currentQuestion._id, e.target.value, true)} />
          ) : (
            <Radio.Group
              value={currentResponse ? currentResponse.selectedOption : null}
              onChange={(e) => handleOptionChange(currentQuestion._id, e.target.value)}
              className="radio-list-group"
            >
              {currentQuestion.options.map((option) => (
                <List.Item key={option.text} className="radio-list-item">
                  <Radio value={option.text} className="full-width-radio">
                    {option.text}
                  </Radio>
                </List.Item>
              ))}
            </Radio.Group>
          )}
        </Col>
      </Row>
    </>
  );
};

export default OneByOneOnBigScr;
