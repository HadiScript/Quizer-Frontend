import { DashboardOutlined, FormOutlined } from "@ant-design/icons"
import Logo from "../Logo"
import { FaList } from "react-icons/fa"
import { ImExit } from "react-icons/im"
import { useSrvyContext } from "../../../../context/srvyContext"
import { useNavigate } from "react-router-dom"

const SrvyHeader = () => {

  const [active, setActive] = useSrvyContext();
  const router = useNavigate();

  const whichActive = () => {
    return { borderBottom: "2px solid #083344", color: "#083344" }
  }

  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center py-3 border-bottom">
      <Logo />
      <div className="d-flex gap-4 justify-content-start align-items-center mt-3">
        <div onClick={() => setActive("form")} style={active === 'form' ? whichActive() : {}} role="button" className="d-flex gap-2 align-items-center"> <FormOutlined /> Form</div>
        <div onClick={() => setActive("stats")} style={active === 'stats' ? whichActive() : {}} role="button" className="d-flex gap-2 align-items-center"><DashboardOutlined /> Stats</div>
        <div onClick={() => setActive("attempters")} style={active === 'attempters' ? whichActive() : {}} role="button" className="d-flex gap-2 align-items-center"> <FaList /> Attempters</div>


        <div role="button" onClick={() => router('/subscribe/surveys/')} className="d-flex gap-2 align-items-center"> <ImExit /> Exit</div>
      </div>
    </div>
  )
}

export default SrvyHeader