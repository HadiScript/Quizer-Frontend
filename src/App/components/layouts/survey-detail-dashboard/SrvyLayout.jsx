
import { useEffect } from "react";
import { useAuth } from "../../../../context/authContext";
import SrvyHeader from "./SrvyHeader"
import { useNavigate } from "react-router-dom";

const SrvyLayout = ({ children, }) => {

  const router = useNavigate();
  const [auth] = useAuth()

  useEffect(() => {
    if (auth === null) {
      return;
    }

    if (!auth?.token) {
      return router('/');
    }
  }, [auth])
  return (
    <div className='container'>
      <SrvyHeader />
      <div className="pt-4">{children}</div>
    </div>
  )
}

export default SrvyLayout