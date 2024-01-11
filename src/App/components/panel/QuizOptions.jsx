import React from "react";

import { Button, Dropdown, Grid } from "antd";
import { CopyOutlined, DeleteOutlined, SettingOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;

const QuizOptions = ({ setSettingDrawer, deleteQuiz, setOpenLinkModal }) => {
  const points = useBreakpoint();

  const items = [
    {
      key: "1",
      label: "Copy link",
      icon: <CopyOutlined />,
      disabled: false,
      onClick: () => setOpenLinkModal(true),
    },
    {
      key: "2",
      label: "Delete Quiz",
      icon: <DeleteOutlined />,
      disabled: false,
      onClick: deleteQuiz,
    },
    {
      key: "3",
      label: "Settings",
      icon: <SettingOutlined />,
      disabled: false,
      onClick: () => setSettingDrawer(true),
    },
  ];

  return points.md ? (
    <div className="d-flex justify-content-end align-items-center gap-2">
      <Button className="dottedBtn" type="dashed" onClick={() => setOpenLinkModal(true)} icon={<CopyOutlined />}>
        Copy link
      </Button>
      <Button className="deleteBtn " onClick={deleteQuiz} icon={<DeleteOutlined />}>
        Delete Quiz And It's Questions
      </Button>

      <Button className="myBtn " onClick={() => setSettingDrawer(true)} icon={<SettingOutlined />}>
        Settings
      </Button>
    </div>
  ) : (
    <div className="d-flex justify-content-end">
      <Dropdown.Button menu={{ items }} placement="bottom">
        Options
      </Dropdown.Button>
    </div>
  );
};

export default QuizOptions;
