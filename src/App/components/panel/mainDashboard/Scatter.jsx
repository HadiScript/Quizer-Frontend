import { Card } from 'antd';
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

const data = [
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 456 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 230 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 345 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 450 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 321 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 235 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 267 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 378 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 210 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 23 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 45 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 90 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 130 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 11 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 107 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 926 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 653 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 366 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 486 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 512 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 302 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 425 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 467 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 190 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 194 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 371 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 376 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 295 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 322 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 246 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 33 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 354 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 258 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 359 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 192 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 464 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 2 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 154 },
  { quiz: { _id: "123asd", name: "Some Quiz" }, attemtps: 186 },
];


const QuizPerAttempts = () => {

  const { data } = useSummaryForGraph();
  return (
    <div className='px-3 ' style={{ width: '100%', height: 450, }}>
      <div className='d-flex justify-content-between align-items-center'>
        <Heading title={"Quizzes per attempts"} Icon={<DashboardOutlined className="its-icon" />} />
      </div>
      <ResponsiveContainer >

        <LineChart data={data?.quizSummary} >

          <XAxis dataKey="title" />
          <Brush dataKey="title" height={30} stroke="#083344" />

          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="attemptsCount" stroke="#083344" activeDot={{ r: 8 }} />
        </LineChart>

      </ResponsiveContainer>
    </div>
  )
}

export default QuizPerAttempts