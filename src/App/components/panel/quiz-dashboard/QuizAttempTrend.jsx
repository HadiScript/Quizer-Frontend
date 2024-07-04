

import { Area } from "@ant-design/plots";
import { Empty } from "antd";
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
      {attempts?.length === 0 ? <div style={{ height: 400 }}>
        <h6 className="my-3 px-3"><b>Response By Date</b></h6>
        <Empty />
      </div> :
        <Area height={400} {...config} />
      }

    </>
  )
}

export default QuizAttempTrend;
