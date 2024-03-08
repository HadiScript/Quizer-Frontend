import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { quizApi } from "../helper/API";

const QuizzesContext = createContext();

export const QuizzesProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  // done
  const fetchingMyQuizes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${quizApi}/all`, {});
      setList(res.data.quizzes);
    } catch (error) {
      Errs(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchingMyQuizes();
  }, [fetchingMyQuizes]);

  return (
    <QuizzesContext.Provider value={{ list, loading }}>
      {children}
    </QuizzesContext.Provider>
  );
};

export const useQuizzes = () => useContext(QuizzesContext);