import React from 'react';
import { Form, Input, Radio, Select, Checkbox, Button, InputNumber, Slider, Rate } from 'antd';
import BgHeading from '../../common/BgHeading';


import { BsEmojiExpressionless, BsEmojiFrown, BsEmojiSmile, BsEmojiHeartEyes } from "react-icons/bs";
// import { BsEmojiFrown } from "react-icons/bs";


const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];
const customIcons = {
  1: <BsEmojiFrown className='rate-icons mx-2' size={22} />,
  2: <BsEmojiExpressionless className='rate-icons mx-2' size={22} />,
  3: <BsEmojiSmile className='rate-icons mx-2' size={22} />,
  4: <BsEmojiSmile className='rate-icons mx-2' size={22} />,
  5: <BsEmojiHeartEyes className='rate-icons mx-2' size={22} />,
};


const SurveyPreview = ({ fields, preview = true, submiting, submittingLoading = false, from = "dashboard", settings }) => {
  const [form] = Form.useForm();

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
            // style={{ minWidth: "400px" }}
            name={field._id}
            label={field.label}
            key={index}
            rules={[
              { required: field.required, message: `${field.label} is required` },
              ...(field.type === 'email' ? [{ type: 'email', message: 'Please enter a valid email address' }] : []),
              ...(field.type === 'text' ? [{ max: 200, message: 'Text cannot exceed 50 characters' }] : [])
            ]}
          >
            {
              field.type === 'text' ? (
                <Input
                  type="text"
                  className='survey-text'
                  maxLength={200}
                  placeholder="Enter your text"
                />
              ) : (
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className='survey-text'
                />
              )
            }
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
    <Form form={form} layout="vertical" className='survey-form' style={{ width: from === "dashboard" ? "" : "" }} onFinish={onFinish} initialValues={{}} >
      <div className='mt-4' >
        {preview && <BgHeading title={"Preview"} desc={"Here is the preview of your form"} />}


        {fields?.map((field, index) => <div className='bg-white d-flex flex-column my-3 p-3 rounded-3'>
          {renderField(field, index)}
        </div>)}
      </div>
      <Form.Item>
        <Button
          style={{
            backgroundColor: from === "templates" && settings?.mainColor ? settings?.mainColor : "",
            color: from === "templates" && settings?.textColor ? settings?.textColor : "",
          }}
          loading={submittingLoading}
          className='myBtn'
          htmlType='submit'
        >
          Submit Survey
        </Button>
      </Form.Item>
    </Form >
  );
};

export default SurveyPreview;
