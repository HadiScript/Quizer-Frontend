import { _routes } from "./_routes";
const {
  home,
  login,
  register,
  AttemptQuiz,
  stripePass,
  stripeFail,
  subs,
  subsDashboard,
  profile,
  createQuiz,
  createQuizAi,
  Quizzes,
  SingleQuiz,
  AttemptersUser,
  AttemptsStats,
  Questions,
  globalSettings,
} = _routes;

export const _searching = [
  {
    question: "How to add a question?",
    route: Quizzes,
  },
  {
    question: "Quizzes",
    route: Quizzes,
  },
];
