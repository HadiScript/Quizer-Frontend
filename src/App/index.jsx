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
import CreateHomePage from "./panels/subscriber/CreateHomePage";
import DetailHomePage from "./panels/subscriber/DetailHomePage";
import { theme } from "antd";
import CreateSurvey from "./panels/subscriber/survey/CreateSurvey";
import Surveys from "./panels/subscriber/survey/Surveys";
import SurveyDetail from "./panels/subscriber/survey/SurveyDetail";
import FieldsForm from "./components/panel/survey/FieldsForm";
import SrvyFields from "./panels/subscriber/survey/SrvyFields";
import SrvyAttempt from "./common-pages/survey/SrvyAttempt";
import SrvyStats from "./panels/subscriber/survey/SrvyStats";
import Responses from "./panels/subscriber/survey/Responses";
import HowItWorksPage from "./common-pages/HowItWorksPage";
import PrivacyAndPolicy from "./common-pages/Privacy-and-policy";
import Disclaimer from "./common-pages/Disclaimer";
import DmcaPolicy from "./common-pages/DmcaPolicy";
import TermAndConditions from "./common-pages/TermAndConditions";
import TemplatePreview from "./common-pages/templates/TemplatePreview";
import ScrollToTop from "../helper/ScrollToTop";


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
  CreateHome,
  SingleHomePage,
  createSurvey,
  surveys,
  surveyDetail,
  serveyFields,
  serveyStats,
  serveyResponses
} = _routes;

const App = () => {


  return (

    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/privacy-and-policy" element={<PrivacyAndPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/dmca-policy" element={<DmcaPolicy />} />
        <Route path="/terms-and-conditions" element={<TermAndConditions />} />
        <Route path="/template-preview/:slug/:id" element={<TemplatePreview />} />


        <Route path={'signin'} element={<Login />} />
        <Route path={register} element={<Register />} />
        <Route path={stripePass} element={<Pass />} />
        <Route path={stripeFail} element={<Fail />} />


        {/* attempts */}
        <Route path='/attempt-quiz/:creatorId/:quizId' element={<AttemptingQuiz />} />
        <Route path='/attempt-survey/:slug/:id' element={<SrvyAttempt />} />

        <Route path="/thank-you" element={<Thankx />} />


        {/* admin routes */}

        {/* subscriber routes */}
        <Route path={subs} element={<SubscriberRoutes />}>
          <Route path={subsDashboard} element={<SubscriberDashboard />} />
          <Route path={profile} element={<SubscriberProfile />} />
          {/* <Route path={CreateHome} element={<CreateHomePage />} /> */}
          <Route path={SingleHomePage()} element={<DetailHomePage />} />

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


          <Route path={createSurvey} element={<CreateSurvey />} />
          <Route path={surveys} element={<Surveys />} />

          <Route path={surveyDetail()} element={<SurveyDetail />} />
          <Route path={serveyFields()} element={<SrvyFields />} />
          <Route path={serveyStats()} element={<SrvyStats />} />
          <Route path={serveyResponses()} element={<Responses />} />


        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes >
      <ScrollToTop />
    </>

  );
};

export default App;
