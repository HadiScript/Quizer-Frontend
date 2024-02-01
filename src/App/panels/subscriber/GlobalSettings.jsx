import { Card } from "antd";
import Heading from "../../components/common/Heading";
import { SettingOutlined } from "@ant-design/icons";
import { _useGlobalSettings } from "../../../actions/_settings";
import SettingsForm from "../../components/common/SettingsForm";
import SubcriberLayout from "../../components/layouts/Layout";

const GlobalSettings = () => {
  const { loading, onFinish, _settings, _setSettings } = _useGlobalSettings();

  return (
    <SubcriberLayout>
      <Heading title={"Global Settings"} Icon={<SettingOutlined className="its-icon" />} />
      <div className="container mt-3">
        <SettingsForm from={"globalSettings"} loading={loading} _setSettings={_setSettings} _settings={_settings} onFinish={onFinish} />
      </div>
    </SubcriberLayout>
  );
};

export default GlobalSettings;
