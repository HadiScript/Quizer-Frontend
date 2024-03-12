import { useState, useEffect, createContext, useContext, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Crypto from "crypto-js";
import { useNavigate } from "react-router-dom";

export const APIKEY = "()()()()((()))&&**^^kkdflkheaori3uoiu23$!42^2%@#$^@$"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const user = Cookies.get("session");
    if (user) {
      const decryptedUser = Crypto.AES.decrypt(user, APIKEY).toString(Crypto.enc.Utf8);
      const parsedUser = JSON.parse(decryptedUser);
      if (parsedUser.token) {
        setAuth(parsedUser);
      }
    } else {
      navigate('/')
    }
  }, []);


  useEffect(() => {
    axios.defaults.headers.common["session"] = auth.token;
  }, [auth.token]);

  return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
