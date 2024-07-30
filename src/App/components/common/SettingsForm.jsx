import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button, Form, Input, Select, DatePicker, Radio, List } from "antd";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import PremuimSettings from "./PremuimSettings";

const { RangePicker } = DatePicker;

const SettingsForm = ({ _settings, _setSettings, onFinish, from = "globalSettings", quizId, loading }) => {
  const [dateRange, setDateRange] = useState([]);

  useEffect(() => {
    if (_settings?.quizAvailability?.start && _settings?.quizAvailability?.end) {
      const start = dayjs(_settings?.quizAvailability?.start);
      const end = dayjs(_settings?.quizAvailability?.end);
      setDateRange([start, end]);
    }
  }, [_settings?.quizAvailability?.start, _settings?.quizAvailability?.end]);

  const handleRangeChange = (dates) => {
    let currentDate = new Date();

    setDateRange(dates);
    if (dates) {
      _setSettings((pre) => ({
        ...pre,
        quizAvailability: {
          start: dates[0],
          end: dates[1],
        },
      }));
    }
  };

  const handleSubmit = () => {
    if (dateRange.length !== 0 && dateRange.length !== 2) {
      alert("Please select both start and end dates.");
      return;
    }

    onFinish();
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day');
  };

  return (
    <>
      <Form name="_settings" onFinish={handleSubmit} layout="vertical">

        <Form.Item className="mb-3 " required>
          <label htmlFor="title" className="form-label">
            <b>Quiz Mode</b>
          </label>
          <Select value={_settings?.mode} onChange={(e) => _setSettings((prev) => ({ ...prev, mode: e }))}>
            <Select.Option value="practice">Practice</Select.Option>
            <Select.Option value="exam">Exam</Select.Option>
          </Select>
          <small>In practise mode, user would see the answers</small>
        </Form.Item>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <b>Passing Score</b>
          </label>
          <Input value={_settings?.passingScore} onChange={(e) => _setSettings((prev) => ({ ...prev, passingScore: e.target.value }))} type="number" />
          <small>Passing score in Percentage {_settings.passingScore + "%"}</small>
        </div>

        <PremuimSettings
          _settings={_settings}
          _setSettings={_setSettings}
          handleRangeChange={handleRangeChange}
          disabledDate={disabledDate}
          dateRange={dateRange}
          setDateRange={setDateRange}
          from={from}
        />

        <Button loading={loading} className="myBtn" htmlType="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SettingsForm;
