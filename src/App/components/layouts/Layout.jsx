import { Col, Row } from "antd";

import LayoutHeader from "./LayoutHeader";

import "../../../assets/css/layout.css";
import "../../../assets/css/darkBlue.css";
import Sidebar from "./Sidebar";

const SubcriberLayout = ({ children, from = "subscriber", }) => {



  return (
    <>
      <Row style={{ minHeight: "100vh" }} className={"main-db_layout"}>
        {from !== 'create-quiz-ai' &&
          <Col md={4} xs={0} className="fixedColumn leftColumn border-end">
            <Sidebar from={from} />
          </Col>
        }
        {
          from !== 'create-quiz-ai' ?
            <Col md={20} xs={24} className="centerColumn ">
              <LayoutHeader from={from} />

              <div className="p-3"> {children}</div>
            </Col>
            :
            <Col md={24} xs={24} className="p-3">
              <div className="p-3"> {children}</div>
            </Col>
        }
      </Row >
    </>
  );
};

export default SubcriberLayout;
