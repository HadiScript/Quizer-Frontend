import '../../assets/css/home.css'

import Navbar1 from "../components/common/Home/Navbar";
import Section from "../components/common/Home/Section";
import AboutUs from "../components/common/Home/AboutUs";
import Features from "../components/common/Home/Features";
import Work from '../components/common/Home/Work';
import Pricing from '../components/common/Home/Pricing';
import Application from '../components/common/Home/Application';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';


function Home() {
  return (
    <div style={{ minHeight: "100vh" }} className='d-flex flex-column justify-content-center align-items-center gap-4'>
      <h1>رجوع الی القرآن</h1>
      <Button className='myBtn' icon={<ArrowRightOutlined />}>
        <Link className='_link' to={`https://quizer-frontend.vercel.app/#/attempt-quiz/65eacb6994a7d2e77016054f/660da5fbf2b0c1286ad6c564`}>
          Instructions of Quiz
        </Link>
      </Button>



      {/* <Navbar1 />
      <Section />
      <AboutUs />
      <Features />
      <Work />
      <Pricing />
      <Application /> */}
      {/* <Team /> */}
      {/* <Contact /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
