import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Errs } from "../helper/Errs";

export const useFetchList = (queryKey, fetchUrl) => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get(fetchUrl);
      return data;
    } catch (error) {
      Errs(error);
    }
  };

  return useQuery(queryKey, fetchData);
};

export const useFetchOne = (queryKey, fetchUrl, id) => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get(fetchUrl);
      return data;
    } catch (error) {
      Errs(error);
    }
  };

  return useQuery({ queryKey, queryFn: fetchData, enabled: !!id });
};
