import axios from "axios";
import moment from "moment";
import { Errs } from "../../../helper/Errs";
import { useEffect, useState } from "react";
import { Divider, Drawer, List } from "antd";
import { reportApi } from "../../../helper/API";

const AttempterDrawser = ({ open, setOpen, current }) => {
  const [responses, setresponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchingResponses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${reportApi}/responses/${current?._id}`, {});
      if (res.status === 200) {
        setresponses(res.data.responses.responses);
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
    <>
      <Drawer width={640} placement="left" onClose={() => setOpen(false)} open={open}>
        <div className="d-flex flex-column justify-content-start align-items-start p-4 gap-3">
          <div className="d-flex justify-content-start align-items-center gap-3">
            <b>Email:</b> <span>{current?.studentDetails?.Email}</span>
          </div>
          <div className="d-flex justify-content-start align-items-center gap-3">
            <b>Score:</b> <span>{current?.score}</span>
          </div>

          <div className="d-flex justify-content-start align-items-center gap-3">
            <div>
              <b>Start At:</b> <span>{moment(current?.startTime).add(3, "days").calendar()}</span>
            </div>
            <div>
              <b>End At:</b> <span>{moment(current?.endTime).add(3, "days").calendar()}</span>
            </div>
          </div>
          <Divider />
        </div>

        <div className="px-4 mb-4">
          <List
            className="mt-4"
            loading={loading}
            size="small"
            itemLayout="vertical"
            bordered
            dataSource={responses}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <div key={item?._id}>
                    Correct Answer is <b>{item?.question?.options.find((x) => x.isCorrect)?.text}</b>
                  </div>,
                ]}
                style={{
                  overflowX: "scroll",
                  border: `1px solid ${item?.selectedOption === item?.question?.options.find((x) => x.isCorrect)?.text ? "lightgrey" : "red"}`,
                }}
              >
                <div className="d-flex justify-content-start gap-2">
                  <span>
                    <b>Q:</b>
                  </span>

                  <div className="d-flex flex-column justify-content-start gap-2" style={{ maxWidth: "500px", }}>
                    <span dangerouslySetInnerHTML={{ __html: item?.question?.text?.replace(/h1|h2|h3|h4|h5|h6/g, "p") }}></span>

                    <span>{item?.selectedOption}</span>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </Drawer>
    </>
  );
};

export default AttempterDrawser;
