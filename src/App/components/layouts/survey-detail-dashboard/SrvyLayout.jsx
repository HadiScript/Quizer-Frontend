import Logo from "../Logo"
import { DashboardOutlined, FormOutlined } from "@ant-design/icons"
import { FaList } from "react-icons/fa"
import SrvyHeader from "./SrvyHeader"

const SrvyLayout = ({ children, }) => {
  return (
    <div className='container'>
      <SrvyHeader />
      <div className="pt-4">{children}</div>
    </div>
  )
}

export default SrvyLayout