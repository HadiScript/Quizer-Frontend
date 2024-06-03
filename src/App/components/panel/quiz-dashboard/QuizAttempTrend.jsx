

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from "recharts";

const QuizAttempTrend = ({ attempts, }) => {


  return (
    <>

    
      <div className="pb-2 d-flex justify-content-between align-items-center">
        <h6>Quiz Trend</h6>

      </div>

      <div className="trend-area-chart">
        <ResponsiveContainer width={"100%"}>
          <AreaChart
            data={attempts}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#164e63" fill="#93c5fd" />
            <Brush dataKey="title" height={30} stroke="#083344" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default QuizAttempTrend;
