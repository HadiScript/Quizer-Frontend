import { Grid, Image } from 'antd'
import Marquee from 'react-fast-marquee'




const QuizComponents = () => {
  const points = Grid.useBreakpoint()


  return (
    <div key="Screenshots" id="Screenshots" className='home-page-wrapper feature8-wrapper' style={{ marginTop: "-100px", marginBottom: "100px" }}>
      <div className="home-page feature8">
        <div className='feature8-title-wrapper'>
          <h1 style={{ fontWeight: "600" }}>A Glimpse of SAWAL</h1>
          <p>Practical components to meet your needs, flexible customization and expansion</p>
        </div>
      </div>



      <div className="d-flex justify-content-center ">
        <Marquee>
          <div className="mx-2">
            <Image className='border rounded-2' src='/images/main.png' height={points.lg ? 250 : 150} />
          </div>
          <div className="mx-2">
            <Image className='border rounded-2' src='/images/quiz-dashbaord.png' height={points.lg ? 250 : 150} />
          </div>
          <div className="mx-2">
            <Image className='border rounded-2' src='/images/survey-dashboard.png' height={points.lg ? 250 : 150} />
          </div>
        </Marquee>
      </div>

      <div className="d-flex  justify-content-center align-items-center gap-2 mt-3 mb-4">
        <Marquee speed={40}>
          <div className="mx-2">
            <Image className='border rounded-2' src='/images/attempters.png' height={points.lg ? 400 : 350} />
          </div>
          <div className="mx-2">
            <Image className='border rounded-2' src='/images/questions.png' height={points.lg ? 400 : 350} />
          </div>
          <div className="mx-2">
            <Image className='border rounded-2' src='/images/settings2.png' height={points.lg ? 400 : 350} />
          </div>
          <div className="mx-2">
            <Image className='border rounded-2' src='/images/settings.png' height={points.lg ? 400 : 350} />
          </div>
        </Marquee>
      </div>


      <div className="d-flex  justify-content-center align-items-center gap-2 mt-3 mb-4">
        <Marquee speed={30}>
          <div className="mx-2">
            <Image className='border rounded-2' src='/images/attempters.png' height={points.lg ? 400 : 350} />
          </div>
          <div className="mx-2">
            <Image className='border rounded-2' src='/images/questions.png' height={points.lg ? 400 : 350} />
          </div>
          <div className="mx-2">
            <Image className='border rounded-2' src='/images/settings2.png' height={points.lg ? 400 : 350} />
          </div>
          <div className="mx-2">
            <Image className='border rounded-2' src='/images/settings.png' height={points.lg ? 400 : 350} />
          </div>
        </Marquee>
      </div>
    </div>

  )
}

export default QuizComponents