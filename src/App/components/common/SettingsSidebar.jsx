import { Drawer } from "antd";
import React from "react";
import SettingsForm from "./SettingsForm";
import { _useQuizSettings } from "../../../actions/_settings";

const SettingsSidebar = ({
  onClose,
  open,

  quizId,
}) => {
  const { loading, addQuizSettings, _setSettings, _settings } = _useQuizSettings(quizId);

  return (
    <Drawer title="Quiz Settings" placement="right" onClose={onClose} open={open}>
      <div className="p-2">
        <SettingsForm _setSettings={_setSettings} _settings={_settings} from="quizDetail" onFinish={() => addQuizSettings(quizId)} quizId={quizId} loading={loading} />
      </div>
    </Drawer>
  );
};

export default SettingsSidebar;
