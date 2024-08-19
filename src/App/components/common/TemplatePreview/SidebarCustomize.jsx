import { Drawer, Button, Form, Input, } from "antd";
import { useState } from "react";
import { SketchPicker } from "react-color";
import { Errs } from "../../../../helper/Errs";
import axios from "axios";
import { surveyApi } from "../../../../helper/API";
import { useAuth } from "../../../../context/authContext";
import toast from "react-hot-toast";

const SidebarCustomize = ({ open, setOpen, settings, onChange, from, slug }) => {

  const [loading, setLoading] = useState(false)
  const [auth] = useAuth()

  const submit = async () => {
    try {
      setLoading(true)
      // settings/:slug/:id
      const res = await axios.put(`${surveyApi}/settings/${slug}/${auth?.user?.userId}`, { settings })
      toast.success(res.message)
    } catch (error) {
      console.log(error);
      Errs(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <div className="p-3">
        <div className="d-flex justify-content-between algin-items-center mb-3">
          <h4>Customization </h4>
          {from === "dashboard" && <Button onClick={submit} loading={loading} className="myBtn">Save</Button>}
        </div>

        <Form layout="vertical">
          <Form.Item label="Header Color">
            <SketchPicker
              color={settings.mainColor ? settings.mainColor : "#1890ff"}
              onChangeComplete={(color) => onChange('mainColor', color.hex)}
            />
          </Form.Item>
          <Form.Item label="Text Color">
            <SketchPicker
              color={settings.textColor ? settings.textColor : "#000000"}
              onChangeComplete={(color) => onChange('textColor', color.hex)}
            />
          </Form.Item>
          {/* <Form.Item label="Button Color">
            <SketchPicker
              color={settings.buttonColor ? settings.buttonColor : "#1890ff"}
              onChangeComplete={(color) => onChange('buttonColor', color.hex)}
            />
          </Form.Item> */}
          <Form.Item label="Button Color (based on Header Color)">
            <Input value={settings.mainColor ? settings.mainColor : "black"} disabled />
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