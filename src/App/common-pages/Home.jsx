import '../../assets/less/antMotionStyle.less';
import { Content110DataSource, Banner50DataSource, Nav30DataSource } from '../../data/data.source';
import Banner from '../components/common/Home/Banner';
import CTA from '../components/common/Home/CTA';
import Navbar from '../components/common/Home/Navbar';
import Features from '../components/common/Home/Features';
import Footer from '../components/common/Home/Footer';
import Point from '../components/common/Home/Point';
import HowItWorks from '../components/common/Home/HowItWorks';
import QuizComponents from '../components/common/Home/QuizComponents';
import useResponsive from '../../hooks/useBreakpoints';
import FormComponents from '../components/common/Home/FormComponents';
import Hero from '../components/common/Home/Hero';
import HowItWorks2 from '../components/common/Home/HowItWorks2';
import Benifits from '../components/common/Home/Benifits';
import Test1 from '../components/common/Home/Features/Test1';
import Pricing from '../components/common/Pricing';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import MainFeatures from '../components/common/Home/MainFeatures';



const Home = () => {
  const { isMobile } = useResponsive();


  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash && document.querySelector(hash)) {
      document.querySelector(hash).scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);


  return (
    <div className="templates-wrapper">
      <Navbar
        id="Navbar"
        key="navbar"
        dataSource={Nav30DataSource}
        isMobile={isMobile}
      />
      <Hero />
      {/* <MainFeatures /> */}
      <Benifits />
      <Test1 />
      <Features key="features" isMobile={isMobile} />
      <FormComponents />
      <Pricing />
      <CTA
        id="CTA"
        key="cta"
        dataSource={Content110DataSource}
        isMobile={isMobile}
      />
      <Footer />
      <Point
        key="list"
        data={['Banner', 'Services','Benefits', 'Features', 'Offers', 'Forms Component', , 'CTA', 'Footer']}
        size="point-large"
        position="point-left"
      />

    </div>
  )
}

export default Home