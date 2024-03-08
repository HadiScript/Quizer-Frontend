import { QuestionCircleOutlined } from "@ant-design/icons"
import { Alert, Card, Empty } from "antd"
import { Link } from "react-router-dom"
import { AllQuizLoading } from "../loadings"

const QuizGrid = ({ loading, list }) => {
  return (

    <>
      {loading ? <AllQuizLoading /> : list.length === 0 ? <Empty /> :
        list?.map((x) => (
          <Link to={`/subscribe/quize/${x._id}`} role="button" key={x._id} className="col-xs-12 col-md-4 mb-5 _link">
            <Card cover hoverable className={`${x.questions.length === 0 && "withoutQuestion"}`}>
              <h5>{x.title}</h5>
              <div className="d-flex justify-content-start align-items-center gap-2 ">
                <div>
                  <QuestionCircleOutlined />
                </div>
                <b>{x.questions.length}</b>
              </div>
            </Card>
            {x.questions.length === 0 && <Alert className="mt-3" message="Please add question." type="warning" showIcon />}
          </Link>
        ))
      }
    </>
  )
}

export default QuizGrid