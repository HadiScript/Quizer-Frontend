import { Form, Input, Button, Select, Space, Checkbox, Radio, InputNumber, Row, Col, Collapse, Rate, } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const FieldsForm = ({ updateSurveyFields, updateLoading, fetechingDataLoading, setOpenPreview, fields, setFields, data }) => {



  const [form] = Form.useForm();

  // useEffect(() => {
  //   // Save fields to local storage whenever they change
  //   localStorage.setItem('surveyFields', JSON.stringify(fields));
  // }, [fields]); // Dependency array to trigger effect only when fields change

  const addField = () => {
    setFields([...fields, { type: 'text', label: '', options: [], required: false }]);
  };

  const removeField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleTypeChange = (value, index) => {
    const updatedFields = [...fields];
    updatedFields[index].type = value;
    if (["radio", "dropdown", "checkbox"].includes(value)) {
      updatedFields[index].options = [{ label: '', value: '' }];
    } else {
      updatedFields[index].options = [];
    }
    if (value === 'rate') {
      updatedFields[index].value = 0; // Initialize with default rate value
      updatedFields[index].maxRate = 5; // Default max rate
    }
    setFields(updatedFields);
  };

  const handleFieldChange = (index, event) => {
    const updatedFields = [...fields];
    updatedFields[index][event.target.name] = event.target.value;
    setFields(updatedFields);
  };

  const handleOptionChange = (fieldIndex, optionIndex, event) => {
    const updatedFields = [...fields];
    const newLabel = event.target.value;
    updatedFields[fieldIndex].options[optionIndex].label = newLabel;
    updatedFields[fieldIndex].options[optionIndex].value = newLabel.toLowerCase().replace(/ /g, '_');
    setFields(updatedFields);
  };

  const addOption = (index) => {
    const updatedFields = [...fields];
    updatedFields[index].options.push({ label: '', value: '' });
    setFields(updatedFields);
  };

  const removeOption = (fieldIndex, optionIndex) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options.splice(optionIndex, 1);
    setFields(updatedFields);
  };

  const toggleRequired = (index, checked) => {
    const updatedFields = [...fields];
    updatedFields[index].required = checked;
    setFields(updatedFields);
  };

  const onFinish = async () => {
    // console.log(fields, "here isthe fields")
    try {
      await updateSurveyFields(fields);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} initialValues={fields}>
      {fetechingDataLoading && <span className='my-3'>please wait...</span>}
      <Space direction="vertical" style={{ width: '100%' }}>
        {fields?.map((field, index) => (
          <Collapse key={index} style={{ width: '100%', marginBottom: 8 }} className='lightgrey-bg mt-3 '>
            <Collapse.Panel header={<b className='text-capitalize'>{field.type}</b>} >
              <Row>
                <Col lg={12} xs={24} className='d-flex flex-column gap-3'>
                  <Select
                    value={field.type}
                    onChange={(value) => handleTypeChange(value, index)}
                    style={{ width: "90%" }}
                  >
                    <Option value="text">Text</Option>
                    <Option value="email">Email</Option>
                    <Option value="radio">Radio</Option>
                    <Option value="dropdown">Dropdown</Option>
                    <Option value="checkbox">Checkbox</Option>
                    <Option value="range">Range</Option>
                    <Option value="date">Date</Option>
                    <Option value="rate">Rate</Option>
                  </Select>
                  <Input
                    name="label"
                    value={field.label}
                    onChange={(event) => handleFieldChange(index, event)}
                    placeholder="Label"
                    style={{ width: "90%" }}
                  />
                  <Checkbox
                    checked={field.required}
                    onChange={(e) => toggleRequired(index, e.target.checked)}
                    style={{ marginBottom: 4 }}
                  >
                    Required
                  </Checkbox>
                  <Button style={{ width: "90%" }} className='deleteBtn' onClick={() => removeField(index)} icon={<MinusOutlined />}>
                    Remove this Field
                  </Button>
                </Col>

                <Col lg={12} xs={24}>
                  {['radio', 'dropdown', 'checkbox'].includes(field.type) && (
                    <div>
                      {field.options.map((option, optionIndex) => (
                        <div key={optionIndex} style={{ marginBottom: 8, width: '80%' }} className='d-flex gap-3'>
                          <Input
                            name="label"
                            value={option.label}
                            onChange={(event) => handleOptionChange(index, optionIndex, event)}
                            placeholder="Option Label"
                            style={{ width: '100%' }}
                          />
                          <MinusOutlined onClick={() => removeOption(index, optionIndex)} />
                        </div>
                      ))}
                      <Button type="dashed" onClick={() => addOption(index)} icon={<PlusOutlined />}>
                        Add Option
                      </Button>
                    </div>
                  )}
                  {field.type === 'range' && (
                    <Space align="baseline">
                      <InputNumber
                        name="min"
                        value={field.min}
                        onChange={value => handleFieldChange(index, { target: { name: 'min', value } })}
                        placeholder="Min Value"
                      />
                      <InputNumber
                        name="max"
                        value={field.max}
                        onChange={value => handleFieldChange(index, { target: { name: 'max', value } })}
                        placeholder="Max Value"
                      />
                    </Space>
                  )}

                  {field.type === 'rate' && (
                    <Rate
                      value={field.value} // Ensure your field object has a value property for rate
                      onChange={value => handleFieldChange(index, { target: { name: 'value', value } })}
                    />
                  )}
                </Col>
              </Row>


            </Collapse.Panel>

          </Collapse>
        ))}
        <Button type="dashed" onClick={addField} icon={<PlusOutlined />} style={{ width: '100%' }}>
          Add Field
        </Button>
      </Space>
      <Form.Item className='mt-4'>
        <div className='d-flex justify-content-between algin-items-center '>
          <Button className={"myBtn"} htmlType="submit" loading={updateLoading}>
            Save
          </Button>

          <Button className={"dottedBtn"} onClick={() => setOpenPreview(true)} >
            Preview
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default FieldsForm;
