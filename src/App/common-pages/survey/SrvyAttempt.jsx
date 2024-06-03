import { useParams } from "react-router-dom"
import { _useFields, _useSubmitSurvey } from "../../../actions/_survey"
import BgHeading from "../../components/common/BgHeading"
import SurveyPreview from "../../components/panel/survey/SurveyPreview"

const SrvyAttempt = () => {

  const { slug, id } = useParams()
  const { data, isLoading: fetchingLoading } = _useFields(slug, id)

  const { submiting, isLoading: submittingLoading } = _useSubmitSurvey(slug, id)


  return (
    <div className="survey">
      <div className="its-container border-start border-end ">
        <BgHeading title={data?.title} desc={data?.description} />
        {/* SrvyAttempt {isLoading && <>please wait...</>} {JSON.stringify(data)} */}

        <SurveyPreview
          fields={data?.fields}
          preview={false}
          submiting={submiting}
          submittingLoading={submittingLoading}
        />
      </div>
    </div>
  )
}

export default SrvyAttempt