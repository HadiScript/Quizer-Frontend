import { Link } from "react-router-dom"
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

          <h3>  Welcome to SAWAL!</h3>
          <p>  These Terms and Conditions ("Terms") govern your use of the SAWAL app, operated by SAWAL, located at 25 Badminton Road, Manchester, United Kingdom. By accessing or using the SAWAL app, you agree to comply with and be bound by these Terms. Please read them carefully. </p>
          <ol>
            <li className="mt-2"> Acceptance of Terms By registering for or using the SAWAL app, you agree to abide by these Terms and all applicable laws and regulations. If you do not agree with any part of these Terms, you must not use the app.</li>
            <li className="mt-2"> Changes to Terms SAWAL reserves the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the app after changes are posted constitutes your acceptance of the revised Terms.
            </li>
            <li className="mt-2">
              Registration and Account Security
              <ol>
                <li className="mt-2">You must provide accurate and complete information when creating an account.</li>
                <li className="mt-2">You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</li>
                <li className="mt-2">You agree to notify SAWAL immediately of any unauthorized use of your account.</li>
              </ol>
            </li>
            <li className="mt-2">
              Use of the App
              <ol>
                <li className="mt-2"> You agree to use the app only for lawful purposes and in accordance with these Terms.</li>
                <li className="mt-2">You must not use the app to engage in any activity that could harm SAWAL or any third party.</li>
                <li className="mt-2"> You must not attempt to gain unauthorized access to any part of the app or its related systems.</li>
              </ol>
            </li>


            <li className="mt-2">
              Content and Intellectual Property
              <ol>
                <li className="mt-2">SAWAL retains all rights to the content and materials, (including photos, texts, graphics, and logos) provided through the app.</li>
                <li className="mt-2">You may not reproduce, distribute, or create derivative works from any content without prior written consent from SAWAL.</li>
                <li className="mt-2">User-generated content must not violate any third-party rights or any applicable laws.</li>
              </ol>
            </li>
            <li className="mt-2">Privacy Your use of the app is also governed by our Privacy Policy, which can be found <Link to={'/privacy-and-policy'}>here</Link>. By using the app, you consent to the collection and use of your information as outlined in the Privacy Policy.</li>
            <li className="mt-2">
              Termination
              <ol>
                <li className="mt-2">SAWAL reserves the right to terminate or suspend your account at any time, with or without cause, and without notice.</li>
                <li className="mt-2">Upon termination, your right to use the app will immediately cease.</li>
              </ol>
            </li>

            <li className="mt-2">
              Limitation of Liability
              <ol>
                <li className="mt-2">SAWAL is not liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of the app.</li>
                <li className="mt-2">SAWAL does not warrant that the app will be uninterrupted or error-free.</li>
              </ol>
            </li>


            <li className="mt-2"> Governing Law These Terms are governed by and construed in accordance with the laws of the United Kingdom. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of the United Kingdom.</li>
            <li className="mt-2">Contact Information For any questions about these Terms, please contact us at:
              <ol>
                <li className="mt-2"> SAWAL 25 Badminton Road, Manchester, United Kingdom Email: <a href="mailto:ask@sawal.co" target="#">ask@sawal.co</a></li>
              </ol>
            </li>

          </ol>

        </div>
      </div>


      <Footer />
    </div>
  )
}

export default TermAndConditions