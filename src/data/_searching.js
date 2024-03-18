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
    name: "User Dashboard",
    description: "User Dashboard | Summary | Attempt of each quiz",
    route: subsDashboard,
  },

  {
    name: "All Quizzes",
    description: "All Quizzes | Quiz Dashboard | Quiz Summary | Quiz's Questions | Quiz's Settings",
    route: Quizzes,
  },
  {
    name: "Create Quiz",
    description: "Create Quiz manually",
    route: createQuiz,
  },
  {
    name: "Create Quiz With AI",
    description: "Create Quiz with AI",
    route: createQuizAi,
  },
  {
    name: "Global Settings",
    description: "Global Settings | Passing Score | Quiz Mode | Show Score? | Scoring Type",
    route: globalSettings,
  },
  {
    name: "Upload Logo",
    description: "Upload Logo | Upload your logo",
    route: globalSettings,
  },
  {
    name: "Questions",
    description: "Add Questions | Reorder Questions | Toughest Questions",
    route: Quizzes,
  },
];
