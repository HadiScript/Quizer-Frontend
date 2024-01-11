import React from "react";
import Heading from "../../components/common/Heading";
import { _useAllMyQuizes } from "../../../actions/_quiz";
import { Card } from "antd";
import { OrderedListOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const AllQuizes = () => {
  const { loading, list } = _useAllMyQuizes();
  return (
    <>
      <Heading title={"All Quizes"} Icon={<OrderedListOutlined className="its-icon" />}/>

      <div className="row ">
        {list?.map((x) => (
          <Link to={`/subscribe/quize/${x._id}`} role="button" key={x._id} className="col-xs-12 col-md-4 mb-5 _link">
            <Card hoverable className={`${x.questions.length === 0 && "withoutQuestion"}`}>
              <h5>{x.title}</h5>
              <div className="d-flex justify-content-start align-items-center gap-2 ">
                <div>
                  <QuestionCircleOutlined />
                </div>
                <b>{x.questions.length}</b>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default AllQuizes;
