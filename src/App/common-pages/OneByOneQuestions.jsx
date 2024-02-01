import React, { useEffect, useState } from "react";
import { Button, Input, Radio } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const OneByOneQuestions = ({ quizData, handleSubmit, responses, setResponses }) => {
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
    <div>
      <div className="d-flex justify-content-start align-items-start gap-1 mb-5">
        <b style={{ width: "10%" }}>Q {currentQuestionIndex + 1}:</b>
        <div style={{ width: "90%" }}>
          <p>{currentQuestion.text}</p>
          {currentQuestion.type === "short-answer" ? (
            <Input.TextArea onChange={(e) => handleOptionChange(currentQuestion._id, e.target.value, true)} />
          ) : (
            <Radio.Group value={currentResponse ? currentResponse.selectedOption : null} onChange={(e) => handleOptionChange(currentQuestion._id, e.target.value)}>
              {currentQuestion.options.map((option) => (
                <div className="d-flex mb-1" key={option.text}>
                  <Radio value={option.text}>{option.text}</Radio>
                </div>
              ))}
            </Radio.Group>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <Button className="myBtn" icon={<RightOutlined />} onClick={goToNextQuestion} disabled={!isOptionSelected}>
          {currentQuestionIndex === quizData.questions.length - 1 ? "Submit" : "Next"}
        </Button>
        {currentQuestionIndex > 0 && (
          <Button icon={<LeftOutlined />} onClick={goToPreviousQuestion}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default OneByOneQuestions;
