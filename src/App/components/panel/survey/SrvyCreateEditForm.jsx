import { Button, Input, Form } from 'antd'
import { useEffect, useRef } from 'react';


const SrvyCreateEditForm = ({ submit, isLoading, data, fetechingData }) => {

  const formRef = useRef(null);

  useEffect(() => {
    // Check if data is available and the form is mounted
    if (data && formRef.current) {
      formRef.current.setFieldsValue({
        title: data.title,
        description: data.description,
      });
    }
  }, [data]);

  return (
    <div className=''>

      {fetechingData && <>loading...</>}


      <Form
        ref={formRef}
        layout='vertical'
        onFinish={submit}
        initialValues={{
          title: "",
          description: "",
        }}
      >
        <Form.Item

          label={
            <div className='d-flex flex-column'>
              <b>Title</b>
              {/* <span>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the</span> */}
            </div>
          }
          name="title"
          rules={[
            {
              required: true,
              message: 'Please enter the Title!',
            },
          ]}
        >
          <Input placeholder='Enter your title here...' />
        </Form.Item>

        <Form.Item
          label={
            <div className='d-flex flex-column'>
              <b>Description</b>
              {/* <span>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the</span> */}
            </div>
          }
          name="description"
          rules={[
            {
              required: true,
              message: 'Please enter the Title!',
            },
          ]}
        >
          <Input.TextArea placeholder='Enter your description here...' />
        </Form.Item>

        <Form.Item>
          <Button loading={isLoading} className='myBtn' htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div >
  )
}

export default SrvyCreateEditForm