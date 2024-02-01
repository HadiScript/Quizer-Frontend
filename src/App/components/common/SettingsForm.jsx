import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button, Form, Input, Select, DatePicker, Radio, List } from "antd";
import dayjs from "dayjs";

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

    console.log("am going to sned a req");

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

              <RangePicker format="YYYY-MM-DD HH:mm" showTime value={dateRange} onChange={handleRangeChange} />
            </div>

            <div className="mb-3 d-flex flex-column">
              <label htmlFor="title" className="form-label">
                Display Setting
              </label>
              {
                <Radio.Group value={_settings?.displaySetting} onChange={(e) => _setSettings((prev) => ({ ...prev, displaySetting: e.target.value }))} className="radio-list-group">
                  <div className="d-flex justify-content-start gap-4">
                    <List.Item className="radio-list-item">
                      <Radio value={"all-at-once"} className="full-width-radio">
                        <div>
                          <div className="my-1" style={{ width: "50px", height: "2px", backgroundColor: "lightgrey" }} />
                          <div className="my-1" style={{ width: "50px", height: "2px", backgroundColor: "lightgrey" }} />
                          <div className="my-1" style={{ width: "50px", height: "2px", backgroundColor: "lightgrey" }} />
                          <div className="my-1" style={{ width: "50px", height: "2px", backgroundColor: "lightgrey" }} />
                          <div className="my-1" style={{ width: "50px", height: "2px", backgroundColor: "lightgrey" }} />
                          <div className="my-1" style={{ width: "50px", height: "2px", backgroundColor: "lightgrey" }} />
                        </div>
                      </Radio>
                    </List.Item>
                    <List.Item className="radio-list-item">
                      <Radio value={"one-by-one-1-col"} className="full-width-radio">
                        <div>
                          <div className="my-1" style={{ width: "50px", height: "2px", backgroundColor: "lightgrey" }} />
                          <div className="my-1" style={{ width: "50px", height: "2px", backgroundColor: "lightgrey" }} />
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="my-1" style={{ width: "20px", height: "2px", backgroundColor: "lightgrey" }} />
                            <div className="my-1" style={{ width: "20px", height: "2px", backgroundColor: "lightgrey" }} />
                          </div>
                        </div>
                      </Radio>
                    </List.Item>
                    <List.Item className="radio-list-item">
                      <Radio value={"one-by-one-2-col"} className="full-width-radio">
                        <div className="d-flex justify-content-between gap-2 align-items-center">
                          <div className="d-flex justify-content-center" style={{ width: "45px", height: "40px", border: "1px solid lightgrey" }}></div>
                          <div style={{ width: "45px", height: "40px", border: "1px solid lightgrey" }} />
                        </div>
                      </Radio>
                    </List.Item>
                  </div>
                </Radio.Group>
              }
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
