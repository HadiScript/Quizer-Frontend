import React, { useEffect, useState } from "react";
import SubcriberLayout from "../../components/layouts/Layout";
import { useParams } from "react-router-dom";
import { QuestionOutlined, SortAscendingOutlined } from "@ant-design/icons";
import Heading from "../../components/common/Heading";
import { _useQuestions } from "../../../actions/_questions";
import QuestionListEdit from "../../components/panel/QuestionListEdit";
import AddQuestionModal from "./AddQuestionModal";
import { Button, } from "antd";

const AllQuestions = () => {
  const { id } = useParams();
  const [addQuestionsModal, setAddQuestionsModal] = useState(false);
  const [sortByToughest, setSortByToughest] = useState(false)

  const {
    questions,
    setQuestions,
    text,
    setQuestionData,
    questionType,
    options,
    correctAnswer,
    loading: QuestionLoading,
    setText,

    // functions
    deleteQuestion,
    addQuestion,
    handleAddOption,
    handleRemoveOption,
    handleOptionChange,
    handleCorrectChange,
  } = _useQuestions(id, 100, sortByToughest);


  return (
    <SubcriberLayout from="quiz-detail" id={id}>
      <Heading title={"Questions"} Icon={<QuestionOutlined className="its-icon" />} />

      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">

        <Button className="myBtn" onClick={() => setSortByToughest(!sortByToughest)}
          icon={<SortAscendingOutlined />}
        >{!sortByToughest ? "Toughest Questions" : "All Questions"}</Button>
        <Button type="dashed" onClick={() => setAddQuestionsModal(true)}>Add Questions</Button>
      </div>

      <QuestionListEdit deleteQuestion={deleteQuestion} loading={QuestionLoading} questions={questions} setQuestions={setQuestions} quizId={id} from={"page"} />

      <AddQuestionModal
        loading={QuestionLoading}
        text={text}
        setQuestionData={setQuestionData}
        questionType={questionType}
        options={options}
        correctAnswer={correctAnswer}
        setText={setText}
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
    </SubcriberLayout>
  );
};

export default AllQuestions;
