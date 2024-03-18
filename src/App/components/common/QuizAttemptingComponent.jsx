import { useEffect, useState } from "react";
import { Button, Divider, Input, Radio, Tag, Watermark } from "antd";
import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../../assets/css/rich.css";

const QuizAttemptingComponent = ({ quizData, handleSubmit, responses, setResponses, submitLoading }) => {
  const router = useNavigate();
  const [visibleAnswers, setVisibleAnswers] = useState({});

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
      {/* <Watermark
        height={30}
        width={130}
        content="Cycarts | Quizer"
      // image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original"
      > */}
      {quizData?.questions?.map((question, index) => (
        <div key={index}>
          <div className="d-flex justify-content-start align-items-start gap-1">
            <b style={{ width: "10%" }}>Q {index + 1}:</b>
            <div style={{ width: "90%" }}>
              {/* <p>{question.text}</p> */}
              <div className="mb-3"> <ReactQuill style={{ width: "100%" }} modules={{ toolbar: null }} readOnly theme="snow" value={question.text} /></div>

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
      <Button loading={submitLoading} className="myBtn" onClick={handleSubmit}>
        Finish
      </Button>

      {/* </Watermark > */}
    </>
  );
};

export default QuizAttemptingComponent;
