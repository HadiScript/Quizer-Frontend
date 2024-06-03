import { useState } from "react";
import SubcriberLayout from "../../components/layouts/Layout";
import Heading from "../../components/common/Heading";
import { AppstoreOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Button, Col, Grid, Row } from "antd";


import { useParams } from "react-router-dom";
import { useCompletionRate, usePerQuizAvgTime, usePerQuizSummary } from "../../../actions/_attempt-users";
import { QuizAttempTrend, QuizAttemptStats } from "../../components/panel/quiz-dashboard";
import AttemptUserTable from "../../components/panel/AttemptUserTable";
import BgHeading from "../../components/common/BgHeading";

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
      <BgHeading title={"Quiz Attempt Dashboard"} />
      <div className="d-flex justify-content-end mb-2 mt-4">
        <Button icon={<ClockCircleOutlined />} type="dashed">Average Time Spent: <b className="mx-2">{avgTimeData?.averageTimeSpent}</b></Button>
      </div>
      <QuizAttemptStats avgTimeData={avgTimeData} isLoading={isLoading} resultForPeiChart={data?.result} averageScore={data?.averageScore} totalAttempts={data?.totalAttempts} points={points} expand={expand} setExpand={setExpand} />

      <Row className="mt-3">
        <Col className="p-2" lg={12} xs={24}>
          <QuizAttempTrend attempts={data?.attempts} expandTrend={expandTrend} setExpandTrend={setExpandTrend} />
        </Col>

        <Col className="p-2" lg={12} xs={24}>
          <AttemptUserTable data={data?.highestScore} from="dashboard" />
        </Col>
      </Row>


      <div className="mt-5">
        {JSON.stringify(avgTimeData)}
      </div>
      {/* 
      <div className="mt-5">
        {JSON.stringify(avgTimeData)}
      </div> */}

    </SubcriberLayout>
  );
};

export default AttemptDashboard;
