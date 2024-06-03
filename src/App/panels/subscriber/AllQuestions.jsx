import { useState } from "react";
import SubcriberLayout from "../../components/layouts/Layout";
import { useParams } from "react-router-dom";
import { DownOutlined, QuestionOutlined, SortAscendingOutlined } from "@ant-design/icons";
import Heading from "../../components/common/Heading";
import { _useQuestionTest, } from "../../../actions/_questions";
import QuestionListEdit from "../../components/panel/QuestionListEdit";
import AddQuestionModal from "./AddQuestionModal";
import { Button, Input, Dropdown, Space } from "antd";
import { BasicLoading } from "../../components/loadings";
import BgHeading from "../../components/common/BgHeading";

const AllQuestions = () => {
  const { id } = useParams();
  const [addQuestionsModal, setAddQuestionsModal] = useState(false);
  const [sortByToughest, setSortByToughest] = useState(false)
  const [sortedBy, setSortedBy] = useState('all')

  const {
    questions,

    setQuestions,
    loading,
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

  } = _useQuestionTest(id, 100, sortByToughest, sortedBy)

  const { options, correctAnswer, questionType, text, } = questionData




  const items = [
    {
      key: '1',
      label: (
        <span>All</span>
      ),
      onClick: () => setSortedBy("all")
    },
    {
      key: '2',
      label: (
        <span>Disabled</span>
      ),
      onClick: () => setSortedBy("disable")
    },
    {
      key: '3',
      label: (
        <span>Enable</span>
      ),
      onClick: () => setSortedBy("enable")
    },


  ];



  return (
    <SubcriberLayout from="quiz-detail" id={id}>

      <BgHeading title={"Questions"} />

      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 mt-4">

        <Button className="myBtn" onClick={() => setSortByToughest(!sortByToughest)}
          icon={<SortAscendingOutlined />}
        >{!sortByToughest ? "Toughest Questions" : "All Questions"}</Button>
        <Button type="dashed" onClick={() => setAddQuestionsModal(true)}>Add Questions</Button>
      </div>

      <div className=" mt-5 mb-2">
        <Input.Search
          placeholder="Search Question"
          enterButton="Search"
          onSearch={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "100%", marginBottom: 20 }}
        />
      </div>

      <Dropdown menu={{ items }} className="mb-4">
        <Button onClick={(e) => e.preventDefault()}>
          <Space>
            <span className="text-capitalize">{sortedBy}</span>
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>

      {
        loading ? <BasicLoading /> : <QuestionListEdit

          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortByToughest={sortByToughest}
          deleteQuestion={deleteQuestion}
          loading={loading}
          questions={questions}
          setQuestions={setQuestions}
          quizId={id}
          from={"page"}
        />
      }

      <AddQuestionModal
        loading={isAdded}
        text={text}
        setQuestionData={setQuestionData}
        questionType={questionType}
        options={options}
        correctAnswer={correctAnswer}
        setText={() => { }}
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
