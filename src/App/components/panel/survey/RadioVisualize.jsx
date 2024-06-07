import { ConsoleSqlOutlined, DownOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Row, Select } from "antd";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { FaChartPie } from "react-icons/fa";
import { Errs } from "../../../../helper/Errs";
import axios from "axios";
import { surveyApi } from "../../../../helper/API";
import { useParams } from "react-router-dom";
import RadioPieCharts from "./RadioPieCharts";

const MAX_COUNT = 3;

const RadioVisualize = ({ data }) => {

  const { slug } = useParams()
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [radioData, setRadioData] = useState([])

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
      const { data } = await axios.put(`${surveyApi}/dashboard/${slug}/radio-rate`, { fieldIds: values }, { withCredentials: true });
      setRadioData(data);
      setLoading(false);
    } catch (error) {
      Errs(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">

      <Row >
        <Col lg={18} xs={24} className="mt-2 mx-1">
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
        <Col lg={4} xs={24} className="mt-2 mx-1">
          <Button onClick={gettingDataForVisualization} loading={loading} icon={<FaChartPie />} >Visualize Data</Button>
        </Col>
        <small>You can only select three of them</small>
      </Row>

      <Divider />


      <Row >
        {
          loading ? <LoadingOutlined /> :
            radioData.length > 0 && radioData.map((x, index) => (
              <Col lg={8} xs={24} key={index}>
                <div className="mx-2 border rounded-3 lightgrey-bg mt-1" >
                  <div className="p-2"><b>{x?.fieldLabel}</b></div>
                  <RadioPieCharts data={x?.count} title={x?.fieldLabel} />
                </div>
              </Col>
            ))
        }
      </Row>


    </div>
  )
}

export default RadioVisualize