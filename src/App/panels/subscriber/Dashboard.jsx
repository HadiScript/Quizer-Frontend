
import SubcriberLayout from '../../components/layouts/Layout'
import { Card, Col, Row } from 'antd'
import Stats from '../../components/panel/mainDashboard/Stats'
import QuizPerAttempts from '../../components/panel/mainDashboard/Scatter'
import CreateQuizCTAHeading from '../../components/common/CreateQuizCTAHeading'
import { useSummary, useSummaryForGraph } from '../../../actions/_attempt-users'
import BgHeading from '../../components/common/BgHeading'
import { useMainSrvySummary, useMainSrvySummaryForGraph } from '../../../actions/_survey'
import { useEffect, useState } from 'react'
import StatsCharts from '../../components/panel/mainDashboard/StatsChart'





const SubscriberDashboard = () => {
  const { data, isLoading } = useSummary();
  const { data: srvyData, isLoading: srvyLoading } = useMainSrvySummary();
  const { data: srvyGraph, isLoading: srvyGraphLoading } = useMainSrvySummaryForGraph();
  const { data: quizGraph } = useSummaryForGraph();
  const [combineData, setCombineData] = useState([])

  const prepareChartData = (quizData, surveyData) => {
    const quizzes = quizData.map(item => ({
      type: 'Quiz',
      title: item.title,
      attemptsCount: item.attemptsCount
    }));

    const surveys = surveyData.map(item => ({
      type: 'Survey',
      title: item.title,
      attemptsCount: item.attemptsCount
    }));

    const combinedData = [...quizzes, ...surveys];

    // Function to shuffle an array
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
    };

    // Shuffle the combined data
    shuffleArray(combinedData);



    return combinedData;
  };

  useEffect(() => {
    if (quizGraph?.quizSummary && srvyGraph?.surveyResponses) {
      setCombineData(prepareChartData(quizGraph?.quizSummary, srvyGraph?.surveyResponses))
    }
  }, [quizGraph, srvyGraph])



  return (
    <SubcriberLayout >
      {/* {JSON.stringify(quizGraph?.quizSummary)}
      {JSON.stringify(srvyGraph?.surveyResponses)} */}
      {/* {JSON.stringify(data)} */}


      {
        data?.summary?.totalQuizzes === 0 ?
          <CreateQuizCTAHeading />
          :
          <BgHeading title={"Dashboard"} desc={"Here is the visual representation of all the info you need."} />
      }
      <Row className='mt-4'>
        <Col lg={24} xs={24}>
          <Stats data={data} data2={srvyData} isLoading={isLoading} srvyGraphData={srvyGraph?.surveyResponses} />
        </Col>
        <Col lg={16} xs={24}>
          {/* <Card className='mx-1'> */}

          {/* <StatsCharts /> */}

          {/* <QuizPerAttempts
              data={combineData}

              surveyData={srvyGraph?.surveyResponses}
              quizData={quizGraph?.quizSummary}
              from="quiz"
              primaryColor="#083344"
              secondaryColor="#7dd3fc"
            /> */}
          {/* </Card> */}
        </Col>


        {/* <Col lg={8} xs={24}>
          <Card>
            <QuizPerAttempts data={quizGraph?.quizSummary} from="quiz" primaryColor="#083344" secondaryColor="#7dd3fc" />
          </Card>
        </Col>
        <Col lg={8} xs={24}>
          <QuizPerAttempts data={srvyGraph?.surveyResponses} from="srvy" primaryColor="#083344" secondaryColor="#71717a" />
        </Col> */}
      </Row>
    </SubcriberLayout>
  )
}

export default SubscriberDashboard