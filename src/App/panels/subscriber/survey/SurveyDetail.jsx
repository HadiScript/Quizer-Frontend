import { useParams } from "react-router-dom"
import SrvyLayout from "../../../components/layouts/survey-detail-dashboard/SrvyLayout"
import BgHeading from "../../../components/common/BgHeading"

import SrvyCreateEditForm from "../../../components/panel/survey/SrvyCreateEditForm"
import { useBasicInfoServey, useUpdateBasicInfo } from "../../../../actions/_survey"
import SrvyFormsTabs from "../../../components/panel/survey/SrvyFormsTabs"

const SurveyDetail = () => {
  const { slug } = useParams()

  const { data, isLoading: fetechingData } = useBasicInfoServey(slug);
  const { updateSurvey, isLoading: updateLoading } = useUpdateBasicInfo(slug)



  return (
    <SrvyLayout >
      <BgHeading title={slug} />
      <SrvyFormsTabs />
      <SrvyCreateEditForm fetechingData={fetechingData} data={data} submit={updateSurvey} isLoading={updateLoading} />
    </SrvyLayout>
  )
}

export default SurveyDetail