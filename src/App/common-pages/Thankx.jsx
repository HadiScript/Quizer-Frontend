import { Button, Flex, Input, Result } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import '../../assets/css/thanks.css'
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { surveyApi } from "../../helper/API";
import toast from "react-hot-toast";
import { Errs } from "../../helper/Errs";
import { unslugify } from "../../helper/SlugifyUn";

const Thankx = ({ preview = false, slug, data }) => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);
  const search = useLocation().search;
  const params = new URLSearchParams(search);

  // States for text content
  const [thankYouText, setThankYouText] = useState('');
  const [submittingText, setSubmittingText] = useState('');
  const [buttonText, setButtonText] = useState('');


  const backBtn = () => {
    if (preview) {
      // 
    } else {
      () => navigate(-1)
    }
  }


  const submit = async () => {
    try {
      setLoading(true)
      // settings/:slug/:id
      const res = await axios.put(`${surveyApi}/settings/${slug}/${auth?.user?.userId}`, {
        settings: {
          thanksHeading: thankYouText,
          thanksPara: submittingText,
          thanksBtn: buttonText,
        }
      })
      toast.success(res.message)
    } catch (error) {
      console.log(error);
      Errs(error)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    if (preview) {
      if (data) {
        setThankYouText(data?.thanksHeading)
        setSubmittingText(data?.thanksPara)
        setButtonText(data?.thanksBtn)
      }
    }
    else if (!preview) {
      setButtonText(unslugify(params.get('thanksBtn')))
      setThankYouText(unslugify(params.get('thanksHeading')))
      setSubmittingText(unslugify(params.get('thanksPara')))
    }
  }, [])


  return (
    <>
      {
        preview &&
        <div className="d-flex justify-content-end">
          <Button className="myBtn" onClick={submit} loading={loading}>Save</Button>
        </div>
      }

      {/* {JSON.stringify(params.get('thanksBtn'))} */}

      <div
        className={`d-flex justify-content-center min-vh-100  align-items-center`}
        style={{
          background: `radial-gradient(
    144.3% 173.7% at 71.41% 94.26%,
    rgba(99, 101, 241, 0.586) 0%,
    rgba(219, 70, 239, 0.47) 32.49%,
   `
        }}
      >



        <div className="d-flex thanks flex-column align-items-center gap-4">
          {/* <h1>Thank You!</h1> */}
          {preview ? (
            <input
              type="text"
              value={thankYouText}
              onChange={(e) => setThankYouText(e.target.value)}
              className="form-control text-center mainh1"
            />
          ) : (
            <h1>{thankYouText}</h1>
          )}
          <FaCheck className="icon" />
          {preview ? (
            <div>
              <input
                type="text"
                value={submittingText}
                onChange={(e) => setSubmittingText(e.target.value)}
                className="form-control text-center mainP"
                style={{ fontSize: '20px' }}
              />
            </div>

          ) : (
            <p>{submittingText}</p>
          )}

          <div>
            {preview ? (
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                className="form-control text-center myBtn"
                style={{ fontSize: '20px', width: '150px' }}
              />
            ) : (
              <Button onClick={backBtn} className="myBtn" key="buy">
                {buttonText}
              </Button>
            )}
          </div>
        </div>

      </div>
    </>
  )
}

export default Thankx;
