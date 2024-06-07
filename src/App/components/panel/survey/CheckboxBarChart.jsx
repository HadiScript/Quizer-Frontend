import { Bar, Column } from '@ant-design/plots';
import { useMemo } from 'react';


const CheckboxBarChart = ({ data }) => {
  const config = useMemo(() => ({
    data,

    xField: 'name',
    yField: "value",
    slider: {
      x: {}
    },

    shapeField: 'column25D',
    style: {
      fill: '#0891b2',
    },
    label: false,
  }), [data]);
  return <Column height={400} {...config} />;
}

export default CheckboxBarChart