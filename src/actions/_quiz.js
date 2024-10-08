// for all subs
import { useQuery, useQueryClient } from "react-query";

import { useCallback, useEffect, useState } from "react";
import { Errs } from "../helper/Errs";
import axios from "axios";
import { API, quizApi } from "../helper/API";
import { useNavigate } from "react-router-dom";
import Alerting from "../App/components/common/Alerting";
import { useFetchList, useFetchOne } from "./queryActions";
import { useAuth } from "../context/authContext";

let initValues = {
  title: "",
  requiredFields: ["Name", "Phone", "Email"],
  timeLimit: 30,
  quizInstructions: null,
};

// For AI
let initValuesQuestions = {
  questionNumbers: 0,
  level1: "",
  level2: "",
};

export const _useQuizCreatations = () => {
  const queryClient = useQueryClient();
  const router = useNavigate();
  const [quizData, setQuizData] = useState(initValues);
  const [questionsDataAi, setQuestionsDataAi] = useState(initValuesQuestions);
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
    if (quizData.requiredFields.length >= 4) {
      Alerting({ msg: "You can add Requried Field upto 4." });
    } else {
      setQuizData({ ...quizData, requiredFields: [...quizData.requiredFields, ""] });
    }
  };

  const handleRemoveField = (index) => {
    if (quizData.requiredFields[index] === "Email") {
      alert("Email field is compulsory and cannot be removed.");
      return;
    }
    if (quizData.requiredFields[index] === "Name") {
      alert("Name field is compulsory and cannot be removed.");
      return;
    }
    if (quizData.requiredFields[index] === "Phone") {
      alert("Phone field is compulsory and cannot be removed.");
      return;
    }

    const newFields = quizData.requiredFields.filter((_, i) => i !== index);
    setQuizData({ ...quizData, requiredFields: newFields });
  };

  // done
  const handleSubmit = async (e, from = "withoutAI") => {
    e.preventDefault();

    if (!quizData.requiredFields.includes("Email")) {
      alert("Email field is compulsory.");
      return;
    }

    let body = from === "withoutAI" ? quizData : { ...quizData, questionsDataAi };
    let url = from === "withoutAI" ? `${quizApi}/create` : `${API}/api/ai/`;

    setLoading(true);
    try {
      const res = await axios.post(url, body, {});

      if (res.status === 200) {
        setQuizData(initValues);
        Alerting({ msg: "Quiz Created!", type: "success" });
        router(`/subscribe/quizzes/${res?.data?.quiz}`);
        queryClient.invalidateQueries("quizList");
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
    setQuizData,
    questionsDataAi,
    setQuestionsDataAi,
  };
};

export const _useAllMyQuizes = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });

  const fetchData = async () => {
    const response = await axios.get(`${quizApi}/all`, {
      params: {
        page: pagination?.page,
        pageSize: pagination?.pageSize,
        search,
      },
    });

    return response.data;
  };

  const { data, isLoading } = useQuery(["quizList", { page: pagination.page, pageSize: pagination.pageSize, search }], fetchData, {
    staleTime: Infinity,
    onError: (error) => Errs(error),
  });

  const handleTableChange = (page, pageSize) => {
    setPagination((prev) => ({ ...prev, page, pageSize }));
  };

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return {
    list: data?.quizzes,
    data,
    loading: isLoading,
    setSearch,
    handleSearch,
    handleTableChange,
    pagination,
  };
};

export const _useQuizModifications = (quizId) => {
  const router = useNavigate();
  const queryClient = useQueryClient();
  const [auth] = useAuth();

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
    requiredFields: ["Name", "Phone", "Email"],
    timeLimit: 30,
    maxAttempts: 1,
    quizInstructions: null,
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
    if (
      quizData.requiredFields[index] === "Email" ||
      quizData.requiredFields[index] === "Phone" ||
      quizData.requiredFields[index] === "Name"
    ) {
      alert("Email, Name, Phone fields are compulsory and cannot be removed.");
      return;
    }

    const newFields = quizData.requiredFields.filter((_, i) => i !== index);
    setQuizData({ ...quizData, requiredFields: newFields });
  };

  // done
  // const fetchQuizById = useCallback(async () => {
  //   if (!quizId) return;
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`${quizApi}/${quizId}`, { withCredentials: true });
  //     if (response.status === 200) {
  //       setQuizData(response.data.quiz);
  //       _setSettings(response.data.quiz.settings);
  //     }
  //   } catch (error) {
  //     Errs(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [quizId, Errs]);

  // useEffect(() => {
  //   fetchQuizById();
  // }, [fetchQuizById]);

  const fetchQuizById = async (quizId) => {
    if (!quizId) return;
    const response = await axios.get(`${quizApi}/${quizId}`, { withCredentials: true });
    if (response.status === 200) {
      // console.log(response, "here is the response");
      return response.data.quiz;
    }
    throw new Error("Failed to fetch quiz data");
  };

  const { isLoading } = useQuery(["quizById", quizId], () => fetchQuizById(quizId), {
    enabled: !!quizId, // Ensure the query runs only when quizId is available
    onSuccess: (data) => {
      // console.log(data, "date is here");
      setQuizData(data);
      _setSettings(data.settings);
    },
    onError: (error) => {
      Errs(error);
    },
  });

  // done
  const handleSubmit = useCallback(
    async (e, x) => {
      e.preventDefault();
      if (!quizData.requiredFields.includes("Email")) {
        alert("Email field is compulsory.");
        return;
      }
      setLoading(true);
      try {
        const res = await axios.put(`${quizApi}/${x}`, quizData, { withCredentials: true });
        console.log(res);
        if (res.status === 200) {
          Alerting({ msg: "Quiz updated!", type: "success" });
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

  // done
  const deleteQuiz = useCallback(async () => {
    setLoading(true);
    try {
      let ok = window.confirm("Are you sure?");
      if (ok) {
        const res = await axios.delete(`${quizApi}/delete/${quizId}`, { withCredentials: true });
        if (res.status === 200) {
          Alerting({ msg: "Quiz and its related question deleted", type: "success" });
          queryClient.invalidateQueries("quizList");
          router("/subscribe/quizzes");
        }
      }
    } catch (error) {
      console.log(error);
      Errs(error); // Ensure 'Errs' is properly handling errors
    } finally {
      setLoading(false);
    }
  }, [quizId, router, Errs]);

  // done
  const addQuizSettings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.put(`${quizApi}/s/${quizId}`, _settings, { withCredentials: true });
      if (res.status === 200) {
        Alerting({ msg: "Setting updated!", type: "success" });
      }
    } catch (error) {
      Errs(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [quizId, Errs, _settings]);

  const generateAIInstructions = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/api/ai/generate-instructions`, {
        name: quizData.title,
        attempts: quizData.maxAttempts,
        requiredFields: quizData.requiredFields,
        timeLimit: quizData.timeLimit,
      });

      setQuizData({ ...quizData, quizInstructions: data });
    } catch (error) {
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
    loading: isLoading,
    questions,
    setQuestions,
    deleteQuiz,

    _setSettings,
    _settings,
    addQuizSettings,
    handleMaxLimit,
    setQuizData,
    generateAIInstructions,
  };
};

export const _exportQuiz = () => {
  const queryClient = useQueryClient();
  const router = useNavigate();

  const [loading, setLoading] = useState(false);

  // done
  const doIt = async (quizId) => {
    setLoading(true);
    try {
      const res = await axios.put(`${quizApi}/do-export/${quizId}`);

      if (res.status === 200) {
        Alerting({ msg: "Quiz Exported!", type: "success" });
        router(`/subscribe/quizzes`);
        queryClient.invalidateQueries("quizList");
        queryClient.invalidateQueries("quizExportedList");
      }
    } catch (error) {
      console.log(error);
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  const reset = async (quizId) => {
    setLoading(true);
    try {
      const res = await axios.put(`${quizApi}/reset-export/${quizId}`);

      if (res.status === 200) {
        Alerting({ msg: "Reset!", type: "success" });
        router(`/subscribe/quizzes`);
        queryClient.invalidateQueries("quizList");
        queryClient.invalidateQueries("quizExportedList");
      }
    } catch (error) {
      console.log(error);
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    doIt,
    reset,
    loading,
  };
};
