import React, { useState } from "react";
import { Button, Card } from "antd";
import { useParams } from "react-router-dom";
import { BorderInnerOutlined, CopyOutlined, DeleteOutlined, DiffOutlined, SettingOutlined, SnippetsOutlined } from "@ant-design/icons";

import CopyLinkModal from "./CopyLink";
import AddQuestionModal from "./AddQuestionModal";
import Heading from "../../components/common/Heading";
import { _useQuestions } from "../../../actions/_questions";
import { _useQuizModifications } from "../../../actions/_quiz";
import CreateQuizForm from "../../components/panel/CreateQuizForm";
import SettingsSidebar from "../../components/common/SettingsSidebar";
import QuestionListEdit from "../../components/panel/QuestionListEdit";
import QuizOptions from "../../components/panel/QuizOptions";

const QuizDetail = () => {
  const { id } = useParams();
  const { quizData, handleInputChange, handleRequiredFieldChange, handleAddField, handleRemoveField, handleSubmit, loading, deleteQuiz, handleMaxLimit } =
    _useQuizModifications(id);

  const [addQuestionsModal, setAddQuestionsModal] = useState(false);
  const [settingDrawer, setSettingDrawer] = useState(false);
  const [openLinkModal, setOpenLinkModal] = useState(false);

  const { questions, setQuestions } = _useQuestions(id);

  return (
    <>
  
      <Heading title={quizData?.title} Icon={<BorderInnerOutlined className="its-icon" />} />
      <QuizOptions setSettingDrawer={setSettingDrawer} deleteQuiz={deleteQuiz} setOpenLinkModal={setOpenLinkModal} />

      <div className="row mt-4">
        <div className="col-xs-12 col-md-6 p-1">
          <Card className="detailed-card">
            <div className="d-flex justify-content-start align-items-center gap-2">
              <SnippetsOutlined className="its-icon" />
              <span>Edit Quiz</span>
            </div>
          </Card>

          <Card className="mt-5 lightgrey-bg">
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
            />
          </Card>
        </div>
        <div className="col-xs-12 col-md-6 p-1">
          <Card className="detailed-card">
            <div className="d-flex justify-content-start align-items-center gap-2">
              <DiffOutlined className="its-icon" />
              <span>Add Questions</span>
            </div>
          </Card>

          <Card className="mt-5 light-bg">
            <div className="d-flex justify-content-end">
              <Button onClick={() => setAddQuestionsModal(true)}>Add Questions</Button>
            </div>

            <div className="mt-3">
              <QuestionListEdit questions={questions} setQuestions={setQuestions} quizId={id} from={"modal"} />
            </div>
          </Card>
        </div>
      </div>

      <AddQuestionModal open={addQuestionsModal} setOpen={setAddQuestionsModal} quizId={id} setQuestions={setQuestions} />
      <CopyLinkModal open={openLinkModal} setOpen={setOpenLinkModal} quizId={id} creatorId={quizData?.creator} />
      <SettingsSidebar open={settingDrawer} onClose={() => setSettingDrawer(false)} from="quizDetail" quizId={id} />
    </>
  );
};

export default QuizDetail;
