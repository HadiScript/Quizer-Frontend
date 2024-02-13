import { useState, useEffect, createContext, useContext, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import { authApi } from "../helper/API";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  const getCurrentSubs = useCallback(async () => {
    try {
      const res = await axios.get(`${authApi}/currentsubs`, { withCredentials: true });

      if (res.data) {
        setAuth(res.data);
      }
    } catch (error) {
      console.log(error, "from context");
      return redirect("/");
    }
  }, []);

  useEffect(() => {
    getCurrentSubs();
  }, [getCurrentSubs]);

  axios.defaults.withCredentials = true;

  return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
