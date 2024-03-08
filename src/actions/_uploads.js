import { useState } from "react";
import { userApi } from "../helper/API";
import { Errs } from "../helper/Errs";
import axios from "axios";
import Cookies from "js-cookie";
import { APIKEY, useAuth } from "../context/authContext";
import Crypto from "crypto-js";

export const useLogo = () => {
  const [auth, setAuth] = useAuth();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.file.originFileObj;
    setImage(file);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const uploadImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);
    try {
      const { data } = await axios.post(`${userApi}/upload-logo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setAuth({ ...auth, user: data.user });

      let token = Crypto.AES.decrypt(Cookies.get("session"), APIKEY);
      Cookies.remove("session");
      let aa = JSON.parse(token.toString(Crypto.enc.Utf8));

      Cookies.set("session", Crypto.AES.encrypt(JSON.stringify({ token: aa.token, user: data?.user }), APIKEY).toString());
    } catch (error) {
      console.log(error);
      Errs(error);
    }
  };

  const removeLogo = async () => {
    try {
      const { data } = await axios.post(`${userApi}/remove-logo`);
      
      setAuth({ ...auth, user: data.user });
      let token = Crypto.AES.decrypt(Cookies.get("session"), APIKEY);
      Cookies.remove("session");
      let aa = JSON.parse(token.toString(Crypto.enc.Utf8));
      Cookies.set("session", Crypto.AES.encrypt(JSON.stringify({ token: aa.token, user: data?.user }), APIKEY).toString());


    } catch (error) {
      console.log(error);
    }
  };

  return {
    image,
    handleChange,
    preview,
    uploadImage,
    removeLogo,
  };
};
