import { Bar, Column } from '@ant-design/plots';
import { useMemo } from 'react';


const CheckboxBarChart = ({ data }) => {
  const config = useMemo(() => ({
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
      fill: ({ }) => {
        return '#155e75';
      },
    },
    label: false,
  }), [data]);
  return <Column height={400} {...config} />;
}

export default CheckboxBarChart