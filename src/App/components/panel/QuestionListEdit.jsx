import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { DeleteOutlined, EditOutlined, HolderOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import axios from "axios";
import { API, questionApi } from "../../../helper/API";
import { Button, Empty, List, Pagination, Tag } from "antd";
import React, { useState } from "react";
import AllQuestionModel from "./AllQuestionModel";
import { gettingData } from "../../../helper/GetData";
import AddQuestionModal from "../../panels/subscriber/AddQuestionModal";
import EditQuestionModal from "../../panels/subscriber/EditQuestionModal";
import { BasicLoading } from "../loadings";

const QuestionListEdit = ({
  questions,
  setQuestions,
  quizId,
  from,
  deleteQuestion,
  loading,
  sortByToughest,
  searchTerm,
  setSearchTerm,

}) => {
  const [allQuestionModal, setAllQuestionModal] = useState(false);
  const [editQuestionModal, setEditQuestionModal] = useState(false);
  const [currentId, setCurrentId] = useState(null)

  const deleteHandle = (quizId, itemId) => {
    deleteQuestion(itemId);
  };

  const reOrderQuestions = async (x) => {
    try {
      const { data } = await axios.put(`${questionApi}/reorder`, x, {});
      toast.success("ReOrder");
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setQuestions(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter._id,
      position: items.findIndex((item) => item._id === chapter._id),
    }));
    reOrderQuestions(bulkUpdateData);
  };

  const handleCloseModel = () => {
    setCurrentId(null);
    setEditQuestionModal(false)
  }

  return (
    <>
      {
        questions?.length === 0 ? <Empty /> : loading ? <BasicLoading /> : <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {questions?.map((chapter, index) => (
                  <Draggable key={chapter._id} draggableId={chapter._id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} className={`question-box mb-2 `}>
                        <div className=" question-box1">
                          <div {...provided.dragHandleProps}>
                            <HolderOutlined />
                          </div>
                          {/* <p dangerouslySetInnerHTML={{ __html: chapter?.text }}></p> */}
                          <p dangerouslySetInnerHTML={{ __html: gettingData(chapter?.text, from) }} ></p>
                        </div>
                        <div className="question-box2">
                          {chapter.incorrectCount && <Tag> Incorrect Count: {chapter.incorrectCount} </Tag>}

                          {
                            !sortByToughest && <>
                              <DeleteOutlined onClick={() => deleteHandle(quizId, chapter._id)} />
                              <Button className="myBtn" onClick={() => {
                                setEditQuestionModal(true)
                                setCurrentId(chapter._id)
                              }} icon={<EditOutlined />}>
                                Options
                              </Button>
                            </>
                          }
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      }



      {from === "modal" && (
        <div className="text-center myBtn mt-4 rounded-3 p-2" role="button" onClick={() => setAllQuestionModal(true)}>
          see all
        </div>
      )}

      <EditQuestionModal id={currentId} open={editQuestionModal} handleCloseModel={handleCloseModel} />


      <AllQuestionModel open={allQuestionModal} onClose={() => setAllQuestionModal(false)} quizId={quizId} questions={questions} setQuestions={setQuestions} />
    </>
  );
};

export default QuestionListEdit;
