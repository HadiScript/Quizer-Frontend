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



const Home = () => {
  const { isMobile } = useResponsive()
  return (
    <div className="templates-wrapper">


      <Navbar
        id="Navbar"
        key="navbar"
        dataSource={Nav30DataSource}
        isMobile={isMobile}
      />

      <Hero />
      {/* <HowItWorks /> */}
      <HowItWorks2 />


      {/* <Banner
        id="Banner"
        key="banner"
        dataSource={Banner50DataSource}
        isMobile={isMobile}
      />

      <HowItWorks /> */}

      <Features key="features" id="Features" isMobile={isMobile} />

      <FormComponents />
      <QuizComponents />

      <CTA
        id="CTA"
        key="cta"
        dataSource={Content110DataSource}
        isMobile={isMobile}
      />

      <Footer />

      <Point
        key="list"
        data={['Navbar', 'Banner', 'How it works?', 'Features', 'Form Components', 'Screenshots', 'Footer']}
        size="point-large"
        position="point-left"
      />

    </div>
  )
}

export default Home