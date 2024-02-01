import { useEffect, useState } from "react";
import { Errs } from "../helper/Errs";
import axios from "axios";
import { API } from "../helper/API";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";

// export const _useQuizQuestions = () => {
//   const [auth] = useAuth();
//   const [loading, setLoading] = useState(false);

//   // const fetchingAllQuestions = async (quizId) => {
//   //   setLoading(true);
//   //   try {
//   //     const res = await axios.get(`${API}/quiz/all-qestions/${quizId}`);
//   //     if (res.status === 200) {
//   //       setList(res.data.questions);
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //     Errs(error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   if (auth?.token && quizId) {
//   //     fetchingAllQuestions(quizId);
//   //   }
//   // }, [auth && auth?.token, quizId]);

//   const deleteQuestion = async (quizId, questionId) => {
//     setLoading(true);
//     try {
//       let ok = window.confirm("Are you sure?");
//       if (ok) {
//         const res = await axios.delete(`${API}/quiz/question/${quizId}/${questionId}`);
//       }
//     } catch (error) {
//       console.log(error);
//       Errs(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, deleteQuestion };
// };

// export const _useAddQuestion = () => {
//   const [question, setQuestion] = useState("");
//   const [questionType, setQuestionType] = useState("multiple-choice");
//   const [options, setOptions] = useState([
//     { text: "", isCorrect: false },
//     { text: "", isCorrect: false },
//   ]);
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleAddOption = () => {
//     if (options.length < 5) {
//       setOptions([...options, { text: "", isCorrect: false }]);
//     }
//   };

//   const handleRemoveOption = (index) => {
//     const newOptions = options.filter((_, i) => i !== index);
//     setOptions(newOptions);
//   };

//   const handleOptionChange = (index, value) => {
//     const newOptions = options.map((option, i) => (i === index ? { ...option, text: value } : option));
//     setOptions(newOptions);
//   };

//   const handleCorrectChange = (index) => {
//     const newOptions = options.map((option, i) => (i === index ? { ...option, isCorrect: !option.isCorrect } : option));
//     setOptions(newOptions);
//   };

//   const addQuestion = async (quizId) => {
//     setLoading(true);
//     try {
//       const res = await axios.post(`${API}/quiz/add-questions/${quizId}`, { options, text: question, correctAnswer: answer, type: questionType });
//       if (res.status === 201) {
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       Errs(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     handleAddOption,
//     handleRemoveOption,
//     handleOptionChange,
//     handleCorrectChange,

//     question,
//     setQuestion,
//     questionType,
//     setQuestionType,
//     options,
//     answer,
//     setAnswer,

//     addQuestion,
//     loading,
//   };
// };

let addQuestionInit = {
  options: [
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ],

  correctAnswer: "",

  questionType: "multiple-choice",
};

export const _useQuestions = (quizId) => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;

  const [loading, setLoading] = useState(false);
  const [questionData, setQuestionData] = useState(addQuestionInit);
  const [text, setText] = useState();
  const { options, correctAnswer, questionType } = questionData;

  const [questions, setQuestions] = useState([]);

  const handleAddOption = () => {
    if (options.length < 5) {
      setQuestionData((prev) => ({ ...prev, options: [...prev.options, { text: "", isCorrect: false }] }));
    }
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setQuestionData((prev) => ({ ...prev, options: newOptions }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = options.map((option, i) => (i === index ? { ...option, text: value } : option));
    setQuestionData((prev) => ({ ...prev, options: newOptions }));
  };

  const handleCorrectChange = (index) => {
    const newOptions = options.map((option, i) => (i === index ? { ...option, isCorrect: !option.isCorrect } : option));
    setQuestionData((prev) => ({ ...prev, options: newOptions }));
  };

  const fetchingAllQuestions = async (x) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/quiz/all-qestions/${x}`);
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
    if (auth?.token && quizId) {
      fetchingAllQuestions(quizId);
    }
  }, [authToken, quizId]);

  // add question
  const addQuestion = async (quizId) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/quiz/add-questions/${quizId}`, { options, text, correctAnswer, type: questionType });
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

  // delete question
  const deleteQuestion = async (quizId, questionId) => {
    setLoading(true);
    try {
      let ok = window.confirm("Are you sure?");
      if (ok) {
        await axios.delete(`${API}/quiz/question/${quizId}/${questionId}`);
        setQuestionData(questions.filter((x) => x._id !== questionId));
        fetchingAllQuestions(quizId);
      }
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
  };
};
