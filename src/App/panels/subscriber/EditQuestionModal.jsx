import { Button, Form, Input, Modal, Radio, Checkbox, InputNumber } from "antd";
import Heading from "../../components/common/Heading";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
    isEdit,
    handleBlankChange,
    handleAddBlank,
    handleRemoveBlank,
    handleRangeChange,
    handleDateChange,
  } = _useQuestionTest();

  const { options, correctAnswer, questionType, text, blanks, dateAnswer, rangeAnswer } = questionData;

  const { data, isLoading } = useQuery(
    ["singleQuestion", id],
    () =>
      axios.get(`${questionApi}/one/${id}`, { withCredentials: true }).then((res) => res.data.question),
    {
      enabled: !!id && open,
      onError: (error) => Errs(error),
    }
  );

  useEffect(() => {
    if (data) {
      setQuestionData({ ...data, questionType: data.type });
    }
  }, [data]);

  const closeModel = () => {
    handleCloseModel();
    setQuestionData(addQuestionInitValues);
  };


  return (
    <Modal
      title={<Heading title={"Edit Question"} />}
      footer={null}
      centered
      open={open}
      onOk={closeModel}
      onCancel={closeModel}
      width={1800}// Adjusted for better fit
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
                  style={{ minHeight: "150px" }}
                />
              </Form.Item>

              <Checkbox
                className="mx-2"
                checked={questionData?.disable}
                onChange={(e) => setQuestionData((prev) => ({ ...prev, disable: e.target.checked }))}
              >
                Disable Question
              </Checkbox>

              {questionType === "multiple-choice" && (
                <Button className="my-3" onClick={handleAddOption}>
                  Add Option
                </Button>
              )}
            </div>



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
                      <Button type="danger" onClick={() => handleRemoveOption(index)}>
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
                <Form.Item label="Answer" className="my-3">
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
                <div className="mb-3 d-flex align-items-center">
                  <Radio.Group
                    value={options.find((option) => option.isCorrect)?.text} // Current correct answer
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
            )}

            {questionType === "range" && (
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
        <Button className="myBtn" loading={isEdit} onClick={() => editQuestion(id)}>
          Edit Question
        </Button>
      </div>
    </Modal>
  );
};

export default EditQuestionModal;
