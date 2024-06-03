import React from 'react';
import { Form, Input, Radio, Select, Checkbox, Button, InputNumber, Slider, Rate } from 'antd';
import BgHeading from '../../common/BgHeading';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';

const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];
const customIcons = {
  1: <FrownOutlined className='rate-icons mx-2' />,
  2: <FrownOutlined className='rate-icons mx-2' />,
  3: <MehOutlined className='rate-icons mx-2' />,
  4: <SmileOutlined className='rate-icons mx-2' />,
  5: <SmileOutlined className='rate-icons mx-2' />,
};


const SurveyPreview = ({ fields, preview = true, submiting, submittingLoading = false }) => {
  const [form] = Form.useForm();

  console.log(fields)

  const onFinish = (values) => {
    if (!preview) {

      const formattedResponses = Object.keys(values).map(key => ({
        fieldId: key,
        value: values[key]
      }));
      submiting(formattedResponses)
    }

  };

  const renderField = (field, index) => {
    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <Form.Item
            name={field._id}
            label={field.label}
            key={index}
            rules={[{ required: field.required, message: `${field.label} is Required` }]}



          >
            <Input type={field.type}  className='survey-text ' />
          </Form.Item>
        );
      case 'radio':
        return (
          <Form.Item
            name={field._id}
            label={field.label}
            key={index}
            rules={[{ required: field.required, message: `${field.label} is Required` }]}
          >
            <Radio.Group>
              <div className="d-flex flex-column">
                {field.options.map((option, idx) => (
                  <Radio key={idx} value={option.value}>{option.label}</Radio>
                ))}
              </div>
            </Radio.Group>
          </Form.Item>
        );
      case 'dropdown':
        return (
          <Form.Item
            name={field._id}
            label={field.label}
            key={index}
            rules={[{ required: field.required, message: `${field.label} is Required` }]}
          >
            <Select placeholder={`Choose one`}>

              {field.options.map((option, idx) => (
                <Select.Option key={idx} value={option.value}>{option.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        );
      case 'checkbox':
        return (
          <Form.Item
            name={field._id}
            label={field.label}
            key={index}
            rules={[{ required: field.required, message: `${field.label} is Required` }]}
          >
            <Checkbox.Group style={{ width: '100%' }}>
              <div className='d-flex flex-column'>
                {field.options.map((option, idx) => (
                  <Checkbox key={idx} value={option.value}>{option.label}</Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          </Form.Item>
        );
      case 'range':
        return (
          <Form.Item
            name={field._id}
            label={field.label}
            key={index}
            rules={[{ required: field.required, message: `${field.label} is Required` }]}
          >
            <Slider range defaultValue={[field.min, field.max]} min={field.min} max={field.max} />
          </Form.Item>
        );
      case 'date':
        return (
          <Form.Item
            name={field._id}
            label={field.label}
            key={index}
            rules={[{ required: field.required, message: `${field.label} is Required` }]}
          >
            <Input type="date" />
          </Form.Item>
        );

      case 'rate':
        return (
          <Form.Item
            name={field._id}
            label={field.label}
            key={index}
            rules={[{ required: field.required, message: `${field.label} is Required` }]}
          >
            <Rate style={{ color: "#0e7490" }} tooltips={desc} defaultValue={field.value} character={({ index = 0 }) => customIcons[index + 1]} />
          </Form.Item>
        );
      default:
        return null;
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}} >
      {preview && <BgHeading title={"Preview"} />}
      <div className='mt-4' >


        {fields?.map((field, index) => <div className='bg-white d-flex flex-column my-3 p-3 rounded-3'>
          {renderField(field, index)}
        </div>)}
      </div>
      <Form.Item>
        <Button loading={submittingLoading} className='myBtn' htmlType='submit'>Submit Survey</Button>
      </Form.Item>
    </Form>
  );
};

export default SurveyPreview;
