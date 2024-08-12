import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Input, Radio, List, Row, Col, Button, Checkbox } from "antd";
import React, { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const OneByOneOnBigScr = ({ quizData, handleSubmit, responses, setResponses, submitLoading }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  useEffect(() => {
    const currentResponse = responses.find((response) => response.question === quizData.questions[currentQuestionIndex]._id);
    if (currentResponse && (currentResponse.selectedOption || currentResponse.answer)) {
      setIsOptionSelected(true);
    } else {
      setIsOptionSelected(false);
    }
  }, [currentQuestionIndex, responses, quizData.questions]);

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return <div>Loading...</div>;
  }

  // const handleOptionChange = (questionId, value, isShortAnswer = false) => {
  //   setIsOptionSelected(true);
  //   const updatedResponses = responses.map((response) => {
  //     if (response.question === questionId) {
  //       return {
  //         ...response,
  //         selectedOption: isShortAnswer ? "" : value,
  //         answer: isShortAnswer ? value : "",
  //         question: questionId,
  //       };
  //     }
  //     return response;
  //   });
  //   setResponses(updatedResponses);
  // };


  const handleOptionChange = (questionId, value, questionType, blankIndex) => {
    const updatedResponses = responses.map((response) => {
      if (response.question === questionId) {
        if (questionType === "multiple-choice" && Array.isArray(value) && value.length > blankIndex) {
          // Prevent selecting more options than allowed
          return response;
        }
        console.log(blankIndex)
        switch (questionType) {
          case "multiple-choice":
          case "true-false":
            return {
              ...response,
              selectedOption: Array.isArray(value) ? value : [value],
              answer: "",
            };
          case "short-answer":
            return {
              ...response,
              selectedOption: "", // Short answers use the `answer` field
              answer: value,
            };
          case "fill-in-the-blank":
            const updatedBlanks = response.selectedOption || [];
            updatedBlanks[blankIndex] = value; // Update specific blank
            return {
              ...response,
              selectedOption: updatedBlanks,
              answer: "",
            };
          case "date":
            return {
              ...response,
              selectedOption: value ? value.toISOString() : "", // Ensure a valid date string
              answer: "",
            };
          case "range":
            return {
              ...response,
              selectedOption: value,
              answer: "",
            };
          default:
            return response;
        }
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
  const currentResponse = responses.find((response) => response.question === currentQuestion._id);
  return (
    <div className="">
      <Row style={{ minHeight: "100vh" }}>
        <Col md={12} xs={24} className="px-5 border-end">
          <div className="d-flex justify-content-start align-items-start gap-2 pt-5">
            <b className="mt-2">Q:</b>
            <ReactQuill style={{ width: "100%" }} modules={{ toolbar: null }} readOnly theme="snow" value={currentQuestion.text} />
          </div>

          <div className="d-flex justify-content-between align-items-center mt-5">
            <Button loading={submitLoading} className="myBtn" icon={<RightOutlined />} onClick={goToNextQuestion} disabled={!isOptionSelected}>
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
          {/* {currentQuestion.type === "short-answer" ? (
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
          )} */}

          {/* {JSON.stringify(currentQuestion)} */}

          {currentQuestion.type === "multiple-choice" && (
            <Checkbox.Group
              className="d-flex flex-column"
              value={responses.find((r) => r.question === currentQuestion._id)?.selectedOption || []}
              onChange={(value) => handleOptionChange(currentQuestion._id, value, currentQuestion.type, currentQuestion.maxSelectableOptions)}
            >
              {currentQuestion.options.map((option) => (
                <div className="d-flex mb-1" key={option.text}>
                  <Checkbox value={option.text}>{option.text}</Checkbox>
                </div>
              ))}
              <small className="mt-3">Please select {currentQuestion.maxSelectableOptions} option</small>
            </Checkbox.Group>
          )}


          {currentQuestion.type === "true-false" && (
            <Radio.Group
              onChange={(e) =>
                handleOptionChange(currentQuestion._id, e.target.value, currentQuestion.type)
              }
            >
              {currentQuestion.options.map((option) => (
                <div className="d-flex mb-1" key={option.text}>
                  <Radio value={option.text}>{option.text}</Radio>
                </div>
              ))}
            </Radio.Group>
          )}

          {currentQuestion.type === "short-answer" && (
            <Input.TextArea
              onChange={(e) =>
                handleOptionChange(currentQuestion._id, e.target.value, currentQuestion.type)
              }
            />
          )}

          {currentQuestion.type === "fill-in-the-blank" && (
            currentQuestion.blanks.map((blank, idx) => (
              <Input
                className="my-1"
                key={idx}
                placeholder={`Blank ${idx + 1}`}
                onChange={(e) =>
                  handleOptionChange(currentQuestion._id, e.target.value, currentQuestion.type, idx)
                }
              />
            ))
          )}
        </Col>
      </Row>
    </div>
  );
};

export default OneByOneOnBigScr;
