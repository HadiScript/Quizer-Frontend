import React from 'react';
import { Bar, Pie, Column } from '@ant-design/plots';

const StatsCharts = () => {
  const barData = [
    { type: 'Total Quizzes', value: 10 },
    { type: 'Total Questions', value: 100 }
  ];

  const pieData = [
    { type: 'Enabled Questions', value: 10 },
    { type: 'Disabled Questions', value: 0 }
  ];

  const columnData = [
    { type: 'Total Attempts', value: 146 },
    { type: 'Pass Attempts', value: 103 },
    { type: 'Fail Attempts', value: 43 }
  ];

  const barConfig = {
    data: barData,
    xField: 'value',
    yField: 'type',
    seriesField: 'type',
    legend: { position: 'top-left' }
  };

  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
  };

  const columnConfig = {
    data: columnData,
    isGroup: true,
    xField: 'type',
    yField: 'value',
    seriesField: 'type',
    label: {
      position: 'middle',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
      ],
    },
  };

  return (
    <div>
      <Bar height={100} width={300} {...barConfig} />
      <Pie {...pieConfig} />
      <Column {...columnConfig} />
    </div>
  );
};

export default StatsCharts;
