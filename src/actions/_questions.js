import { useEffect, useState } from "react";
import { Errs } from "../helper/Errs";
import axios from "axios";
import { questionApi } from "../helper/API";
import Alerting from "../App/components/common/Alerting";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";

// OLD CODE
// export let addQuestionInitValues = {
//   options: [
//     { text: "", isCorrect: false },
//     { text: "", isCorrect: false },
//   ],

//   correctAnswer: "",

//   questionType: "multiple-choice",

//   text: "",

//   disable: false,
// };

// OLD CODE
// export const useQuizStates = () => {
//   const [questions, setQuestions] = useState([]);
//   const [questionData, setQuestionData] = useState(addQuestionInitValues);
//   const { options } = questionData;

//   const handleAddOption = () => {
//     if (options.length < 5) {
//       setQuestionData((prev) => ({
//         ...prev,
//         options: [
//           ...prev.options,
//           {
//             text: "",
//             isCorrect: false,
//           },
//         ],
//       }));
//     }
//   };

//   const handleRemoveOption = (index) => {
//     const newOptions = options.filter((_, i) => i !== index);
//     setQuestionData((prev) => ({
//       ...prev,
//       options: newOptions,
//     }));
//   };

//   const handleOptionChange = (index, value) => {
//     const newOptions = options.map((option, i) => (i === index ? { ...option, text: value } : option));
//     setQuestionData((prev) => ({
//       ...prev,
//       options: newOptions,
//     }));
//   };

//   const handleCorrectChange = (index) => {
//     const newOptions = options.map((option, i) =>
//       i === index
//         ? {
//             ...option,
//             isCorrect: !option.isCorrect,
//           }
//         : option
//     );
//     setQuestionData((prev) => ({
//       ...prev,
//       options: newOptions,
//     }));
//   };

//   return {
//     questions,
//     setQuestions,
//     questionData,
//     setQuestionData,
//     handleAddOption,
//     handleRemoveOption,
//     handleOptionChange,
//     handleCorrectChange,
//   };
// };

export let addQuestionInitValues = {
  options: [],
  questionType: "multiple-choice",
  text: "",
  correctAnswer: "", // For short answer
  blanks: [{ position: 0, correctAnswer: "" }],
  dateAnswer: null,
  rangeAnswer: { min: 0, max: 0 },
  disable: false,
  maxSelectableOptions: 1,
};

export const useQuizStates = () => {
  const [questions, setQuestions] = useState([]);
  const [questionData, setQuestionData] = useState(addQuestionInitValues);
  const { options, blanks, rangeAnswer, dateAnswer, maxSelectableOptions } = questionData;

  const handleAddOption = () => {
    if (options.length < 5) {
      setQuestionData((prev) => ({
        ...prev,
        options: [...prev.options, { text: "", isCorrect: false }],
        maxSelectableOptions: Math.min(prev.maxSelectableOptions, options.length + 1), // Ensure selection limit is valid
      }));
    }
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setQuestionData((prev) => ({
      ...prev,
      options: newOptions,
      maxSelectableOptions: Math.min(prev.maxSelectableOptions, newOptions.length), // Adjust if the limit exceeds the number of options
    }));
  };

  const handleSelectionLimitChange = (newLimit) => {
    if (newLimit >= 1 && newLimit <= options.length) {
      setQuestionData((prev) => ({
        ...prev,
        maxSelectableOptions: newLimit,
      }));
    }
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

  const handleBlankChange = (index, value) => {
    setQuestionData((prev) => {
      const newBlanks = prev.blanks.map((blank, i) => (i === index ? { ...blank, correctAnswer: value } : blank));
      return { ...prev, blanks: newBlanks };
    });
  };

  const handleAddBlank = () => {
    setQuestionData((prev) => ({
      ...prev,
      blanks: [...prev.blanks, ""],
    }));
  };

  const handleRemoveBlank = (index) => {
    const newBlanks = blanks.filter((_, i) => i !== index);
    setQuestionData((prev) => ({
      ...prev,
      blanks: newBlanks,
    }));
  };

  const handleRangeChange = (min, max) => {
    setQuestionData((prev) => ({
      ...prev,
      rangeAnswer: { min, max },
    }));
  };

  const handleDateChange = (date) => {
    setQuestionData((prev) => ({
      ...prev,
      dateAnswer: date,
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
    handleBlankChange,
    handleAddBlank,
    handleRemoveBlank,
    handleRangeChange,
    handleDateChange,
    handleSelectionLimitChange,
  };
};

export const _useQuestionTest = (quizId, limits, toughest = false, sortedBy = "all") => {
  const {
    questions,
    setQuestions,
    questionData,
    setQuestionData,
    handleAddOption,
    handleRemoveOption,
    handleOptionChange,
    handleCorrectChange,
    handleBlankChange,
    handleAddBlank,
    handleRemoveBlank,
    handleRangeChange,
    handleDateChange,
    handleSelectionLimitChange,
  } = useQuizStates();

  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const queryKey = ["questions", quizId, limits, toughest, searchTerm, sortedBy];

  const { isLoading, data, error } = useQuery(
    queryKey,
    () =>
      axios
        .get(`${questionApi}/${quizId}`, {
          params: {
            limits,
            whichQuestions: toughest,
            searchTerm: searchTerm,
            sortedBy,
          },
          withCredentials: true,
        })
        .then((res) => res.data.questions),
    {
      enabled: !!quizId,
      onError: (error) => Errs(error),
    }
  );

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

  // OLD CODE
  // add question
  // const addQuestionMutation = useMutation(
  //   ({ quizId }) => axios.post(`${questionApi}/${quizId}`, { ...questionData, type: questionData.questionType }, { withCredentials: true }),
  //   {
  //     onSuccess: () => {
  //       Alerting({ msg: "Question Added" });
  //       queryClient.invalidateQueries(["questions", quizId]);
  //       queryClient.invalidateQueries(["statsSummary"]);
  //     },
  //     onError: (error) => Errs(error),
  //   }
  // );

  // const addQuestion = (quizId) => {
  //   // console.log(questionData, "here is the question data.");
  //   if (!questionData.text) return toast.error("Please add question");

  //   if (questionData?.options.some((option) => option.text.trim() === "")) return toast.error("Please add option");

  //   // Check if at least one option is correct
  //   if (!questionData?.options.some((option) => option.isCorrect)) return toast.error("Atleast one option should be true");

  //   setQuestionData(addQuestionInitValues);

  //   addQuestionMutation.mutate({ quizId });
  // };

  // OLD CODE
  // edit questions
  // add question
  // const editQuestionMutation = useMutation(
  //   ({ questionId }) =>
  //     axios.put(`${questionApi}/one/${questionId}`, { ...questionData, type: questionData.questionType }, { withCredentials: true }),
  //   {
  //     onSuccess: () => {
  //       Alerting({ msg: "Question Updated!" });
  //       queryClient.invalidateQueries(["questions", quizId]);
  //     },
  //     onError: (error) => Errs(error),
  //   }
  // );

  // const editQuestion = (questionId) => {
  //   if (!questionData.text) return toast.error("Please add question");

  //   if (questionData?.options.some((option) => option.text.trim() === "")) return toast.error("Please add option");

  //   // Check if at least one option is correct
  //   if (!questionData?.options.some((option) => option.isCorrect)) return toast.error("Atleast one option should be true");

  //   // console.log(questionData, "for disable");
  //   // return;

  //   editQuestionMutation.mutate({ questionId });
  // };

  // NEW CODE
  // ADD QUESION
  const addQuestionMutation = useMutation(
    ({ quizId, questionData }) =>
      axios.post(`${questionApi}/${quizId}`, { ...questionData, type: questionData.questionType }, { withCredentials: true }),
    {
      onSuccess: () => {
        toast.success("Question Added");
        queryClient.invalidateQueries(["questions", quizId]);
        queryClient.invalidateQueries(["statsSummary"]);
      },
      onError: (error) => Errs(error),
    }
  );

  const addQuestion = (quizId) => {
    if (!questionData.text.trim()) {
      return toast.error("Please add question text");
    }

    if (questionData.questionType === "multiple-choice" && questionData.options.some((option) => option.text.trim() === "")) {
      return toast.error("Please add text for all options");
    }

    if (questionData.maxSelectableOptions < 1 || questionData.maxSelectableOptions > questionData.options.length) {
      return toast.error("Invalid selection limit. Please set a valid number of maximum selectable options.");
    }

    if (questionData.questionType === "multiple-choice" && !questionData.options.some((option) => option.isCorrect)) {
      return toast.error("Please mark at least one option as correct");
    }

    if (questionData.questionType === "true-false" && !questionData.options.some((option) => option.isCorrect)) {
      return toast.error("Please select the correct answer for true/false");
    }

    if (questionData.questionType === "short-answer" && !questionData.correctAnswer.trim()) {
      return toast.error("Please provide an answer for the short answer question");
    }

    if (
      questionData.questionType === "fill-in-the-blank" &&
      questionData.blanks.some((blank) => !blank.correctAnswer || blank.correctAnswer.trim() === "")
    ) {
      return toast.error("Please add answers for all blanks");
    }

    if (questionData.questionType === "date" && !questionData.dateAnswer) {
      return toast.error("Please provide a date");
    }

    if (
      questionData.questionType === "range" &&
      (questionData.rangeAnswer.min === undefined || questionData.rangeAnswer.max === undefined)
    ) {
      return toast.error("Please provide a valid range");
    }

    // Reset state and add question
    setQuestionData(addQuestionInitValues);

    addQuestionMutation.mutate({ quizId, questionData });
  };

  // NEW CODE
  // EDIT QUESTION
  const editQuestionMutation = useMutation(
    ({ questionId, updateData }) => axios.put(`${questionApi}/one/${questionId}`, updateData, { withCredentials: true }),
    {
      onSuccess: () => {
        Alerting({ msg: "Question Updated!" });
        queryClient.invalidateQueries(["questions", quizId]);
      },
      onError: (error) => Errs(error),
    }
  );

  const editQuestion = (questionId) => {
    // Ensure question text is provided
    if (!questionData.text.trim()) {
      return toast.error("Please add question text");
    }

    const { type, text, options, correctAnswer, blanks, dateAnswer, rangeAnswer, disable, maxSelectableOptions } = questionData;

    // Validate and prepare update data based on question type
    let updateData = { text, disable };

    switch (type) {
      case "multiple-choice":
        if (options.some((option) => option.text.trim() === "")) {
          return toast.error("Please provide text for all options");
        }
        if (!options.some((option) => option.isCorrect)) {
          return toast.error("At least one option should be marked as correct");
        }
        if (maxSelectableOptions < 1 || maxSelectableOptions > options.length) {
          return toast.error("Invalid maximum number of selectable options");
        }
        updateData.options = options;
        updateData.maxSelectableOptions = maxSelectableOptions; // Include the maxSelectableOptions in the update data
        break;

      case "true-false":
        if (options.some((option) => option.text.trim() === "")) {
          return toast.error("Please provide text for all options");
        }
        if (!options.some((option) => option.isCorrect)) {
          return toast.error("At least one option should be marked as correct");
        }
        updateData.options = options;
        break;

      case "short-answer":
        if (!correctAnswer.trim()) {
          return toast.error("Please provide the correct answer");
        }
        updateData.correctAnswer = correctAnswer;
        break;

      case "fill-in-the-blank":
        if (blanks.some((blank) => !blank.correctAnswer || blank.correctAnswer.trim() === "")) {
          return toast.error("Please add answers for all blanks");
        }
        updateData.blanks = blanks;
        break;

      case "date":
        if (!dateAnswer) {
          return toast.error("Please provide a date answer");
        }
        updateData.dateAnswer = dateAnswer;
        break;

      case "range":
        if (rangeAnswer.min === undefined || rangeAnswer.max === undefined) {
          return toast.error("Please provide a valid range");
        }
        updateData.rangeAnswer = rangeAnswer;
        break;

      default:
        return toast.error("Invalid question type");
    }

    // Trigger mutation to update the question
    editQuestionMutation.mutate({ questionId, updateData });
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
    questions: data,

    setQuestions,
    questionData,
    setQuestionData,
    handleAddOption,
    handleRemoveOption,
    handleOptionChange,
    handleCorrectChange,

    searchTerm,
    setSearchTerm,

    handleBlankChange,
    handleAddBlank,
    handleRemoveBlank,
    handleRangeChange,
    handleDateChange,
    handleSelectionLimitChange,
  };
};
