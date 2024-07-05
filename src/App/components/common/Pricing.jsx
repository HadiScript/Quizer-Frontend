import { Button } from 'antd'
import '../../../assets/css/price.scss'
import { Link } from 'react-router-dom'

const Pricing = () => {
  return (
    <div id='Pricing'>


      <section className="plans__container">
        <div className="plans">
          <div className='feature8-title-wrapper'>
            <h1 style={{ fontWeight: "600" }}>Pricing</h1>
            <p>Check out how you can create amazing quizzes in mere minutes.</p>
          </div>
          <div className="planItem__container">

            <div className="planItem planItem--free">

              <div className="itscard">
                <div className="itscard__header">
                  <div className="itscard__icon symbol symbol--rounded"></div>
                  <h2>Free</h2>
                </div>
                <div className="itscard__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do</div>
              </div>

              <div className="price">$0<span>/ month</span></div>

              <ul className="featureList">
                <li>Separate dashboard</li>
                <li>10 Quizzes</li>
                <li>20 Questions for each quiz</li>
                <li>100 Attempts for each quiz</li>
                <li>Quiz Mode</li>
                <li>Passing Score</li>
                <li>Quiz Availability</li>
                <li className="disabled">Chat support</li>
                <li className="disabled">Mobile application</li>
                <li className="disabled">Unlimited users</li>
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
                  <h2 className='text-white'>Pro</h2>
                  <div className="itscard__label label">Best Value</div>
                </div>
                <div className="itscard__desc">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</div>
              </div>

              <div className="price">$10<span><span className='text-white'>/ month</span></span></div>

              <ul className="featureList">
                <li>2 links</li>
                <li>Own analytics platform</li>
                <li>Chat support</li>
                <li className="disabled">Mobile application</li>
                <li className="disabled">Unlimited users</li>
              </ul>

              <Button size='large'>
                <Link className='_link' to={'/signup'}>
                  Get Started
                </Link>
              </Button>
            </div>



            <div className="planItem  planItem--pro">
              <div className="itscard">
                <div className="itscard__header">
                  <div className="itscard__icon symbol symbol--rounded itscard__icon"></div>
                  <h2>Enterprise</h2>
                </div>
                <div className="itscard__desc">Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor</div>
              </div>

              <div className="price">Let's Talk</div>

              <ul className="featureList">
                <li>2 links</li>
                <li>Own analytics platform</li>
                <li>Chat support</li>
                <li>Mobile application</li>
                <li>Unlimited users</li>
                <li>Customize Panel</li>
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