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
  const [searchEmail, setSearchEmail] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const fetchQuizAttempts = async ({ queryKey }) => {
    const [_key, { page, pageSize, email }] = queryKey;
    const response = await axios.get(`${reportApi}/attempter/${quizId}`, {
      params: {
        page,
        pageSize,
        email,
      },
    });
    return response.data;
  };

  const { data, error, isLoading, isFetching } = useQuery(
    ["quizAttempters", { page: pagination.current, pageSize: pagination.pageSize, email: searchEmail }],
    fetchQuizAttempts,
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      onSuccess: (data) => {
        setPagination((prev) => ({ ...prev, total: data.total }));
      },
    }
  );

  const handleTableChange = (page) => {
    setPagination((prev) => ({ ...prev, current: page }));
  };

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  return {
    data: data?.data || [],
    setSearchEmail,
    handleSearch,
    handleTableChange,
    loading: isLoading || isFetching,
    pagination,
    error,
  };
};

// export const useAttemptUsers = (quizId) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchEmail, setSearchEmail] = useState("");
//   const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

//   useEffect(() => {
//     if (quizId) {
//       fetchQuizAttempts();
//     }
//   }, [pagination.current, pagination.pageSize, searchEmail]);

//   const fetchQuizAttempts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${reportApi}/attempter/${quizId}`, {
//         params: {
//           page: pagination.current,
//           pageSize: pagination.pageSize,
//           email: searchEmail,
//         },
//       });
//       setData(response.data.data);
//       setPagination({ ...pagination, total: response.data.total });
//     } catch (error) {
//       Errs(error);
//     }
//     setLoading(false);
//   };

//   const handleTableChange = (x) => {
//     setPagination((pre) => ({ ...pre, current: x }));
//   };

//   const handleSearch = () => {
//     setPagination({ ...pagination, current: 1 });
//     fetchQuizAttempts();
//   };

//   return {
//     data,
//     setSearchEmail,
//     handleSearch,
//     handleTableChange,
//     loading,
//     pagination,
//   };
// };

export const useToughestQuestions = (quizId) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchingData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${reportApi}/toughest/${quizId}`);
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

export const usePerQuizSummary = (quizId) => {
  const { data, isLoading } = useQuery(["perQuizSummary", quizId], () => axios.get(`${reportApi}/${quizId}`).then((res) => res.data), {
    staleTime: Infinity,
    enabled: !!quizId,
    onError: (error) => Errs(error),
  });

  return {
    data,
    isLoading,
  };
};

// Main dashboard
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
