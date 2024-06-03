import axios from "axios";
import { surveyApi } from "../helper/API";
import { Errs } from "../helper/Errs";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSurveyCreate = () => {
  const queryClient = useQueryClient();
  const create = async (values) => {
    console.log(values, "create survey");
    const { data } = await axios.post(`${surveyApi}/create`, values, { withCredentials: true });
    return data;
  };

  const { mutate: createSurvey, isLoading, isSuccess, error } = useMutation(create, {});

  if (isSuccess) {
    queryClient.invalidateQueries(["mySurveys"]);
    toast.success("Survey created!");
  }

  if (error) {
    console.log(error);
    Errs(error);
  }

  return {
    createSurvey,
    isLoading,
  };
};

export const useGetSurveys = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });

  const fetchMySurveys = async () => {
    const { data } = await axios.get(
      `${surveyApi}/`,
      {
        params: {
          page: pagination?.page,
          pageSize: pagination?.pageSize,
          search,
        },
      },
      { withCredentials: true }
    );
    return data;
  };

  const { data, isLoading } = useQuery(["mySurveys", { page: pagination.page, pageSize: pagination.pageSize, search }], fetchMySurveys, {
    staleTime: Infinity,
  });

  const handleTableChange = (page, pageSize) => {
    setPagination((prev) => ({ ...prev, page, pageSize }));
  };

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return { data, setSearch, handleSearch, handleTableChange, loading: isLoading, pagination };
};

export const useBasicInfoServey = (slug) => {
  const fetchData = async () => {
    const { data } = await axios.get(`${surveyApi}/${slug}`);
    return data;
  };

  const { data, isLoading, error } = useQuery("surveyBasicInfo", fetchData, {
    enabled: !!slug,
    staleTime: Infinity,
  });

  if (error) {
    console.log(error);
    Errs(error);
  }

  return {
    data,
    isLoading,
  };
};

export const useServeyFields = (slug) => {
  const fetchData = async () => {
    const { data } = await axios.get(`${surveyApi}/${slug}/fields`);
    return data;
  };

  const { data, isLoading, error } = useQuery("surveyFields", fetchData, {
    enabled: !!slug,
    staleTime: Infinity,
  });

  if (error) {
    console.log(error);
    Errs(error);
  }

  return {
    data,
    isLoading,
  };
};

export const useUpdateBasicInfo = (slug) => {
  const queryClient = useQueryClient();
  const update = async (values) => {
    const { data } = await axios.put(`${surveyApi}/${slug}`, values, { withCredentials: true });
    return data;
  };

  const {
    mutate: updateSurvey,
    isLoading,
    isSuccess,
    error,
  } = useMutation(update, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["surveyBasicInfo", slug]);
      toast.success("Survey updated!");
    },
    onError: (error) => {
      console.log(error);
      Errs(error); // Make sure `Errs` function properly sets error messages
    },
  });

  return {
    updateSurvey,
    isLoading,
  };
};

export const useUpdateSurveyFields = (slug) => {
  const queryClient = useQueryClient();

  const update = async (values) => {
    const { data } = await axios.put(`${surveyApi}/update-fields/${slug}`, { fields: values }, { withCredentials: true });
    return data;
  };

  const { mutate: updateSurveyFields, isLoading } = useMutation(update, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["surveyFields", slug]);
      toast.success("Fields updated!");
    },
    onError: (error) => {
      console.log(error);
      Errs(error); // Make sure `Errs` function properly sets error messages
    },
  });

  return {
    updateSurveyFields,
    isLoading,
  };
};

// ATTEMPTING THE SURVEY

export const _useFields = (slug, id) => {
  const fetchData = async () => {
    const { data } = await axios.get(`${surveyApi}/attempt/${slug}/${id}`);
    return data;
  };

  const { data, isLoading, error, isError } = useQuery(["attemptingFields", slug, id], fetchData, {
    enabled: !!slug && !!id, // Ensure both slug and id are non-null/non-undefined
    // staleTime: Infinity,
  });

  if (isError) {
    console.log(error); // Log the error
    Errs(error); // Assume Errs is a function to handle errors globally or show error messages
  }

  return {
    data,
    isLoading,
  };
};

export const _useSubmitSurvey = (slug, id) => {
  const queryClient = useQueryClient();
  const router = useNavigate();

  const submit = async (values) => {
    const { data } = await axios.post(`${surveyApi}/submit/${slug}/${id}`, { responses: values });
    return data;
  };

  const { mutate: submiting, isLoading } = useMutation(submit, {
    onSuccess: (data) => {
      // queryClient.invalidateQueries(["surveyFields", slug]);
      // sessionStorage.setItem("serveySubmittedId", data?.responseId);
      router("/thank-you");
      toast.success("Response submitted successfully");
    },
    onError: (error) => {
      console.log(error);
      Errs(error);
    },
  });

  // console.log(data?.responseId, "here is the thing");

  return {
    submiting,
    isLoading,
  };
};
