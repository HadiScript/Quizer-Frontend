import axios from "axios";
import { useEffect, useState } from "react";
import { Errs } from "../../../../helper/Errs";
import { surveyApi } from "../../../../helper/API";
import { Drawer, List } from "antd";


const ResponsesDrawer = ({ current, open, setOpen }) => {

  const [responses, setresponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchingResponses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${surveyApi}/dashboard/reponse/${current}`, { withCredentials: true });
      if (res.status === 200) {
        setresponses(res.data);
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
    <Drawer width={640} placement="left" onClose={() => setOpen(false)} open={open}>


      <div className="px-4 mb-4">
        <List
          className="mt-4"
          loading={loading}
          size="small"
          itemLayout="vertical"
          bordered
          dataSource={responses}
          renderItem={(item, index) => (
            <List.Item
              key={index}

            >

              <div className="d-flex flex-column align-items-start gap-3">
                <b>{item?.fieldLabel}</b>
                <span>{item?.responseValue}</span>
              </div>


            </List.Item>
          )}
        />
      </div>
    </Drawer>
  )
}

export default ResponsesDrawer