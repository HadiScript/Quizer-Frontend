import { Button, Form, Input } from 'antd'
import BgHeading from '../../../components/common/BgHeading'
import SubcriberLayout from '../../../components/layouts/Layout'
import { useSurveyCreate } from '../../../../actions/_survey'
import SrvyCreateEditForm from '../../../components/panel/survey/SrvyCreateEditForm'

const CreateSurvey = () => {

  const { createSurvey, isLoading } = useSurveyCreate()



  return (
    <SubcriberLayout>
      <BgHeading title={"Create Survey"} />

      <SrvyCreateEditForm submit={createSurvey} isLoading={isLoading} />


    </SubcriberLayout>
  )
}

export default CreateSurvey