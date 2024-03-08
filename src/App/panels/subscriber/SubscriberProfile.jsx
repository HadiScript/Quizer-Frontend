
import SubcriberLayout from "../../components/layouts/Layout"
import { Col, Row } from "antd"
import BasicInfo from "../../components/panel/profile/BasicInfo"
import ProfileUpdate from "../../components/panel/profile/ProfileUpdate"

const SubscriberProfile = () => {
  return (
    <SubcriberLayout>


      <Row>
        <Col md={12} xs={24}>
          <ProfileUpdate />
        </Col>
        <Col md={12} xs={24}>
          <BasicInfo />
        </Col>
      </Row>

    </SubcriberLayout>
  )
}

export default SubscriberProfile