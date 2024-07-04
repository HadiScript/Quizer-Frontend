import { EditOutlined, FastForwardOutlined, MinusCircleOutlined, PlusOutlined, WarningOutlined, } from "@ant-design/icons";
import { Alert, Button, Input, InputNumber } from "antd";
import Marquee from "react-fast-marquee";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toolbarOptions } from "../../../helper/ToolBarOptions";


const CreateQuizForm = ({
  handleMaxLimit,
  quizData,
  loading,
  handleInputChange,
  handleRequiredFieldChange,
  handleAddField,
  handleRemoveField,
  handleSubmit,
  from = "creation",
  quizId,
  setQuizData,
  generateAIInstructions
}) => {



  return (
    <div className={`${from === "modifications" ? "mt-0" : from === "withAI" ? "" : ""}`}>

      <form onSubmit={from === "modifications" ? (e) => handleSubmit(e, quizId) : handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <b>Quiz Title</b>
          </label>
          <Input
            count={{
              show: true,
              max: 30,
            }}
            id="title" name="title" value={quizData.title} onChange={handleInputChange} required />
        </div>

        {from === 'withAI' && <Alert className="mb-3" type="info" message="We are working on it." description="Please use the most specific quiz name (e:g ReactJs or Qaumtum Physics). In the next level you will describe the level of quiz" />}

        <div className="mb-3">
          <label className="form-label"><b>Required Fields</b></label>
          <br />
          <div className="row ">
            {quizData.requiredFields.map((field, index) => (
              <div className="col-md-4 d-flex gap-2  mb-1" key={index} align="baseline">
                <Input placeholder={field} value={field} disabled={field === "email"} onChange={(e) => handleRequiredFieldChange(e.target.value, index)} />

                {quizData.requiredFields.length > 1 ? (
                  <>
                    <MinusCircleOutlined onClick={() => handleRemoveField(index)} />
                  </>
                ) : null}
              </div>
            ))}
          </div>
          <Button style={{ maxWidth: "180px", marginTop: "10px" }} type="dashed" onClick={handleAddField} block icon={<PlusOutlined />}>
            Add field
          </Button>
        </div>

        {from === "modifications" && (
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Attempt Limit
            </label>
            <br />
            <InputNumber min={0} max={100} value={quizData?.maxAttempts} onChange={handleMaxLimit} />

            <br />
            <br />
            {quizData?.maxAttempts === 0 && (
              <Alert
                showIcon
                icon={<WarningOutlined />}
                type="warning"
                message={<Marquee gradient={false}>User can not attempt the quiz becouse of Attempt Limit, Please make it greater than zero.</Marquee>}
              />
            )}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="timeLimit" className="form-label">
            <b>Time Limit (minutes)</b>
          </label>
          <Input id="timeLimit" name="timeLimit" type="number" value={quizData.timeLimit} onChange={handleInputChange} />
          <small>Time Limit must be greator than zero.</small>
        </div>

        {from !== "withAI" && from === "modifications" && <div className="mb-3">
          <div className="d-flex justify-content-between mb-3 align-items-center">
            <label htmlFor="timeLimit" className="form-label">Quiz Instructions</label>
            <Button className="myBtn" onClick={generateAIInstructions} loading={loading} >Generate with AI</Button>
          </div>
          <ReactQuill
            placeholder="Please type here quiz instruction"
            modules={{ toolbar: toolbarOptions }}
            theme="snow"
            value={quizData.quizInstructions}
            onChange={e => setQuizData(prev => ({ ...prev, quizInstructions: e }))}
          />
        </div>}



        {from !== "withAI" && <Button className="myBtn" icon={<EditOutlined />} loading={loading} htmlType="submit">
          {from === "modifications" ? "Edit" : "Create Quiz"}
        </Button>}
      </form>
    </div>
  );
};

export default CreateQuizForm;
