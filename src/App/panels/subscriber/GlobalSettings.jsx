import React from "react";
import { Form, Input, Button, Select, Card } from "antd";
import Heading from "../../components/common/Heading";
import { SettingOutlined } from "@ant-design/icons";
import { _useGlobalSettings } from "../../../actions/_settings";
import SettingsForm from "../../components/common/SettingsForm";

const GlobalSettings = () => {
  const { loading, onFinish, _settings, _setSettings } = _useGlobalSettings();

  return (
    <Card>
      <Heading title={"Global Settings"} Icon={<SettingOutlined className="its-icon" />} />
      <div className="container mt-3">
        <SettingsForm loading={loading} _setSettings={_setSettings} _settings={_settings} onFinish={onFinish} />
        {/* <Form name="global_settings" onFinish={onFinish} layout="vertical">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Quiz Timer
            </label>
            <Input value={_settings.quizTimer} onChange={(e) => _setSettings((prev) => ({ ...prev, quizTimer: e.target.value }))} type="number" />
          </div>

          <div className="mb-3 d-flex flex-column">
            <label htmlFor="title" className="form-label">
              Quiz Mode
            </label>
            <Select value={_settings?.mode} onChange={(e) => _setSettings((prev) => ({ ...prev, mode: e }))}>
              <Select.Option value="practice">Practice</Select.Option>
              <Select.Option value="exam">Exam</Select.Option>
            </Select>
          </div>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Passing Score
            </label>
            <Input value={_settings.passingScore} onChange={(e) => _setSettings((prev) => ({ ...prev, passingScore: e.target.value }))} type="number" />
          </div>

          <div className="mb-3 d-flex flex-column">
            <label htmlFor="title" className="form-label">
              Scoring Type
            </label>
            <Select value={_settings.scoringType} onChange={(e) => _setSettings((prev) => ({ ...prev, scoringType: e }))}>
              <Select.Option value="grade">Grade</Select.Option>
              <Select.Option value="percentage">Percentage</Select.Option>
              <Select.Option value="number">Numbers</Select.Option>
            </Select>
          </div>

          <Form.Item>
            <Button loading={loading} className="myBtn" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form> */}
      </div>
    </Card>
  );
};

export default GlobalSettings;
