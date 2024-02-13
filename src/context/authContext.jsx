import { useState, useEffect, createContext, useContext, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Crypto from "crypto-js";

export const APIKEY = "()()()()((()))&&**^^kkdflkheaori3uoiu23$!42^2%@#$^@$"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    let user = Cookies.get("session");

    let hi;
    if (user) {
      hi = Crypto.AES.decrypt(user, APIKEY);
      if (hi) {
        setAuth(JSON.parse(hi.toString(Crypto.enc.Utf8)));
      }
    }
  }, []);




  axios.defaults.headers.common["session"] = auth.token;

  return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
