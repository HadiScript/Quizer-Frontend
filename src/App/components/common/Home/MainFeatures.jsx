import { IoCreate } from 'react-icons/io5'
import '../../../../assets/css/mainFeatures.css'
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
              <div className="bg-white inner"
                style={{
                  backgroundImage: 'url(/quiz.webp)',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className='thisBtn'>
                  <Button className='mb-5 mx-3 primaryBtn d-flex aign-items-center'>
                    <IoCreate size={18} />
                    Create Quiz
                  </Button>
                </div>
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
              <div className="bg-white inner"
                style={{
                  backgroundImage: 'url(/survey.webp)',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  // height: "100vh"
                }}
              >
                <div className='thisBtn'>
                  <Button className='mb-5 mx-3 primaryBtn d-flex aign-items-center'>
                    <IoCreate size={18} />
                    Create Survey
                  </Button>
                </div>
              </div>
              <p className='para'>
                Discover how easy it is to create and give online tests as well as get instant results in these short videos.
              </p>
            </div>
          </div>
        </div>
      </div>

    </>

  )
}

export default MainFeatures