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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />

      <Route path="/attempt-quiz/:creatorId/:quizId" element={<AttemptingQuiz />} />

      <Route path="/start-quiz/:creatorId/:quizId" element={<StartingAttemptQuiz />} />
      <Route path="/attempting-quiz/:creatorId/:quizId/:attemptId" element={<AttemptingQuestions />} />
      <Route path="/thank-you" element={<Thankx />} />

      {/* admin routes */}

      {/* subscriber routes */}
      <Route path="/subscribe" element={<SubscriberRoutes />}>
        <Route path="create-quiz" element={<CreateQuiz />} />
        <Route path="quizes" element={<AllQuizes />} />
        <Route path="quize/:id" element={<QuizDetail />} />
        <Route path="quize/:id/attempters" element={<Attempters />} />
        <Route path="quize/attempt/:id" element={<AttemptDashboard />} />
        <Route path="global-settings" element={<GlobalSettings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
