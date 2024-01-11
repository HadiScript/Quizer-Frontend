import React from "react";
import CreateQuizForm from "../../components/panel/CreateQuizForm";
import { DiffOutlined } from "@ant-design/icons";
import Heading from "../../components/common/Heading";
import { _useQuizCreatations } from "../../../actions/_quiz";

const CreateQuiz = () => {
  const { quizData, loading, handleInputChange, handleRequiredFieldChange, handleAddField, handleRemoveField, handleSubmit } = _useQuizCreatations();

  return (
    <>
      <Heading title={"Create Quiz"} Icon={<DiffOutlined className="its-icon" />} />

      <CreateQuizForm
        quizData={quizData}
        loading={loading}
        handleInputChange={handleInputChange}
        handleRequiredFieldChange={handleRequiredFieldChange}
        handleAddField={handleAddField}
        handleRemoveField={handleRemoveField}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default CreateQuiz;
