import { useLocation, useNavigate, useParams } from "react-router-dom"
import { _useFields } from "../../../actions/_survey"
import BgHeading from "../../components/common/BgHeading"
import { Button } from "antd"
import SurveyPreview from "../../components/panel/survey/SurveyPreview"
import { useAuth } from "../../../context/authContext"
import ModelLogin from "../auth/ModelLogin"
import { useEffect, useState } from "react"
import { Errs } from "../../../helper/Errs"
import axios from "axios"
import { surveyApi } from "../../../helper/API"
import { useQueryClient } from "react-query"
import { BackwardOutlined, ImportOutlined } from "@ant-design/icons"
import { FaWandMagicSparkles } from "react-icons/fa6";

import logoImage from '../../../assets/imgs/logo.png'
import SidebarCustomize from "../../components/common/TemplatePreview/SidebarCustomize"


const lightenColor = (color, percent) => {
  let num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent * 1.5),
    R = (num >> 16) + amt,
    G = (num >> 8 & 0x00FF) + amt,
    B = (num & 0x0000FF) + amt;

  R = R > 255 ? 255 : R < 0 ? 0 : R;
  G = G > 255 ? 255 : G < 0 ? 0 : G;
  B = B > 255 ? 255 : B < 0 ? 0 : B;

  return "#" + (
    0x1000000 +
    (R * 0x10000) +
    (G * 0x100) +
    B
  ).toString(16).slice(1).toUpperCase();
};

const TemplatePreview = () => {
  const from = useLocation().search.split("=")[1]

  const { slug, id } = useParams()
  const router = useNavigate();
  const { data, isLoading: fetchingLoading } = _useFields(slug, id)
  const [auth] = useAuth()
  const [open, setOpen] = useState(false)
  const [cloneLoading, setCloneLoading] = useState(false)
  const queryClient = useQueryClient()
  const [customizeOpen, setCustomizeOpen] = useState(false);

  const [settings, setSettings] = useState({
    mainColor: "",
    textColor: "",
    bgColor: ""
  });

  const onChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    if (key === 'mainColor') {
      newSettings.bgColor = lightenColor(value, 50); // Adjust background based on header color
    }
    setSettings(newSettings);
  };


  useEffect(() => {
    if (data?.settings) {
      setSettings({
        ...settings,
        bgColor: data?.settings?.bgColor ? data?.settings?.bgColor : "",
        textColor: data?.settings?.textColor ? data?.settings?.textColor : "",
        mainColor: data?.settings?.mainColor ? data?.settings?.mainColor : "",
      })
    }
  }, [data])


  const cloneAndRedirect = async (slug, id) => {
    try {
      if (auth?.user?.role === "super-user") {
        alert("Please do not clone this survey.")
      } else {
        setCloneLoading(true)
        const { data } = await axios.post(`${surveyApi}/clone/${slug}/${id}`, { settings });
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
      <div className="container   bg-white rounded ">
        <div className="d-flex py-3 flex-wrap gap-2 justify-content-between align-items-center">
          <img src={logoImage} alt='logo' height={60} />
          <div className="d-flex  gap-3 align-items-center">
            {auth?.token ?
              from === "home" && <Button type="dashed" icon={<ImportOutlined />} loading={cloneLoading} onClick={() => cloneAndRedirect(slug, id)} >Use This Template</Button> :
              from === "home" && <Button type="dashed" icon={<ImportOutlined />} onClick={() => setOpen(true)}>Use This Template</Button>
            }

            <Button className="myBtn _link" icon={<FaWandMagicSparkles />} onClick={() => setCustomizeOpen(true)}> Customize </Button>
            <Button className="myBtn _link" icon={<BackwardOutlined />} onClick={() => router(-1)}> Back</Button>
          </div>
        </div>
      </div>


      <div className={`survey ${!settings?.bgColor && 'lightgrey-bg'}`} style={{ backgroundColor: settings.bgColor }}>
        <div className="its-container  ">

          <BgHeading title={data?.title} desc={data?.description} bgColor={settings.mainColor} textColor={settings?.textColor} />

          {fetchingLoading ? <>Please wait...</> : <SurveyPreview
            fields={data?.fields}
            preview={false}
            submiting={() => alert("Ok")}
            submittingLoading={false}
            from="templates"
            settings={settings}

          />}
        </div>
      </div>

      <SidebarCustomize
        open={customizeOpen}
        setOpen={setCustomizeOpen}
        settings={settings}
        onChange={onChange}
        from={from}
        slug={slug}
      />


      <ModelLogin open={open} setOpen={setOpen} />
    </>
  )
}

export default TemplatePreview