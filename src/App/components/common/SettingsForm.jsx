import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button, Form, Input, Select, DatePicker } from "antd";

const { RangePicker } = DatePicker;

const SettingsForm = ({ _settings, _setSettings, onFinish, from = "globalSettings", quizId, loading }) => {
  const [dateRange, setDateRange] = useState([]);

  const handleRangeChange = (dates, dateStrings) => {
    setDateRange(dates);
  };

  const handleSubmit = () => {
    if (dateRange.length !== 0 && dateRange.length !== 2) {
      alert("Please select both start and end dates.");
      return;
    }

    // if (from === "quizDetail") {
    //   _setSettings((prev) => ({
    //     ...prev,
    //     quizAvailability: { ...prev.quizAvailability, start: dateRange ? dateRange[0].toISOString() : null, end: dateRange ? dateRange[1].toISOString() : null },
    //   }));
    // }

    onFinish();
  };

  return (
    <>
      <Form name="_settings" onFinish={handleSubmit} layout="vertical">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Quiz Timer
          </label>
          <Input value={_settings?.quizTimer} onChange={(e) => _setSettings((prev) => ({ ...prev, quizTimer: e.target.value }))} type="number" />
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
          <Input value={_settings?.passingScore} onChange={(e) => _setSettings((prev) => ({ ...prev, passingScore: e.target.value }))} type="number" />
        </div>

        <div className="mb-3 d-flex flex-column">
          <label htmlFor="title" className="form-label">
            Show Score
          </label>
          <Select value={_settings?.showScore} onChange={(e) => _setSettings((prev) => ({ ...prev, showScore: e }))}>
            <Select.Option value={true}>Yes</Select.Option>
            <Select.Option value={false}>No</Select.Option>
          </Select>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label htmlFor="title" className="form-label">
            Scoring Type
          </label>
          <Select value={_settings?.scoringType} onChange={(e) => _setSettings((prev) => ({ ...prev, scoringType: e }))}>
            <Select.Option value="grade">Grade</Select.Option>
            <Select.Option value="percentage">Percentage</Select.Option>
            <Select.Option value="number">Numbers</Select.Option>
          </Select>
        </div>

        {from === "quizDetail" && (
          <>
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="title" className="form-label">
                quizAvailability
              </label>
              {/* default range value, casue infinite error thats i ignore this, for now */}
              {/* <RangePicker value={defaultRangeValue} format="YYYY-MM-DD HH:mm" showTime onChange={handleRangeChange} /> */}

              <RangePicker format="YYYY-MM-DD HH:mm" showTime onChange={handleRangeChange} />
            </div>

            <div className="mb-3 d-flex flex-column">
              <label htmlFor="title" className="form-label">
                Display Setting
              </label>
              <Select value={_settings?.displaySetting} onChange={(e) => _setSettings((prev) => ({ ...prev, displaySetting: e }))}>
                <Select.Option value="all-at-once">All at once</Select.Option>
                <Select.Option value="one-by-one">One by one</Select.Option>
              </Select>
            </div>
          </>
        )}

        <Button loading={loading} className="myBtn" htmlType="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SettingsForm;
