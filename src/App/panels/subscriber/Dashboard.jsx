
import SubcriberLayout from '../../components/layouts/Layout'
import { Col, Row } from 'antd'
import Stats from '../../components/panel/mainDashboard/Stats'
import QuizPerAttempts from '../../components/panel/mainDashboard/Scatter'
import CreateQuizCTAHeading from '../../components/common/CreateQuizCTAHeading'
import { useSummary, useSummaryForGraph } from '../../../actions/_attempt-users'
import BgHeading from '../../components/common/BgHeading'
import { useMainSrvySummary, useMainSrvySummaryForGraph } from '../../../actions/_survey'


const SubscriberDashboard = () => {
  const { data, isLoading } = useSummary();
  const { data: srvyData, isLoading: srvyLoading } = useMainSrvySummary();
  const { data: srvyGraph, isLoading: srvyGraphLoading } = useMainSrvySummaryForGraph();

  const { data: quizGraph } = useSummaryForGraph();

  return (
    <SubcriberLayout >

      {
        data?.summary?.totalQuizzes === 0 ?
          <CreateQuizCTAHeading />
          :
          <BgHeading title={"Dashboard"} />
      }
      <Row className='mt-4'>
        <Col lg={8} xs={24}>
          <Stats data={data} data2={srvyData} isLoading={isLoading} />
        </Col>
        <Col lg={8} xs={24}>
          <QuizPerAttempts data={quizGraph?.quizSummary} from="quiz" primaryColor="#083344" secondaryColor="#7dd3fc" />
        </Col>
        <Col lg={8} xs={24}>
          <QuizPerAttempts data={srvyGraph?.surveyResponses} from="srvy" primaryColor="#083344" secondaryColor="#71717a" />
        </Col>
      </Row>
    </SubcriberLayout>
  )
}

export default SubscriberDashboard