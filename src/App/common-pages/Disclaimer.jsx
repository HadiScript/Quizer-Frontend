import { Nav30DataSource } from "../../data/data.source"
import useResponsive from "../../hooks/useBreakpoints"
import Footer from "../components/common/Home/Footer"
import Navbar from "../components/common/Home/Navbar"


const Disclaimer = () => {
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
          <h1 style={{ fontWeight: "bold" }}>Disclaimer</h1>

          <p>
            The information provided by SAWAL ("we," "us," or "our") on the SAWAL app and our website is for general informational purposes only. All information on the app and the website is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the app or the website.
          </p>

          <ol>
            <li className="mt-2"> <strong>External Links Disclaimer</strong> The SAWAL app and website may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the app or any website or feature linked in any banner or other advertising.</li>

            <li className="mt-2"><strong>Errors and Omissions Disclaimer</strong> While we have made every attempt to ensure that the information contained in the app and the website is correct, SAWAL is not responsible for any errors or omissions, or for the results obtained from the use of this information. All information in the app and the website is provided "as is," with no guarantee of completeness, accuracy, timeliness, or of the results obtained from the use of this information.
            </li>

            <li className="mt-2"><strong>Fair Use Disclaimer</strong> The SAWAL app may contain copyrighted material, the use of which may not always have been specifically authorized by the copyright owner. We believe this constitutes a "fair use" of any such copyrighted material as provided for in section 107 of the US Copyright Law. If you wish to use copyrighted material from the app for purposes of your own that go beyond fair use, you must obtain permission from the copyright owner.
            </li>
            <li className="mt-2">
              <strong>Personal Responsibility</strong> You acknowledge that you are using the SAWAL app and website voluntarily and that any choices, actions, and results now and in the future are solely your responsibility. SAWAL will not be liable to you or any other party for any decision made or action taken in reliance on the information given by the app or the website.
            </li>
            <li className="mt-2">
              <strong>Limitation of Liability</strong> You agree that neither Sawal nor any of its subsidiaries, officers, directors, employees, agents, or affiliates will be liable to you or any third party for any indirect, special, punitive, consequential (including, without limitation, lost profits or lost data collected through the service), or incidental damages, whether based on a claim or action of contract, warranty, negligence, strict liability, or other tort, breach of any statutory duty, indemnity, or contribution, or otherwise, even if Sawal has been advised of the possibility of such damages. The exclusion contained in this paragraph shall apply regardless of the failure of the exclusive remedy provided in the following paragraph.
            </li>

            
          </ol>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Disclaimer