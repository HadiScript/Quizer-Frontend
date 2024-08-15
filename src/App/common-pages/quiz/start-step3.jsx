
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { API } from "../../../helper/API";
import { Errs } from "../../../helper/Errs";
import { Link, useNavigate } from "react-router-dom";


const StartStep3 = ({ attemptId, quizId, setStep, setAttemptId }) => {
  const router = useNavigate()
  const { width, height } = useWindowSize();
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState({
    score: null,
    message: "Thank you for attempting quiz.",
    showDownloadCertificate: false,
    certificate: null,
    isPass: false,
    passingScore: null,
    scoringType: null,
    grade: null
  })

  const getData = async () => {
    setLoading(true)
    try {
      // console.log("gove me run3")
      const { data } = await axios.get(`${API}/api/attempt/quiz-thanks/${quizId}/${attemptId}`)
      // console.log(data)
      if (data.ok) {

        setResult({ ...result, message: "Thank you for attempting quiz.", isPass: data?.isPass, passingScore: data?.passingScore, scoringType: data?.scoringType, grade: data?.grade })
      }
      else if (data.showDownloadCertificate) {
        setResult({ ...result, showDownloadCertificate: data.showDownloadCertificate, certificate: data.certificate, isPass: data?.isPass, passingScore: data?.passingScore, scoringType: data?.scoringType, grade: data?.grade })
      }
      else {
        setResult({ ...result, score: data.score, isPass: data?.isPass, passingScore: data?.passingScore, scoringType: data?.scoringType, grade: data?.grade })
      }
    } catch (error) {
      Errs(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // console.log("gove me run")
    if (attemptId && quizId) {
      // console.log("gove me run2")
      getData();
    }
  }, [quizId, attemptId])


  const goBack = () => {
    sessionStorage.removeItem("attemptId")
    sessionStorage.removeItem("quizStep")
    setStep(1)
    setAttemptId(null)
  }

  const downloadImage = () => {
    const anchor = document.createElement('a');
    anchor.href = result.certificate;
    anchor.download = 'downloaded-image.webp';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    goBack()
  };


  return (
    <div style={{ minHeight: "100vh" }} className="d-flex justify-content-center align-items-center p-2 attempt">
      {result?.isPass && <Confetti width={width} height={height} />}
      {/* {JSON.stringify(result)} */}
      <div className="my-shadow"></div>
      <div className="card-shadow thankx">
        {/* <span className="main">{result.message}</span> */}

        {/* {result.score && <p className="main-2">Score is: {result.score}</p>}
        {result.showDownloadCertificate && <Button type="dashed" icon={<DownloadOutlined />} onClick={downloadImage}>Download your certificate</Button>} */}


        {
          !result?.isPass && <Result
            status="500"
            title={<div>{result.message}</div>}
            subTitle={<b>{result.isPass ? `You have Passed this test. Your score is ${result.score}.` : `You have Failed this test. Your score is ${result.score}. And passing score is ${result.passingScore}%`}</b>}
            extra={<Button type="" onClick={goBack} className="myBtn">Try Again</Button>}
          />
        }

        {
          result?.isPass && <Result
            status="success"
            title={<div>{result.message}</div>}
            subTitle={<b>{result.isPass ? `You have Passed this test. Your score is ${result.score}.` : `You have Failed this test. Your score is ${result.score}. And passing score is ${result.passingScore}%`}</b>}
            extra={<Button type="" onClick={goBack} className="myBtn">Try Again</Button>}
          />
        }


      </div>
    </div>
  );
};

export default StartStep3;
