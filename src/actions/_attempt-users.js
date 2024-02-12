// quiz Dashboard

import { useCallback, useEffect, useState } from "react";
import { reportApi } from "../helper/API";
import axios from "axios";
import { Errs } from "../helper/Errs";

export const useAttemptUsers = (quizId) => {
  // attempter/:quizId
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  useEffect(() => {
    fetchQuizAttempts();
  }, [pagination.current, pagination.pageSize, searchEmail]);

  const fetchQuizAttempts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${reportApi}/attempter/${quizId}`, {
        params: {
          page: pagination.current,
          pageSize: pagination.pageSize,
          email: searchEmail,
        },
        withCredentials: true,
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    FetchUserPassOrFail();
  }, []);

  const FetchUserPassOrFail = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${reportApi}/passing-ratio/${quizId}`, { withCredentials: true });
      setData(response.data.result);
    } catch (error) {
      Errs(error);
    }
    setLoading(false);
  };

  return { data, loading };
};

export const useToughestQuestions = (quizId) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchingData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${reportApi}/toughest/${quizId}`, { withCredentials: true });
      // console.log(data, "form toughest questions");
      setList(data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    if (quizId) {
      fetchingData();
    }
  }, [fetchingData]);

  return { list, loading };
};
