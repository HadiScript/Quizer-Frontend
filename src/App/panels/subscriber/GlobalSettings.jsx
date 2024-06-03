import Heading from "../../components/common/Heading";
import { SettingOutlined, UploadOutlined } from "@ant-design/icons";
import { _useGlobalSettings } from "../../../actions/_settings";
import SettingsForm from "../../components/common/SettingsForm";
import SubcriberLayout from "../../components/layouts/Layout";
import { Col, Grid, Row, } from "antd";

import { useLogo } from "../../../actions/_uploads";
import LogoUploads from "../../components/panel/LogoUploads";
import BgHeading from "../../components/common/BgHeading";

const GlobalSettings = () => {

  const { loading, onFinish, _settings, _setSettings } = _useGlobalSettings();
  const { image, handleChange, preview, uploadImage, removeLogo } = useLogo()
  const points = Grid.useBreakpoint();
  return (
    <SubcriberLayout>
      <BgHeading title={"Global Settings"} />

      <Row className="mt-4">
        <Col md={16} xs={24}>
          <div className="border-end  p-3">
            <Heading title={"Global Settings"} Icon={<SettingOutlined className="its-icon" />} />
            <SettingsForm from={"globalSettings"} loading={loading} _setSettings={_setSettings} _settings={_settings} onFinish={onFinish} />
          </div>
        </Col>
        <Col md={8} xs={24}>
          <div className={`${!points.md ? 'mt-4' : 'px-3'}`}>
            <Heading title={"Upload Logo"} Icon={<UploadOutlined className="its-icon" />} />
            <LogoUploads
              image={image}
              handleChange={handleChange}
              preview={preview}
              uploadImage={uploadImage}
              removeLogo={removeLogo}
            />
          </div>
        </Col>

      </Row>


    </SubcriberLayout >
  );
};

export default GlobalSettings;
