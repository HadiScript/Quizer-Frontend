import { Col, Row } from "antd"
import BgHeading from "../../../components/common/BgHeading"
import SrvyLayout from "../../../components/layouts/survey-detail-dashboard/SrvyLayout"

import { useDashboardData1, useSrvyOverview, useSrvyStats } from "../../../../actions/_survey"
import { useParams } from "react-router-dom"
import DateLineCharts from "../../../components/panel/survey/DateLineCharts"
import StatsPeiCharts from "../../../components/panel/survey/StatsPeiCharts"
import SrvyFilters from "../../../components/panel/survey/SrvyFilters"
import { useEffect, useState } from "react"
import MostSelectedChart from "../../../components/panel/survey/MostSelectedChart"
import RatingPieChart from "../../../components/panel/survey/RatingPieChart"

const SrvyStats = () => {
  const { slug } = useParams();
  const { data: data1, isLoading: loading1, } = useDashboardData1(slug);
  const { data, isLoading } = useSrvyStats(slug);

  // const { data: overviewData, loading: overviewLoading } = useSrvyOverview(slug)
  // const [mostSelectedData, setMostSelectedData] = useState([])
  // const [averageRateData, setAverageRateData] = useState([])

  // useEffect(() => {
  //   if (overviewData) {

  //     setMostSelectedData(overviewData.filter(d => d.mostSelected).map(d => ({
  //       name: d.fieldLabel.trim(),
  //       option: d.mostSelected.option,
  //       value: d.mostSelected.count
  //     })))

  //     setAverageRateData(overviewData.filter(d => d.averageRate).map(d => ({
  //       name: d.fieldLabel.trim(),
  //       value: parseFloat(d.averageRate)
  //     })))
  //   }

  // }, [overviewData])



  // console.log("overview", mostSelectedData)

  return (
    <SrvyLayout>
      <BgHeading title={"Survey Stats"} />


      <SrvyFilters />

      <Row className="my-4">
        <Col lg={6} xs={24} >
          <div className="border rounded-2 p-2 m-1" >
            <StatsPeiCharts data={data} isLoading={isLoading} />
          </div>

        </Col>

        <Col lg={18} xs={24} >
          <div className="border rounded-2 p-2 m-1" >
            <DateLineCharts data={data1} loading={loading1} />
          </div>
        </Col>
      </Row >

      {/* <Row>
        <Col lg={24} xs={24}>
          <div className="border rounded-2 p-2 m-1" style={{height : "700px"}}>
            <MostSelectedChart data={mostSelectedData} />
          </div>
        </Col>

        <Col lg={12} xs={12}>
          <div className="border rounded-2 p-2 m-1" >
            <RatingPieChart data={averageRateData} />

          </div>
        </Col>
      </Row> */}



    </SrvyLayout >
  )
}

export default SrvyStats