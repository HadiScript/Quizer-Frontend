import { useState } from "react";
import { Errs } from "../helper/Errs";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { API, authApi } from "../helper/API";
import doReq from "../hooks/doReq";

export const _useCommon = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("subs2@gmail.com");
  const [password, setPassword] = useState("hadi..");
  const [name, setName] = useState("");

  const router = useNavigate();
  const { errors, loading, doRequest } = doReq();

  const Login = async (e) => {
    e.preventDefault();
    const res = await doRequest({
      method: "post",
      url: `${API}/api/auth/signin`,
      body: {
        email,
        password,
      },

      withCredentials: true,
    });

    if (res.status === 200) {
      console.log(res.data, "res")
      Cookies.set("session", res.data?.token);
      setAuth({ ...auth, user: res.data.user });
      toast.success("Login");
      router("/");
    }
  };

  const Register = async (e) => {
    e.preventDefault();
    const res = await doRequest({
      method: "post",
      url: `${API}/api/auth/signup`,
      body: {
        email,
        password,
        name,
      },

      withCredentials: true,
    });

    if (res.status === 201) {
      setAuth(res.data);
      toast.success("Register");
      router("/");
    }
  };

  const logout = async () => {
    const res = await doRequest({
      method: "post",
      url: `${authApi}/logout`,
      body: {},

      withCredentials: true,
    });

    // Cookies.remove("auth");
    router("/");
    setAuth({ token: "", user: null });
  };

  return { Login, email, setEmail, password, setPassword, loading, logout, errors, name, setName, Register };
};
