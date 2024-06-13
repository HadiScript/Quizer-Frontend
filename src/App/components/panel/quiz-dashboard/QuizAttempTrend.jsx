

import { Area } from "@ant-design/plots";
import { useMemo } from "react";

const QuizAttempTrend = ({ attempts, }) => {


  const config = useMemo(() => ({
    data: attempts,
    title: `Response By Date `,
    xField: '_id',
    yField: 'count',
    style: {
      fill: '#0e7490',
    },
    shapeField: 'smooth',
  }), [attempts]);

  return (
    <>
      <Area height={400} {...config} />
    </>
  )
}

export default QuizAttempTrend;
