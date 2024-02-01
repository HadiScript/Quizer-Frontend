// quiz Dashboard

import { useEffect, useState } from "react";
import { API } from "../helper/API";
import axios from "axios";
import { Errs } from "../helper/Errs";
import { useAuth } from "../context/authContext";

export const useAttemptUsers = (quizId) => {
  const [auth] = useAuth();

  // attempter/:quizId
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  useEffect(() => {
    if (auth?.token) fetchQuizAttempts();
  }, [pagination.current, pagination.pageSize, searchEmail, auth?.token]);

  const fetchQuizAttempts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/quiz/attempter/${quizId}`, {
        params: {
          page: pagination.current,
          pageSize: pagination.pageSize,
          email: searchEmail,
        },
      });
      setData(response.data.data);
      setPagination({ ...pagination, total: response.data.total });
    } catch (error) {
      Errs(error);
    }
    setLoading(false);
  };

  const handleTableChange = (x) => {
    setPagination((pre) => ({ ...pre, current: x }));
  };

  const handleSearch = () => {
    setPagination({ ...pagination, current: 1 });
    fetchQuizAttempts();
  };

  return {
    data,
    setSearchEmail,
    handleSearch,
    handleTableChange,
    loading,
    pagination,
  };
};

export const usePassFail = (quizId) => {
  const [auth] = useAuth();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth?.token) FetchUserPassOrFail();
  }, [auth?.token]);

  const FetchUserPassOrFail = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/quiz/passing-ratio/${quizId}`);
      setData(response.data.result);
    } catch (error) {
      Errs(error);
    }
    setLoading(false);
  };

  return { data, loading };
};
