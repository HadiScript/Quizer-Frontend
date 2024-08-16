import { Drawer, Button, Form, Input, } from "antd";
import { SketchPicker } from "react-color";

const SidebarCustomize = ({ open, setOpen, settings, onChange }) => {

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <div className="p-3">
        <h4>Customize Your Survey</h4>

        <Form layout="vertical">
          <Form.Item label="Header Color">
            <SketchPicker
              color={settings.headerColor ? settings.headerColor : "#1890ff"}
              onChangeComplete={(color) => onChange('headerColor', color.hex)}
            />
          </Form.Item>
          <Form.Item label="Text Color">
            <SketchPicker
              color={settings.textColor ? settings.textColor : "#000000"}
              onChangeComplete={(color) => onChange('textColor', color.hex)}
            />
          </Form.Item>
          <Form.Item label="Button Color">
            <SketchPicker
              color={settings.buttonColor ? settings.buttonColor : "#1890ff"}
              onChangeComplete={(color) => onChange('buttonColor', color.hex)}
            />
          </Form.Item>
          <Form.Item label="Background Color (based on Header Color)">
            <Input value={settings.bgColor ? settings.bgColor : "#e6f7ff"} disabled />
          </Form.Item>
        </Form>

      </div>

    </Drawer >
  )
}

export default SidebarCustomize