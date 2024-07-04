import { DownOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Select } from "antd";
import { useState } from "react";

import { FaChartPie } from "react-icons/fa";
import { Errs } from "../../../../helper/Errs";
import axios from "axios";
import { surveyApi } from "../../../../helper/API";
import { useParams } from "react-router-dom";
import RadioPieCharts from "./RadioPieCharts";
import RatingPieChart from "./RatingPieChart";

const MAX_COUNT = 3;

const DropdownVisualize = ({ data }) => {

  const { slug } = useParams()
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownData, setDropdownData] = useState([])

  const suffix = (
    <>
      <span>
        {values.length} / {MAX_COUNT}
      </span>
      <DownOutlined />
    </>
  );


  const gettingDataForVisualization = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`${surveyApi}/dashboard/${slug}/dropdown-rate`, { fieldIds: values }, { withCredentials: true });
      setDropdownData(data);
      setLoading(false);
    } catch (error) {
      Errs(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" p-4">

      <Row >
        <Col lg={20} xs={24}>
          <Select
            mode="tags"
            maxCount={3}
            allowClear
            style={{
              width: '100%',
            }}

            placeholder="Please select the fields"

            suffixIcon={suffix}
            onChange={setValues}

          >
            {data?.map(x => <Select.Option key={x.fieldId}>{x.fieldLabel}</Select.Option>)}
          </Select >

        </Col>
        <Col lg={4} xs={24}>
          <Button onClick={gettingDataForVisualization} loading={loading} icon={<FaChartPie />} className="mx-2">Visualize Data</Button>
        </Col>
        <small className="mx-1">You can only select three of them</small>
      </Row>

      <Divider />


      <Row >
        {
          loading ? <LoadingOutlined /> :
            dropdownData.length > 0 && dropdownData.map((x, index) => (
              <Col lg={8} xs={24} key={index} >
                <div className="mx-2 border rounded-3 lightgrey-bg" style={{ height: "400px" }} >
                  <div className="p-2"><b>{x?.fieldLabel}</b></div>
                  {/* <div className="p-2"><b>Avg Rating</b> : {x?.averageRating}</div> */}

                  <RadioPieCharts data={x?.count} />
                </div>
              </Col>
            ))
        }
      </Row>


    </div>
  )
}

export default DropdownVisualize