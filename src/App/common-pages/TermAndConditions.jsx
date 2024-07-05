import { Nav30DataSource } from "../../data/data.source"
import useResponsive from "../../hooks/useBreakpoints"
import Footer from "../components/common/Home/Footer"
import Navbar from "../components/common/Home/Navbar"


const TermAndConditions = () => {
  const { isMobile } = useResponsive()
  return (
    <div className="templates-wrapper">


      <Navbar
        id="Navbar"
        key="navbar"
        dataSource={Nav30DataSource}
        isMobile={isMobile}
      />

      <div className="container">
        <div className="d-flex flex-column gap-3" style={{ marginTop: "100px", marginBottom: "100px" }}>
          <h1 style={{ fontWeight: "bold" }}>Terms and Conditions</h1>
        </div>
      </div>


      <Footer />
    </div>
  )
}

export default TermAndConditions