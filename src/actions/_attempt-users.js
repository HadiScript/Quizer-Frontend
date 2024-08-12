// quiz Dashboard, and

import { useCallback, useEffect, useState } from "react";
import { reportApi } from "../helper/API";
import axios from "axios";
import { Errs } from "../helper/Errs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Alerting from "../App/components/common/Alerting";
import toast from "react-hot-toast";

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

// OLD CODE
// export const useAttemptUsers = (quizId) => {
//   const [searchEmail, setSearchEmail] = useState("");
//   const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
//   const [dates, setDates] = useState([]);
//   const [minScore, setMinScore] = useState(null);
//   const [maxScore, setMaxScore] = useState(null);

//   const fetchQuizAttempts = async () => {
//     const response = await axios.get(`${reportApi}/attempter/${quizId}`, {
//       params: {
//         page: pagination?.page,
//         pageSize: pagination?.pageSize,
//         email: searchEmail,
//         startDate: dates.length > 0 ? dates[0] : undefined,
//         endDate: dates.length > 0 ? dates[1] : undefined,
//         minScore: minScore !== null ? minScore : undefined,
//         maxScore: maxScore !== null ? maxScore : undefined,
//       },
//     });

//     return response.data;
//   };

//   const { data, error, isLoading } = useQuery(
//     [
//       "quizAttempters",
//       {
//         page: pagination.page,
//         pageSize: pagination.pageSize,
//         email: searchEmail,
//         startDate: dates.length > 0 ? dates[0] : undefined,
//         endDate: dates.length > 0 ? dates[1] : undefined,
//         minScore: minScore !== null ? minScore : undefined,
//         maxScore: maxScore !== null ? maxScore : undefined,
//       },
//     ],
//     fetchQuizAttempts,
//     {
//       keepPreviousData: true, // Keeps previous data until new data is fetched
//     }
//   );

//   const handleTableChange = (page, pageSize) => {
//     setPagination((prev) => ({ ...prev, page, pageSize }));
//   };

//   const handleSearch = () => {
//     setPagination((prev) => ({ ...prev, page: 1 }));
//   };

//   if (error) {
//     return toast.error("There is an error while fetching data");
//   }

//   return {
//     data: data,
//     setSearchEmail,
//     handleSearch,
//     handleTableChange,
//     loading: isLoading,
//     pagination,
//     setDates,
//     setMinScore,
//     setMaxScore,
//   };
// };

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

// NEW CODE
export const useAttemptUsers = (quizId) => {
  const [searchEmail, setSearchEmail] = useState("");
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [dates, setDates] = useState([]);
  const [minScore, setMinScore] = useState(null);
  const [maxScore, setMaxScore] = useState(null);

  const fetchQuizAttempts = async ({ queryKey }) => {
    const [, { page, pageSize, email, startDate, endDate, minScore, maxScore }] = queryKey;

    const response = await axios.get(`${reportApi}/attempter/${quizId}`, {
      params: {
        page,
        pageSize,
        email: email || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        minScore: minScore !== null ? minScore : undefined,
        maxScore: maxScore !== null ? maxScore : undefined,
      },
    });

    return response.data;
  };

  const { data, error, isLoading, refetch } = useQuery(
    [
      "quizAttempters",
      {
        page: pagination.page,
        pageSize: pagination.pageSize,
        email: searchEmail,
        startDate: dates.length > 0 ? dates[0] : undefined,
        endDate: dates.length > 0 ? dates[1] : undefined,
        minScore: minScore !== null ? minScore : undefined,
        maxScore: maxScore !== null ? maxScore : undefined,
      },
    ],
    fetchQuizAttempts,
    {
      keepPreviousData: true, // Keeps previous data until new data is fetched
      staleTime: 5000, // Prevents refetching too frequently
    }
  );

  const handleTableChange = (page, pageSize) => {
    setPagination({ page, pageSize });
  };

  const handleSearch = () => {
    setPagination({ page: 1, pageSize: pagination.pageSize }); // Reset to first page
    refetch(); // Trigger refetch with new parameters
  };

  const reset = () => {
    setDates([]);
    setMinScore(null);
    setMaxScore(null);
    setSearchEmail("");
  };

  if (error) {
    toast.error("There is an error while fetching data");
  }

  return {
    data: data,
    setSearchEmail,
    handleSearch,
    handleTableChange,
    loading: isLoading,
    pagination,
    setDates,
    setMinScore,
    setMaxScore,
    reset,
  };
};

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

export const usePerQuizAvgTime = (quizId) => {
  const { data, isLoading } = useQuery(
    ["perQuizAvgTime", quizId],
    () => axios.get(`${reportApi}/avg-time/${quizId}`).then((res) => res.data),
    {
      staleTime: Infinity,
      enabled: !!quizId,
      onError: (error) => Errs(error),
    }
  );

  console.log(data, "here is the thins");

  return {
    data,
    isLoading,
  };
};

export const useCompletionRate = (quizId) => {
  const { data, isLoading } = useQuery(
    ["perQuizCompleteionRate", quizId],
    () => axios.get(`${reportApi}/completion-rate/${quizId}`).then((res) => res.data),
    {
      staleTime: Infinity,
      enabled: !!quizId,
      onError: (error) => Errs(error),
    }
  );

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
