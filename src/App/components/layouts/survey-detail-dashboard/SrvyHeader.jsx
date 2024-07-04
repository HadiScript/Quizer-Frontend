import { DashboardOutlined, FormOutlined } from "@ant-design/icons"
import Logo from "../Logo"
import { FaList } from "react-icons/fa"
import { ImExit } from "react-icons/im"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"

const SrvyHeader = () => {

  const router = useNavigate();
  const { slug } = useParams();
  const { pathname } = useLocation()

  const whichActive = () => {
    return { borderBottom: "2px solid #083344", color: "#083344" }
  }

  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center py-3 border-bottom">
      <Logo />
      <div className="d-flex gap-4 justify-content-start align-items-center mt-3">
        <Link style={pathname.includes("detail") || pathname.includes("fields") ? whichActive() : {}} to={`/subscribe/surveys/${slug}/detail`} role="button" className="d-flex gap-2 align-items-center _link text-dark "> <FormOutlined />  Form  </Link>
        <Link style={pathname.includes("stats") ? whichActive() : {}} to={`/subscribe/surveys/${slug}/stats`} role="button" className="d-flex gap-2 align-items-center _link text-dark"> <DashboardOutlined />  Stats  </Link>
        <Link style={pathname.includes("responses") ? whichActive() : {}} to={`/subscribe/surveys/${slug}/responses`} role="button" className="d-flex gap-2 align-items-center _link text-dark"> <FaList />  Attempters  </Link>

        <div role="button" onClick={() => router('/subscribe/surveys')} className="d-flex gap-2 align-items-center"> <ImExit /> Exit</div>
      </div>
    </div>
  )
}

export default SrvyHeader