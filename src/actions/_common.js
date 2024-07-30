import { useCallback, useEffect, useState } from "react";
import { Errs } from "../helper/Errs";

import axios from "axios";
import Cookies from "js-cookie";
import { APIKEY, useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { API, authApi, quizApi } from "../helper/API";
import doReq from "../hooks/doReq";
import { useCookies } from "react-cookie";
import Crypto from "crypto-js";
import Alerting from "../App/components/common/Alerting";
import { loadStripe } from "@stripe/stripe-js";
import { useGoogleLogin } from "@react-oauth/google";

export const _useCommon = () => {
  const [auth, setAuth] = useAuth();
  // ali@g.ai
  // 123123
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useNavigate();

  const Login = async (e) => {
    // e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${authApi}/signin`, { email, password }, { withCredentials: true });
      setAuth({ ...auth, user: res.data.user, token: res.data.token });
      Cookies.set("session", Crypto.AES.encrypt(JSON.stringify(res.data), APIKEY).toString());
      Alerting({ msg: "Login" });
      router("/");
    } catch (error) {
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  const Register = async (e) => {
    // e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API}/api/auth/signup`, { email, password, name }, { withCredentials: true });
      Alerting({ msg: "Register Successfully, you can login now." });
      router("/signin");
    } catch (error) {
      Errs(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      Cookies.remove("session");
      router("/");
      setAuth({ token: "", user: null });
    } catch (error) {
      Errs(error);
      console.log(error);
    }
  };

  const updateToPremium = async (type) => {
    try {
      const load_strip = await loadStripe(
        "pk_test_51OoMlkSFAU5oOmtKALyvW0CGiaMYcs971yt0KytArSwyWGVV3Xj28RfSPTPrT95EoUAsizg5KcCqBS35LJwcck0j00sYcOwND8"
      );

      console.log(auth?.token, "here is");

      const { data } = await axios.put(
        `${API}/api/user/to/premium`,
        { subscriptionType: type },
        {
          headers: {
            session: auth?.token,
          },
        }
      );
      const some = load_strip.redirectToCheckout({
        sessionId: data.sessionId,
      });
    } catch (error) {
      Errs(error);
      console.log(error);
    }
  };

  async function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;
    // console.log(accessToken)
    try {
      const res = await axios.post(`${authApi}/signin/g`, { googleAccessToken: accessToken }, { withCredentials: true });
      setAuth({ ...auth, user: res.data.user, token: res.data.token });
      Cookies.set("session", Crypto.AES.encrypt(JSON.stringify(res.data), APIKEY).toString());
      Alerting({ msg: "Login" });
      router("/");
    } catch (error) {
      // console.log(error, "from login");
      Errs(error);
    }
  }
  const loginwithgoogle = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  // const loginwithgoogle = () => {};

  async function handlesignupwithgoogle(tokenResponse) {
    const accessToken = tokenResponse.access_token;
    // console.log(accessToken)
    try {
      const res = await axios.post(`${authApi}/signup/g`, { googleAccessToken: accessToken }, { withCredentials: true });
      Alerting({ msg: "Register Successfully, you can login now." });
      router("/signin");
    } catch (error) {
      // console.log(error, "from login");
      Errs(error);
    }
  }
  const signupwithgoogle = useGoogleLogin({ onSuccess: handlesignupwithgoogle });
  // const signupwithgoogle = () => {};

  const updatePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${authApi}/update-password`, { currentPassword, newPassword });
      Alerting({ msg: data.message });
    } catch (error) {
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    Login,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    logout,
    name,
    setName,
    Register,
    updateToPremium,
    loginwithgoogle,
    signupwithgoogle,
    updatePassword,
  };
};
