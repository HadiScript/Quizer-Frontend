import { Checkbox, ColorPicker, Form, Input, Radio, Slider } from 'antd'

const HeaderEditor = ({
  values,
  setValues
}) => {

  const handleSocials = e => {

    if (e.target.name === 'showSocialLinks') {
      setValues(prev => ({ ...prev, header: { ...prev.header, [e.target.name]: e.target.checked } }))
    }

    if (e.target.checked && e.target.name !== 'showSocialLinks') {
      setValues(prev => ({ ...prev, header: { ...prev.header, [e.target.name]: { ...prev.header[e.target.name], show: e.target.checked } } }))
      // onChange = {(e) => }
    }
    if (e.target.value) {
      setValues(prev => ({ ...prev, header: { ...prev.header, [e.target.name]: { ...prev.header[e.target.name], link: e.target.value } } }))
    }

  }
  return (
    <>

      <Form.Item label="Show Header?" name="showHomePage" valuePropName="checked">
        <Checkbox
          checked={values?.showHeader}
          onChange={(e) => setValues(prev => ({ ...prev, showHeader: e.target.checked }))}
        />
      </Form.Item>
      {
        values?.showHeader &&
        <>
          <Form.Item label="Justify">
            <Radio.Group>
              <Radio defaultChecked={values?.header?.justify} value="center" onChange={(e) => setValues(prev => ({ ...prev, header: { ...prev.header, justify: e.target.value } }))}> Center </Radio>
              <Radio defaultChecked={values?.header?.justify} value="start" onChange={(e) => setValues(prev => ({ ...prev, header: { ...prev.header, justify: e.target.value } }))}> Start </Radio>
              <Radio defaultChecked={values?.header?.justify} value="between" onChange={(e) => setValues(prev => ({ ...prev, header: { ...prev.header, justify: e.target.value } }))}> Betweem </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Container" valuePropName="checked">
            <Checkbox
              checked={values?.header?.container}
              onChange={(e) => setValues(prev => ({ ...prev, header: { ...prev.header, container: e.target.checked } }))}
            >Padding </Checkbox>
          </Form.Item>

          <Form.Item label="Background color">
            <ColorPicker value={values?.header?.bgColor} onChange={(e) => setValues(prev => ({ ...prev, header: { ...prev.header, bgColor: e.toHexString() } }))} />
          </Form.Item>

          <Form.Item label="Text color">
            <ColorPicker value={values?.header?.textColor} onChange={(e) => setValues(prev => ({ ...prev, header: { ...prev.header, textColor: e.toHexString() } }))} />
          </Form.Item>


          <Form.Item label="Show social links?" valuePropName="checked">
            <Checkbox
              checked={values?.header?.showSocialLinks}
              name='showSocialLinks'
              onChange={handleSocials}
            />
          </Form.Item>


          {
            values?.header?.showSocialLinks &&
            <>
              <div className='d-flex justify-content-start align-items-center flex-wrap '>
                <Form.Item label="Show Instagram" valuePropName="checked">
                  <Checkbox
                    checked={values?.header?.instagram.show}
                    name='instagram'
                    onChange={handleSocials}
                  />
                </Form.Item>

                {
                  values?.header?.instagram?.show &&
                  <Form.Item className='mx-3' label="Link">
                    <Input
                      required
                      value={values?.header?.instagram?.link}
                      name='instagram'
                      onChange={handleSocials}
                    />
                  </Form.Item>
                }
              </div>

              <div className='d-flex justify-content-start align-items-center flex-wrap '>
                <Form.Item label="Show Facebook" valuePropName="checked">
                  <Checkbox

                    checked={values?.header?.facebook.show}
                    name='facebook'
                    onChange={handleSocials}
                  />
                </Form.Item>

                {
                  values?.header?.facebook?.show &&
                  <Form.Item className='mx-3' label="Link">
                    <Input
                      required
                      value={values?.header?.facebook?.link}
                      name='facebook'
                      onChange={handleSocials}
                    />
                  </Form.Item>
                }
              </div>


              <div className='d-flex justify-content-start align-items-center flex-wrap '>
                <Form.Item label="Show Twitter" valuePropName="checked">
                  <Checkbox
                    name='twitter'
                    checked={values?.header?.twitter?.show}
                    onChange={handleSocials}
                  />
                </Form.Item>

                {
                  values?.header?.twitter?.show &&
                  <Form.Item className='mx-3' label="Link">
                    <Input
                      required
                      value={values?.header?.twitter?.link}
                      name='twitter'
                      onChange={handleSocials}
                    />
                  </Form.Item>
                }
              </div>


              <div className='d-flex justify-content-start align-items-center flex-wrap '>
                <Form.Item label="Show Linkedin" valuePropName="checked">
                  <Checkbox
                    name='linkedin'
                    checked={values?.header?.linkedin?.show}
                    onChange={handleSocials}
                  />
                </Form.Item>

                {
                  values?.header?.linkedin?.show &&
                  <Form.Item className='mx-3' label="Link">
                    <Input
                      name="linkedin"
                      required
                      value={values?.header?.linkedin?.link}
                      onChange={handleSocials}
                    />
                  </Form.Item>
                }
              </div>

              <span>Social Links Gap</span>
              <Slider
                style={{ maxWidth: 400 }}
                onChange={(e) => setValues(prev => ({ ...prev, header: { ...prev.header, socialLinksGap: e } }))}
                min={1}
                max={5}
                defaultValue={2}
              />




            </>
          }

        </>
      }

    </>
  )
}

export default HeaderEditor