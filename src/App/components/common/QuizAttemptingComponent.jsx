import { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Divider, Form, Input, Radio, Slider, Tag, Watermark } from "antd";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuizAttemptingComponent = ({ quizData, handleSubmit, responses, setResponses, submitLoading }) => {

  const [visibleAnswers, setVisibleAnswers] = useState({});




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
              selectedOption: "", // Short answers use the `answer` field
              answer: value,
            };

          case "fill-in-the-blank":
            const updatedBlanks = response.selectedOption || [];
            updatedBlanks[maxSelectableOptions] = value; // Update specific blank
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
      <Form layout="vertical" onFinish={handleSubmit}>
        {quizData?.questions?.map((question, index) => (
          <div key={index}>
            <div className="d-flex justify-content-start align-items-start gap-1">
              <b style={{ width: "10%" }}>Q {index + 1}:</b>
              <div style={{ width: "90%" }}>
                <div className="mb-3">
                  <p dangerouslySetInnerHTML={{ __html: question.text }} />
                </div>

                {question.type === "multiple-choice" && (
                  question.maxSelectableOptions === 1 ? (
                    <Form.Item
                      name={`question-${question._id}`}
                      rules={[{ required: true, message: 'Please select an option' }]}
                    >
                      <Radio.Group
                        className="d-flex flex-column"
                        value={responses.find((r) => r.question === question._id)?.selectedOption || ''}
                        onChange={(e) => handleOptionChange(question._id, e.target.value, question.type)}
                      >
                        {question.options.map((option) => (
                          <div className="d-flex mb-1" key={option.text}>
                            <Radio value={option.text}>{option.text}</Radio>
                          </div>
                        ))}
                        <small className="mt-3">Please select one option</small>
                      </Radio.Group>
                    </Form.Item>
                  ) : (
                    <Form.Item
                      name={`question-${question._id}`}
                      rules={[{ required: true, message: `Please select up to ${question.maxSelectableOptions} options` }]}
                    >
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
                        <small className="mt-3">Please select up to {question.maxSelectableOptions} options</small>
                      </Checkbox.Group>
                    </Form.Item>
                  )
                )}


                {question.type === "true-false" && (
                  <Form.Item
                    name={`question-${question._id}`}
                    rules={[{ required: true, message: 'Please select an option' }]}
                  >
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
                  </Form.Item>
                )}

                {question.type === "short-answer" && (
                  <Form.Item
                    name={`question-${question._id}`}
                    rules={[{ required: true, message: 'Please provide an answer' }]}
                  >
                    <Input.TextArea
                      onChange={(e) =>
                        handleOptionChange(question._id, e.target.value, question.type)
                      }
                    />

                  </Form.Item>
                )}

                {question.type === "fill-in-the-blank" && (
                  question.blanks.map((blank, idx) => (
                    <Form.Item
                      name={`question-${question._id}-blank-${idx}`}
                      rules={[{ required: true, message: `Please fill in blank ${idx + 1}` }]}
                      key={idx}
                    >
                      <Input
                        className="my-1"
                        key={idx}
                        placeholder={`Blank ${idx + 1}`}
                        onChange={(e) =>
                          handleOptionChange(question._id, e.target.value, question.type, idx)
                        }
                      />
                    </Form.Item>
                  ))
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
        <Button loading={submitLoading} className="myBtn" htmlType="submit">
          Finish
        </Button>
      </Form>

    </>
  );
};

export default QuizAttemptingComponent;

// {quizData?.questions?.map((question, index) => (
//   <div key={index}>
//     <div className="d-flex justify-content-start align-items-start gap-1">
//       <b style={{ width: "10%" }}>Q {index + 1}:</b>
//       <div style={{ width: "90%" }}>
//         <div className="mb-3">
//           <p dangerouslySetInnerHTML={{ __html: question.text }} />
//         </div>

//         {question.type === "multiple-choice" && (
//           question.maxSelectableOptions === 1 ? (
//             <Radio.Group
//               className="d-flex flex-column"
//               value={responses.find((r) => r.question === question._id)?.selectedOption || ''}
//               onChange={(e) => handleOptionChange(question._id, e.target.value, question.type)}
//             >
//               {question.options.map((option) => (
//                 <div className="d-flex mb-1" key={option.text}>
//                   <Radio value={option.text}>{option.text}</Radio>
//                 </div>
//               ))}
//               <small className="mt-3">Please select one option</small>
//             </Radio.Group>
//           ) : (
//             <Checkbox.Group
//               className="d-flex flex-column"
//               value={responses.find((r) => r.question === question._id)?.selectedOption || []}
//               onChange={(value) => handleOptionChange(question._id, value, question.type, question.maxSelectableOptions)}
//             >
//               {question.options.map((option) => (
//                 <div className="d-flex mb-1" key={option.text}>
//                   <Checkbox value={option.text}>{option.text}</Checkbox>
//                 </div>
//               ))}
//               <small className="mt-3">Please select up to {question.maxSelectableOptions} options</small>
//             </Checkbox.Group>
//           )
//         )}


//         {question.type === "true-false" && (
//           <Radio.Group
//             onChange={(e) =>
//               handleOptionChange(question._id, e.target.value, question.type)
//             }
//           >
//             {question.options.map((option) => (
//               <div className="d-flex mb-1" key={option.text}>
//                 <Radio value={option.text}>{option.text}</Radio>
//               </div>
//             ))}
//           </Radio.Group>
//         )}

//         {question.type === "short-answer" && (
//           <Input.TextArea
//             onChange={(e) =>
//               handleOptionChange(question._id, e.target.value, question.type)
//             }
//           />
//         )}

//         {question.type === "fill-in-the-blank" && (
//           question.blanks.map((blank, idx) => (
//             <Input
//               className="my-1"
//               key={idx}
//               placeholder={`Blank ${idx + 1}`}
//               onChange={(e) =>
//                 handleOptionChange(question._id, e.target.value, question.type, idx)
//               }
//             />
//           ))
//         )}

//         {question.type === "date" && (
//           <DatePicker
//             onChange={(date) =>
//               handleOptionChange(
//                 question._id,
//                 date ? date.toISOString() : "",
//                 question.type
//               )
//             }
//           />
//         )}

//         {question.type === "range" && (
//           <Slider
//             range
//             defaultValue={[question.rangeAnswer.min, question.rangeAnswer.max]}
//             onChange={(value) =>
//               handleOptionChange(question._id, value, question.type)
//             }
//           />
//         )}
//       </div>
//     </div>
//     <div>
//       {quizData.mode === "practice" && (
//         <div className="d-flex justify-content-start gap-3 mt-5">
//           <Tag
//             size="small"
//             role="button"
//             onClick={() => toggleAnswerVisibility(question._id)}
//           >
//             {visibleAnswers[question._id] ? "Hide Answer" : "Show Answer"}
//           </Tag>
//           <div className="">
//             {visibleAnswers[question._id] && (
//               <small>
//                 <b>Answer:</b>{" "}
//                 {question.options.find((option) => option.isCorrect)?.text}
//               </small>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//     <Divider />
//   </div>
// ))}



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