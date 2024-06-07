import { CheckOutlined, LoadingOutlined } from "@ant-design/icons"

const SrvyStatsNumbers = (
  {
    data,
    isLoading,
  }
) => {

  const {
    requiredFields,
    totalFields,
    radioFields,
    checkboxFields,
    dropdownFields,
    rateFields,
    dateFields,
    rangeFields,

  } = data;


  return (
    <div className="stats-box">
      {isLoading && <LoadingOutlined />}

      <div className="box d-flex justify-content-start align-items-start gap-3 _heading">
        <CheckOutlined className="its-icon" />
        <div>
          <span>Total Fields Fields</span>
          <h4>{totalFields}</h4>
        </div>
      </div>

      <div className="box d-flex justify-content-start align-items-start gap-3 _heading">
        <CheckOutlined className="its-icon" />
        <div>
          <span>Required Fields</span>
          <h4>{requiredFields}</h4>
        </div>
      </div>

      <div className="box d-flex justify-content-start align-items-start gap-3 _heading">
        <CheckOutlined className="its-icon" />
        <div>
          <span>Radio Fields</span>
          <h4>{radioFields}</h4>
        </div>
      </div>


      <div className="box d-flex justify-content-start align-items-start gap-3 _heading">
        <CheckOutlined className="its-icon" />
        <div>
          <span>Checkbox Fields</span>
          <h4>{checkboxFields}</h4>
        </div>
      </div>


      <div className="box d-flex justify-content-start align-items-start gap-3 _heading">
        <CheckOutlined className="its-icon" />
        <div>
          <span>Dropdown Fields</span>
          <h4>{dropdownFields}</h4>
        </div>
      </div>


      <div className="box d-flex justify-content-start align-items-start gap-3 _heading">
        <CheckOutlined className="its-icon" />
        <div>
          <span>Rating Fields</span>
          <h4>{rateFields}</h4>
        </div>
      </div>


      <div className="box d-flex justify-content-start align-items-start gap-3 _heading">
        <CheckOutlined className="its-icon" />
        <div>
          <span>Date Fields</span>
          <h4>{dateFields}</h4>
        </div>
      </div>

      <div className="box d-flex justify-content-start align-items-start gap-3 _heading">
        <CheckOutlined className="its-icon" />
        <div>
          <span>Range Fields</span>
          <h4>{rangeFields}</h4>
        </div>
      </div>
    </div>
  )
}

export default SrvyStatsNumbers