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
            <LineChart data={data?.quizSummary} >

              <XAxis dataKey="title" />
              <Brush dataKey="title" height={30} stroke="#083344" />

              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="attemptsCount" stroke="#083344" activeDot={{ r: 8 }} />
            </LineChart>

          </ResponsiveContainer>
      }
    </div>
  )
}

export default QuizPerAttempts