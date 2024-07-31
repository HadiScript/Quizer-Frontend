import { IoCreate, IoCreateOutline } from 'react-icons/io5'
import '../../../../assets/css/mainFeatures.css'
import { Link } from 'react-router-dom'
import bgImage from '../../../../assets/imgs/bgImage.webp'
import sawalApp from '../../../../assets/imgs/sawal-vector.webp'
import surveyApp from '../../../../assets/imgs/survey-vector.webp'

import img1 from '../../../../assets/imgs/testimg-1.webp'
import img2 from '../../../../assets/imgs/testimg-2.webp'
import { Button } from 'antd'


const MainFeatures = () => {
  return (
    <>
      <div className="services-section " >
        <div className="container">

          <div className=" myrow gap-5 justify-content-center" >
            <div className="col-5 p-2 d-flex flex-column gap-2  " >
              <div className="text-center ">
                <h5 className='text-white' style={{ fontWeight: "bold" }}>How to create online quizzes easily</h5>
                <p className='text-white'>for business owners, trainers, and educators</p>
              </div>
              <div className="bg-white border rounded">
                <img src={img1} alt="" height={"80%"} width={"100%"} />
                <Button className='mb-5 mx-3 primaryBtn d-flex aign-items-center'>
                  <IoCreate size={18} />
                  Create Account
                </Button>
              </div>
              <p className='para'>
                Discover how easy it is to create and give online tests as well as get instant results in these short videos.
              </p>
            </div>

            <div className="col-5 second-col p-2 d-flex flex-column gap-2  " >
              <div className="text-center ">
                <h5 className='text-white' style={{ fontWeight: "bold" }}>Try a demo exam</h5>
                <p className='text-white'>for business owners, trainers, and educators</p>
              </div>
              <div className="bg-white border rounded" >
                <img src={img1} alt="" height={"80%"} width={"100%"} className='' />
                <Button className='mb-5 mx-3 primaryBtn d-flex aign-items-center'>
                  <IoCreate size={18} />
                  Create Account
                </Button>
              </div>
              <p className='para'>
                Discover how easy it is to create and give online tests as well as get instant results in these short videos.
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
    // <section id="Services" key="Services" className="mywrapper" style={{ marginBottom: "100px" }}>
    //   <div className="">
    //     <div className="row container">
    //       <div className="col text-center mb-5">
    //         <h1 className=" font-weight-bolder">Bootstrap 4 Cards With Background Image</h1>
    //         <p >Lorem ipsum dolor sit amet at enim hac integer volutpat maecenas pulvinar.</p>
    //       </div>
    //     </div>
    //     <div className="row">
    //       <div className="col-6 mb-4">

    //         <div className="card text-dark card-has-bg  click-col"
    //           style={{ backgroundImage: `url(${img2})` }}
    //         >
    //           <img className="card-img d-none" src={img2} alt="Creative Manner Design Lorem Ipsum Sit Amet Consectetur dipisi?" />
    //           <div className="card-img-overlay d-flex flex-column">
    //             <div className="card-body">
    //               <small className="card-meta mb-2">Quiz</small>
    //               <h4 className="card-title mt-0 text-white">
    //                 Engage, Explore, and Excel With our Supreme Quality Quizzes and Survey
    //               </h4>
    //               <p className='cardspara'>
    //                 Engage, Explore, and Excel With our Supreme Quality Quizzes and Survey Reports Generator app.
    //               </p>
    //             </div>
    //             <div className="card-footer">
    //               <div className="media">
    //                 <Link to={'/signin'} className="media-body text-center border rounded py-2 d-flex align-items-center gap-2 justify-content-center _link text-white">
    //                   <IoCreateOutline size={20} />
    //                   <h6 className="my-0 d-block">Create Your First Quiz</h6>
    //                 </Link>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col-6 mb-4">

    //         <div className="card text-dark card-has-bg click-col" style={{ backgroundImage: `url(${img1})` }}>
    //           <img className="card-img d-none" src={img1} alt="Creative Manner Design Lorem Ipsum Sit Amet Consectetur dipisi?" />
    //           <div className="card-img-overlay d-flex flex-column">
    //             <div className="card-body">
    //               <small className="card-meta mb-2 text-white">Survey</small>
    //               <h4 className="card-title mt-0 text-white">
    //                 Your Go-To Hub for Quizzes and Surveys
    //               </h4>
    //               <p className='cardspara'>
    //                 Engage, Explore, and Excel With our Supreme Quality Quizzes and Survey Reports Generator app.
    //               </p>
    //             </div>
    //             <div className="card-footer">
    //               <div className="media">
    //                 <Link to={'/signin'} className="media-body text-center border rounded py-2 d-flex align-items-center gap-2 justify-content-center _link text-white">
    //                   <IoCreateOutline size={20} />
    //                   <h6 className="my-0  d-block">Create Your First Survey</h6>
    //                 </Link>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  )
}

export default MainFeatures