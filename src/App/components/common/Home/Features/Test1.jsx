import { BsMagic } from 'react-icons/bs';
import '../../../../../assets/css/test1.scss'

import { MdOutlineDashboardCustomize } from "react-icons/md";
import { CheckOutlined } from '@ant-design/icons';



const Test1 = () => {

  const cubeRows = [
    { x: -1, y: 0 },
    { x: 0, y: 0 },
    { x: 1, y: 0 }
  ];

  const spans = [3, 2, 1];

  return (
    <div className="" id="Features" style={{ background: 'linear-gradient(to right, #083344, #06b6d4)' }}>
      <div className="container pt-5" style={{ marginBottom: "100px", }}>

        <div className="row">
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center">

            <div className='px-3'>
              <div className='d-flex flex-column gap-2 mb-3'>
                <div className='mb-2'>
                  <h1 style={{ fontWeight: "600" }} className='text-white'>What Sawal has to give you features</h1>
                </div>

                <ul class="list-unstyled" style={{ fontSize: "16px", marginLeft : "-30px" }}>
                  <li>
                    <div className="d-flex align-items-start gap-3 dimWhite">
                      <CheckOutlined />
                      <p style={{ marginTop: '-5px' }}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the</p>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-start gap-3 dimWhite">
                      <CheckOutlined />
                      <p style={{ marginTop: '-5px' }}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate theIn publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the</p>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-start gap-3 dimWhite">
                      <CheckOutlined />
                      <p style={{ marginTop: '-5px' }}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the</p>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-start gap-3 dimWhite">
                      <CheckOutlined />
                      <p style={{ marginTop: '-5px' }}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the</p>
                    </div>
                  </li>
                </ul>

              </div>
            </div>


          </div>

          <div className="col-12 col-md-6 px-3">
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