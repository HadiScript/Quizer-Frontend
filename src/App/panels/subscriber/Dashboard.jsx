
import SubcriberLayout from '../../components/layouts/Layout'
import { Col, Row } from 'antd'
import Stats from '../../components/panel/mainDashboard/Stats'
import QuizPerAttempts from '../../components/panel/mainDashboard/Scatter'
import CreateQuizCTAHeading from '../../components/common/CreateQuizCTAHeading'
import { useSummary } from '../../../actions/_attempt-users'
import BgHeading from '../../components/common/BgHeading'


const SubscriberDashboard = () => {
  const { data, isLoading } = useSummary();

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
          <Stats data={data} isLoading={isLoading} />
        </Col>
        <Col lg={16} xs={24}>
          <QuizPerAttempts />
        </Col>
      </Row>
    </SubcriberLayout>
  )
}

export default SubscriberDashboard