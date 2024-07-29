
import { Banner50DataSource, Nav30DataSource } from "../../data/data.source"
import useResponsive from "../../hooks/useBreakpoints"
import HowItWorksHero from "../components/common/Home/HowItWorksHero"
import HowItWorks from "../components/common/Home/HowItWorks"
import QuizComponents from "../components/common/Home/QuizComponents"
import CTA from "../components/common/Home/CTA"
import Footer from "../components/common/Home/Footer"
import Navbar from "../components/common/Home/Navbar"
import Banner from "../components/common/Home/Banner"
import Point from "../components/common/Home/Point"
import Pricing from "../components/common/Pricing"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"

const HowItWorksPage = () => {
  const { isMobile } = useResponsive()

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

      <Banner
        dataSource={Banner50DataSource}
        isMobile={isMobile}
      />

      {/* <HowItWorksHero /> */}
      <HowItWorks />
      <QuizComponents />
      <Pricing />

      {/* <CTA /> */}

      <Point
        key="list"
        data={['Banner', 'How It Works', 'Screenshots', 'Screenshots', 'Pricing', 'Footer']}
        size="point-large"
        position="point-left"
      />

      <Footer />

    </div>
  )
}
export default HowItWorksPage