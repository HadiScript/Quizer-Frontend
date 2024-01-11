// this component if for starting, attempting and scoring and thanks page

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StartStep1 from "../../common-pages/quiz/start-step1";
import StartStep2 from "../../common-pages/quiz/start-step2";
import StartStep3 from "../../common-pages/quiz/start-step3";

import "../../../assets/css/Attempt.css";
import Timer from "../../common-pages/quiz/timer";

const AttemptingQuiz = () => {
  const { creatorId, quizId } = useParams();

  const initialStep = parseInt(sessionStorage.getItem("quizStep")) || 1;
  const initialAttemptId = sessionStorage.getItem("attemptId") || null;

  const [step, setStep] = useState(initialStep);
  const [attemptId, setAttemptId] = useState(initialAttemptId);

  const [remainingTime, setRemainingTime] = useState(null);
  const [userInputs, setUserInputs] = useState({});
  const [scrore, setScrore] = useState(null);

  useEffect(() => {
    const savedStep = sessionStorage.getItem("quizStep");
    const savedAttemptId = sessionStorage.getItem("attemptId");

    if (savedStep) setStep(parseInt(savedStep));
    if (savedAttemptId) setAttemptId(savedAttemptId);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("quizStep", step);
    if (attemptId) sessionStorage.setItem("attemptId", attemptId);
  }, [step, attemptId]);

  return (
    <>
      {step === 1 && (
        <StartStep1 step={step} setStep={setStep} creatorId={creatorId} quizId={quizId} setAttemptId={setAttemptId} userInputs={userInputs} setUserInputs={setUserInputs} />
      )}
      {step === 2 && attemptId !== "" && (
        <StartStep2 step={step} setStep={setStep} creatorId={creatorId} quizId={quizId} attemptId={attemptId} remainingTime={remainingTime} setRemainingTime={setRemainingTime} />
      )}
      {step === 3 && <StartStep3 step={step} setStep={setStep} />}
      {step !== 3 && <Timer remainingTime={remainingTime} />}
    </>
  );
};

export default AttemptingQuiz;
