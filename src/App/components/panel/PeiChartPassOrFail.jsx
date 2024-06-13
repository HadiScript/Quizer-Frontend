import { Pie } from "@ant-design/plots";
import { useMemo } from "react";


const PeiChartPassOrFail = ({ resultForPeiChart, isLoading }) => {


  const config = useMemo(() => ({
    data: resultForPeiChart,
    title: "Pass Fail",
    angleField: 'value',

    legend: true,
    innerRadius: 0.6,

    labels: [
      { text: 'name', style: { fontSize: 10, fontWeight: 'bold' } },
      {
        text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
        style: {
          fontSize: 9,
          dy: 12,
          color : "red"
        },
      },
    ],
    style: {
      stroke: '#fff',
      inset: 1,
      radius: 10,
      fill: ({ name }) => {
        if (name === 'Pass') {

          return '#155e75';
        }
        return '#991b1b';
      },
    },

  }), [resultForPeiChart]);

  return (
    <div>

      <Pie height={300} {...config} />
    </div>
  );
};

export default PeiChartPassOrFail;
