// quiz Dashboard, and

import { useCallback, useEffect, useState } from "react";
import { reportApi } from "../helper/API";
import axios from "axios";
import { Errs } from "../helper/Errs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Alerting from "../App/components/common/Alerting";

export const useAttemptUsersTest = (quizId) => {
  const qClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ["attemptusers", quizId],
    () => axios.get(`${reportApi}/attempter/${quizId}`).then((res) => res.data.data),
    {
      staleTime: Infinity,
      enabled: !!quizId,
      onError: (error) => Errs(error),
    }
  );

  const deleteUserMutation = useMutation(({ id }) => axios.delete(`deleteuserapi/${id}`), {
    onSuccess: () => {
      Alerting({ msg: "user has been deleted!" });
      qClient.invalidateQueries("attemptusers");
    },
  });

  const deleteUser = (x) => {
    deleteUserMutation.mutate({ id });
  };

  return {
    data,
    isLoading,
  };
};

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
      const response = await axios.get(`${reportApi}/passing-ratio/${quizId}`);
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
      const { data } = await axios.get(`${reportApi}/toughest/${quizId}`);
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

export const useSummary = () => {
  const { data, isLoading } = useQuery(["statsSummary"], () => axios.get(`${reportApi}/?from=summary`).then((res) => res.data), {
    staleTime: Infinity,
    onError: (error) => Errs(error),
  });

  return {
    data,
    isLoading,
  };
};

export const useSummaryForGraph = () => {
  const { data, isLoading } = useQuery(["attemptSummary"], () => axios.get(`${reportApi}/?from=graph`).then((res) => res.data), {
    staleTime: Infinity,
    onError: (error) => Errs(error),
  });

  return {
    data,
    isLoading,
  };
};
