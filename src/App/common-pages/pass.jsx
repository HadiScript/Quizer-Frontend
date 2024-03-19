import axios from 'axios'
import Crypto from "crypto-js";
import Cookies from "js-cookie";
import { useEffect } from 'react'
import { Errs } from '../../helper/Errs'
import { userApi } from '../../helper/API'
import { APIKEY, useAuth } from '../../context/authContext'
import { useLocation, useNavigate, } from 'react-router-dom'

const Pass = () => {

  const session_id = useLocation().search.split('=')[1]
  const [auth, setAuth] = useAuth()
  const router = useNavigate();

  const successfullPayment = async () => {
    try {
      const { data } = await axios.get(`${userApi}/successfull-payment?session_id=${session_id}`, {
        headers: {
          session: auth?.token
        }
      });
      setAuth({
        ...auth, user: data.user
      });
      let token = Crypto.AES.decrypt(Cookies.get("session"), APIKEY);
      Cookies.remove("session");
      let aa = JSON.parse(token.toString(Crypto.enc.Utf8));
      Cookies.set("session", Crypto.AES.encrypt(JSON.stringify({ token: aa.token, user: data?.user }), APIKEY).toString());
      router('/subscribe/profile')
    } catch (error) {
      Errs(error);
    }
  }

  useEffect(() => {
    if (auth?.token) successfullPayment()
  }, [auth?.token])


  return (
    <div style={{ minHeight: "100vh" }} className="d-flex justify-content-center align-items-center p-2 attempt">
      <div className="my-shadow"></div>
      <div className="d-flex flex-column align-items-center gap-4 card-shadow successfullpayment">
        <span className="main">Thank You for Your Purchase!</span>
        <span className="main-2">Please Wait...</span>
      </div>

    </div>
  )
}

export default Pass