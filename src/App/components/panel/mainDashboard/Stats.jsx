import { LoadingOutlined, } from "@ant-design/icons"
import { Card, Col, Row } from "antd"
import { TbStarOff } from 'react-icons/tb'
import { LuListChecks, LuClipboardCheck } from 'react-icons/lu'
import { MdOutlineDisabledByDefault, MdOutlineQuiz, MdOutlineRestartAlt } from "react-icons/md";
import { FaCheck, FaQuestion, FaStar } from "react-icons/fa";
import QuizPerAttempts from "./Scatter";





export const SmallStatsBox = ({ title, number, icon }) => <Card className="" hoverable style={{ borderLeft: "1px solid ", marginRight: "5px" }}>
  <div className="d-flex flex-column gap-1 " style={{ color: "#164e63" }}>
    {icon}
    <div className="d-flex  justify-content-between align-items-center">
      <span style={{ fontSize: "18px", fontWeight: "bold" }}>{title}</span>
      <h4 >{number}</h4>
    </div>
  </div>
</Card>

const Stats = ({ data, isLoading, data2, srvyGraphData, quizGraphData }) => {


  return (
    <div >

      {isLoading && <LoadingOutlined />}

      <Row>
        {/* STATS */}

        <Col md={6} lg={6} xs={24} className="mt-2">
          <SmallStatsBox title={"Total Quizzes"} number={data?.totalQuizzes || 0} icon={<MdOutlineQuiz size={22} />} />
        </Col>
        <Col md={6} lg={6} xs={24} className="mt-2">
          <SmallStatsBox title={"Questions"} number={data?.totalQuestions || 0} icon={<FaQuestion size={22} />} />
        </Col>
        <Col md={6} lg={6} xs={24} className="mt-2">
          <SmallStatsBox title={"Enabled Questions"} number={data?.enabledQuestions || 0} icon={<FaCheck size={22} />} />
        </Col>
        <Col md={6} lg={6} xs={24} className="mt-2">
          <SmallStatsBox title={"Disabled Questions"} number={data?.disabledQuestions || 0} icon={<MdOutlineDisabledByDefault size={22} />} />
        </Col>


        {/* CAHRTS */}
        <Col md={12} lg={12} xs={24} className="my-3 ">
          <div className="bg-white p-3 rounded-3" style={{ height: 300 , marginRight : "5px"}}>
            <QuizPerAttempts title="Survey Per Attempts" data={srvyGraphData} from="srvy" primaryColor="#083344" secondaryColor="#71717a" />
          </div>
        </Col>

        <Col md={12} lg={12} xs={24} className="my-3">
          <div className="bg-white p-3 rounded-3" style={{ height: 300 }}>
            <QuizPerAttempts title="Quiz Per Attempts" data={quizGraphData} from="srvy" primaryColor="#083344" secondaryColor="#71717a" />
          </div>
        </Col>


        {/* STATS */}

        <Col md={6} lg={6} xs={24} className="mt-2" >
          <SmallStatsBox title={"Pass Attempters"} number={data?.passAttempts || 0} icon={<FaStar size={18} />} />
        </Col>
        <Col md={6} lg={6} xs={24} className="mt-2">
          <SmallStatsBox title={"Fail Attempters"} number={data?.failAttempts || 0} icon={<TbStarOff size={18} />} />
        </Col>

        <Col md={6} lg={6} xs={24} className="mt-2">
          <SmallStatsBox title={"Total Surveys"} number={data2?.totalSurveys || 0} icon={<LuListChecks size={18} />} />
        </Col>
        <Col md={6} lg={6} xs={24} className="mt-2">
          <SmallStatsBox title={"Total Responses"} number={data2?.totalResponses || 0} icon={<LuClipboardCheck size={18} />} />
        </Col>

        {/* 
        <Col md={6} lg={6} xs={12}>
          <SmallStatsBox title={"Disabled Questions"} number={data?.disabledQuestions || 0} icon={<MdOutlineDisabledByDefault size={22} />} />
        </Col> */}


        {/* <SmallStatsBox title={"Attempters"} number={data?.totalAttempts || 0} icon={<MdOutlineRestartAlt size={18} />} />
        <SmallStatsBox title={"Pass Attempters"} number={data?.passAttempts || 0} icon={<FaStar size={18} />} />
        <SmallStatsBox title={"Fail Attempters"} number={data?.failAttempts || 0} icon={<TbStarOff size={18} />} /> 
        */}
        {/* <Col md={12} lg={12} xs={12}>
          <SmallStatsBox title={"Total Surveys"} number={data2?.totalSurveys || 0} icon={<LuListChecks size={18} />} />
          <SmallStatsBox title={"Total Responses"} number={data2?.totalResponses || 0} icon={<LuClipboardCheck size={18} />} />
        </Col> */}
      </Row>



    </div>
  )
}

export default Stats