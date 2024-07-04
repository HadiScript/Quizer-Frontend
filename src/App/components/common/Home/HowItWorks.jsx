import { Anchor, Col, Image, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { BiRightArrow } from 'react-icons/bi';
// import '../../../../assets/css/items.css'


const quizSteps = [
  {
    title: "Step 1",
    description: "Fill the title, add require fields, and time limits",
    image: "/images/main-dashboard.png"
  },
  {
    title: "Step 2",
    description: "Add question, Disable Questions, Enable Question",
    image: "/images/main-dashboard.png"
  },
  {
    title: "Step 3",
    description: "Add suitable settings - Quiz Mode, Show Score?, Score Type and etc",
    image: "/images/main-dashboard.png"
  },
  {
    title: "Step 4",
    description: "Copy the link and share with you those who will attempt the quiz",
    image: "/images/main-dashboard.png"
  },
  {
    title: "Step 5",
    description: "Now you can check the each response",
    image: "/images/main-dashboard.png"
  },
  {
    title: "Step 6",
    description: "Analyze you Quiz",
    image: "/images/settings.png"
  }
]

const QuizCreationSteps = () => {
  return <div
    id="part-1"
    className='p-3 '
    style={{
      // background: 'rgba(255,0,0,0.02)',
    }}
  >
    <div className='works-subtitle border-bottom py-4'>
      <h5>Create Quiz Steps</h5>
    </div>
    <div className='row py-5'>
      <div className="col-12 d-flex flex-column gap-3">


        {quizSteps?.map((x, index) => <div key={index} className='d-flex flex-wrap align-items-start justify-content-between gap-2 border-bottom'  >
          <div className="">
            <h5>{x.title}</h5>
            <p>{x.description}</p>
          </div>
          <div style={{ width: '200px' }} className='mb-2 '>
            <Image src={x.image} className='img' />
          </div>
        </div>)}
      </div>
    </div>




  </div>
}


const FormCreationSteps = () => {
  return <div
    id="part-2"
    style={{
      background: 'rgba(0,255,0,0.02)',
    }}
  >
    <div className=" p-2 d-flex flex-column">
      <div className='works-subtitle border-bottom py-4'>
        <h5>Create Forms Steps</h5>
      </div>

      <div className='row py-5'>
        <div className="col-6 d-flex flex-column gap-3">
          <div className='d-flex flex-column gap-2 border-bottom'  >
            <div style={{ width: '200px' }}>
              <Image src='/images/main-dashboard.png' className='img' />
            </div>
            <h5>Step 1</h5>
            <p>Fill the title, add require fields, and time limits</p>
          </div>

          <div className='d-flex flex-column gap-2 border-bottom'>
            <div style={{ width: '200px' }}>
              <Image src='/images/main-dashboard.png' className='img' />
            </div>
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
            <div style={{ width: '200px' }}>
              <Image src='/images/main-dashboard.png' className='img' />
            </div>
            <h5>Step 4</h5>
            <p>Copy the link and share with you those who will attempt the quiz</p>
          </div>

          <div className='d-flex flex-column gap-2 border-bottom'>
            <div style={{ width: '200px' }}>
              <Image src='/images/main-dashboard.png' className='img' />
            </div>
            <h5>Step 5</h5>
            <p>Now you can check the each response</p>
          </div>
          <div className='d-flex flex-column gap-2 border-bottom'>
            <div style={{ width: '200px' }}>
              <Image src='/images/main-dashboard.png' className='img' />
            </div>
            <h5>Step 6</h5>
            <p>Analyze you Quiz</p>
          </div>
        </div>
      </div>

    </div>
  </div>
}


const HowItWorks = () => {
  const [isAnchorVisible, setIsAnchorVisible] = useState(false);
  const howItWorksRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAnchorVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (howItWorksRef.current) {
      observer.observe(howItWorksRef.current);
    }

    return () => {
      if (howItWorksRef.current) {
        observer.unobserve(howItWorksRef.current);
      }
    };
  }, []);



  return (
    <div style={{ marginBottom: "100px" }} ref={howItWorksRef}>
      <div className='feature8-title-wrapper'>
        <h1 style={{ fontWeight: "600" }}>How it works</h1>
        <p>Check out how you can create amazing quizzes in mere minutes.</p>
      </div>

      <div className="container">
        <Row>

          <Col span={6}>
            {isAnchorVisible && (
              <Anchor
                items={[
                  {
                    key: 'part-1',
                    href: '#part-1',
                    title: <h6 className='text-decoration-none'>Quiz Creation Steps</h6>,
                  },
                  {
                    key: 'part-2',
                    href: '#part-2',
                    title: <h6 className='text-decoration-none'>Form Creation Steps</h6>,
                  },
                  {
                    key: 'part-3',
                    href: '#part-3',
                    title: <h6 className='text-decoration-none'>Skip</h6>,
                  }
                ]}
              />
            )}
          </Col>

          <Col span={18}>
            <QuizCreationSteps />


            <FormCreationSteps />


          </Col>

        </Row>
      </div>
    </div>
  )
}

export default HowItWorks