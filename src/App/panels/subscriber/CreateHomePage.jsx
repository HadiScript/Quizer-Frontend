import React from 'react'
import SubcriberLayout from '../../components/layouts/Layout'
import { Form, Input, Button, Alert, Divider } from 'antd'
import Heading from '../../components/common/Heading'
import { FileAddOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { useCreateHomePage, useGetHomesPages } from '../../../actions/_homePage'
import HomepagesGrid from '../../components/panel/home-page/HomePagesGrid'

const CreateHomePage = () => {
  const [form] = Form.useForm();
  const { create, isLoading } = useCreateHomePage()
  const { data, isLoading: fetchingLoading } = useGetHomesPages()

  const submit = (values) => {
    create(values)
    form.resetFields()
  }


  return (
    <SubcriberLayout>
      <Heading title={"Create Home Page"} desc={"Create your custom home page."} Icon={<FileAddOutlined className="its-icon" />} />

      <Alert
        message="Create home page for your user :)"
        type="info"
        closable
      />

      <Form form={form} onFinish={submit} layout='vertical' className='mt-5'>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Title is required!' }]}
        >
          <Input />
        </Form.Item>

        <Button loading={isLoading} className='myBtn' htmlType="submit">
          Submit
        </Button>
      </Form>

      <Divider />

      <Heading title={"Your Home Pages"} desc={"Here is your all home pages"} Icon={<UnorderedListOutlined className="its-icon" />} />

      <div className="row ">
        <HomepagesGrid list={data?.homePages} loading={fetchingLoading} />
      </div>





    </SubcriberLayout>
  )
}

export default CreateHomePage