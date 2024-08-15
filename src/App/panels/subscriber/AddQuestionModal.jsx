import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Modal, Radio, Slider } from "antd";
// import Heading from "../../components/common/Heading";
import Heading from '../../components/common/Heading'

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toolbarOptions } from "../../../helper/ToolBarOptions";

const labelOptions = {
  0: "A:",
  1: "B:",
  2: "C:",
  3: "D:",
  4: "E:",
}



const AddQuestionModal = ({
  open,
  setOpen,
  quizId,
  text,
  questionData,
  setQuestionData,
  questionType,
  options,
  correctAnswer,
  blanks,
  dateAnswer,
  rangeAnswer,
  loading,
  addQuestion,
  handleAddOption,
  handleRemoveOption,
  handleOptionChange,
  handleCorrectChange,
  handleBlankChange,
  handleAddBlank,
  handleRemoveBlank,
  handleRangeChange,
  handleDateChange,
}) => {
  return (
    <>
      <Modal
        title="Add Question"
        footer={null}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={1800}

      >
        <div className="container">
          <Form layout="vertical">
            <div className="row">


              <div className="col-xs-12 col-md-6">


                <Form.Item label="Question">
                  <ReactQuill
                    placeholder="Type your question here"
                    modules={{ toolbar: toolbarOptions }}
                    theme="snow"
                    value={text}
                    onChange={(value) => setQuestionData((prev) => ({ ...prev, text: value }))}
                  // style={{ minHeight: "80px" }}
                  />
                </Form.Item>


                <Form.Item label="Question Type">
                  <Radio.Group
                    value={questionType}
                    onChange={(e) => setQuestionData((prev) => ({
                      ...prev,
                      questionType: e.target.value,
                      options: e.target.value === 'true-false' ? [
                        { text: "True", isCorrect: false },
                        { text: "False", isCorrect: false },
                      ] : [
                        { text: "", isCorrect: false },
                        { text: "", isCorrect: false },
                        { text: "", isCorrect: false },
                        { text: "", isCorrect: false },
                      ]
                    }))}
                  >
                    <Radio value="multiple-choice">Multiple Choice</Radio>
                    <Radio value="short-answer">Short Answer</Radio>
                    <Radio value="fill-in-the-blank">Fill in the Blank</Radio>
                    <Radio value="true-false">True/False</Radio>
                    {/* <Radio value="date">Date</Radio>
                    <Radio value="range">Range</Radio> */}
                  </Radio.Group>
                </Form.Item>

              </div>


              {/* {questionType === "multiple-choice" && (
            <div>
              {options.map((option, index) => (
                <Form.Item key={index} label={`Option ${index + 1}`}>
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option.text}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    style={{ marginRight: "10px" }}
                  />
                  <Checkbox
                    checked={option.isCorrect}
                    onChange={() => handleCorrectChange(index)}
                    style={{ marginRight: "10px" }}
                  >
                    Correct
                  </Checkbox>
                  {options.length > 2 && (
                    <Button type="danger" onClick={() => handleRemoveOption(index)}>
                      Remove
                    </Button>
                  )}
                </Form.Item>
              ))}
              <div className="text-end">
                <Button type="dashed" className="my-3" onClick={handleAddOption}>
                  Add Option
                </Button>
              </div>
            </div>
          )} */}

              {questionType === "multiple-choice" && (
                <div className="col-xs-12 col-md-6">
                  {options.map((option, index) => (
                    <Form.Item key={index} label={`Option ${index + 1}`}>
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option.text}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        style={{ marginRight: "10px" }}
                      />
                      <Checkbox
                        checked={option.isCorrect}
                        onChange={() => handleCorrectChange(index)}
                        style={{ marginRight: "10px" }}
                      >
                        Correct
                      </Checkbox>
                      {options.length > 2 && (
                        <Button type="link" className="text-danger mt-2" onClick={() => handleRemoveOption(index)}>
                          Remove
                        </Button>
                      )}
                    </Form.Item>
                  ))}
                  <Form.Item label="Max Selectable Options">
                    <InputNumber
                      min={1}
                      max={options.length}
                      value={questionData.maxSelectableOptions}
                      onChange={(value) => setQuestionData((prev) => ({ ...prev, maxSelectableOptions: value }))}
                    />
                  </Form.Item>
                  <div className="text-end">
                    <Button type="dashed" className="my-3" onClick={handleAddOption}>
                      Add Option
                    </Button>
                  </div>
                </div>
              )}

              {questionType === "short-answer" && (
                <div className="col-xs-12 col-md-6">
                  <Form.Item label="Answer">
                    <Input
                      placeholder="Enter Answer"
                      value={correctAnswer}
                      onChange={(e) => setQuestionData((prev) => ({ ...prev, correctAnswer: e.target.value }))}
                    />
                  </Form.Item>
                </div>
              )}

              {questionType === "fill-in-the-blank" && (
                <div className="col-xs-12 col-md-6">
                  {blanks.map((blank, index) => (
                    <Form.Item key={index} label={`Blank ${index + 1}`}>
                      <Input
                        placeholder={`Enter answer for blank ${index + 1}`}
                        value={blank.correctAnswer}
                        onChange={(e) => handleBlankChange(index, e.target.value)}
                        style={{ marginRight: "10px" }}
                      />
                      <Button type="danger" onClick={() => handleRemoveBlank(index)}>
                        Remove
                      </Button>
                    </Form.Item>
                  ))}
                  <div className="text-end">
                    <Button onClick={handleAddBlank}>Add Blank</Button>
                  </div>
                </div>
              )}



              {questionType === "true-false" && (
                <div className="col-xs-12 col-md-6">
                  <div className="mb-3 d-flex align-items-center p-3">
                    <Radio.Group
                      value={options.find((option) => option.isCorrect)?.text} // Get the current correct answer
                      onChange={(e) => {
                        const correctValue = e.target.value;
                        setQuestionData((prev) => ({
                          ...prev,
                          options: prev.options.map((option) =>
                            option.text === correctValue
                              ? { ...option, isCorrect: true }
                              : { ...option, isCorrect: false }
                          ),
                        }));
                      }}
                    >
                      {options.map((option, index) => (
                        <Radio key={index} value={option.text}>
                          {option.text}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </div>
                </div>
              )}


              {/* {questionType === "date" && (
                <div className="col-xs-12 col-md-6">
                  <Form.Item label="Select Date">
                    <DatePicker
                      value={dateAnswer ? moment(dateAnswer) : null}
                      onChange={(date) => handleDateChange(date)}
                    />
                  </Form.Item>
                </div>
              )} */}

              {/* {questionType === "range" && (
                <div className="col-xs-12 col-md-6">
                  <Form.Item label="Select Range">
                    <Slider
                      range
                      min={0}
                      max={100}
                      value={[rangeAnswer.min, rangeAnswer.max]}
                      onChange={(values) => handleRangeChange(values[0], values[1])}
                    />
                  </Form.Item>
                </div>
              )} */}

            </div>
          </Form>
        </div>

        <div className="text-end">
          <Button
            className="myBtn"
            loading={loading}
            onClick={() => addQuestion(quizId)}
          >
            Add Question
          </Button>
        </div>
      </Modal >
    </>
  );
};

export default AddQuestionModal;



{/* <Modal
title={<Heading title={"Add Question"} />}
footer={null}
centered
open={open}
onOk={() => setOpen(false)}
onCancel={() => setOpen(false)}
width={2000}
>
<div className="container">
  <Form>
    <div className="row">
      <div className="col-xs-12 col-md-6">
        <Form.Item label="Question">
          <ReactQuill
            placeholder="Type your question here"
            modules={{ toolbar: toolbarOptions }}
            theme="snow"
            value={text}
            onChange={
              (e) => setQuestionData((prev) => ({ ...prev, text: e }))
            }
            style={{ minHeight: "300px" }}
          />
        </Form.Item>
        <Form.Item label="Question Type">
          <Radio.Group value={questionType} onChange={(e) => setQuestionData((prev) => ({ ...prev, questionType: e.target.value }))}>
            <Radio value="multiple-choice">Multiple Choice</Radio>

          <Radio value="short-answer">Short Answer</Radio>
          </Radio.Group>
        </Form.Item>

        {questionType === "multiple-choice" && (
          <Button className="my-3" onClick={handleAddOption}>
            Add Option
          </Button>
        )}
        {questionType === "short-answer" && (
          <Form.Item label="Answer" className="my-3">
            <Input placeholder="Enter Answer" value={correctAnswer} onChange={(e) => setQuestionData((prev) => ({ ...prev, correctAnswer: e.target.value }))} />
          </Form.Item>
        )}
      </div>

      {questionType === "multiple-choice" && (
        <div className="col-xs-12 col-md-6">
          {options.map((option, index) => (
            <div key={index} className="mb-3 d-flex align-items-center">
              <div className="px-3">{labelOptions[index]}</div>
              <Input placeholder={`Option ${index + 1}`} value={option.text} onChange={(e) => handleOptionChange(index, e.target.value)} style={{ marginRight: "10px" }} />
              <input type="checkbox" checked={option.isCorrect} onChange={() => handleCorrectChange(index)} style={{ marginRight: "10px" }} />
              Correct
              {options.length > 2 && (
                <Button type="danger" onClick={() => handleRemoveOption(index)}>
                  Remove
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </Form>
</div>

<div className="text-end">
  <Button className="myBtn" loading={loading} onClick={() => {
    addQuestion(quizId);
  }}>
    Add Question
  </Button>
</div>
</Modal> */}