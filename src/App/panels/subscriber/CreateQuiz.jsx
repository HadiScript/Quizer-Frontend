import CreateQuizForm from "../../components/panel/CreateQuizForm";
import { DiffOutlined } from "@ant-design/icons";
import Heading from "../../components/common/Heading";
import { _useQuizCreatations } from "../../../actions/_quiz";
import SubcriberLayout from "../../components/layouts/Layout";
import { Alert, Card, } from "antd";
import BgHeading from "../../components/common/BgHeading";

const CreateQuiz = () => {
  const { quizData, loading, handleInputChange, handleRequiredFieldChange, handleAddField, handleRemoveField, handleSubmit, setQuizData } = _useQuizCreatations();

  return (
    <SubcriberLayout>
      <BgHeading title={"Create Quiz"} desc={"Create a quiz as per requirements by following a few easy steps."} Icon={<DiffOutlined className="its-icon" />} AlertDesc={"After creating the quiz, please make sure to set the minimum number of reattempts allowed. The default setting of reattempt is zero. You can also use AI quiz instructions."} />
      {/* <Alert
        className="mt-5"
        message="After creating quiz."
        description="After creating quiz successfully, you have to add questions and max attempts limits (by default Attempt limit will be Zero). And you can write or create with AI quiz's insturctions. "
        type="info"
        showIcon
      /> */}

      <Card className="mt-4">
        <CreateQuizForm
          quizData={quizData}
          loading={loading}
          handleInputChange={handleInputChange}
          handleRequiredFieldChange={handleRequiredFieldChange}
          handleAddField={handleAddField}
          handleRemoveField={handleRemoveField}
          handleSubmit={handleSubmit}
          setQuizData={setQuizData}
        />
      </Card>



    </SubcriberLayout>
  );
};

export default CreateQuiz;
