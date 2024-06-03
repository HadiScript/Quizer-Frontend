import axios from "axios";
import toast from "react-hot-toast";
import { homeApi } from "../helper/API";
import { useMutation, useQuery } from "react-query";
import { Errs } from "../helper/Errs";
import { useEffect, useState } from "react";

export const useGetHomesPages = () => {
  const { data, isLoading } = useQuery("getMyHomePages", () => axios.get(`${homeApi}/mine`).then((res) => res.data), {
    onError: (error) => Errs(error),
  });

  return {
    data,
    isLoading,
  };
};

export const useHomePageQuizzes = () => {
  const { data, isLoading } = useQuery("forHomePageQuizzes", () => axios.get(`${homeApi}/all-quizzes`).then((res) => res.data?.quizzes), {
    onError: (error) => Errs(error),
  });

  return {
    data,
    isLoading,
  };
};

export const useCreateHomePage = () => {
  const createHomePage = async (values) => {
    try {
      const { data } = await axios.post(`${homeApi}/create`, { title: values.title }, { withCredentials: true });
      toast.success("Home page created");
      return data;
    } catch (error) {
      console.log(error);
      Errs(error);
    }
  };

  const { mutateAsync: create, isLoading } = useMutation(createHomePage);

  return {
    create,
    isLoading,
  };
};

const initValues = {
  showHeader: false,
  header: {
    justify: "between",
    gap: 2,
    container: false,
    bgColor: "#fff",
    textColor: "black",
    showSocialLinks: false,
    socialLinksGap: 5,
    instagram: { show: false, link: "" },
    facebook: { show: false, link: "" },
    twitter: { show: false, link: "" },
    linkedin: { show: false, link: "" },
  },
  showBanner: false,
  banner: {
    height: 400,
    bannerBgColor: "purple",
    bannerTextColor: "white",
    border: true,
    borderRadius: 2,
    bannerContainer: true,
    text: "Hello Thisanner From Hadi Raza",
    para: " In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a",
  },
  quizzes: [],
  quizSection: {
    title: "",
    description: "",
  },
};

export const useEditHomePage = (Slug) => {
  const [values, setValues] = useState(initValues);

  const { data, isLoading: fetchingLoading } = useQuery(
    ["getMySingleHomePages", Slug],
    () => axios.get(`${homeApi}/mine-one/${Slug}`).then((res) => res.data),
    {
      onError: (error) => Errs(error),
    }
  );

  useEffect(() => {
    if (data?.settings) setValues(data?.settings);
    if (data?.quizzes) setValues((prev) => ({ ...prev, quizzes: data?.quizzes }));
    console.log(data, "here is hte data ");
  }, [data]);

  const editHomePage = async () => {
    try {
      const { data } = await axios.put(`${homeApi}/edit/${Slug}`, values, { withCredentials: true });
      toast.success("Home page edit");
      return data;
    } catch (error) {
      console.log(error);
      Errs(error);
    }
  };

  const { mutateAsync: edit, isLoading } = useMutation(editHomePage);

  return {
    edit,
    isLoading,
    values,
    setValues,
    fetchingLoading,
  };
};
