import { Column, Pie, } from '@ant-design/plots';
import { useMemo } from 'react';


const RatingPieChart = ({ data }) => {


  const config2 = useMemo(() => ({
    data,

    xField: 'Name',
    yField: "Count",
    slider: {
      x: { value: [0, 5] }
    },

    // shapeField: 'column25D',
    style: {
      radiusTopLeft: 10,
      radiusTopRight: 10,
      fill: ({ Name }) => {
        if (Name === 0) return "#b91c1c"
        else if (Name === 1) return "#c2410c"
        else if (Name === 2) return "#a16207"
        else if (Name === 3) return "#4d7c0f"
        else if (Name === 4) return "#0891b2"
        else if (Name === 5) return "#164e63"
        // return '#047857';
      },
    },
    label: false,

  }), [data]);

  return (
    <>
      {/* <Pie height={300} {...config} /> */}
      <Column height={300} {...config2} />
    </>
  )
}

export default RatingPieChart