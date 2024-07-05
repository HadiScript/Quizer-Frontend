import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons"
import { Checkbox, DatePicker, Form, Input, Radio, Rate, Select, Slider, Space } from "antd"
import { useState } from "react"


const RadioComponent = () => {
  const [radioValue, setRadioValue] = useState(1)
  return <div className="d-flex flex-column gap-5 light-bg form-component-item p-3 rounded-2">
    <span className="heading">Radio Fields</span>
    <div className="d-flex flex-column gap-3">
      <label>What is your current occupation?</label>
      <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
        <Space direction="vertical">
          <Radio value={1}>Student</Radio>
          <Radio value={2}>Employed</Radio>
          <Radio value={3}>Unemployed</Radio>
          <Radio value={4}>Self-employed</Radio>
        </Space>
      </Radio.Group>
    </div>
  </div>
}

const DateComponent = () => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return <div className="d-flex flex-column gap-5 light-bg form-component-item p-3 rounded-2">
    <span className="heading">Radio Fields</span>
    <div className="d-flex flex-column gap-3">
      <label>Please select your date of birth</label>
      <DatePicker onChange={onChange} />
    </div>

    <div className="d-flex flex-column gap-3">
      <label>Please select the suitable date</label>
      <DatePicker onChange={onChange} />
    </div>
  </div>
}

const RateComponent = () => {

  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };
  const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

  return <div className="d-flex flex-column gap-5 light-bg form-component-item p-3 rounded-2">
    <span className="heading">Rating Fields</span>
    <div className="d-flex flex-column gap-3">
      <label>How well did your instructor manage and facilitate class discussions?</label>
      <Rate style={{ color: "#0e7490" }} tooltips={desc} defaultValue={3} character={({ index = 0 }) => customIcons[index + 1]} />
    </div>

    <div className="d-flex flex-column gap-3">
      <label>How would you rate overall quality of the course?</label>
      <Rate style={{ color: "#0e7490" }} tooltips={desc} defaultValue={3} character={({ index = 0 }) => customIcons[index + 1]} />
    </div>


  </div>
}

const InputComponent = () => {
  return <div className="d-flex flex-column gap-5 light-bg form-component-item p-3 rounded-2">
    <span className="heading">Inputs Fields</span>
    <div className="d-flex flex-column gap-3">
      <label>Please enter your name</label>
      <Input type={"text"} className='survey-text ' />
    </div>

    <div className="d-flex flex-column gap-3">
      <label>Please enter your email</label>
      <Input type={"email"} className='survey-text ' />
    </div>
  </div>
}

const SelectComponent = () => {
  return <div className="d-flex flex-column gap-5 light-bg form-component-item p-3 rounded-2">
    <span className="heading">Select Fields</span>
    <div className="d-flex flex-column gap-3">
      <label>How many courses have you taken so far?</label>
      <Select placeholder={`Choose one`}>
        <Select.Option value={"Data Analysis with Looker Studio"}>Data Analysis with Looker Studio</Select.Option>
        <Select.Option value={"Learn Content Creation Using Mobile Phone"}>Learn Content Creation Using Mobile Phone</Select.Option>
        <Select.Option value={"SEO with AI Mastery Course"}>SEO with AI Mastery Course</Select.Option>
        <Select.Option value={"React Js Mastery Course"}>React Js Mastery Course</Select.Option>
        <Select.Option value={"Fundamentals of Data analysis"}>Fundamentals of Data analysis</Select.Option>
        <Select.Option value={"Python with AI Mastery Course"}>Python with AI Mastery Course</Select.Option>
        <Select.Option value={"Graphic Designing Mastery Course"}>Graphic Designing Mastery Course</Select.Option>
      </Select>
    </div>


    <div className="d-flex flex-column gap-3">
      <label>How many courses have you taken so far?</label>
      <Checkbox.Group style={{ width: '100%' }}>
        <div className='d-flex flex-column'>

          <Checkbox value={"Data Analysis"}>Data Analysis </Checkbox>
          <Checkbox value={"React"}>React Mastery</Checkbox>
          <Checkbox value={"Python"}>Python</Checkbox>
        </div>
      </Checkbox.Group>
    </div>


  </div>
}

const RangeComponent = () => {
  return <div className="d-flex flex-column gap-5 light-bg form-component-item p-3 rounded-2">
    <span className="heading">Inputs Fields</span>
    <div className="d-flex flex-column gap-3">
      <label>Please select the range</label>
      <Slider range defaultValue={[10, 100]} min={10} max={200} />
    </div>

    <div className="d-flex flex-column gap-3">
      <label>Please your expected salary</label>
      <Slider range defaultValue={[100000, 200000]} min={100000} max={200000} />
    </div>
  </div>
}


const FormComponents = () => {

  return (
    <div id="Forms Component" style={{ marginTop: "100px", marginBottom: "100px" }}>
      <div className='feature8-title-wrapper'>
        <h1 style={{ fontWeight: "600" }}>Forms Component</h1>
        <p>What you can add in your Form</p>
      </div>

      <div className="d-flex gap-2 align-items-center px-5 form-component">
        <RadioComponent />
        <DateComponent />
        <RateComponent />
        <InputComponent />
        <SelectComponent />
        <RangeComponent />
      </div>


    </div>
  )
}

export default FormComponents