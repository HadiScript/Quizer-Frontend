import { Col, Row } from "antd";

import LeftCol from "./LeftCol";
import LayoutHeader from "./LayoutHeader";

import "../../../assets/css/layout.css";
import "../../../assets/css/darkBlue.css";

const SubcriberLayout = ({ children, from = "subscriber" }) => {
  return (
    <>
      <Row style={{ minHeight: "100vh" }} className={"main-db_layout"}>
        <Col md={4} xs={0} className="fixedColumn leftColumn border-end">
          <LeftCol from={from} />
        </Col>
        <Col md={20} xs={24} className="centerColumn ">
          <LayoutHeader from={from} />
          <div className="p-3"> {children}</div>
        </Col>
      </Row>
    </>
  );
};

export default SubcriberLayout;
