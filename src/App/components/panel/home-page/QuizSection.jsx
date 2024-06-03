import QuizGrid from "../QuizGrid"

const QuizSection = ({ values }) => {
  return (
    <div className="container mt-5" style={{ width: "100%" }}>
      <div className="d-flex justify-content-center flex-column align-items-center mb-3">
        <h3>{values?.quizSection?.title}</h3>
        <p>{values?.quizSection?.description}</p>
      </div>
      <div className="row">
        <QuizGrid list={values?.quizzes} loading={false} from="CustomHomePage" />
      </div>
    </div>
  )
}

export default QuizSection