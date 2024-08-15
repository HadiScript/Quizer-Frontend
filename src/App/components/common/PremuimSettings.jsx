import { Button, DatePicker, List, Modal, Radio, Select } from 'antd'
import UpdateToPremium from './UpdateToPremium';
import { useAuth } from '../../../context/authContext';

import { useState } from 'react';
import Templates from '../../panels/subscriber/Templates';
import { _useQuizSettings } from '../../../actions/_settings';
import { useParams } from 'react-router-dom';
const { RangePicker } = DatePicker;

const PremuimSettings = (
  { _settings, _setSettings, from, handleRangeChange, disabledDate, dateRange, setDateRange, }
) => {
  const [auth] = useAuth();
  const [showModel, setShowModel] = useState(false)

  return (
    <>
      <div className='premium_settings_container'>
        <div className="mb-3 d-flex flex-column">
          <label htmlFor="title" className="form-label">
            <b>Show Score</b>
          </label>
          <Select value={_settings.showScore} onChange={(e) => _setSettings((prev) => ({ ...prev, showScore: e }))}>
            <Select.Option value={true}>Yes</Select.Option>
            <Select.Option value={false}>No</Select.Option>
          </Select>
          <small>Score will show in the end of quiz</small>
        </div>



        <div className="mb-3 d-flex flex-column">
          <label htmlFor="title" className="form-label">
            <b>Scoring Type</b>
          </label>
          <Select value={_settings?.scoringType} onChange={(e) => _setSettings((prev) => ({ ...prev, scoringType: e }))}>
            {/* <Select.Option value="grade">Grade</Select.Option> */}
            <Select.Option value="percentage">Percentage</Select.Option>
            <Select.Option value="number">Numbers</Select.Option>
          </Select>
        </div>

        {/* {from === 'quizDetail' &&
          <div className="mb-3 d-flex flex-column">
            <label htmlFor="title" className="form-label">
              Show Certificate
            </label>
            <Select value={_settings.showCertificate} onChange={(e) => _setSettings((prev) => ({ ...prev, showCertificate: e }))}>
              <Select.Option value={true}>Yes</Select.Option>
              <Select.Option value={false}>No</Select.Option>
            </Select>

            {_settings.showCertificate && <Button onClick={() => setShowModel(true)} className='mt-2'>Preview Template</Button>}
          </div>
        } */}

        {from === "quizDetail" && (
          <>
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="title" className="form-label">
                <b>Quiz Availability</b>
              </label>

              <RangePicker disabledDate={disabledDate} format="YYYY-MM-DD HH:mm" showTime value={dateRange} onChange={handleRangeChange} />
              <small>If you do not select the dates, then it consider as always available</small>

            </div>

            <div className="mb-3 d-flex flex-column">
              <label htmlFor="title" className="form-label">
                <b>Display Setting</b>
              </label>

              {
                <Radio.Group className="radio-list-group" value={_settings?.displaySetting} onChange={(e) => _setSettings((prev) => ({ ...prev, displaySetting: e.target.value }))} >
                  <div className="d-flex justify-content-start flex-wrap gap-4">
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



        {auth?.user?.type === 'free' && <UpdateToPremium />}

        <Templates open={showModel} setOpen={setShowModel} _settings={_settings} _setSettings={_setSettings} />

      </div >
    </>
  )
}

export default PremuimSettings