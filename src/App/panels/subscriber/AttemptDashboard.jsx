import { useState } from "react";
import SubcriberLayout from "../../components/layouts/Layout";
// import Heading from "../../components/common/Heading";
import {
  // AimOutlined,
  // AppstoreOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";
import { Button, Card, Col, Grid, Row } from "antd";
import { MdSportsScore } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";





import { useParams } from "react-router-dom";
import {
  //  useCompletionRate,
  usePerQuizAvgTime, usePerQuizSummary
} from "../../../actions/_attempt-users";
import {
  QuizAttempTrend,
  // QuizAttemptStats
} from "../../components/panel/quiz-dashboard";
import AttemptUserTable from "../../components/panel/AttemptUserTable";
import BgHeading from "../../components/common/BgHeading";
// import { SmallStatsBox } from "../../components/panel/mainDashboard/Stats";
// import { TbTimeDuration0 } from "react-icons/tb";
import PeiChartPassOrFail from "../../components/panel/PeiChartPassOrFail";
import { _useQuizModifications } from "../../../actions/_quiz";


const ItsStats = ({ title, number, icon }) => {
  return (
    <div className="bg-white d-flex flex-column gap-2 align-items-start rounded p-3 border-bottom" style={{ height: "90px" }}>
      <div> {icon}</div>
      <div className="d-flex flex-row justify-content-between " style={{ width: "100%" }} >
        <div className=""><b>{title}</b></div>
        <div >{number}</div>
      </div>
    </div>
  )
}

const AttemptDashboard = () => {
  const { id } = useParams();
  // const points = Grid.useBreakpoint();
  // const [expand, setExpand] = useState(false);
  const [expandTrend, setExpandTrend] = useState(false);
  const { data, isLoading } = usePerQuizSummary(id)

  const { quizData, loading } = _useQuizModifications(id);





  const { data: avgTimeData, isLoading: avgLoading } = usePerQuizAvgTime(id)


  return (
    <SubcriberLayout from="quiz-detail" id={id} >

      <BgHeading title={loading ? "..." : quizData?.title} desc={"Analyze quiz results easily through these graphical representations."} />
      {/* <div className="d-flex justify-content-end mb-2 mt-4">
        <Button icon={<ClockCircleOutlined />} type="dashed">Average Time Spent: <b className="mx-2">{avgTimeData?.averageTimeSpent}</b></Button>
      </div> */}


      <Row className="mt-4">
        <Col lg={16} xs={24} className="">
          <Row className="">
            <Col lg={12} xs={24} className="">
              <div className="p-2 d-flex flex-column gap-3">
                <ItsStats title={"Average score"} number={data?.averageScore?.toFixed(2) + "%"} icon={<MdSportsScore size={25} />} />
                <ItsStats title={"Total Attempts"} number={data?.totalAttempts} icon={<FaCheckDouble size={25} />} />
                <ItsStats title={"Average Time Spent"} number={avgTimeData?.averageTimeSpent} icon={<MdAccessTime size={25} />} />
              </div>
            </Col>

            <Col lg={12} xs={24} className="px-1  mt-1">
              <div className="bg-white border rounded-3">
                <PeiChartPassOrFail resultForPeiChart={data?.result} />
              </div>
            </Col>

            <Col className="bg-white px-1 mt-2 border rounded-3" lg={24} xs={24}>
              <QuizAttempTrend attempts={data?.attempts} expandTrend={expandTrend} setExpandTrend={setExpandTrend} />
            </Col>
          </Row>
        </Col>
        <Col lg={8} xs={24} className="px-2">
          <div className="bg-white px-1 py-3 border rounded-3" style={{ height: '100%' }}>
            <AttemptUserTable data={data?.highestScore} from="dashboard" />
          </div>
        </Col>
      </Row>


      {/* <QuizAttemptStats avgTimeData={avgTimeData} isLoading={isLoading} resultForPeiChart={data?.result} averageScore={data?.averageScore} totalAttempts={data?.totalAttempts} points={points} expand={expand} setExpand={setExpand} />

      <Row className="mt-3">
        <Col className="p-2" lg={12} xs={24}>
          <QuizAttempTrend attempts={data?.attempts} expandTrend={expandTrend} setExpandTrend={setExpandTrend} />
        </Col>

        <Col className="p-2" lg={12} xs={24}>
          <AttemptUserTable data={data?.highestScore} from="dashboard" />
        </Col>
      </Row> */}

    </SubcriberLayout>
  );
};

export default AttemptDashboard;
