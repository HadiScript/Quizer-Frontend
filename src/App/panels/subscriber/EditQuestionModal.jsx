import { Button, Form, Input, Modal, Radio } from "antd";
import Heading from "../../components/common/Heading";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../../assets/css/rich.css";
import { _useQuestionTest, addQuestionInitValues } from "../../../actions/_questions";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Errs } from "../../../helper/Errs";
import { questionApi } from "../../../helper/API";
import axios from "axios";

var toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ list: "ordered" }, { list: "bullet" }],

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const EditQuestionModal = ({ id, open, handleCloseModel }) => {
  const {

    questionData,
    setQuestionData,
    handleAddOption,
    handleRemoveOption,
    handleOptionChange,
    handleCorrectChange,
    editQuestion,
    isEdit
  } = _useQuestionTest()
  const { options, correctAnswer, questionType, text, } = questionData




  const { data, isLoading } = useQuery(
    ["singleQuestion", id,],
    () =>
      axios
        .get(`${questionApi}/one/${id}`, { withCredentials: true, })
        .then((res) => res.data.question),
    {
      // staleTime: Infinity,
      enabled: !!id && open,
      onError: (error) => Errs(error),
    }
  );

  useEffect(() => {
    if (data) {
      setQuestionData({ ...data, questionType: data.type })

    }
  }, [data]);



  const closeModel = () => {
    handleCloseModel();
    setQuestionData(addQuestionInitValues)
  }



  return (
    <Modal title={<Heading title={"Edit Question"} />} footer={null} centered open={open} onOk={closeModel} onCancel={closeModel} width={2000}>
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
                  // onChange={setText}
                  onChange={(e) => setQuestionData((prev) => ({ ...prev, text: e }))}
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
        <Button className="myBtn" loading={isEdit} onClick={() => editQuestion(id)}>
          Edit Question
        </Button>
      </div>
    </Modal>
  );
};

export default EditQuestionModal;
