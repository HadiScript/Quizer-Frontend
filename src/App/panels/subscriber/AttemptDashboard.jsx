import { useState } from "react";
import SubcriberLayout from "../../components/layouts/Layout";
import Heading from "../../components/common/Heading";
import { AppstoreOutlined } from "@ant-design/icons";
import { Col, Grid, Row } from "antd";
import QuizAttemptStats from "../../components/panel/QuizAttemptStats";
import QuizAttempTrend from "../../components/panel/QuizAttempTrend";
import AttemptUserTable from "../../components/panel/AttemptUserTable";

import { useParams } from "react-router-dom";
import { usePerQuizSummary } from "../../../actions/_attempt-users";

const AttemptDashboard = () => {
  const { id } = useParams();
  const points = Grid.useBreakpoint();
  const [expand, setExpand] = useState(false);
  const [expandTrend, setExpandTrend] = useState(false);
  const { data, isLoading } = usePerQuizSummary(id)


  return (
    <SubcriberLayout from="quiz-detail">
      <Heading Icon={<AppstoreOutlined className="its-icon" />} title={"Quiz Attempt Dashboard"} />

      <QuizAttemptStats isLoading={isLoading} resultForPeiChart={data?.result} averageScore={data?.averageScore} totalAttempts={data?.totalAttempts} points={points} expand={expand} setExpand={setExpand} />

      <Row className="mt-3">
        <Col className="p-2" md={expandTrend ? 24 : 8} xs={24}>
          <QuizAttempTrend attempts={data?.attempts} expandTrend={expandTrend} setExpandTrend={setExpandTrend} />
        </Col>
        {points.md && (
          <Col className="p-2" md={expandTrend ? 24 : 16} xs={24}>
            <AttemptUserTable loading={isLoading} from="table-box" data={data?.attemptedUsers.slice(0, 10)} expand={expand} setExpand={setExpand} />
          </Col>
        )}
      </Row>
    </SubcriberLayout>
  );
};

export default AttemptDashboard;
