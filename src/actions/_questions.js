import { useCallback, useEffect, useState } from "react";
import { Errs } from "../helper/Errs";
import axios from "axios";
import { API, questionApi } from "../helper/API";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";

let addQuestionInit = {
  options: [
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ],

  correctAnswer: "",

  questionType: "multiple-choice",
};

export const _useQuestions = (quizId, limits = 6, toughest = false) => {
  const [loading, setLoading] = useState(false);
  const [questionData, setQuestionData] = useState(addQuestionInit);
  const [text, setText] = useState();
  const { options, correctAnswer, questionType } = questionData;
  const [singleQuestion, setSingleQuestion] = useState({});

  const [questions, setQuestions] = useState([]);

  const handleAddOption = () => {
    if (options.length < 5) {
      setQuestionData((prev) => ({
        ...prev,
        options: [
          ...prev.options,
          {
            text: "",
            isCorrect: false,
          },
        ],
      }));
    }
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setQuestionData((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = options.map((option, i) => (i === index ? { ...option, text: value } : option));
    setQuestionData((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  const handleCorrectChange = (index) => {
    const newOptions = options.map((option, i) =>
      i === index
        ? {
            ...option,
            isCorrect: !option.isCorrect,
          }
        : option
    );
    setQuestionData((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  // done
  const fetchingAllQuestions = async (x) => {
    if (!x) {
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`${questionApi}/${x}`, {
        params: {
          limits: limits,
          whichQuestions: toughest,
        },
        withCredentials: true,
      });
      if (res.status === 200) {
        setQuestions(res.data.questions);
      }
    } catch (error) {
      console.log(error);
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quizId) {
      fetchingAllQuestions(quizId);
    }
  }, [quizId, toughest]);

  // done
  // add question
  const addQuestion = async (quizId) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${questionApi}/${quizId}`,
        {
          options,
          text,
          correctAnswer,
          type: questionType,
        },
        { withCredentials: true }
      );
      if (res.status === 201) {
        fetchingAllQuestions(quizId);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  // done
  // delete question
  const deleteQuestion = async (quizId, questionId) => {
    setLoading(true);
    try {
      let ok = window.confirm("Are you sure?");
      if (ok) {
        await axios.delete(`${questionApi}/${quizId}/${questionId}`, { withCredentials: true });
        setQuestionData(questions.filter((x) => x._id !== questionId));
        fetchingAllQuestions(quizId);
        toast.success(`${questionId} has deleted.`);
      }
    } catch (error) {
      console.log(error);
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleQuestion = async (questionId) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${questionApi}/one/${questionId}`, { withCredentials: true });
      let question = data.question;
      setText(question.text);
      setQuestionData((prev) => ({ ...questionData, options: question.options, questionType: question.type }));
    } catch (error) {
      Errs(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const editQuestion = async (questionId) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${questionApi}/one/${questionId}`,
        {
          options,
          text,
          correctAnswer,
          type: questionType,
        },
        { withCredentials: true }
      );
      fetchingAllQuestions(quizId);
      toast.success("Updated");
    } catch (error) {
      console.log(error);
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    text,
    setQuestionData,
    questionType,
    options,
    correctAnswer,
    loading,
    questions,
    setQuestions,
    setText,

    // functions
    deleteQuestion,
    addQuestion,
    handleAddOption,
    handleRemoveOption,
    handleOptionChange,
    handleCorrectChange,
    fetchSingleQuestion,
    editQuestion,
  };
};
