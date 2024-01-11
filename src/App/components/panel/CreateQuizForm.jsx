import { EditOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { _useQuizCreatations, _useQuizModifications } from "../../../actions/_quiz";

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
}) => {
  return (
    <div className={`${from === "modifications" ? "mt-0" : "container mt-3"}`}>
      <form onSubmit={from === "modifications" ? (e) => handleSubmit(e, quizId) : handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Quiz Title
          </label>
          <Input.TextArea id="title" name="title" value={quizData.title} onChange={handleInputChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Required Fields</label>
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
            <InputNumber min={1} max={100} value={quizData?.maxAttempts} onChange={handleMaxLimit} />
            <br />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="timeLimit" className="form-label">
            Time Limit (minutes)
          </label>
          <Input id="timeLimit" name="timeLimit" type="number" value={quizData.timeLimit} onChange={handleInputChange} />
        </div>

        <Button className="myBtn" icon={<EditOutlined />} loading={loading} htmlType="submit">
          {from === "modifications" ? "Edit" : "Create Quiz"}
        </Button>
      </form>
    </div>
  );
};

export default CreateQuizForm;
