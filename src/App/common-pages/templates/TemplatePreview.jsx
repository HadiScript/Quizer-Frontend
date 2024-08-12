import { Link, useNavigate, useParams } from "react-router-dom"
import { _useFields } from "../../../actions/_survey"
import BgHeading from "../../components/common/BgHeading"
import { Button } from "antd"
import SurveyPreview from "../../components/panel/survey/SurveyPreview"
import { useAuth } from "../../../context/authContext"
import ModelLogin from "../auth/ModelLogin"
import { useState } from "react"
import { Errs } from "../../../helper/Errs"
import axios from "axios"
import { surveyApi } from "../../../helper/API"
import { useQueryClient } from "react-query"
import { BackwardOutlined, ImportOutlined } from "@ant-design/icons"

import logoImage from '../../../assets/imgs/logo.png'
// import '../../../ass'

const TemplatePreview = () => {

  const { slug, id } = useParams()
  const router = useNavigate();
  const { data, isLoading: fetchingLoading } = _useFields(slug, id)
  const [auth] = useAuth()
  const [open, setOpen] = useState(false)
  const [cloneLoading, setCloneLoading] = useState(false)
  const queryClient = useQueryClient()

  // const { submiting, isLoading: submittingLoading } = _useSubmitSurvey(slug, id);


  const cloneAndRedirect = async (slug, id) => {
    try {
      if (auth?.user?.role === "super-user") {
        alert("Please do not cloning! as you are super user.")
      } else {
        setCloneLoading(true)
        const { data } = await axios.post(`${surveyApi}/clone/${slug}/${id}`);
        router(data.url);
        queryClient.invalidateQueries("mySurveys");

      }
    } catch (error) {
      Errs(error);
      console.log(error)
    } finally {
      setCloneLoading(false)
    }
  }

  return (
    <>
      <div className="container py-3  bg-white rounded ">
        <div className="d-flex justify-content-between align-items-center">
          <img src={logoImage} alt='logo' height={60} />
          <div className="d-flex gap-3 align-items-center">
            {auth?.token ?
              <Button type="dashed" icon={<ImportOutlined />} loading={cloneLoading} onClick={() => cloneAndRedirect(slug, id)} >Use This Template</Button> :
              <Button type="dashed" icon={<ImportOutlined />} onClick={() => setOpen(true)}>Use This Template</Button>
            }

            <Button className="myBtn _link" icon={<BackwardOutlined />} onClick={() => router(-1)}> Back</Button>
          </div>
        </div>
      </div>


      <div className="survey lightgrey-bg">
        <div className="its-container  ">

          <BgHeading title={data?.title} desc={data?.description} />


          {fetchingLoading ? <>Please wait...</> : <SurveyPreview
            fields={data?.fields}
            preview={false}
            submiting={undefined}
            submittingLoading={false}

          />}
        </div>
      </div>
      <ModelLogin open={open} setOpen={setOpen} />
    </>
  )
}

export default TemplatePreview