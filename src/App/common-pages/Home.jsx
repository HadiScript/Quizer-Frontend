import '../../assets/css/home.css'

import Navbar1 from "../components/common/Home/Navbar";
import Section from "../components/common/Home/Section";
import AboutUs from "../components/common/Home/AboutUs";
import Features from "../components/common/Home/Features";
import Work from '../components/common/Home/Work';
import Pricing from '../components/common/Home/Pricing';
import Application from '../components/common/Home/Application';


function Home() {
  return (
    <>
      <Navbar1 />
      <Section />
      <AboutUs />
      <Features />
      <Work />
      <Pricing />
      <Application />
      {/* <Team /> */}
      {/* <Contact /> */}
      {/* <Footer /> */}
    </>
  );
}

export default Home;
