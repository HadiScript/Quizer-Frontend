import '../../../../../assets/css/test1.scss'

import { CheckOutlined } from '@ant-design/icons';
import { featuresData } from '../../../../../data/features';
import { Grid } from 'antd';



const Test1 = () => {

  const points = Grid.useBreakpoint()

  const cubeRows = [
    { x: -1, y: 0 },
    { x: 0, y: 0 },
    { x: 1, y: 0 }
  ];

  const spans = [3, 2, 1];

  return (
    <div className="" id="Features" style={{ background: 'linear-gradient(to right, #083344, #06b6d4)' }}>
      <div className="container pt-5" style={{ marginBottom: points.md ? "100px" : "50px" }}>

        <div className="row">
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center">

            <div className='px-3'>
              <div className='d-flex flex-column gap-2 mb-3'>
                <div className='mb-2'>
                  <h1 style={{ fontWeight: "600" }} className='text-white'>Discover All About SAWAL</h1>
                </div>

                <ul class="list-unstyled mt-3 px-3" style={{ fontSize: "16px", marginLeft: points?.md ? "-30px" : "-12px" }}>
                  {
                    featuresData?.map((x, index) =>
                      <li key={index + 1}>
                        <div className="d-flex align-items-start gap-3 dimWhite">
                          <div className="">
                            <CheckOutlined />
                          </div>
                          <p className='' style={{ marginTop: '-5px' }}>{x}</p>
                        </div>
                      </li>
                    )
                  }

                </ul>

              </div>
            </div>


          </div>

          <div className="d-none d-md-block col-12 col-md-6 px-3">
            <div id="test-1">
              <div className="test1-container">
                {Array.from({ length: 3 }, (_, index) => ( // Repeat the cube structure 3 times
                  <div className="test1-cube" key={index}>
                    {cubeRows.map((row, rowIndex) => (
                      <div
                        key={rowIndex}
                        style={{ '--x': row.x, '--y': row.y }} // Handling CSS variables
                      >
                        {spans.map(i => (
                          <span key={i} style={{ '--i': i }}></span> // Individual spans
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Test1