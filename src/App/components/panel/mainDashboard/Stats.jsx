import { AimOutlined, CheckOutlined, LoadingOutlined, } from "@ant-design/icons"
import Heading from "../../common/Heading"

const Stats = ({data, isLoading}) => {
  

  return (
    <div className="m-1 border rounded-3 py-2 px-3" style={{ height: 450 }}>
      <Heading title={"Stats"} Icon={<AimOutlined className="its-icon" />} />
      {isLoading && <LoadingOutlined />}
      <div className="d-flex flex-column justify-content-start stats-box">
        <div className="box d-flex justify-content-start align-items-start _heading">
          <CheckOutlined className="its-icon" />
          <div>
            <span>Quizzes</span>
            <h4>{data?.summary?.totalQuizzes || 0}</h4>
          </div>
        </div>
        <div className="box d-flex justify-content-start align-items-start _heading">
          <CheckOutlined className="its-icon" />
          <div>
            <span>Questions</span>
            <h4>{data?.summary?.totalQuestions || 0}</h4>
          </div>
        </div>
        <div className="box d-flex justify-content-start align-items-start _heading">
          <CheckOutlined className="its-icon" />
          <div>
            <span>Attempters</span>
            <h4>{data?.summary?.totalAttempts || 0}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats