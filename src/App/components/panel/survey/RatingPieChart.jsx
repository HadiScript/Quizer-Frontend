import { Column, Pie, } from '@ant-design/plots';
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
      fill: ({ name }) => {
        if (name === 0) return '#500724'
      },
      inset: 1,
      radius: 10,
    },
    slider: false

  }), [data]);

  const config2 = useMemo(() => ({
    data,

    xField: 'name',
    yField: "value",
    slider: {
      x: { value: [0, 5] }
    },

    // shapeField: 'column25D',
    style: {
      radiusTopLeft: 10,
      radiusTopRight: 10,
      fill: ({ name }) => {
        if (name === 0) return "#b91c1c"
        else if (name === 1) return "#c2410c"
        else if (name === 2) return "#a16207"
        else if (name === 3) return "#4d7c0f"
        else if (name === 4) return "#0891b2"
        else if (name === 5) return "#164e63"
        // return '#047857';
      },
    },
    label: false,

  }), [data]);

  return (
    <div>
      {/* <Pie height={300} {...config} /> */}
      <Column height={300} {...config2} />
    </div>
  )
}

export default RatingPieChart