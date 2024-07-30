import { Button } from 'antd'
import '../../../assets/css/price.scss'
import { Link } from 'react-router-dom'
import { SiBasicattentiontoken } from "react-icons/si";
import entreImg from '../../../assets/imgs/entre-icon.svg'



const Pricing = () => {
  return (
    <div id='Pricing'>


      <section className="plans__container">
        <div className="plans">
          <div className='feature8-title-wrapper'>
            <h1 style={{ fontWeight: "600" }}>Our Pricing Plans</h1>
            <p>Choose from our pricing packages as per your need.</p>
          </div>
          <div className="planItem__container">

            <div className="planItem planItem--free">

              <div className="itscard">
                <div className="itscard__header">
                  <div className="itscard__icon symbol symbol--rounded"></div>
                  <h2>Standard</h2>
                </div>
                <div className="itscard__desc">For small teams and individuals. Upgrade to the Enterprise plan to enjoy advanced settings.</div>
              </div>

              <div className="price">$0<span>/ month</span></div>

              <ul className="featureList">
                <li className=''>Separate dashboard</li>
                <li className=''>10 Quizzes</li>
                <li className=''>20 Questions for each quiz</li>
                <li className=''>100 Attempts for each quiz</li>
                <li className=''>Quiz Mode</li>
                <li className=''>Passing Score</li>
                <li className=''>Quiz Availability</li>
                <li className=' disabled' >Quiz Multiple Display</li>
                <li className=' disabled' >Score Type</li>
                <li className=' disabled' >Show Score</li>
              </ul>

              <Button style={{ backgroundColor: "#164e63", color: "white" }} size='large'>
                <Link className='_link' to={'/signup'}>
                  Get Started
                </Link>
              </Button>
            </div>


            <div className="planItem planItem--entp">
              <div className="itscard">
                <div className="itscard__header">
                  <div className="itscard__icon symbol"></div>
                  <h2 className='text-white'>Business</h2>
                  <div className="itscard__label label">Best Value</div>
                </div>
                <div className="itscard__desc">For large-scale businesses or institutions. Suitable for unlimited users.</div>
              </div>

              <div className="price">$10<span><span className='text-white'>/ month</span></span></div>

              <ul className="featureList">
                <li>Separate dashboard</li>
                <li>10 Quizzes</li>
                <li>20 Questions for each quiz</li>
                <li>100 Attempts for each quiz</li>
                <li>Quiz Mode</li>
                <li>Passing Score</li>
                <li>Quiz Availability</li>
                <li>Quiz Multiple Display</li>
                <li>Score Type</li>
                <li>Show Score</li>
              </ul>

              <Button size='large'>
                <Link className='_link' to={'/signup'}>
                  Get Started
                </Link>
              </Button>
            </div>



            <div className="planItem planItem--free  ">
              <div className="itscard">
                <div className="itscard__header">
                  {/* <div className="itscard__icon symbol symbol--rounded "></div> */}
                  <img src={entreImg} alt="icon" className='itscard__icon symbol symbol--rounded' />
                  {/* <SiBasicattentiontoken size={30} /> */}
                  <h2>Enterprise</h2>
                </div>
                <div className="itscard__desc">For bigger teams and organizations with advanced reporting features.</div>
              </div>

              <div className="price">Let's Talk</div>

              <ul className="featureList">
                <li>Separate Server</li>
                <li>Separate Subdomain</li>
                <li>Create your own Home Page</li>
                <li>Mobile application</li>
                <li>Advance Reporting</li>
                <li>Many more</li>
              </ul>
              <Button style={{ backgroundColor: "#164e63", color: "white" }} size='large'>
                <Link className='_link' to={'/signup'}>
                  Get Started
                </Link>
              </Button>
              {/* <button className="itsbutton text-white">Get Started</button> */}
            </div>


          </div>
        </div>
      </section>

    </div>
  )
}

export default Pricing