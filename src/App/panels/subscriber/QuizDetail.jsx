import { useRef, useState } from "react";
import { Button, Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { BorderInnerOutlined, DiffOutlined, SnippetsOutlined } from "@ant-design/icons";

import CopyLinkModal from "./CopyLink";
import AddQuestionModal from "./AddQuestionModal";
import Heading from "../../components/common/Heading";
import { _useQuestionTest } from "../../../actions/_questions";
import { _useQuizModifications } from "../../../actions/_quiz";
import CreateQuizForm from "../../components/panel/CreateQuizForm";
import SettingsSidebar from "../../components/common/SettingsSidebar";
import QuestionListEdit from "../../components/panel/QuestionListEdit";
import QuizOptions from "../../components/panel/QuizOptions";
import SubcriberLayout from "../../components/layouts/Layout";
import QuizDetailTour from "../../components/panel-tours/QuizDetailTour";
import BgHeading from "../../components/common/BgHeading";

const QuizDetail = () => {


  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const router = useNavigate()

  const { id } = useParams();
  const { quizData, handleInputChange, handleRequiredFieldChange, handleAddField, handleRemoveField, handleSubmit, loading, deleteQuiz, handleMaxLimit, setQuizData, generateAIInstructions } =
    _useQuizModifications(id);

  const [addQuestionsModal, setAddQuestionsModal] = useState(false);
  const [settingDrawer, setSettingDrawer] = useState(false);
  const [openLinkModal, setOpenLinkModal] = useState(false);
  const [openTour, setOpenTour] = useState(true)


  const {
    questions,
    setQuestions,
    loading: QuestionLoading,
    deleteQuestion,
    questionData,
    setQuestionData,
    handleAddOption,
    handleRemoveOption,
    handleOptionChange,
    handleCorrectChange,
    addQuestion,
    isAdded,
  } = _useQuestionTest(id, 6)



  return (
    <SubcriberLayout from="quiz-detail" id={id}>
      <BgHeading title={loading ? "..." : quizData?.title} desc={"Edit your quiz, Add Update Questions, Copylink, Update Settings"} />
      <div className="mt-4" />

      <QuizOptions ref3={ref3} setSettingDrawer={setSettingDrawer} deleteQuiz={deleteQuiz} setOpenLinkModal={setOpenLinkModal} />

      <div className="row mt-4">
        <div className="col-xs-12 col-md-6 p-1">
          <div className="detailed-card mb-3">
            <div className="d-flex justify-content-start align-items-center gap-2">
              <SnippetsOutlined className="its-icon" />
              <span>Edit Quiz</span>
            </div>
          </div>

          <Card className="mt-2 lightgrey-bg" ref={ref1}>
            <CreateQuizForm
              quizData={quizData}
              loading={loading}
              handleInputChange={handleInputChange}
              handleRequiredFieldChange={handleRequiredFieldChange}
              handleAddField={handleAddField}
              handleRemoveField={handleRemoveField}
              handleSubmit={handleSubmit}
              from="modifications"
              handleMaxLimit={handleMaxLimit}
              quizId={id}
              setQuizData={setQuizData}
              generateAIInstructions={generateAIInstructions}
            />
          </Card>
        </div>


        <div className="col-xs-12 col-md-6 p-1" ref={ref2}>
          <div className="detailed-card mb-3">
            <div className="d-flex justify-content-start align-items-center gap-2">
              <DiffOutlined className="its-icon" />
              <span>Add Questions</span>
            </div>
          </div>

          <Card className="mt-2 light-bg">
            <div className="d-flex gap-2 justify-content-end">
              <Button onClick={() => setAddQuestionsModal(true)}>Add Questions</Button>
              <Button onClick={() => router(`/subscribe/questions/${id}`)}>See All Questions</Button>
            </div>

            <div className="mt-3">
              <QuestionListEdit deleteQuestion={deleteQuestion} loading={QuestionLoading} questions={questions} setQuestions={setQuestions} quizId={id} from={"components"} />
            </div>
          </Card>
        </div>
      </div>

      {/* add question modal */}
      <AddQuestionModal
        loading={isAdded}
        text={questionData.text}
        setQuestionData={setQuestionData}
        questionType={questionData.questionType}
        options={questionData.options}
        correctAnswer={questionData.correctAnswer}
        addQuestion={addQuestion}
        handleAddOption={handleAddOption}
        handleRemoveOption={handleRemoveOption}
        handleOptionChange={handleOptionChange}
        handleCorrectChange={handleCorrectChange}
        open={addQuestionsModal}
        setOpen={setAddQuestionsModal}
        quizId={id}
        setQuestions={setQuestions}

      />
      <CopyLinkModal open={openLinkModal} setOpen={setOpenLinkModal} quizId={id} creatorId={quizData?.creator} />
      <SettingsSidebar open={settingDrawer} onClose={() => setSettingDrawer(false)} from="quizDetail" quizId={id} />
      {/* <QuizDetailTour ref1={ref1} ref2={ref2} ref3={ref3} open={openTour} setOpen={setOpenTour} /> */}
    </SubcriberLayout>
  );
};

export default QuizDetail;
