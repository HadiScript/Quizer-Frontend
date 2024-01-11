import { useState } from "react";
import { Errs } from "../helper/Errs";
import toast from "react-hot-toast";
import axios from "axios";
import { API } from "../helper/API";
import Cookies from "js-cookie";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const _useCommon = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("subs2@gmail.com");
  const [password, setPassword] = useState("hadi..");
  const [loading, setLoading] = useState(false);

  const router = useNavigate();

  const Login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`http://localhost:8000/auth/signin`, { email, password });
      if (res.status === 200) {
        // console.log(res.data);
        Cookies.set("auth", JSON.stringify(res.data));
        setAuth({ token: res.data.token, user: res.data.user });
        toast.success("Login");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("auth");
    router("/");
    setAuth({ token: "", user: null });
  };

  return { Login, email, setEmail, password, setPassword, loading, logout };
};
