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



const Home = () => {
  const { isMobile } = useResponsive()
  return (
    <div className="templates-wrapper">


      <Navbar
        id="navbar"
        key="navbar"
        dataSource={Nav30DataSource}
        isMobile={isMobile}
      />




      <Banner
        id="banner"
        key="banner"
        dataSource={Banner50DataSource}
        isMobile={isMobile}
      />

      <HowItWorks />

      <Features key="features" id="features" isMobile={isMobile} />

      <QuizComponents />

      <CTA
        id="cta"
        key="cta"
        dataSource={Content110DataSource}
        isMobile={isMobile}
      />
      <Footer
        id="footer2"
        key="footer2"
      />

      <Point
        key="list"
        data={['navbar', 'banner', 'HowItWorks', 'features', 'quiz-component', 'cta', 'footer2']}
        size="point-large"
        position="point-left"
      />




    </div>
  )
}

export default Home