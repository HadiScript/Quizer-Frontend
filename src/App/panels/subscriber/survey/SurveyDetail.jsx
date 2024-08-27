import { useParams } from "react-router-dom"
import SrvyLayout from "../../../components/layouts/survey-detail-dashboard/SrvyLayout"
import BgHeading from "../../../components/common/BgHeading"

import SrvyCreateEditForm from "../../../components/panel/survey/SrvyCreateEditForm"
import { useBasicInfoServey, useUpdateBasicInfo } from "../../../../actions/_survey"
import SrvyFormsTabs from "../../../components/panel/survey/SrvyFormsTabs"
import DraggableUploader from "../../../../helper/Uploads"
import { API } from "../../../../helper/API"
import { useAuth } from "../../../../context/authContext"

const SurveyDetail = () => {
  const { slug } = useParams();
  const [auth] = useAuth()

  const { data, isLoading: fetechingData } = useBasicInfoServey(slug);
  const { updateSurvey, isLoading: updateLoading } = useUpdateBasicInfo(slug)


  const handleSuccess = (data) => {
    console.log('Image Data:', data);
  };

  const handleError = (error) => {
    console.error('Upload Error:', error);
  };


  let uploadOrNot = auth?.user?.role === "super-user" && true;

  return (
    <SrvyLayout >
      <BgHeading title={data?.title} desc="Create survey questions and their options using different field types. Copy the link to share your survey." />

      <SrvyFormsTabs />



      <div className="row">

        <div className={`${uploadOrNot ? "col-md-6" : "col-md-12"} col-xs-12`}>
          <div className="my-4" />
          <SrvyCreateEditForm fetechingData={fetechingData} data={data} submit={updateSurvey} isLoading={updateLoading} />
        </div>

        {uploadOrNot && <div className="col-md-6 col-xs-12">
          {
            auth?.user?.role === "super-user" &&
            <>
              <div className="mb-2 mt-4">
                <span> <b>Cover Image (Template Card Image)</b></span>
                {
                  fetechingData ? "..." :
                    <DraggableUploader
                      preImage={data?.templateImage?.url}
                      slug={slug}
                      cover={false}
                    />
                }
              </div>
            </>
          }
        </div>}


      </div>
    </SrvyLayout>
  )
}

export default SurveyDetail


{/* <div className="mb-2 mt-4">
              <span> <b>Cover Image</b></span>
              {
                fetechingData ? "..." :
                  <DraggableUploader
                    preImage={data?.coverImage?.url}
                    slug={slug}// Update with the actual ID and endpoint
                    cover={true}
                  />
              }
            </div> */}