import { CheckOutlined, ExpandAltOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import PeiChartPassOrFail from "./PeiChartPassOrFail";
import ToughestQuestionTable from "./ToughestQuestionTable";

const QuizAttemptStats = ({ points, averageScore, totalAttempts, resultForPeiChart, isLoading }) => {
  const { id } = useParams();
  const router = useNavigate();
  return (
    <>
      <Row>
        <Col md={8} xs={24}>
          <Card className="m-1" style={{ height: 350 }}>
            {isLoading && <LoadingOutlined />}
            <div className="d-flex flex-column justify-content-start stats-box">
              <div className="box d-flex justify-content-start align-items-start _heading">
                <CheckOutlined className="its-icon" />
                <div>
                  <span>Total Attempts</span>
                  <h4>{totalAttempts}</h4>
                </div>
              </div>
              <div className="box d-flex justify-content-start align-items-start _heading">
                <CheckOutlined className="its-icon" />
                <div>
                  <span>Average Score</span>
                  <h4>{averageScore?.toPrecision(2)}</h4>
                </div>
              </div>
              <div className="box d-flex justify-content-start align-items-start _heading">
                <CheckOutlined className="its-icon" />
                <div>
                  <span>Passing Ratio</span>
                  <h4>{averageScore?.toPrecision(4)} %</h4>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col md={8} xs={24}>
          <Card className="m-1">
            <PeiChartPassOrFail resultForPeiChart={resultForPeiChart} isLoading={isLoading} />
          </Card>
        </Col>
        <Col md={8} xs={24}>
          <ToughestQuestionTable />
        </Col>
      </Row>

      <Row>
        {!points.md && (
          <Col xs={24} className="p-2">
            <Button onClick={() => router(`/subscribe/quize/${id}/attempters`)} style={{ width: "100%" }} className="myBtn" icon={<ExpandAltOutlined />}>
              Expand, Quiz Attempt Users
            </Button>
          </Col>
        )}
      </Row>
    </>
  );
};

export default QuizAttemptStats;
