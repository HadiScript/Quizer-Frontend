import { IoCreateOutline } from 'react-icons/io5'
import '../../../../assets/css/mainFeatures.scss'
import { Link } from 'react-router-dom'
import bgImage from '../../../../assets/imgs/bgImage.webp'


const MainFeatures = () => {
  return (
    <section id="Services" key="Services" className="mywrapper" style={{ marginBottom: "100px" }}>
      <div className="container">
        <div className="row">
          <div className="col text-center mb-5">
            <h1 className=" font-weight-bolder">Bootstrap 4 Cards With Background Image</h1>
            <p >Lorem ipsum dolor sit amet at enim hac integer volutpat maecenas pulvinar.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-6 mb-4">

            <div className="card text-dark card-has-bg  click-col"
              style={{ backgroundImage: `url(${bgImage})` }}
            >
              <img className="card-img d-none" src={bgImage} alt="Creative Manner Design Lorem Ipsum Sit Amet Consectetur dipisi?" />
              <div className="card-img-overlay d-flex flex-column">
                <div className="card-body">
                  <small className="card-meta mb-2">Quiz</small>
                  <h4 className="card-title mt-0 text-white">
                    Engage, Explore, and Excel With our Supreme Quality Quizzes and Survey
                  </h4>
                  <p className='cardspara'>
                    Engage, Explore, and Excel With our Supreme Quality Quizzes and Survey Reports Generator app.
                  </p>
                </div>
                <div className="card-footer">
                  <div className="media">
                    <Link to={'/signin'} className="media-body text-center border rounded py-2 d-flex align-items-center gap-2 justify-content-center _link text-white">
                      <IoCreateOutline size={20} />
                      <h6 className="my-0 d-block">Create Your First Quiz</h6>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 mb-4">

            <div className="card text-dark card-has-bg click-col" style={{ backgroundImage: `url(${bgImage})` }}>
              <img className="card-img d-none" src={bgImage} alt="Creative Manner Design Lorem Ipsum Sit Amet Consectetur dipisi?" />
              <div className="card-img-overlay d-flex flex-column">
                <div className="card-body">
                  <small className="card-meta mb-2 text-white">Survey</small>
                  <h4 className="card-title mt-0 text-white">
                    Your Go-To Hub for Quizzes and Surveys
                  </h4>
                  <p className='cardspara'>
                    Engage, Explore, and Excel With our Supreme Quality Quizzes and Survey Reports Generator app.
                  </p>
                </div>
                <div className="card-footer">
                  <div className="media">
                    <Link to={'/login'} className="media-body text-center border rounded py-2 d-flex align-items-center gap-2 justify-content-center _link text-white">
                      <IoCreateOutline size={20} />
                      <h6 className="my-0  d-block">Create Your First Survey</h6>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainFeatures