import axios from "axios";
import React, { useEffect, useState } from "react";
import { Errs } from "../../../../helper/Errs";
import { surveyApi } from "../../../../helper/API";
import { Avatar, Card, Col, Drawer, List, Modal, Row } from "antd";
import { UnderScoreChecker, UnderScroreToText } from "../../../../helper/UnderscoreToText";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";

const ResponsesDrawer = ({ current, open, setOpen }) => {

  const [responses, setresponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [At, setAt] = useState("")

  const fetchingResponses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${surveyApi}/dashboard/reponse/${current}`, { withCredentials: true });
      if (res.status === 200) {
        setresponses(res.data?.responses);
        setAt(res?.data?.at)
      }
    } catch (error) {
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && current) {
      fetchingResponses()
    }
  }, [open, current])



  // Extract email for separate display
  const emailResponse = responses.find(response => response.fieldLabel.toLowerCase() === 'email');
  const email = emailResponse ? emailResponse.responseValue : '';


  return (
    <Modal id="reponses-model" footer={null} width={1000} style={{ top: "0px" }} placement="left" onCancel={() => setOpen(false)} open={open}>

      {loading && <LoadingOutlined />}

      <Row className="mt-3">

        <Col xs={24} md={24} lg={24}>

          {
            email &&
            <div style={{ backgroundColor: "#083344" }} className="d-flex flex-wrap rounded justify-content-between p-3 align-items-center m-2 mt-3">
              <div className="d-flex align-items-center gap-2 text-white">
                <Avatar style={{ backgroundColor: "#0891b2" }} size={"default"} >{email[0]}</Avatar>
                <b className="text-white">
                  {email}
                </b>
              </div>
              <div className="text-white">
                {moment(At).format('MMMM Do YYYY, h:mm:ss a')}
              </div>
            </div>
          }
        </Col>



        {responses?.slice(1)?.map((x, index) =>
          <Col xs={24} md={12} lg={12} key={index + 1}>
            <div className="lightgrey-bg p-3 rounded-3 m-2">
              <div className="d-flex flex-column">
                <span> Question {index + 1}:</span>
                <h6>
                  <b>{x?.fieldLabel}</b>
                </h6>
              </div>
              {typeof x?.responseValue === "object" ? (
                x?.responseValue?.map((value, idx) => (

                  <div className="text-capitalize" key={idx}>{UnderScoreChecker(value)}</div>
                ))
              ) : (
                <span style={{ maxWidth: "500px" }} className="text-capitalize">{typeof x?.responseValue === "string" ? UnderScroreToText(x?.responseValue) : x?.responseValue}</span>
              )}
            </div>
          </Col>
        )}
      </Row>

    </Modal>
  )
}

export default ResponsesDrawer