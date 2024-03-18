
import SubcriberLayout from '../../components/layouts/Layout'
import { Col, Row } from 'antd'
import Stats from '../../components/panel/mainDashboard/Stats'
import QuizPerAttempts from '../../components/panel/mainDashboard/Scatter'


const SubscriberDashboard = () => {
  return (
    <SubcriberLayout >
      <Row className='mt-3'>
        <Col md={8} xs={24}>
          <Stats />
        </Col>
        <Col md={16} xs={24}>
          <QuizPerAttempts />
        </Col>
      </Row>
    </SubcriberLayout>
  )
}

export default SubscriberDashboard