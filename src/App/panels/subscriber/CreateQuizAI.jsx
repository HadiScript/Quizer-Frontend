import { useState } from "react"
import SubcriberLayout from "../../components/layouts/Layout"
import StepCreateAI from "../../components/panel/StepCreateAI"
import CreateQuizForm from "../../components/panel/CreateQuizForm"
import { _useQuizCreatations } from "../../../actions/_quiz"
import QuestionInfoAI from "../../components/panel/QuestionInfoAI"
import { Button } from "antd"
import { CheckCircleOutlined, StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import UpdateToPremium from "../../components/common/UpdateToPremium"

const CreateQuizAI = () => {
  const router = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)

  const {
    quizData,
    loading, handleInputChange,
    handleRequiredFieldChange,
    handleAddField,
    handleRemoveField,
    handleSubmit,
    setQuizData,
    questionsDataAi,
    setQuestionsDataAi
  } = _useQuizCreatations();

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(e, 'withAI')
  }

  return (
    <SubcriberLayout from="create-quiz-ai">

      <div className="d-flex justify-content-center ">
        <div className="create-quiz-ai ">
          <StepCreateAI current={currentStep} />


          <div className="premium_settings_container">
            {currentStep === 1 && <>
              <CreateQuizForm
                quizData={quizData}
                loading={loading}
                handleInputChange={handleInputChange}
                handleRequiredFieldChange={handleRequiredFieldChange}
                handleAddField={handleAddField}
                handleRemoveField={handleRemoveField}
                handleSubmit={submit}
                setQuizData={setQuizData}
                from={"withAI"}
              />
            </>}

            {currentStep === 2 &&
              <QuestionInfoAI
                questionsDataAi={questionsDataAi}
                setQuestionsDataAi={setQuestionsDataAi}
              />
            }
          </div>


          <div className="d-flex justify-content-between align-items-center">
            {currentStep === 1 && <Button className="myBtn" icon={<StepBackwardOutlined />} onClick={() => router('/subscribe/quizes')} >Exit</Button>}
            {currentStep > 1 && <Button className="myBtn" icon={<StepBackwardOutlined />} onClick={() => setCurrentStep(currentStep - 1)}>Previous</Button>}
            {currentStep === 1 && <Button className="myBtn" icon={<StepForwardOutlined />} onClick={() => { setCurrentStep(2) }}>Next</Button>}
            {currentStep === 2 && <Button className="myBtn" icon={<CheckCircleOutlined />} onClick={submit}>Create</Button>}
          </div>



        </div>
        <UpdateToPremium />
      </div>
    </SubcriberLayout>
  )
}

export default CreateQuizAI