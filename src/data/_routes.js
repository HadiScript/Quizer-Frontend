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
  Quizzes: "/subscribe/quizzes",
  SingleQuiz: (id = ":id") => `/subscribe/quizzes/${id}`,
  AttemptersUser: (id = ":id") => `/subscribe/quizzes/${id}/attempters`,
  AttemptsStats: (id = ":id") => `/subscribe/quizzes/attempt/${id}`,
  globalSettings: `/subscribe/global-settings`,
  Questions: (id = ":id") => `/subscribe/questions/${id}`,
  CreateHome: `/subscribe/my-home`,
  SingleHomePage: (slug = ":slug") => `/subscribe/my-home/${slug}`,

  createSurvey: "/subscribe/create-survey",
  surveys: "/subscribe/surveys",
  surveyDetail: (slug = ":slug") => `/subscribe/surveys/${slug}/detail`,
  serveyFields: (slug = ":slug") => `/subscribe/surveys/${slug}/fields`,
  serveyStats: (slug = ":slug") => `/subscribe/surveys/${slug}/stats`,
  serveyResponses: (slug = ":slug") => `/subscribe/surveys/${slug}/responses`,

  // surveys/66584372326767d33c44f5b7
};
