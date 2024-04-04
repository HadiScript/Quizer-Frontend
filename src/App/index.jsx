import { Route, Routes } from "react-router-dom";
import Home from "./common-pages/Home";
import Login from "./common-pages/Login";
import Register from "./common-pages/Register";
import NotFound from "./common-pages/NotFound";
import SubscriberRoutes from "./panels/subscriber/SubscriberRoutes";
import CreateQuiz from "./panels/subscriber/CreateQuiz";
import AllQuizes from "./panels/subscriber/AllQuizes";
import QuizDetail from "./panels/subscriber/QuizDetail";
import StartingAttemptQuiz from "./common-pages/StartingAttemptQuiz";
import AttemptingQuestions from "./common-pages/AttemptingQuestions";
import Thankx from "./common-pages/Thankx";
import AttemptingQuiz from "./panels/subscriber/AttemptingQuiz";
import GlobalSettings from "./panels/subscriber/GlobalSettings";
import AttemptDashboard from "./panels/subscriber/AttemptDashboard";
import Attempters from "./panels/subscriber/Attempters";
import { useAuth } from "../context/authContext";
import AllQuestions from "./panels/subscriber/AllQuestions";
import SubscriberProfile from "./panels/subscriber/SubscriberProfile";
import SubscriberDashboard from "./panels/subscriber/Dashboard";
import CreateQuizAI from "./panels/subscriber/CreateQuizAI";
import { QuizzesProvider } from "../context/quizesContext";
import Pass from "./common-pages/pass";
import Fail from "./common-pages/fail";
import Templates from "./panels/subscriber/Templates";
import { _routes } from "../data/_routes";


const { home, login, register, AttemptQuiz, stripePass, stripeFail, subs, subsDashboard, profile, createQuiz, createQuizAi, Quizzes, SingleQuiz, AttemptersUser, AttemptsStats, Questions, globalSettings } = _routes;

const App = () => {


  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={'signin'} element={<Login />} />
      <Route path={register} element={<Register />} />
      {/* <Route path={stripePass} element={<Pass />} />
      <Route path={stripeFail} element={<Fail />} /> */}

      <Route path='/attempt-quiz/:creatorId/:quizId' element={<AttemptingQuiz />} />

      <Route path="/start-quiz/:creatorId/:quizId" element={<StartingAttemptQuiz />} />
      <Route path="/attempting-quiz/:creatorId/:quizId/:attemptId" element={<AttemptingQuestions />} />
      <Route path="/thank-you" element={<Thankx />} />


      {/* admin routes */}

      {/* subscriber routes */}
      <Route path={subs} element={<SubscriberRoutes />}>
        <Route path={subsDashboard} element={<SubscriberDashboard />} />
        <Route path={profile} element={<SubscriberProfile />} />

        <Route path={createQuiz} element={<CreateQuiz />} />
        <Route path={createQuizAi} element={<CreateQuizAI />} />
        <Route path={Quizzes} element={<AllQuizes />} />
        <Route path={SingleQuiz()} element={<QuizDetail />} />
        {/* <Route path="quize/:id/templates" element={<Templates />} /> */}
        {/* subscribe/quize/65c1d83b9ab27bb310d933f1 */}
        <Route path={AttemptersUser()} element={<Attempters />} />
        <Route path={AttemptsStats()} element={<AttemptDashboard />} />
        <Route path={globalSettings} element={<GlobalSettings />} />
        <Route path={Questions()} element={<AllQuestions />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
