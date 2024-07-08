import { Button, Form, Input, Modal, Radio } from "antd";
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
  setQuestionData,
  questionType,
  options,
  correctAnswer,
  loading,

  // functions
  addQuestion,
  handleAddOption,
  handleRemoveOption,
  handleOptionChange,
  handleCorrectChange,
}) => {
  return (
    <Modal
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
                {/* <Input.TextArea placeholder="Enter Question Title" value={text} onChange={(e) => setQuestionData((prev) => ({ ...prev, text: e.target.value }))} /> */}
              </Form.Item>
              <Form.Item label="Question Type">
                <Radio.Group value={questionType} onChange={(e) => setQuestionData((prev) => ({ ...prev, questionType: e.target.value }))}>
                  <Radio value="multiple-choice">Multiple Choice</Radio>
                  {/* remove for temp */}
                  {/* <Radio value="short-answer">Short Answer</Radio> */}
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
          // setOpen(false)
        }}>
          Add Question
        </Button>
      </div>
    </Modal>
  );
};

export default AddQuestionModal;
