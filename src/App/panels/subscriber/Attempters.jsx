import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubcriberLayout from "../../components/layouts/Layout";
import { useAttemptUsers, useAttemptUsersTest } from "../../../actions/_attempt-users";
import { Button, Checkbox, DatePicker, Input, InputNumber, Pagination, Select } from "antd";
import AttemptUserTable from "../../components/panel/AttemptUserTable";
import Heading from "../../components/common/Heading";
import { DownloadOutlined, SearchOutlined, UndoOutlined, UserOutlined } from "@ant-design/icons";
import { exportDataToExcel } from "../../../helper/ExportData";
import { _useQuizModifications } from "../../../actions/_quiz";
import toast from "react-hot-toast";
import axios from "axios";
import { API, attemptApi } from "../../../helper/API";
import { useAuth } from "../../../context/authContext";

const { RangePicker } = DatePicker;

const Attempters = () => {
  const { id } = useParams();
  const [exportLoading, setExportLoading] = useState(false);

  const { data, handleSearch, setSearchEmail, handleTableChange, loading, pagination, setDates, setMinScore, setMaxScore, reset, setPassFilter } =
    useAttemptUsers(id);
  const { quizData, loading: quizDataLoading } = _useQuizModifications(id);

  const exportingdata = async () => {
    try {
      setExportLoading(true);
      const gettingData = await axios.get(`${attemptApi}/export/${id}`);
      console.log(gettingData.data);

      exportDataToExcel(gettingData.data, `${quizData?.title}_Attempts.xlsx`);
    } catch (error) {
      console.log(error);
      toast.error("Please try again.");
    } finally {
      setExportLoading(false);
    }
  };

  const handleExport = () => {
    if (data) {
      exportingdata();
    } else {
      alert("No data available to export.");
    }
  };

  return (
    <SubcriberLayout from="quiz-detail">
      {/* {JSON.stringify(quizData)} */}
      <Heading
        title={quizDataLoading ? "..." : quizData?.title}
        desc={"View detailed quiz report and responses of each individual user."}
        Icon={<UserOutlined className="its-icon" />}
      />

      <div className="mt-4 mb-1 ">
        <Input
          placeholder="Search by email"
          enterButton="Search"
          onChange={(e) => setSearchEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 20 }}
        />

        <RangePicker onChange={(dates) => setDates(dates ? [dates[0].toISOString(), dates[1].toISOString()] : [])} style={{ marginRight: 8 }} />
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

        <Checkbox onChange={(e) => setPassFilter(e.target.checked)}>Show Only Passed</Checkbox>

        <Button icon={<SearchOutlined />} type="" className="myBtn" onClick={handleSearch} style={{ marginBottom: 16 }}>
          Search
        </Button>
        <Button icon={<UndoOutlined />} className="myBtn mx-2" onClick={reset} style={{ marginBottom: 16 }}>
          Reset
        </Button>

        <Button loading={exportLoading} icon={<DownloadOutlined />} className="myBtn mx-2" onClick={handleExport} style={{ marginBottom: 16 }}>
          Export Data
        </Button>
      </div>

      <AttemptUserTable loading={loading} handleSearch={handleSearch} setSearchEmail={setSearchEmail} from="page" data={data?.data} quizId={id} />

      <div className="my-2 px-1">
        <Pagination
          total={data?.pagination.total}
          current={data?.pagination?.page}
          onChange={handleTableChange}
          showTotal={() => `Total ${data?.pagination.total} items`}
          showSizeChanger
          showQuickJumper
        />
      </div>
    </SubcriberLayout>
  );
};

export default Attempters;
