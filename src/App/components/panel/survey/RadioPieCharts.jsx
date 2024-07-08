import { Pie, } from '@ant-design/plots';
import { useMemo } from 'react';


const RadioPieCharts = ({ data }) => {



  const config = useMemo(() => ({

    data,
    angleField: 'Count',
    colorField: 'Name',
    innerRadius: 0.6,
    style: {
      stroke: '#fff',
      inset: 1,
      radius: 10,
    },


    autoFit: true,
    tooltip: {
      title: 'name',
    },
    interaction: {
      elementHighlight: true,
    },
    state: {
      inactive: { opacity: 0.5 },
    },

    // legend: {
    //   itemValueText: ({ name }) => name.toUpperCase()
    // },

    color: ['#083344', '#115e59', '#3730a3', '#be185d', '#9333ea', '#44403c'],
  }), [data]);

  return (
    <Pie colorField='value' height={300} {...config} />
  )
}

export default RadioPieCharts