import React, { useState } from 'react'
import Heading from '../../components/common/Heading'
import { DashboardOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import SubcriberLayout from '../../components/layouts/Layout'
import { Card, Col, Row } from 'antd'
import Stats from '../../components/panel/mainDashboard/Stats'
import QuizPerAttempts from '../../components/panel/mainDashboard/Scatter'


const SubscriberDashboard = () => {


  return (
    <SubcriberLayout >
      {/* <Heading title={"Dashboard"} Icon={<DashboardOutlined className="its-icon" />} /> */}
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