import { Empty } from 'antd';
import Heading from '../../common/Heading';
import { DashboardOutlined } from '@ant-design/icons';
import { DualAxes, Line } from '@ant-design/plots';






const QuizPerAttempts = ({ data, from, primaryColor, secondaryColor, surveyData, quizData, title }) => {


  const config = {

    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/stocks.json',
      transform: [{ type: 'filter', callback: (d) => d.symbol === 'GOOG' }],
    },
    xField: (d) => new Date(d.date),
    yField: 'price',
    style: {
      fill: 'linear-gradient(-90deg, white 0%, #164e63 100%)',
    },
    axis: {
      y: { labelFormatter: '~s' },
    },
    line: {
      style: {
        stroke: 'darkgreen',
        strokeWidth: 2,
      },
    },
  };
  return (
    <div id={primaryColor} className={` ${from === "quiz" && ""}`} >


      <div className='d-flex justify-content-between align-items-center'>
        <Heading title={title} />
      </div>

      {
        data?.length === 0 ? <Empty /> :
          <Line {...config} height={200} />
      }

    </div>
  )
}

export default QuizPerAttempts