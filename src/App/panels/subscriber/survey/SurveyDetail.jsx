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


  return (
    <SrvyLayout >
      <BgHeading title={data?.title} desc="Create survey questions and their options using different field types. Copy the link to share your survey." />

      <SrvyFormsTabs />

      <div>

        {
          auth?.user?.role === "super-user" &&
          <>
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



        {/* <h2>Upload Template Image</h2> */}
        {/* <DraggableUploader
          actionUrl="/survey/upload-template/123" // Update with the actual ID and endpoint
          onSuccess={handleSuccess}
          onError={handleError}
        /> */}
      </div>

      <div className="my-4" />
      <SrvyCreateEditForm fetechingData={fetechingData} data={data} submit={updateSurvey} isLoading={updateLoading} slug={slug} />
    </SrvyLayout>
  )
}

export default SurveyDetail