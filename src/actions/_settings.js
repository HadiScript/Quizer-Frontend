import { useEffect, useState } from "react";
import { Errs } from "../helper/Errs";
import axios from "axios";
import { quizApi, userApi } from "../helper/API";
import { useAuth } from "../context/authContext";
import Alerting from "../App/components/common/Alerting";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const _useGlobalSettings = () => {
  const [auth] = useAuth();

  const queryClient = useQueryClient();

  const [_settings, _setSettings] = useState({
    mode: "",
    passingScore: 0,
    scoringType: "",
    showScore: null,
  });

  const { data, isLoading } = useQuery(
    ["globalSettings"],
    () => axios.get(`${userApi}/g/settings`, { withCredentials: true }).then((res) => res.data.globalSettings),
    {
      staleTime: Infinity,
      onError: (error) => Errs(error),
    }
  );

  useEffect(() => {
    if (data) {
      _setSettings(data);
    }
  }, [data]);

  const addQuizSettingsMutation = useMutation(() => axios.put(`${userApi}/g/settings`, _settings, { withCredentials: true }), {
    onSuccess: () => {
      Alerting({ msg: "Quiz setting updated!" });
      queryClient.invalidateQueries(["globalSettings"]);
    },
    onError: (error) => Errs(error),
  });

  const onFinish = () => {
    addQuizSettingsMutation.mutate();
  };

  return { onFinish, loading: isLoading || addQuizSettingsMutation?.isLoading, _settings, _setSettings };
};

let initSettings = {
  quizAvailability: {
    //pre
    start: null,
    end: null,
  },
  displaySetting: "", //pre
  mode: "",
  passingScore: 0,
  scoringType: "", //pre
  showScore: false, // pre
  showCertificate: false,
  certificateId: "",
};

export const _useQuizSettings = (quizId) => {
  const queryClient = useQueryClient();
  const [_settings, _setSettings] = useState(initSettings);
  const [loading, setLoading] = useState(false);

  const { data, isLoading } = useQuery(
    ["quizSettings", quizId],
    () => axios.get(`${quizApi}/s/${quizId}`, { withCredentials: true }).then((res) => res.data.settings),
    {
      staleTime: Infinity,
      enabled: !!quizId,
      onError: (error) => Errs(error),
    }
  );

  useEffect(() => {
    if (data) {
      _setSettings(data.settings);
    }
  }, [data]);

  const addQuizSettingsMutation = useMutation(({ id }) => axios.put(`${quizApi}/s/${id}`, _settings, { withCredentials: true }), {
    onSuccess: () => {
      Alerting({ msg: "Quiz setting updated!" });
      queryClient.invalidateQueries(["quizSettings", quizId]);
    },
    onError: (error) => Errs(error),
  });

  const addQuizSettings = (id) => {
    addQuizSettingsMutation.mutate({ id });
  };

  return {
    loading: addQuizSettingsMutation.isLoading,
    _settings,
    _setSettings,
    addQuizSettings,
  };
};
