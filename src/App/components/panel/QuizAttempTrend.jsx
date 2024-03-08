import { ArrowsAltOutlined } from "@ant-design/icons";
import { Button, Card, Grid } from "antd";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from "recharts";

const QuizAttempTrend = ({ attempts, expandTrend, setExpandTrend }) => {
  const points = Grid.useBreakpoint();

  return (
    <>
      <div className="pb-2 d-flex justify-content-between align-items-center">
        <h6>Quiz Trend</h6>
        {points.md && (
          <Button type="dashed" icon={<ArrowsAltOutlined />} onClick={() => setExpandTrend(!expandTrend)}>
            {expandTrend ? "Close" : "Expend"}
          </Button>
        )}
      </div>

      <div className="trend-area-chart">
        <ResponsiveContainer width={expandTrend ? "100%" : 800}>
          <AreaChart
            // width={500}
            // height={400} 
            data={attempts}
            // margin={{
            //   top: 10,
            //   right: 30,
            //   left: 0,
            //   bottom: 0,
            // }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
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
