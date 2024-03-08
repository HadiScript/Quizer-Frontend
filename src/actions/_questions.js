import { useEffect, useState } from "react";
import { Errs } from "../helper/Errs";
import axios from "axios";
import { questionApi } from "../helper/API";
import Alerting from "../App/components/common/Alerting";
import { useMutation, useQuery, useQueryClient } from "react-query";

export let addQuestionInitValues = {
  options: [
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ],

  correctAnswer: "",

  questionType: "multiple-choice",

  text: "",
};

export const useQuizStates = () => {
  const [questions, setQuestions] = useState([]);
  const [questionData, setQuestionData] = useState(addQuestionInitValues);
  const { options } = questionData;

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

  return {
    questions,
    setQuestions,
    questionData,
    setQuestionData,
    handleAddOption,
    handleRemoveOption,
    handleOptionChange,
    handleCorrectChange,
  };
};

export const _useQuestionTest = (quizId, limits = 10, toughest = false) => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 6, total: 0 });
  const handleTableChange = (x) => {
    setPagination((pre) => ({ ...pre, current: x }));
  };

  const {
    questions,
    setQuestions,
    questionData,
    setQuestionData,
    handleAddOption,
    handleRemoveOption,
    handleOptionChange,
    handleCorrectChange,
  } = useQuizStates();

  const { data, isLoading } = useQuery(
    ["questions", quizId, limits, toughest, pagination.pageSize, pagination.current, searchTerm],
    () =>
      axios
        .get(`${questionApi}/${quizId}`, {
          params: {
            // limits: limits,
            whichQuestions: toughest,
            page: pagination.current,
            pageSize: pagination.pageSize,
            searchTerm: searchTerm,
          },
          withCredentials: true,
        })
        .then((res) => res.data.questions),
    {
      staleTime: Infinity,
      enabled: !!quizId,
      onError: (error) => Errs(error),
    }
  );

  useEffect(() => {
    if (data) {
      setQuestions(data);
    }
  }, [data]);

  // delete question
  const deleteQuestionMutation = useMutation(
    ({ quizId, questionId }) => axios.delete(`${questionApi}/${quizId}/${questionId}`, { withCredentials: true }),
    {
      onSuccess: () => {
        Alerting({ msg: "Deleted!" });
        queryClient.invalidateQueries(["questions", quizId]);
      },
      onError: (error) => Errs(error),
    }
  );

  const deleteQuestion = (questionId) => {
    if (window.confirm("Are you sure?")) {
      deleteQuestionMutation.mutate({ quizId, questionId });
    }
  };

  // add question
  const addQuestionMutation = useMutation(
    ({ quizId }) => axios.post(`${questionApi}/${quizId}`, { ...questionData, type: questionData.questionType }, { withCredentials: true }),
    {
      onSuccess: () => {
        Alerting({ msg: "Question Added" });
        queryClient.invalidateQueries(["questions", quizId]);
        queryClient.invalidateQueries(["statsSummary"]);
      },
      onError: (error) => Errs(error),
    }
  );

  const addQuestion = (quizId) => {
    addQuestionMutation.mutate({ quizId });
  };

  // edit questions
  // add question
  const editQuestionMutation = useMutation(
    ({ questionId }) =>
      axios.put(`${questionApi}/one/${questionId}`, { ...questionData, type: questionData.questionType }, { withCredentials: true }),
    {
      onSuccess: () => {
        Alerting({ msg: "Question Updated!" });
        queryClient.invalidateQueries(["questions", quizId]);
      },
      onError: (error) => Errs(error),
    }
  );

  const editQuestion = (questionId) => {
    editQuestionMutation.mutate({ questionId });
  };

  return {
    // fn
    deleteQuestion,
    addQuestion,
    editQuestion,

    // states
    loading: isLoading,
    isAdded: addQuestionMutation.isLoading,
    isEdit: editQuestionMutation.isLoading,
    questions,
    setQuestions,
    questionData,
    setQuestionData,
    handleAddOption,
    handleRemoveOption,
    handleOptionChange,
    handleCorrectChange,

    pagination,
    handleTableChange,
    searchTerm,
    setSearchTerm,
  };
};
