import { Col, Grid, Row, } from "antd";

import LayoutHeader from "./LayoutHeader";

import "../../../assets/css/layout.css";
import "../../../assets/css/darkBlue.css";
import Sidebar from "./Sidebar";
import { _useQuizModifications } from "../../../actions/_quiz";
import { useParams } from "react-router-dom";





const SubcriberLayout = ({ children, from = "subscriber", }) => {

  const points = Grid.useBreakpoint();

  const { id } = useParams()

  const { quizData, } = _useQuizModifications(id);

  return (
    <>

      <Row style={{ minHeight: "100vh" }} className={"main-db_layout"}>
        {from !== 'create-quiz-ai' &&
          <Col lg={4} xs={0} className="fixedColumn leftColumn border-end ">
            <Sidebar from={from} title={quizData?.title} />
          </Col>
        }

        {
          from !== "create-quiz-ai" && <Col lg={20} xs={24} className="centerColumn lightgrey-bg  ">
            <LayoutHeader from={from} />
            <div className={`py-3  ${points?.lg ? "px-2" : ""} `}> {children}</div>
          </Col>
        }

        {
          from === 'create-quiz-ai' &&
          <Col lg={24} xs={24} className="p-3">
            <div className="p-3"> {children}</div>
          </Col>
        }

      </Row >


    </>
  );
};

export default SubcriberLayout;
