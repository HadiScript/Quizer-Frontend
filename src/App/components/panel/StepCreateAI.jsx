import { Progress, Grid } from 'antd';


const StepCreateAI = ({ current }) => {
  const points = Grid.useBreakpoint()
  return (
    <div className="mb-5">
      <span className="heading">Create Quiz With AI</span>
      <Progress percent={current === 1 ? 40 : current === 2 ? 80 : 100} size={[points.md ? 500 : !points.md && 300, 20]} strokeColor={'#083344'} />

    </div>
  )
}

export default StepCreateAI