import axios from "axios";
import moment from "moment";
import { Errs } from "../../../helper/Errs";
import { useEffect, useState } from "react";
import { Divider, Drawer, List, Tag } from "antd";
import { reportApi } from "../../../helper/API";
import { LoadingOutlined } from "@ant-design/icons";
import { _useQuizSettings } from "../../../actions/_settings";
import { useParams } from "react-router-dom";
import { _useQuestionTest } from "../../../actions/_questions";
import { convertScoreToGrade, percentage } from "../../../helper/TakingPercentage";
import { TimeCal } from "../../../hooks/TimeCal";

const AttempterDrawser = ({ open, setOpen, current }) => {
  const { id } = useParams()
  const [responses, setresponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { loading: settingsLoading, _settings } = _useQuizSettings(id);
  const { questions, } = _useQuestionTest(id)

  const fetchingResponses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${reportApi}/responses/${current?._id}`, {});
      if (res.status === 200) {
        setresponses(res.data.responses);
      }
    } catch (error) {
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && current) {
      fetchingResponses()
    }
  }, [open, current])



  return (
    <>
      <Drawer width={740} placement="left" onClose={() => setOpen(false)} open={open}>
        <div className="row" style={{ margin: '20px' }}>
          <div className="col-12 col-lg-6 d-flex flex-column justify-content-start align-items-start p-4 gap-3">
            <div className="d-flex justify-content-start align-items-center gap-3">
              <b>Email:</b> <span>{current?.studentDetails?.Email}</span>
            </div>
            <div className="d-flex justify-content-start align-items-center gap-3">
              {/* percentage(current?.score, questions?.length) */}
              {/* {current?.score} */}
              <b>Score:</b>
              <span>
                {
                  current.scoringType ? <>
                    {
                      current.scoringType === "percentage"
                        ?
                        current?.score + "%"
                        :
                        current?.scoringType === "grade"
                          ?
                          convertScoreToGrade(current?.score, 4)
                          :
                          current?.score?.toFixed(2)
                    }

                  </> : <>
                    {
                      _settings?.scoringType === "percentage"
                        ?
                        current?.score + "%"
                        :
                        _settings?.scoringType === "grade"
                          ?
                          convertScoreToGrade(current?.score, 4)
                          :
                          current?.score?.toFixed(2)
                    }
                  </>
                }
              </span>
            </div>


            <div className="d-flex justify-content-start align-items-center gap-3">
              <b>Submited Type:</b> <span>{current?.submitType === "within-time" ? <Tag color="green">Within Time</Tag> : "Out Of Time"}</span>
            </div>
            <div className="d-flex justify-content-start align-items-center gap-3">
              <b>Pass:</b> <span>{current?.isPass ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}</span>
            </div>

            <div className="d-flex justify-content-start align-items-center gap-3">
              <b>Certified:</b> <span>{current?.Certified ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}</span>
            </div>
            {
              _settings?.mode && <div className="d-flex justify-content-start align-items-center gap-3">
                <b>Mode:</b> <Tag color="blue" className="text-capitalize">{_settings?.mode}</Tag>
              </div>
            }


          </div>


          <div className="col-12 col-lg-6 d-flex flex-column justify-content-start align-items-start p-4 gap-3" >

            <div className="d-flex justify-content-start align-items-center gap-3">
              {
                current?.passingScore ?
                  <><b>Passing Score:</b>   <span>{current?.passingScore}% </span></>
                  :
                  _settings?.passingScore && <>
                    <b>Passing Score:</b>   <span>{_settings?.passingScore}%</span>
                  </>
              }
            </div>

            <div className="d-flex justify-content-start align-items-center gap-3">
              <b>Correct Answers:</b> <span>{getTotalCorrectAnswers(responses)}</span>
            </div>

            <div className="d-flex justify-content-start align-items-center gap-3">
              <b>Start:</b> <span>{moment(current?.startTime).format('LT')}</span>

            </div>

            <div className="d-flex justify-content-start align-items-center gap-3">
              <b>End:</b> <span>{moment(current?.endTime).format('LT')}</span>
            </div>

            <div className="d-flex justify-content-start align-items-center gap-3">
              <b>Time Taken:</b> <span>{TimeCal(current.startTime, current.endTime)}</span>
            </div>


          </div>

          <div className="col-12 align-items-start px-4 gap-3">
            <b>Responses:</b>
            {loading && <LoadingOutlined />}

            {responses?.map((item, index) => (
              <div key={index} style={{ marginTop: '10px', padding: '20px', border: '1px solid #ccc' }}>
                Question {index + 1}:

                <h6> <span className="text-capitalize" dangerouslySetInnerHTML={{ __html: item?.questionText }} /></h6>
                {/* {JSON.stringify(item)} */}
                {item.questionType === "multiple-choice" && <ul className="" style={{ listStyle: "none" }}>
                  {item?.options.map((option, idx) => (
                    <li key={idx} style={getStyle(option, item?.selectedOption)}>
                      {labelOptions[idx]}    {option.text}
                    </li>
                  ))}

                  {
                    JSON.stringify(item)
                  }
                </ul>
                }

                {item.questionType === "true-false" && <ul className="" style={{ listStyle: "none" }}>
                  {item?.options.map((option, idx) => (
                    <li key={idx} style={getStyle(option, item?.selectedOption)}>
                      {labelOptions[idx]}    {option.text}
                    </li>
                  ))}
                </ul>
                }

                {
                  item.questionType === "short-answer" && <>
                    {
                      item.isCorrect && <span> <b>Answer:</b> <b className="text-success mx-2">{item?.typedAns}</b></span>
                    }

                    {
                      !item.isCorrect && <div className="d-flex flex-column gap-2">
                        <span> <b>Answer:</b> <b className="text-danger mx-2">{item?.typedAns}</b></span>
                        <span> <b>Correct Answer:</b> <b className="text-success mx-2">{item?.correctAnswer}</b></span>
                      </div>
                    }
                  </>
                }


                {
                  item.questionType === "fill-in-the-blank" && <>
                    {
                      item.isCorrect && <div className="d-flex flex-column gap-2">
                        {item?.blanks?.map((x, index) => <span key={index}> <b>Answer {++index}: </b> <b className="text-success mx-2">{x.correctAnswer}</b></span>)}
                      </div>
                    }

                    {
                      !item.isCorrect && <div className="d-flex flex-column gap-2">
                        {item?.selectedOption?.map((x, index) => <span key={index}> <b>Answer {++index}: </b> <b className="text-danger mx-2">{x}</b></span>)}
                      </div>
                    }


                  </>
                }


              </div>
            ))}
          </div>


        </div>


      </Drawer>
    </>
  );
};


const getStyle = (option, selectedOption) => {
  if (option.isCorrect) {
    return { color: 'green', fontWeight: 'bold' };
  }
  if (option.text === selectedOption) {
    return { color: 'red' };
  }
  return {};
};

const labelOptions = {
  0: "A:",
  1: "B:",
  2: "C:",
  3: "D:",
  4: "E:",
}


const getTotalCorrectAnswers = (responses) => {
  let correctCount = 0;
  responses.forEach(response => {
    // const correctOptions = response.question.options.filter(option => option.isCorrect);
    // const selectedOption = response.selectedOption;
    if (response.isCorrect) {
      correctCount++;
    }
  });
  return correctCount;
};

export default AttempterDrawser;
