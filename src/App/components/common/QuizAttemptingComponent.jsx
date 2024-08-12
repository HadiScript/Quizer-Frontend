import { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Divider, Input, Radio, Slider, Tag, Watermark } from "antd";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuizAttemptingComponent = ({ quizData, handleSubmit, responses, setResponses, submitLoading }) => {

  const [visibleAnswers, setVisibleAnswers] = useState({});


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



  const toggleAnswerVisibility = (questionId) => {
    setVisibleAnswers((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  };

  return (
    <>
      {/* {JSON.stringify(quizData)} */}
      {quizData?.questions?.map((question, index) => (
        <div key={index}>
          <div className="d-flex justify-content-start align-items-start gap-1">
            <b style={{ width: "10%" }}>Q {index + 1}:</b>
            <div style={{ width: "90%" }}>
              <div className="mb-3">
                <p dangerouslySetInnerHTML={{ __html: question.text }} />
              </div>

              {question.type === "multiple-choice" && (
                <Checkbox.Group
                  className="d-flex flex-column"
                  value={responses.find((r) => r.question === question._id)?.selectedOption || []}
                  onChange={(value) => handleOptionChange(question._id, value, question.type, question.maxSelectableOptions)}
                >
                  {question.options.map((option) => (
                    <div className="d-flex mb-1" key={option.text}>
                      <Checkbox value={option.text}>{option.text}</Checkbox>
                    </div>
                  ))}
                  <small className="mt-3">Please select {question.maxSelectableOptions} option</small>
                </Checkbox.Group>
              )}


              {question.type === "true-false" && (
                <Radio.Group
                  onChange={(e) =>
                    handleOptionChange(question._id, e.target.value, question.type)
                  }
                >
                  {question.options.map((option) => (
                    <div className="d-flex mb-1" key={option.text}>
                      <Radio value={option.text}>{option.text}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              )}

              {question.type === "short-answer" && (
                <Input.TextArea
                  onChange={(e) =>
                    handleOptionChange(question._id, e.target.value, question.type)
                  }
                />
              )}

              {question.type === "fill-in-the-blank" && (
                question.blanks.map((blank, idx) => (
                  <Input
                  className="my-1"
                    key={idx}
                    placeholder={`Blank ${idx + 1}`}
                    onChange={(e) =>
                      handleOptionChange(question._id, e.target.value, question.type, idx)
                    }
                  />
                ))
              )}

              {question.type === "date" && (
                <DatePicker
                  onChange={(date) =>
                    handleOptionChange(
                      question._id,
                      date ? date.toISOString() : "",
                      question.type
                    )
                  }
                />
              )}

              {question.type === "range" && (
                <Slider
                  range
                  defaultValue={[question.rangeAnswer.min, question.rangeAnswer.max]}
                  onChange={(value) =>
                    handleOptionChange(question._id, value, question.type)
                  }
                />
              )}
            </div>
          </div>
          <div>
            {quizData.mode === "practice" && (
              <div className="d-flex justify-content-start gap-3 mt-5">
                <Tag
                  size="small"
                  role="button"
                  onClick={() => toggleAnswerVisibility(question._id)}
                >
                  {visibleAnswers[question._id] ? "Hide Answer" : "Show Answer"}
                </Tag>
                <div className="">
                  {visibleAnswers[question._id] && (
                    <small>
                      <b>Answer:</b>{" "}
                      {question.options.find((option) => option.isCorrect)?.text}
                    </small>
                  )}
                </div>
              </div>
            )}
          </div>
          <Divider />
        </div>
      ))}

      <Button loading={submitLoading} className="myBtn" onClick={handleSubmit}>
        Finish
      </Button>
    </>
  );
};

export default QuizAttemptingComponent;





// const handleOptionChange = (questionId, value, isShortAnswer = false) => {
//   const updatedResponses = responses.map((response) => {
//     if (response.questionId === questionId) {
//       return {
//         ...response,
//         question: questionId,
//         selectedOption: isShortAnswer ? "" : value,
//         answer: isShortAnswer ? value : "",
//       };
//     }
//     return response;
//   });
//   setResponses(updatedResponses);
// };



{/* {quizData?.questions?.map((question, index) => (
        <div key={index}>
          <div className="d-flex justify-content-start align-items-start gap-1">
            <b style={{ width: "10%" }}>Q {index + 1}:</b>
            <div style={{ width: "90%" }}>
              <div className="mb-3" >
                <p dangerouslySetInnerHTML={{ __html: question.text }} />
              </div>

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
      ))} */}