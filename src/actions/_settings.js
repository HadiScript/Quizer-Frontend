import { useEffect, useState } from "react";
import { Errs } from "../helper/Errs";
import axios from "axios";
import { API } from "../helper/API";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";
import moment from "moment";

export const _useGlobalSettings = () => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;

  const [_settings, _setSettings] = useState({
    quizTimer: 0,
    mode: "",
    passingScore: 0,
    scoringType: "",
    showScore: null,
  });

  const [loading, setLoading] = useState(false);

  const gettingGlobalSettings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/auth/settings`);
      if (res.status === 201) {
        _setSettings(res.data.globalSettings);
      }
    } catch (error) {
      Errs(error);
      console.log(error);
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
    // console.log(_settings);
    // return;
    setLoading(true);
    try {
      const res = await axios.put(`${API}/auth/settings`, _settings);
      if (res.status === 200) {
        toast.success(res.data.message);
        gettingGlobalSettings();
      }
    } catch (error) {
      Errs(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { onFinish, loading, _settings, _setSettings };
};

let initSettings = {
  quizTimer: 0,
  quizAvailability: {
    start: null,
    end: null,
  },
  displaySetting: "",
  mode: "",
  passingScore: 0,
  scoringType: "",
  showScore: false,
};

export const _useQuizSettings = (quizId) => {
  const [auth] = useAuth();

  const [_settings, _setSettings] = useState(initSettings);
  const [loading, setLoading] = useState(false);

  const fetchingQuizSettings = async (x) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/quiz/settings/${x}`);
      if (res.status === 200) {
        const fetchedSettings = res.data.settings;
        // _setSettings({
        //   ...fetchedSettings,
        //   quizAvailability: {
        //     ...fetchedSettings.quizAvailability,
        //     start: fetchedSettings.quizAvailability.start ? moment(fetchedSettings.quizAvailability.start) : null,
        //     end: fetchedSettings.quizAvailability.end ? moment(fetchedSettings.quizAvailability.end) : null,
        //   },
        // });

        _setSettings(fetchedSettings);
      }
    } catch (error) {
      console.log(error);
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token && quizId) {
      fetchingQuizSettings(quizId);
    }
  }, [auth?.token, quizId]);

  const addQuizSettings = async (x) => {
    // console.log(_settings);
    // return;

    setLoading(true);

    // const updatedSettings = {
    //   ..._settings,
    //   quizAvailability: {
    //     start: dateRange[0] ? dateRange[0].toISOString() : null,
    //     end: dateRange[1] ? dateRange[1].toISOString() : null,
    //   },
    // };

    try {
      const res = await axios.put(`${API}/quiz/settings/${x}`, _settings);
      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      Errs(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    _settings,
    _setSettings,
    addQuizSettings,
  };
};
