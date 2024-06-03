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

export const useAttemptUsers = (quizId) => {
  const [searchEmail, setSearchEmail] = useState("");
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });

  const fetchQuizAttempts = async () => {
    const response = await axios.get(`${reportApi}/attempter/${quizId}`, {
      params: {
        page: pagination?.page,
        pageSize: pagination?.pageSize,
        email: searchEmail,
      },
    });

    return response.data;
  };

  const { data, error, isLoading } = useQuery(
    ["quizAttempters", { page: pagination.page, pageSize: pagination.pageSize, email: searchEmail }],
    fetchQuizAttempts
  );

  const handleTableChange = (page, pageSize) => {
    setPagination((prev) => ({ ...prev, page, pageSize }));
  };

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  if (error) {
    return toast.error("There is an error while fetching data");
  }

  return {
    data: data,
    setSearchEmail,
    handleSearch,
    handleTableChange,
    loading: isLoading,
    pagination,
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
