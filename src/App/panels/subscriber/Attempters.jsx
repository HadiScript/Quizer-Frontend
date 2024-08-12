import React from "react";
import { useParams } from "react-router-dom";
import SubcriberLayout from "../../components/layouts/Layout";
import { useAttemptUsers, useAttemptUsersTest } from "../../../actions/_attempt-users";
import { Button, DatePicker, Input, InputNumber, Pagination, } from "antd";
import AttemptUserTable from "../../components/panel/AttemptUserTable";
import Heading from "../../components/common/Heading";
import { DownloadOutlined, SearchOutlined, UndoOutlined, UserOutlined } from "@ant-design/icons";
import { exportDataToExcel } from "../../../helper/ExportData";


const { RangePicker } = DatePicker;

const Attempters = () => {
  const { id } = useParams();
  const { data, handleSearch, setSearchEmail, handleTableChange, loading, pagination, setDates, setMinScore, setMaxScore, reset } = useAttemptUsers(id);


  const handleExport = () => {
    if (data?.data) {
      exportDataToExcel(data.data, `quiz_attempts_${id}.xlsx`);
    } else {
      alert('No data available to export.');
    }
  };



  return (
    <SubcriberLayout from="quiz-detail">
      <Heading title={"Quiz users"} desc={"View detailed quiz report and responses of each individual user."} Icon={<UserOutlined className="its-icon" />} />

      <div className="mt-4 mb-1 ">
        <Input
          placeholder="Search by email"
          enterButton="Search"
          onChange={(e) => setSearchEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 20 }}
        />

        <RangePicker
          onChange={(dates) => setDates(dates ? [dates[0].toISOString(), dates[1].toISOString()] : [])}
          style={{ marginRight: 8 }}
        />
        <InputNumber
          placeholder="Min Score"
          // value={minScore}
          onChange={(value) => setMinScore(value)}
          style={{ width: 120, marginRight: 8 }}
        />
        <InputNumber
          placeholder="Max Score"
          // value={setMaxScore}
          onChange={(value) => setMaxScore(value)}
          style={{ width: 120, marginRight: 8 }}
        />
        <Button icon={<SearchOutlined />} type="" className="myBtn" onClick={handleSearch} style={{ marginBottom: 16 }}>
          Search
        </Button>
        <Button icon={<UndoOutlined />} className="myBtn mx-2" onClick={reset} style={{ marginBottom: 16 }}>
          Reset
        </Button>

        <Button icon={<DownloadOutlined />} className="myBtn mx-2" onClick={handleExport} style={{ marginBottom: 16 }}>
          Export Data
        </Button>
      </div>



      <AttemptUserTable loading={loading} handleSearch={handleSearch} setSearchEmail={setSearchEmail} from="page" data={data?.data} />

      <div className="my-2 px-1">
        <Pagination total={data?.pagination.total} current={data?.pagination?.page} onChange={handleTableChange}
          showTotal={() => `Total ${data?.pagination.total} items`}
        />
      </div>
    </SubcriberLayout >
  );
};

export default Attempters;
