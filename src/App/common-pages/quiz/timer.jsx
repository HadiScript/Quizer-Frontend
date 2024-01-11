import { ClockCircleOutlined, FileTextOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import React from "react";

const Timer = ({ remainingTime }) => {

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="timer ">
      <div className="d-flex align-items-center justify-content-center gap-2" style={{ height: "100%" }}>
        <span>Timer <ClockCircleOutlined /> : </span>
        <span>{remainingTime !== null ? formatTime(remainingTime) : '00:00'}</span>
      </div>
    </div>
  );
};

export default Timer;
