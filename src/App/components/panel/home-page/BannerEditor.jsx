import { Checkbox, ColorPicker, Form, Input, Slider } from 'antd'

const BannerEditor = ({ values, setValues }) => {
  const { showBanner } = values
  return (
    <>
      <Form.Item label="Show Banner?" valuePropName="checked">
        <Checkbox
          checked={showBanner}
          onChange={(e) => setValues(prev => ({ ...prev, showBanner: e.target.checked }))}
        />
      </Form.Item>

      {
        showBanner &&
        <>
          <Form.Item label="Container" valuePropName="checked">
            <Checkbox
              checked={values?.banner?.bannerContainer}
              onChange={(e) => setValues(prev => ({ ...prev, banner: { ...prev.banner, bannerContainer: e.target.checked } }))}
            />
          </Form.Item>
          <Form.Item label="Background color">
            <ColorPicker value={values?.banner?.bannerBgColor} onChange={(e) => setValues(prev => ({ ...prev, banner: { ...prev.banner, bannerBgColor: e.toHexString() } }))} />
          </Form.Item>

          <Form.Item label="Text color">
            <ColorPicker value={values?.banner?.bannerTextColor}
              onChange={(e) => setValues(prev => ({ ...prev, banner: { ...prev.banner, bannerTextColor: e.toHexString() } }))}
            />
          </Form.Item>

          <Form.Item label="Border" valuePropName="checked">
            <Checkbox
              checked={values?.banner?.border}
              onChange={(e) => setValues(prev => ({ ...prev, banner: { ...prev.banner, border: e.target.checked } }))}
            />
          </Form.Item>


          <span>Border radius</span>
          <Slider
            style={{ maxWidth: 400 }}
            onChange={(e) => setValues(prev => ({ ...prev, banner: { ...prev.banner, borderRadius: e } }))}
            min={1}
            max={5}
            value={values?.banner?.borderRadius}
          // defaultValue={}
          />

          <span>Height</span>
          <Slider
            style={{ maxWidth: 400 }}
            onChange={(e) => setValues(prev => ({ ...prev, banner: { ...prev.banner, height: e } }))}
            min={100}
            max={600}
            value={values?.banner?.height}
          />

          <Form.Item label="Border" valuePropName="checked">
            <Input
              value={values?.banner?.text}
              onChange={(e) => setValues(prev => ({ ...prev, banner: { ...prev.banner, text: e.target.value } }))}
            />
          </Form.Item>


          <Form.Item label="Border" valuePropName="checked">
            <Input.TextArea
              value={values?.banner?.para}
              onChange={(e) => setValues(prev => ({ ...prev, banner: { ...prev.banner, para: e.target.value } }))}
            />
          </Form.Item>
        </>
      }
    </>
  )
}

export default BannerEditor