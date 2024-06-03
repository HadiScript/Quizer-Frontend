import { Card, Empty } from 'antd';
import {
  BarChart,
  Bar,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import Heading from '../../common/Heading';
import { DashboardOutlined } from '@ant-design/icons';
import { useSummaryForGraph } from '../../../../actions/_attempt-users';




const QuizPerAttempts = () => {

  const { data } = useSummaryForGraph();
  return (
    <div className='px-3 ' style={{ width: '100%', height: 450, }}>
      <div className='d-flex justify-content-between align-items-center'>
        <Heading title={"Quizzes per attempts"} Icon={<DashboardOutlined className="its-icon" />} />
      </div>
      {
        data?.quizSummary.length === 0 ? <Empty /> :
          <ResponsiveContainer >
            <AreaChart data={data?.quizSummary} >
              <defs>
                <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1" spreadMethod="reflect">
                  <stop offset="0%" stopColor="#083344" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#7dd3fc" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis dataKey="title" />
              <Brush dataKey="title" height={30} stroke="#083344" />

              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="attemptsCount" stroke="#083344" fillOpacity={1} fill="url(#colorJobs)" />
              {/* <Line type="monotone" dataKey="attemptsCount" stroke="#083344" activeDot={{ r: 8 }} /> */}
            </AreaChart>

          </ResponsiveContainer>
      }
    </div>
  )
}

export default QuizPerAttempts