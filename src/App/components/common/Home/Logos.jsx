import { Grid } from 'antd'

const Logos = () => {
  const points = Grid.useBreakpoint()
  return (
    <div className='light-bg py-5' style={{ marginBottom: points.md ? "50px" : "50px", }}>
      <div className='feature8-title-wrapper'>
        <h1 style={{ fontWeight: "600" }}>Survey Fields</h1>
        <p>Design your surveys with a diverse range of input fields.</p>
      </div>
      <div className="container d-flex gap-5 flex-wrap justify-content-center align-items-center">
        <img src="/logos/hadi.svg" height={200} alt="hadi" />
        <img src="/logos/mancom.webp" height={200} alt="mancom" />
        <img src="/logos/cycarts.svg" height={200} alt="cycarts" />
        <img src="/logos/ideas9.svg" height={200} alt="ideas9" />
      </div>
    </div>
  )
}

export default Logos