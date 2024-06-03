import React from 'react';
import { Form, Input, Radio, Select, Checkbox, Button, InputNumber, Slider } from 'antd';
import BgHeading from '../../common/BgHeading';

const SurveyPreview = ({ fields, preview = true, submiting, submittingLoading = false }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (!preview) {

      const formattedResponses = Object.keys(values).map(key => ({
        fieldId: key,
        value: values[key]
      }));
      submiting(formattedResponses)
    }
    // console.log('Form Values:', values);
    // console.log(fields, "here")
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
            <Input type={field.type} placeholder={`Enter ${field.label}`} />
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
              {field.options.map((option, idx) => (
                <Radio key={idx} value={option.value}>{option.label}</Radio>
              ))}
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
            <Select placeholder={`Select ${field.label}`}>
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
              {field.options.map((option, idx) => (
                <Checkbox key={idx} value={option.value}>{option.label}</Checkbox>
              ))}
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
      default:
        return null;
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
      {preview && <BgHeading title={"Preview"} />}
      <div className='mt-4' >


        {fields?.map((field, index) => renderField(field, index))}
      </div>
      <Form.Item>
        <Button loading={submittingLoading} className='myBtn' htmlType='submit'>Submit Survey</Button>
      </Form.Item>
    </Form>
  );
};

export default SurveyPreview;
