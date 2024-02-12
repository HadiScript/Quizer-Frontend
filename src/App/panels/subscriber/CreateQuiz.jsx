import CreateQuizForm from "../../components/panel/CreateQuizForm";
import { DiffOutlined } from "@ant-design/icons";
import Heading from "../../components/common/Heading";
import { _useQuizCreatations } from "../../../actions/_quiz";
import SubcriberLayout from "../../components/layouts/Layout";
import { Alert } from "antd";

const CreateQuiz = () => {
  const { quizData, loading, handleInputChange, handleRequiredFieldChange, handleAddField, handleRemoveField, handleSubmit } = _useQuizCreatations();

  return (
    <SubcriberLayout>
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

      <Alert
        className="mt-5"
        message="After creating quiz."
        description="After creating quiz successfully, you have to add questions and max attempts limits (by default Attempt limit will be Zero). "
        type="info"
        showIcon
      />
    </SubcriberLayout>
  );
};

export default CreateQuiz;
