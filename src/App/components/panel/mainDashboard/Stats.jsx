import { AimOutlined, CheckOutlined, LoadingOutlined, } from "@ant-design/icons"
import Heading from "../../common/Heading"
import { Col, Row } from "antd"
import { MdOutlineDisabledByDefault, MdOutlineQuiz, MdOutlineRestartAlt } from "react-icons/md";
import { FaCheck, FaQuestion, FaStar } from "react-icons/fa";
import { TbStarOff } from "react-icons/tb";
import { LuClipboardCheck, LuListChecks } from "react-icons/lu";



export const SmallStatsBox = ({ title, number, icon }) => <div className="d-flex gap-2 mb-2" style={{ color: "#164e63" }}>
  <div className="p-2 rounded-2" style={{ border: "2px solid #164e63", }}>
    {icon}
  </div>
  <div className="d-flex flex-column">
    <b>{title}</b>
    <span>{number}</span>
  </div>
</div>

const Stats = ({ data, isLoading, data2 }) => {


  return (
    <div className="m-1 border-end  py-2 px-3" style={{ height: 480 }}>
      <Heading title={"Stats"} Icon={<AimOutlined className="its-icon" />} />
      {isLoading && <LoadingOutlined />}

      <Row>
        <Col md={12} lg={12} xs={12}>
          <SmallStatsBox title={"Total Quizzes"} number={data?.totalQuizzes || 0} icon={<MdOutlineQuiz size={18} />} />
          <SmallStatsBox title={"Questions"} number={data?.totalQuestions || 0} icon={<FaQuestion size={18} />} />
          <SmallStatsBox title={"Enabled Questions"} number={data?.enabledQuestions || 0} icon={<FaCheck size={18} />} />
          <SmallStatsBox title={"Disabled Questions"} number={data?.disabledQuestions || 0} icon={<MdOutlineDisabledByDefault size={18} />} />
          <SmallStatsBox title={"Attempters"} number={data?.totalAttempts || 0} icon={<MdOutlineRestartAlt size={18} />} />
          <SmallStatsBox title={"Pass Attempters"} number={data?.passAttempts || 0} icon={<FaStar size={18} />} />
          <SmallStatsBox title={"Fail Attempters"} number={data?.failAttempts || 0} icon={<TbStarOff size={18} />} />
        </Col>
        <Col md={12} lg={12} xs={12}>
          <SmallStatsBox title={"Total Surveys"} number={data2?.totalSurveys || 0} icon={<LuListChecks size={18} />} />
          <SmallStatsBox title={"Total Responses"} number={data2?.totalResponses || 0} icon={<LuClipboardCheck size={18} />} />
        </Col>
      </Row>


      {/* <div className="d-flex flex-column justify-content-start stats-box">
        <div className="box d-flex justify-content-start align-items-start _heading">
          <CheckOutlined className="its-icon" />
          <div>
            <span>Quizzes</span>
            <h4>{data?.totalQuizzes || 0}</h4>
          </div>
        </div>
        <div className="box d-flex justify-content-start align-items-start _heading">
          <CheckOutlined className="its-icon" />
          <div>
            <span>Questions</span>
            <h4>{data?.totalQuestions || 0}</h4>
          </div>
        </div>
        <div className="box d-flex justify-content-start align-items-start _heading">
          <CheckOutlined className="its-icon" />
          <div>
            <span>Attempters</span>
            <h4>{data?.totalAttempts || 0}</h4>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Stats