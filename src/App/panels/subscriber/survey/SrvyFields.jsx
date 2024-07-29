import { useEffect, useState } from 'react'
import SrvyLayout from '../../../components/layouts/survey-detail-dashboard/SrvyLayout'
import BgHeading from '../../../components/common/BgHeading'
import SrvyFormsTabs from '../../../components/panel/survey/SrvyFormsTabs'
import FieldsForm from '../../../components/panel/survey/FieldsForm'
import { useBasicInfoServey, useServeyFields, useUpdateSurveyFields } from '../../../../actions/_survey'
import { useParams } from 'react-router-dom'
import { Modal } from 'antd'
import SurveyPreview from '../../../components/panel/survey/SurveyPreview'
import { TableLoading } from '../../../components/loadings'
import SrvyFloatBtns from '../../../components/panel/survey/SrvyFloatBtns'


const surveyFields = [
  {
    type: 'text',
    label: 'Name',
    required: true
  },
  {
    type: 'email',
    label: 'Email',
    required: true
  },
]

const SrvyFields = () => {
  const { slug } = useParams();
  const [openPreview, setOpenPreview] = useState(false);

  const { data: basic, isLoading: fetechingData } = useBasicInfoServey(slug);
  const { updateSurveyFields, isLoading: updateLoading } = useUpdateSurveyFields(slug)
  const { data, isLoading: fetechingDataLoading } = useServeyFields(slug)

  const [fields, setFields] = useState(surveyFields);

  useEffect(() => {
    setFields(data)
  }, [data])

  const onFinish = async () => {
    // console.log(fields, "here isthe fields")
    try {
      await updateSurveyFields(fields);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <SrvyLayout>
      <BgHeading title={basic?.title}  desc={"You can edit and add different type of fields."}/>
      <SrvyFormsTabs />
      {fetechingDataLoading
        ?
        <div className='mt-3'>
          <TableLoading />
        </div>
        :
        <FieldsForm
          updateLoading={updateLoading}
          fetechingDataLoading={fetechingDataLoading}
          updateSurveyFields={updateSurveyFields}
          setOpenPreview={setOpenPreview}
          fields={fields}
          setFields={setFields}
          data={data}
        />
      }

      <Modal footer={null} style={{ top: "-10px" }} width={750} open={openPreview} onCancel={() => setOpenPreview(false)}>
        <div className='d-flex justify-content-center'>
          <SurveyPreview fields={fields} />
        </div>
      </Modal>

      <div className="d-none d-md-block">
        <SrvyFloatBtns setOpenPreview={setOpenPreview} updateLoading={updateLoading} updateSurveyFields={onFinish} />
      </div>
    </SrvyLayout>
  )
}

export default SrvyFields