import React, { useEffect, useState } from "react";
import { Button, Divider, Input, Radio, Tag } from "antd";
import { useNavigate } from "react-router-dom";

const QuizAttemptingComponent = ({ quizData, handleSubmit, responses, setResponses }) => {
  const router = useNavigate();
  const [visibleAnswers, setVisibleAnswers] = useState({}); // Tracks visibility for each question

  const handleOptionChange = (questionId, value, isShortAnswer = false) => {
    const updatedResponses = responses.map((response) => {
      if (response.questionId === questionId) {
        return {
          ...response,
          question: questionId,
          selectedOption: isShortAnswer ? "" : value,
          answer: isShortAnswer ? value : "",
        };
      }
      return response;
    });
    setResponses(updatedResponses);
  };

  const toggleAnswerVisibility = (questionId) => {
    setVisibleAnswers((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  };

  return (
    <>
      {quizData?.questions?.map((question, index) => (
        <div key={index}>
          <div className="d-flex justify-content-start align-items-start gap-1">
            <b style={{ width: "10%" }}>Q {index + 1}:</b>
            <div style={{ width: "90%" }}>
              <p>{question.text}</p>
              {question.type === "short-answer" ? (
                <Input.TextArea onChange={(e) => handleOptionChange(question._id, e.target.value, true)} />
              ) : (
                <Radio.Group onChange={(e) => handleOptionChange(question._id, e.target.value)}>
                  {question.options.map((option) => (
                    <div className="d-flex mb-1" key={option.text}>
                      <Radio value={option.text}>{option.text}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              )}
            </div>
          </div>
          <div>
            {quizData.mode === "practice" && (
              <div className="d-flex justify-content-start gap-3 mt-5">
                <Tag size="small" role="button" onClick={() => toggleAnswerVisibility(question._id)}>
                  {visibleAnswers[question._id] ? "Hide Answer" : "Show Answer"}
                </Tag>
                <div className="">
                  {visibleAnswers[question._id] && (
                    <small>
                      <b>Answer:</b> {question.options.find((option) => option.isCorrect).text}
                    </small>
                  )}
                </div>
              </div>
            )}
          </div>
          <Divider />
        </div>
      ))}

      {/* <div className="text-center">
      </div> */}
      <Button className="myBtn" onClick={handleSubmit}>
        Finish
      </Button>
    </>
  );
};

export default QuizAttemptingComponent;
