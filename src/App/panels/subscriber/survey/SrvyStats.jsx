import { Col, Empty, Row } from "antd"
import BgHeading from "../../../components/common/BgHeading"
import SrvyLayout from "../../../components/layouts/survey-detail-dashboard/SrvyLayout"

import { useBasicInfoServey, useDashboardData1, useSrvyOverview, useSrvyStats } from "../../../../actions/_survey"
import { useParams } from "react-router-dom"
import DateLineCharts from "../../../components/panel/survey/DateLineCharts"
import StatsPeiCharts from "../../../components/panel/survey/StatsPeiCharts"
import SrvyFilters from "../../../components/panel/survey/SrvyFilters"
import { useEffect, useState } from "react"
// import MostSelectedChart from "../../../components/panel/survey/MostSelectedChart"
// import RatingPieChart from "../../../components/panel/survey/RatingPieChart"
import Heading from "../../../components/common/Heading"
import {
  Brush,
  ReferenceLine,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

const SrvyStats = () => {
  const { slug } = useParams();
  const { data: data1, isLoading: loading1, } = useDashboardData1(slug);
  const { data: basicData, isLoading: fetechingData } = useBasicInfoServey(slug);
  const { data, isLoading } = useSrvyStats(slug);

  const { data: overviewData, loading: overviewLoading } = useSrvyOverview(slug)
  const [mostSelectedData, setMostSelectedData] = useState([])
  const [averageRateData, setAverageRateData] = useState([])

  useEffect(() => {
    if (overviewData) {

      setMostSelectedData(overviewData.filter(d => d.mostSelected).map(d => ({
        name: d.fieldLabel.trim(),
        option: d.mostSelected.option,
        value: d.mostSelected.count
      })))

      setAverageRateData(overviewData.filter(d => d.averageRate).map(d => ({
        name: d.fieldLabel.trim(),
        count: parseFloat(d.averageRate)
      })))
    }

  }, [overviewData])

  return (
    <SrvyLayout>
      <Row className="srvy-stats" >
        <Col lg={16} xs={24}>
          <div className="m-1" >
            <BgHeading title={"Stats of" + " " + basicData?.title} desc={"Analyze your survey stats easily with these graphical representations"} />
            <SrvyFilters />
            <Row className="my-4">
              <Col lg={10} xs={24} >
                <div className="border rounded-2 p-2 m-1" >
                  <StatsPeiCharts data={data} isLoading={isLoading} />
                </div>

              </Col>

              <Col lg={14} xs={24} >
                <div className="border rounded-2 p-2 m-1" >
                  {data1?.length === 0 ?
                    <div style={{ height: "400px" }}>
                      <h6><b>Response By Date</b></h6>
                      <Empty />
                    </div>
                    :
                    <DateLineCharts data={data1} loading={loading1} />
                  }
                </div>
              </Col>
            </Row >
          </div>
        </Col>

        <Col lg={8} xs={24} >
          <div className="border rounded-3 p-2 most-selected-data"  >
            <Heading title={"Most Selected Data"} />
            {mostSelectedData?.length > 0 ?

              <ResponsiveContainer>
                <AreaChart
                  data={mostSelectedData}
                  margin={{
                    bottom: 70
                  }}
                >
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <ReferenceLine y={0} stroke="#000" />
                  <Brush dataKey="name" height={30} stroke="#3289a0" />
                  <Area type="monotone" dataKey="option" fill="#3289a0" />
                  <Area type="monotone" dataKey="value" fill="#3289a0" />
                </AreaChart>
              </ResponsiveContainer>

              : <Empty />
            }

          </div>

          <div className="border rounded-3 p-2 mt-1 average-rating-data"  >
            <Heading title={"Average Rating Data"} />
            <div className="d-flex flex-column gap-3">
              {
                averageRateData?.length > 0
                  ?
                  averageRateData?.map((x, i) => <div className="d-flex flex-column gap-2 pb-1 border-bottom ">
                    <span>{x?.name}</span>
                    <b>Avg {x?.count}</b>
                  </div>)
                  :
                  <Empty />
              }
            </div>


          </div>
        </Col>
      </Row>

    </SrvyLayout >
  )
}

export default SrvyStats