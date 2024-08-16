import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Radio } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const OneByOneQuestions = ({ quizData, handleSubmit, responses, setResponses, submitLoading }) => {
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

  const handleOptionChange = (questionId, value, questionType, maxSelectableOptions = 1) => {

    const updatedResponses = responses.map((response) => {
      if (response.question === questionId) {
        // Check if it's a multiple-choice question with maxSelectableOptions > 1
        if (questionType === "multiple-choice" && Array.isArray(value) && value.length > maxSelectableOptions) {
          // Prevent selecting more options than allowed for checkboxes
          return response;
        }

        // Handle different question types
        switch (questionType) {
          case "multiple-choice":
          case "true-false":
            return {
              ...response,
              selectedOption: maxSelectableOptions === 1 ? value : Array.isArray(value) ? value : [value],
              answer: "", // Clear the answer field for multiple-choice or true-false
            };

          case "short-answer":
            return {
              ...response,
              selectedOption: "",
              answer: value,
            };

          case "fill-in-the-blank":
            const updatedBlanks = response.selectedOption || [];
            updatedBlanks[maxSelectableOptions] = value;
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
    <Form layout="vertical" onFinish={handleSubmit}>
      <div className="d-flex justify-content-start align-items-start gap-1 mb-5">
        <b style={{ width: "10%" }}>Q {currentQuestionIndex + 1}:</b>
        <div style={{ width: "90%" }}>
          <div className="mb-3">
            <p dangerouslySetInnerHTML={{ __html: currentQuestion.text }} />
          </div>





          {currentQuestion.type === "multiple-choice" && (
            currentQuestion.maxSelectableOptions === 1 ? (
              <Form.Item
                name={`question-${currentQuestion._id}`}
                rules={[{ required: true, message: 'Please select an option' }]}
              >
                <Radio.Group
                  className="d-flex flex-column"
                  value={responses.find((r) => r.question === currentQuestion._id)?.selectedOption || ''}
                  onChange={(e) => handleOptionChange(currentQuestion._id, e.target.value, currentQuestion.type)}
                >
                  {currentQuestion.options.map((option) => (
                    <div className="d-flex mb-1" key={option.text}>
                      <Radio value={option.text}>{option.text}</Radio>
                    </div>
                  ))}
                  <small className="mt-3">Please select one option</small>
                </Radio.Group>
              </Form.Item>
            ) : (
              <Form.Item
                name={`question-${currentQuestion._id}`}
                rules={[{ required: true, message: `Please select up to ${currentQuestion.maxSelectableOptions} options` }]}
              >
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
                  <small className="mt-3">Please select up to {currentQuestion.maxSelectableOptions} options</small>
                </Checkbox.Group>
              </Form.Item>
            )
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


        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        {currentQuestionIndex > 0 && (
          <Button loading={submitLoading} icon={<LeftOutlined />} onClick={goToPreviousQuestion}>
            Previous
          </Button>
        )}
        <Button className="myBtn" icon={<RightOutlined />} onClick={goToNextQuestion} disabled={!isOptionSelected}>
          {currentQuestionIndex === quizData.questions.length - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </Form>
  );
};

export default OneByOneQuestions;
