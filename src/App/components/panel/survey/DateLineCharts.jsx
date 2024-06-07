import { Area } from "@ant-design/plots";

const DateLineCharts = ({ data }) => {

  const config = {
    data,
    title: `Response By Date (${data?.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)})`,
    xField: 'date',
    yField: 'value',
    style: {
      fill: '#0e7490',
    },
    shapeField: 'smooth',
    // axis: {
    //   y: { labelFormatter: '~s' },
    // },
    // line: {
    //   style: {
    //     stroke: '#083344',
    //     strokeWidth: 2,
    //   },
    // },
  };

  return (
    <Area height={400} {...config} />
  )
}

export default DateLineCharts