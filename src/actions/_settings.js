import { useEffect, useState } from "react";
import { Errs } from "../helper/Errs";
import axios from "axios";
import { quizApi, userApi } from "../helper/API";
import { useAuth } from "../context/authContext";
import Alerting from "../App/components/common/Alerting";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const _useGlobalSettings = () => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;

  const [_settings, _setSettings] = useState({
    mode: "",
    passingScore: 0,
    scoringType: "",
    showScore: null,
  });

  const [loading, setLoading] = useState(false);

  const gettingGlobalSettings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${userApi}/g/settings`, {});
      if (res.status === 201) {
        _setSettings(res.data.globalSettings);
      }
    } catch (error) {
      Errs(error);
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      gettingGlobalSettings();
    }
  }, [authToken]);

  const onFinish = async () => {
    setLoading(true);
    try {
      const res = await axios.put(`${userApi}/g/settings`, _settings, {});
      if (res.status === 200) {
        Alerting({ msg: "Setting updated!", type: "success" });
        gettingGlobalSettings();
      }
    } catch (error) {
      Errs(error);
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { onFinish, loading, _settings, _setSettings };
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
