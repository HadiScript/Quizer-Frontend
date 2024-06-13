import { Empty } from 'antd';
import {
  Brush,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import Heading from '../../common/Heading';
import { DashboardOutlined } from '@ant-design/icons';





const QuizPerAttempts = ({ data, from, primaryColor, secondaryColor }) => {

  return (
    <div id={primaryColor} className={`px-3 ${from === "quiz" && "border-end"}`} style={{ width: '100%', height: 450, }}>


      <div className='d-flex justify-content-between align-items-center'>
        <Heading title={from === "quiz" ? "Quizzes per attempts" : "Survey per attempts"} Icon={<DashboardOutlined className="its-icon" />} />
      </div>
      {
        data?.length === 0 ? <Empty /> :
          <ResponsiveContainer >
            <AreaChart data={data} >
              <defs>
                <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1" spreadMethod="reflect">
                  <stop offset="0%" stopColor={primaryColor} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={secondaryColor} stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis dataKey="title" />
              <Brush dataKey="title" height={30} stroke={primaryColor} />

              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="attemptsCount" stroke={primaryColor} fillOpacity={1} fill="url(#colorJobs)" />

            </AreaChart>

          </ResponsiveContainer>
      }
    </div>
  )
}

export default QuizPerAttempts