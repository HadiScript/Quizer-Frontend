// AllQuestionModel

import React from "react";
import { Button, Card, ConfigProvider, Modal, Space } from "antd";
import QuestionListEdit from "./QuestionListEdit";

const AllQuestionModel = ({ open, onClose, quizId, questions, setQuestions }) => {
  return (
    <>
      <Modal
        title="All Questions"
        open={open}
        onOk={open}
        onCancel={onClose}
        footer={null}
        // width={"100%"}
        style={{
          top: 10,
        }}
      >
        <div className="mt-5">
          <QuestionListEdit questions={questions} setQuestions={setQuestions} quizId={quizId} from={"component"} />
        </div>
      </Modal>
    </>
  );
};
export default AllQuestionModel;
