import { Nav30DataSource } from "../../data/data.source"
import useResponsive from "../../hooks/useBreakpoints"
import Footer from "../components/common/Home/Footer"
import Navbar from "../components/common/Home/Navbar"


const PrivacyAndPolicy = () => {
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
          <h1 style={{ fontWeight: "bold" }}>Privacy Policy</h1>
          <h3>  Effective Date: 30th July, 2024</h3>
          <p>Welcome to SAWAL! Your privacy is important to us. This Privacy Policy outlines how SAWAL collects, uses, and protects your personal information. By using the SAWAL app and our services, you agree to the practices described in this policy.
          </p>

          <ol>
            <li className="mt-2">
              <strong>Information We Collect</strong>
              <ul>
                <li className="mt-2"><strong>Personal Information:</strong> When you register for an account or use our services, we may collect personal information such as your name, email address, phone number, and payment details.</li>
                <li className="mt-2"><strong>Usage Data:</strong> We collect information about your interactions with the app, including your IP address, device information, browsing history, and the features you use.</li>
                <li className="mt-2"><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver personalized content.</li>
              </ul>
            </li>

            <li className="mt-2">
              <strong>How We Use Your Information</strong>
              <ul>
                <li className="mt-2"><strong>To Provide Services:</strong> We use your information to create and manage your account, process transactions, and deliver the services you request.</li>
                <li className="mt-2"><strong>To Improve Our Services:</strong> We analyze usage data to improve the functionality and performance of the app and develop new features.</li>
                <li className="mt-2"><strong>To Communicate with You:</strong> We may use your contact information to send you updates, newsletters, promotional materials, and respond to your inquiries.</li>
                <li className="mt-2"><strong>To Ensure Security:</strong> We use your information to monitor and enhance the security of our services and to prevent fraud and abuse.</li>
              </ul>
            </li>


            <li className="mt-2">
              <strong>Sharing Your Information</strong>
              <ul>
                <li className="mt-2"><strong>With Service Providers:</strong> We may share your information with third-party service providers who assist us in operating the app, processing payments, and performing other functions.</li>
                <li className="mt-2"><strong>For Legal Reasons:</strong> We may disclose your information if required to do so by law or in response to legal processes or government requests.</li>
                <li className="mt-2"><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or part of our business, your information may be transferred as part of that transaction.</li>
              </ul>
            </li>


            <li className="mt-2">
              <strong>Your Choices and Rights</strong>
              <ul>
                <li className="mt-2"><strong>Access and Update:</strong> You can access and update your personal information through your account settings.</li>
                <li className="mt-2"><strong>Opt-Out:</strong> You may opt-out of receiving promotional communications by following the unsubscribe instructions included in those emails.</li>
                <li className="mt-2"><strong>Data Deletion:</strong> You can request the deletion of your account and personal information by contacting us at <a href="mailto:ask@sawal.co" target="#">ask@sawal.co</a>.</li>
              </ul>
            </li>


            <li className="mt-2">
              <strong>Security</strong>
              <p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
              </p>
            </li>

            <li className="mt-2">
              <strong>Third-Party Links</strong>
              <p>The SAWAL app may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third parties. We encourage you to review their privacy policies before providing any information.</p>
            </li>

            <li className="mt-2">
              <strong>Changes to This Privacy Policy</strong>
              <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Your continued use of the app after changes are made constitutes your acceptance of the revised policy.</p>
            </li>


            <li className="mt-2">
              <strong>Contact Us</strong>
              <p>If you have any questions or concerns about this Privacy Policy, please contact us at:  </p>
              <b>SAWAL</b>
              <p> 25 Badminton Road, Manchester, United Kingdom</p>
              <p>Email:  <a href="mailto:ask@sawal.co" target="#">ask@sawal.co</a></p>

            </li>
          </ol>
        </div>
      </div>


      <Footer />
    </div>
  )
}

export default PrivacyAndPolicy