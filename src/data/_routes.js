export const _routes = {
  home: "/",
  login: "/signin",
  register: "/signup",

  AttemptQuiz: (creatorId = ":creatorId", quizId = ":quizId") => `/attempt-quiz/${creatorId}/${quizId}`,

  stripePass: "/pass?",
  stripeFail: "/fail",

  // subscriber
  subs: "/subscribe",
  subsDashboard: "/subscribe/",
  profile: "/subscribe/profile",

  createQuiz: "/subscribe/create-quiz",
  createQuizAi: "/subscribe/create-quiz-ai",
  Quizzes: "/subscribe/quizes",
  SingleQuiz: (id = ":id") => `/subscribe/quize/${id}`,
  AttemptersUser: (id = ":id") => `/subscribe/quize/${id}/attempters`,
  AttemptsStats: (id = ":id") => `/subscribe/quize/attempt/${id}`,
  globalSettings: `/subscribe/global-settings`,
  Questions: (id = ":id") => `/subscribe/questions/${id}`,
};
