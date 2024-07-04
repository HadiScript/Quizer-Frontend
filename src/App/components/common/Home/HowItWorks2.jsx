import { Col, Image, Row } from 'antd'
import '../../../../assets/css/works.css'


const HowItWorks2 = () => {
  return (

    <>
      <div className='feature8-title-wrapper'>
        <h1 style={{ fontWeight: "600" }}>How it works</h1>
        <p>Check out how you can create amazing quizzes in mere minutes.</p>
      </div>


      <div className="container">
        <Row>
          <Col md={8} lg={8} xs={24} className='p-1 border-end'>
            <div className=" p-2 d-flex flex-column">
              <div className='works-subtitle border-bottom pb-4'>
                <h5>Create Quiz Steps</h5>
              </div>

              <div className='row py-5'>
                <div className="col-6 d-flex flex-column gap-3">
                  <div className='d-flex flex-column gap-2 border-bottom'  >
                    <Image src='/images/main-dashboard.png' className='img' />
                    <h5>Step 1</h5>
                    <p>Fill the title, add require fields, and time limits</p>
                  </div>

                  <div className='d-flex flex-column gap-2 border-bottom'>
                    <Image src='/images/main-dashboard.png' className='img' />
                    <h5>Step 2</h5>
                    <p>Add question, Disable Questions, Enable Question</p>
                  </div>
                  <div className='d-flex flex-column gap-2 border-bottom'>
                    <Image src='/images/settings.png' className='img' />
                    <h5>Step 3</h5>
                    <p>Add suitable settings - Quiz Mode, Show Score?, Score Type and etc</p>
                  </div>
                </div>

                <div className="col-6 d-flex flex-column gap-3">
                  <div className='d-flex flex-column gap-2 border-bottom'>
                    <Image src='/images/main-dashboard.png' className='img' />
                    <h5>Step 4</h5>
                    <p>Copy the link and share with you those who will attempt the quiz</p>
                  </div>

                  <div className='d-flex flex-column gap-2 border-bottom'>
                    <Image src='/images/main-dashboard.png' className='img' />
                    <h5>Step 5</h5>
                    <p>Now you can check the each response</p>
                  </div>
                  <div className='d-flex flex-column gap-2 border-bottom'>
                    <Image src='/images/main-dashboard.png' className='img' />
                    <h5>Step 6</h5>
                    <p>Analyze you Quiz</p>
                  </div>
                </div>
              </div>

            </div>
          </Col>


          <Col md={8} lg={8} xs={24} className='p-1'>
            <div className=" p-2 mt-5 d-flex flex-column justify-content-center gap-4">
              <div className='works-subtitle border-bottom pb-4'>
                <h5>Some Extra Stuff</h5>
              </div>
              <div className='d-flex flex-column gap-2 border-bottom'  >
                <Image src='/images/settings2.png' className='img' />
                <h5>Global Settings</h5>
                <p>Fill the title, add require fields, and time limits</p>
              </div>

              <div className='d-flex flex-column gap-2 border-bottom'  >
                <Image src='/images/main-dashboard.png' className='img' />
                <h5>Step 1</h5>
                <p>Fill the title, add require fields, and time limits</p>
              </div>
            </div>
          </Col>


          <Col md={8} lg={8} xs={24} className='p-1 border-start'>
            <div className=" p-2 d-flex flex-column">
              <div className='works-subtitle border-bottom pb-4'>
                <h5>Create Forms Steps</h5>
              </div>

              <div className='row py-5'>
                <div className="col-6 d-flex flex-column gap-3">
                  <div className='d-flex flex-column gap-2 border-bottom'  >
                    <Image src='/images/main-dashboard.png' className='img' />
                    <h5>Step 1</h5>
                    <p>Fill the title, add require fields, and time limits</p>
                  </div>

                  <div className='d-flex flex-column gap-2 border-bottom'>
                    <Image src='/images/main-dashboard.png' className='img' />
                    <h5>Step 2</h5>
                    <p>Add question, Disable Questions, Enable Question</p>
                  </div>
                  <div className='d-flex flex-column gap-2 border-bottom'>
                    <Image src='/images/settings.png' className='img' />
                    <h5>Step 3</h5>
                    <p>Add suitable settings - Quiz Mode, Show Score?, Score Type and etc</p>
                  </div>
                </div>

                <div className="col-6 d-flex flex-column gap-3">
                  <div className='d-flex flex-column gap-2 border-bottom'>
                    <Image src='/images/main-dashboard.png' className='img' />
                    <h5>Step 4</h5>
                    <p>Copy the link and share with you those who will attempt the quiz</p>
                  </div>

                  <div className='d-flex flex-column gap-2 border-bottom'>
                    <Image src='/images/main-dashboard.png' className='img' />
                    <h5>Step 5</h5>
                    <p>Now you can check the each response</p>
                  </div>
                  <div className='d-flex flex-column gap-2 border-bottom'>
                    <Image src='/images/main-dashboard.png' className='img' />
                    <h5>Step 6</h5>
                    <p>Analyze you Quiz</p>
                  </div>
                </div>
              </div>

            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default HowItWorks2