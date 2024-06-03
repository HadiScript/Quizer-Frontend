import { Image } from 'antd'


const QuizComponents = () => {



  return (
    <div key="quiz-component" id="quiz-component" className='home-page-wrapper feature8-wrapper' style={{ marginTop: "100px", marginBottom: "100px" }}>
      <div className="home-page feature8">
        <div className='feature8-title-wrapper'>
          <h1 style={{ fontWeight: "600" }}>Gallary</h1>
        </div>



      </div>


      <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
        <Image className='border rounded-2' src='/images/main-dashboard.png' height={200} />
        <Image className='border rounded-2' src='/images/quiz-dashboard.png' height={200} />
        <Image className='border rounded-2' src='/images/quiz-dashboard2.png' height={200} />
      </div>

      <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 mt-3 mb-4">
        <Image className='border rounded-2' src='/images/attempters.png' height={400} />
        <Image className='border rounded-2' src='/images/questions.png' height={400} />
        <Image className='border rounded-2' src='/images/settings2.png' height={400} />
        <Image className='border rounded-2' src='/images/settings.png' height={400} />
      </div>
    </div>

  )
}

export default QuizComponents