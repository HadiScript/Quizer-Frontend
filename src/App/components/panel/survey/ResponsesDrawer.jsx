import axios from "axios";
import { useEffect, useState } from "react";
import { Errs } from "../../../../helper/Errs";
import { surveyApi } from "../../../../helper/API";
import { Avatar, Card, Drawer, List, Modal } from "antd";
import { UnderScroreToText } from "../../../../helper/UnderscoreToText";
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


  return (
    <Modal id="reponses-model" footer={null} width={'100%'} style={{ top: "-10px" }} placement="left" onCancel={() => setOpen(false)} open={open}>

      {loading && <LoadingOutlined />}
      <div className="row gap-2">

        {
          (responses[0]?.fieldLabel === "Email" || responses[0]?.fieldLabel === "email") && <div className="d-flex border-bottom justify-content-between py-3 align-items-center col-8">
            <div className="d-flex align-items-center gap-2">
              <Avatar style={{ backgroundColor: "#155e75" }} size={"default"} >{responses[0]?.responseValue[0]}</Avatar>
              <b className="">  <span className="text-capitalize">{responses[0]?.responseValue[0]}</span>{responses[0]?.responseValue?.slice(1)}</b>
            </div>
            <div>
              {moment(At).format('MMMM Do YYYY, h:mm:ss a')}

            </div>
          </div>
        }

        {responses?.slice(1)?.map((x, index) => <div className="col-12 col-md-4 lightgrey-bg p-3 rounded-3">
          <h6>
            <b>{x?.fieldLabel}</b>
          </h6>
          {typeof x?.responseValue === "object" ? (
            x.responseValue.map((value, idx) => (
              <span key={idx}>{UnderScroreToText(value)}</span>
            ))
          ) : (
            <span style={{ maxWidth: "500px" }} className="text-capitalize">{typeof x?.responseValue === "string" ? UnderScroreToText(x?.responseValue) : x?.responseValue}</span>
          )}
        </div>)}

      </div>
    </Modal>
  )
}

export default ResponsesDrawer