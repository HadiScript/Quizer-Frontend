import { Empty } from 'antd';
import Heading from '../../common/Heading';
import { DashboardOutlined } from '@ant-design/icons';
import { DualAxes, Line } from '@ant-design/plots';






const QuizPerAttempts = ({ data, from, primaryColor, title }) => {


  const config = {

    data: data,
    xField: 'title',
    yField: 'Attempts',

    axis: {
      x: { label: null },
      y: { labelFormatter: '~s' },
    },
    style: {
      fill: 'linear-gradient(-90deg, white 0%, #164e63 100%)',
      gradient: 'x',
      lineWidth: 2,
      stroke: 'darkgreen',
    },
    // line: {
    //   style: {
    //     stroke: 'darkgreen',
    //     // strokeWidth: 2,
    //   },
    // },
  };
  return (
    <div id={primaryColor} className={` ${from === "quiz" && ""}`} >


      <div className='d-flex justify-content-between align-items-center'>
        <Heading title={title} />
      </div>

      {/* {JSON.stringify(data)} */}

      {
        data?.length === 0 ? <Empty /> :
          <Line {...config} height={200} />
      }

    </div>
  )
}

export default QuizPerAttempts