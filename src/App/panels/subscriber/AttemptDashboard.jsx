import { useState } from "react";
import SubcriberLayout from "../../components/layouts/Layout";
import Heading from "../../components/common/Heading";
import { AimOutlined, AppstoreOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Button, Col, Grid, Row } from "antd";


import { useParams } from "react-router-dom";
import { useCompletionRate, usePerQuizAvgTime, usePerQuizSummary } from "../../../actions/_attempt-users";
import { QuizAttempTrend, QuizAttemptStats } from "../../components/panel/quiz-dashboard";
import AttemptUserTable from "../../components/panel/AttemptUserTable";
import BgHeading from "../../components/common/BgHeading";
import { SmallStatsBox } from "../../components/panel/mainDashboard/Stats";
import { TbTimeDuration0 } from "react-icons/tb";
import PeiChartPassOrFail from "../../components/panel/PeiChartPassOrFail";


const ItsStats = ({ title, number, icon }) => {
  return <div className="d-flex gap-3 align-items-center">
    <div> {icon}</div>
    <div className="row">
      <div className="col-6">asd</div>
      <div className="col-6">asd</div>
    </div>
  </div>
}

const AttemptDashboard = () => {
  const { id } = useParams();
  const points = Grid.useBreakpoint();
  const [expand, setExpand] = useState(false);
  const [expandTrend, setExpandTrend] = useState(false);
  const { data, isLoading } = usePerQuizSummary(id)





  const { data: avgTimeData, isLoading: avgLoading } = usePerQuizAvgTime(id)
  // const { data: completionData, isLoading: completionLoading } = useCompletionRate(id)


  return (
    <SubcriberLayout from="quiz-detail">
      <BgHeading title={"Quiz attempts"} desc={"Analyze quiz results easily through these graphical representations."} />
      <div className="d-flex justify-content-end mb-2 mt-4">
        <Button icon={<ClockCircleOutlined />} type="dashed">Average Time Spent: <b className="mx-2">{avgTimeData?.averageTimeSpent}</b></Button>
      </div>


      <Row className="mt-4">
        <Col lg={16} xs={24} className="px-2">
          <Row className="">
            <Col lg={12} xs={24} className="bg-white px-1 border rounded-3">
              <div className=" p-2 d-flex flex-column gap-3">
                <h6><b>Stats</b></h6>
                <ItsStats title={"Average Time Spent"} number={avgTimeData?.averageTimeSpent} icon={<TbTimeDuration0 size={25} />} />
                <ItsStats title={"Average score"} number={data?.averageScore?.toFixed(2)} icon={<TbTimeDuration0 size={25} />} />
                <ItsStats title={"Total Attempts"} number={data?.totalAttempts} icon={<TbTimeDuration0 size={25} />} />
                <ItsStats title={"Average Time Spent"} number={data?.averageScore?.toFixed(2)} icon={<TbTimeDuration0 size={25} />} />
              </div>
            </Col>

            <Col lg={12} xs={24} className="px-1 ">
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
