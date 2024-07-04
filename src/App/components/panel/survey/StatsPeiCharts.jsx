import { Pie, } from '@ant-design/plots';


const customLabel = (_, datum) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
    <div style={{ width: 8, height: 8, background: 'rgba(0,0,0,0.4)', borderRadius: '50%' }} />
    <div>
      {datum.type} : <b>{datum.name}</b>
    </div>
  </div>
);

const StatsPeiCharts = ({ data, isLoading, small = false }) => {
  const config = {
    title: "Fields",
    data,
    angleField: 'count',
    colorField: 'name',
    legend: true,
    innerRadius: 0.6,

    tooltip: {
      title: 'name',
    },
    interaction: {
      elementHighlight: true,
    },
    state: {
      inactive: { opacity: 0.5 },
    },
    style: {
      stroke: '#fff',
      inset: 1,
      radius: 10,
    },
    scale: {
      color: {
        palette: 'spectral',
        offset: (t) => t * 0.8 + 0.1,
      },
    },
  };

  return (
    <div>
      {/* {JSON.stringify(data)} */}
      <Pie height={small ? 300 : 400} {...config} />
    </div>
  )
}

export default StatsPeiCharts