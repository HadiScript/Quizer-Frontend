
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

const dummyQuizData = [
  {
    title: "ReactJs",
    Attempts: 63
  },
  {
    title: "Data Structure & Algo",
    Attempts: 66
  },
  {
    title: "Operating System",
    Attempts: 70
  },
  {
    title: "DBMS",
    Attempts: 64
  },
  {
    title: "Calculus",
    Attempts: 63
  },
  {
    title: "NodeJs",
    Attempts: 69
  },
  {
    title: "Fundamental of Programming Language",
    Attempts: 72
  },
  {
    title: "Cyber Security",
    Attempts: 73
  },
  {
    title: "Web Development",
    Attempts: 68
  },
  {
    title: "Artificial Intelligence",
    Attempts: 71
  },
  {
    title: "Machine Learning",
    Attempts: 75
  },
  {
    title: "Networks",
    Attempts: 62
  },
  {
    title: "Software Engineering",
    Attempts: 65
  },
  {
    title: "Human-Computer Interaction",
    Attempts: 67
  },
  {
    title: "Cloud Computing",
    Attempts: 74
  },
  {
    title: "Ethical Hacking",
    Attempts: 68
  },
  {
    title: "Mobile Application Development",
    Attempts: 65
  },
  {
    title: "Graphics Design",
    Attempts: 61
  }
];

const dummySurveyData = [
  {
    title: "University Survey",
    Attempts: 800
  },
  {
    title: "Market Research",
    Attempts: 950
  },
  {
    title: "Customer Satisfaction",
    Attempts: 890
  },
  {
    title: "Employee Feedback",
    Attempts: 780
  },
  {
    title: "Health and Wellness Survey",
    Attempts: 720
  },
  {
    title: "IT Service Feedback",
    Attempts: 860
  },
  {
    title: "Education Quality Assessment",
    Attempts: 830
  },
  {
    title: "Product Launch Feedback",
    Attempts: 675
  },
  {
    title: "Political Opinion Poll",
    Attempts: 920
  },
  {
    title: "Environmental Awareness Survey",
    Attempts: 710
  },
  {
    title: "Social Media Usage Survey",
    Attempts: 845
  },
  {
    title: "Community Event Planning",
    Attempts: 650
  },
  {
    title: "Holiday Shopping Habits",
    Attempts: 880
  },
  {
    title: "Public Transport Satisfaction",
    Attempts: 760
  },
  {
    title: "Local Government Services Survey",
    Attempts: 940
  },
  {
    title: "Gaming Preferences Survey",
    Attempts: 690
  },
  {
    title: "Remote Work Experience Survey",
    Attempts: 850
  },
  {
    title: "Pet Ownership Survey",
    Attempts: 730
  }
];



const SubscriberDashboard = () => {
  const { data, isLoading } = useSummary();
  const { data: srvyData, isLoading: srvyLoading } = useMainSrvySummary();
  const { data: srvyGraph, isLoading: srvyGraphLoading } = useMainSrvySummaryForGraph();
  const { data: quizGraph } = useSummaryForGraph();





  return (
    <SubcriberLayout >
      {/* {JSON.stringify(quizGraph?.quizSummary)}
      {JSON.stringify(srvyGraph?.surveyResponses)} */}
      {/* {JSON.stringify(data)} */}


      <BgHeading title={"Dashboard"} desc={"Complete Stats of all the quizzes and surveys created so far."} />
      {/* {
        data?.summary?.totalQuizzes === 0 ?
          <CreateQuizCTAHeading />
          :
      } */}
      <Row className='mt-4'>
        <Col lg={24} xs={24}>
          <Stats
            data={data}
            data2={srvyData}
            isLoading={isLoading}
            // srvyGraphData={srvyGraph?.surveyResponses}
            srvyGraphData={dummySurveyData}
            quizGraphData={dummyQuizData}
          // quizGraphData={quizGraph?.quizSummary}
          />
        </Col>
      </Row>
    </SubcriberLayout>
  )
}

export default SubscriberDashboard