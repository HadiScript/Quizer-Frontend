import { useState, useEffect, createContext, useContext } from "react";

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  return <QuizContext.Provider value={{ hasStarted, setHasStarted, hasFinished, setHasFinished }}>{children}</QuizContext.Provider>;
};

export const useQuizContext = () => useContext(QuizContext);

export default QuizProvider;
