import { useState } from "react";
import { Errs } from "../helper/Errs";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { API, authApi } from "../helper/API";
import doReq from "../hooks/doReq";
import { useCookies } from "react-cookie";

export const _useCommon = () => {
  const [cookies, removeCookie] = useCookies([]);
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("subs2@gmail.com");
  const [password, setPassword] = useState("hadi..");
  const [name, setName] = useState("");

  const router = useNavigate();
  const { errors, loading, doRequest } = doReq();

  const Login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${authApi}/signin`, { email, password }, { withCredentials: true });
      setAuth({ ...auth, user: res.data });
      toast.success("Login");
      router("/");
    } catch (error) {
      Errs(errors);
      console.log(error);
    }
  };

  const Register = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/auth/signup`, { email, password }, { withCredentials: true });
      if (res.status === 201) {
        setAuth(res.data);
        toast.success("Register");
        router("/");
      }
    } catch (error) {
      Errs(errors);
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      // removeCookie("session");
      const res = await axios.post(`${authApi}/logout`, {}, { withCredentials: true });
      router("/");
      setAuth({ token: "", user: null });
    } catch (error) {
      Errs(errors);
      console.log(error);
    }
  };

  return { Login, email, setEmail, password, setPassword, loading, logout, errors, name, setName, Register };
};
