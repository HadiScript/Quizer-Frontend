// for all subs

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Errs } from "../helper/Errs";
import axios from "axios";
import { API } from "../helper/API";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const _useQuizCreatations = () => {
  const [quizData, setQuizData] = useState({
    title: "",
    requiredFields: ["Email"],
    timeLimit: 30,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const handleRequiredFieldChange = (value, index) => {
    const newFields = quizData.requiredFields.map((field, i) => {
      if (i === index) {
        return value;
      }
      return field;
    });
    setQuizData({ ...quizData, requiredFields: newFields });
  };

  const handleAddField = () => {
    setQuizData({ ...quizData, requiredFields: [...quizData.requiredFields, ""] });
  };

  const handleRemoveField = (index) => {
    if (quizData.requiredFields[index] === "Email") {
      alert("Email field is compulsory and cannot be removed.");
      return;
    }

    const newFields = quizData.requiredFields.filter((_, i) => i !== index);
    setQuizData({ ...quizData, requiredFields: newFields });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quizData.requiredFields.includes("Email")) {
      alert("Email field is compulsory.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API}/quiz/create-quiz`, quizData);
      console.log(res);
      if (res.status === 201) {
        toast.success("Quiz is created!");
      }
    } catch (error) {
      console.log(error);
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    quizData,
    handleInputChange,
    handleRequiredFieldChange,
    handleAddField,
    handleRemoveField,
    handleSubmit,
    loading,
  };
};

export const _useAllMyQuizes = () => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const fetchingMyQuizes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/quiz/all-my-quizes`);
      if (res.status === 200) {
        setList(res.data.quizzes);
      }
    } catch (error) {
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth && auth.token) {
      fetchingMyQuizes();
    }
  }, [authToken]);

  return {
    loading,
    list,
  };
};

export const _useQuizModifications = (quizId) => {
  const router = useNavigate();
  const [auth] = useAuth();
  const authToken = auth && auth?.token;
  const [questions, setQuestions] = useState([]);
  const [_settings, _setSettings] = useState({
    quizTimer: 0,
    quizAvailability: {
      start: null,
      end: null,
    },
    displaySetting: "",
    mode: "",
    passingScore: 0,
    scoringType: "",
    showScore: false,
  });

  const [quizData, setQuizData] = useState({
    title: "",
    requiredFields: ["Email"],
    timeLimit: 30,
    maxAttempts: 1,
  });

  const [loading, setLoading] = useState(false);

  const handleMaxLimit = (value) => {
    setQuizData({ ...quizData, maxAttempts: value });
  };

  const handleInputChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const handleRequiredFieldChange = (value, index) => {
    const newFields = quizData.requiredFields.map((field, i) => {
      if (i === index) {
        return value;
      }
      return field;
    });
    setQuizData({ ...quizData, requiredFields: newFields });
  };

  const handleAddField = () => {
    setQuizData({ ...quizData, requiredFields: [...quizData.requiredFields, ""] });
  };

  const handleRemoveField = (index) => {
    if (quizData.requiredFields[index] === "Email") {
      alert("Email field is compulsory and cannot be removed.");
      return;
    }

    const newFields = quizData.requiredFields.filter((_, i) => i !== index);
    setQuizData({ ...quizData, requiredFields: newFields });
  };

  // const fetchingQuizById = useCallback(
  //   async (x) => {
  //     setLoading(true);
  //     try {
  //       const res = await axios.get(`${API}/quiz/quiz-detail/${x}`);
  // if (res.status === 200) {
  //   setQuizData(res.data.quiz);
  //   _setSettings(res.data.quiz.settings);
  // }
  //     } catch (error) {
  //       Errs(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [authToken, quizId]
  // );

  const fetchQuizById = useCallback(async () => {
    if (!authToken || !quizId) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API}/quiz/quiz-detail/${quizId}`);
      if (response.status === 200) {
        setQuizData(response.data.quiz);
        _setSettings(response.data.quiz.settings);
      }
    } catch (error) {
      Errs(error);
    } finally {
      setLoading(false);
    }
  }, [authToken, quizId, Errs]);

  useEffect(() => {
    fetchQuizById();
  }, [fetchQuizById]);

  // const handleSubmit = async (e, x) => {
  //   e.preventDefault();
  //   if (!quizData.requiredFields.includes("Email")) {
  //     alert("Email field is compulsory.");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const res = await axios.put(`${API}/quiz/update/${x}`, quizData);
  //     console.log(res);
  //     if (res.status === 200) {
  //       toast.success("Quiz is Updated");
  //       fetchingQuizById(x);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     Errs(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = useCallback(
    async (e, x) => {
      e.preventDefault();
      if (!quizData.requiredFields.includes("Email")) {
        alert("Email field is compulsory.");
        return;
      }

      setLoading(true);
      try {
        const res = await axios.put(`${API}/quiz/update/${x}`, quizData);
        console.log(res);
        if (res.status === 200) {
          toast.success("Quiz is Updated");
          fetchQuizById(x);
        }
      } catch (error) {
        console.log(error);
        Errs(error);
      } finally {
        setLoading(false);
      }
    },
    [quizData, fetchQuizById, Errs]
  );

  const deleteQuiz = useCallback(async () => {
    setLoading(true);
    try {
      let ok = window.confirm("Are you sure?");
      if (ok) {
        const res = await axios.delete(`${API}/quiz/_delete/${quizId}`);
        if (res.status === 200) {
          toast.success(res.data.message);
          router("/subscribe/quizes");
        }
      }
    } catch (error) {
      console.log(error);
      Errs(error); // Ensure 'Errs' is properly handling errors
    } finally {
      setLoading(false);
    }
  }, [quizId, router, Errs]);

  const addQuizSettings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.put(`${API}/quiz/settings/${quizId}`, _settings);
      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      Errs(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [quizId, Errs, _settings]);

  return {
    quizData,
    handleInputChange,
    handleRequiredFieldChange,
    handleAddField,
    handleRemoveField,
    handleSubmit,
    loading,
    questions,
    setQuestions,
    deleteQuiz,

    _setSettings,
    _settings,
    addQuizSettings,
    handleMaxLimit,
  };
};
