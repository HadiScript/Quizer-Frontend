import { Button, Card, Form, Input } from 'antd'
import BgHeading from '../../../components/common/BgHeading'
import SubcriberLayout from '../../../components/layouts/Layout'
import { useSurveyCreate } from '../../../../actions/_survey'
import SrvyCreateEditForm from '../../../components/panel/survey/SrvyCreateEditForm'

const CreateSurvey = () => {

  const { createSurvey, isLoading } = useSurveyCreate()



  return (
    <SubcriberLayout>
      <BgHeading title={"Create Survey"} desc={"Create a survey as per your requirements in a few easy steps."} />

      <Card className="mt-4">
        <SrvyCreateEditForm submit={createSurvey} isLoading={isLoading} />
      </Card>



    </SubcriberLayout>
  )
}

export default CreateSurvey