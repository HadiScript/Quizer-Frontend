import { useRef, useState } from "react";
import { Button, Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { DiffOutlined, SnippetsOutlined } from "@ant-design/icons";

import CopyLinkModal from "./CopyLink";
import AddQuestionModal from "./AddQuestionModal";
import { _useQuestionTest } from "../../../actions/_questions";
import { _useQuizModifications } from "../../../actions/_quiz";
import CreateQuizForm from "../../components/panel/CreateQuizForm";
import SettingsSidebar from "../../components/common/SettingsSidebar";
import QuestionListEdit from "../../components/panel/QuestionListEdit";
import QuizOptions from "../../components/panel/QuizOptions";
import SubcriberLayout from "../../components/layouts/Layout";
import BgHeading from "../../components/common/BgHeading";
import axios from "axios";
import { surveyApi } from "../../../helper/API";

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
    searchTerm,
    setSearchTerm,


    handleBlankChange,
    handleAddBlank,
    handleRemoveBlank,
    handleRangeChange,
    handleDateChange,
    handleSelectionLimitChange

  } = _useQuestionTest(id, 6);

  const {
    options,
    correctAnswer,
    questionType,
    text,
    blanks,
    dateAnswer,
    rangeAnswer,
  } = questionData



  return (
    <SubcriberLayout from="quiz-detail" id={id} >
      <BgHeading title={loading ? "..." : quizData?.title} desc={"Add questions and configure quiz settings. Copy the link to share your quiz."} />
      <div className="mt-4 px-2" >

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
              {loading && "please wait.."}
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
          text={text}
          questionData={questionData}
          setQuestionData={setQuestionData}
          questionType={questionType}
          options={options}
          correctAnswer={correctAnswer}
          addQuestion={addQuestion}
          handleAddOption={handleAddOption}
          handleRemoveOption={handleRemoveOption}
          handleOptionChange={handleOptionChange}
          handleCorrectChange={handleCorrectChange}
          open={addQuestionsModal}
          setOpen={setAddQuestionsModal}
          quizId={id}
          setQuestions={setQuestions}
          blanks={blanks}
          dateAnswer={dateAnswer}
          rangeAnswer={rangeAnswer}
          handleBlankChange={handleBlankChange}
          handleAddBlank={handleAddBlank}
          handleRemoveBlank={handleRemoveBlank}
          handleRangeChange={handleRangeChange}
          handleDateChange={handleDateChange}
          handleSelectionLimitChange={handleSelectionLimitChange}
        />


        <CopyLinkModal open={openLinkModal} setOpen={setOpenLinkModal} quizId={id} creatorId={quizData?.creator} />
        <SettingsSidebar open={settingDrawer} onClose={() => setSettingDrawer(false)} from="quizDetail" quizId={id} />
        {/* <QuizDetailTour ref1={ref1} ref2={ref2} ref3={ref3} open={openTour} setOpen={setOpenTour} /> */}
      </div>
    </SubcriberLayout>
  );
};

export default QuizDetail;
