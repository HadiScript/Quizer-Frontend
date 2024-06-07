import { Pie, } from '@ant-design/plots';
import { useMemo } from 'react';


const RatingPieChart = ({ data }) => {
  const config = useMemo(() => ({
    data,
    angleField: 'value',
    colorField: 'name',
    legend: true,
    innerRadius: 0.6,
    labels: [
      { text: 'name', style: { fontSize: 10, fontWeight: 'bold' } },
      {
        text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
        style: {
          fontSize: 9,
          dy: 12,
        },
      },
    ],
    style: {
      stroke: '#fff',
      inset: 1,
      radius: 10,
    },

  }), [data]);

  return (
    <div>
      <Pie height={300} {...config} />
    </div>
  )
}

export default RatingPieChart