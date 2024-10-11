import { useParams } from "react-router-dom";
import { useBasicInfoServey, useResponses } from "../../../../actions/_survey";
import BgHeading from "../../../components/common/BgHeading";
import SrvyLayout from "../../../components/layouts/survey-detail-dashboard/SrvyLayout";
import { Button, Input, Pagination, Table } from "antd";
import moment from "moment";
import { useState } from "react";
import { DownloadOutlined, EyeOutlined, FolderOutlined } from "@ant-design/icons";
import ResponsesDrawer from "../../../components/panel/survey/ResponsesDrawer";
import { exportDataToExcel } from "../../../../helper/ExportData";
import toast from "react-hot-toast";
import axios from "axios";
import { surveyApi } from "../../../../helper/API";

const Responses = () => {
  const { slug } = useParams();
  const { data, handleTableChange, loading, handleSearch, setSearch } = useResponses(slug);
  const { data: basicData, isLoading: fetechingData } = useBasicInfoServey(slug);
  const [current, setCurrent] = useState("");
  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Responded At",
      dataIndex: "respondedAt",
      key: "respondedAt",
      render: (text) => moment(text).format("MMM Do YY"),
    },
    {
      title: "View",
      dataIndex: "_id",
      render: (text) => (
        <div
          role="button"
          onClick={() => {
            setOpen(true);
            setCurrent(text);
          }}
        >
          <EyeOutlined />
        </div>
      ),
    },
  ];

  const exportingData = async () => {
    try {
      const gettingData = await axios.get(`${surveyApi}/export/${basicData._id}`);
      exportDataToExcel(gettingData.data, `${basicData?.title}_responses.xlsx`);
    } catch (error) {
      toast.error("Please try again");
      console.log(error);
    }
  };

  const handleExport = () => {
    if (data && data.data) {
      exportingData();
    } else {
      alert("No data available to export.");
    }
  };

  return (
    <SrvyLayout>
      <BgHeading title={"Responses of" + " " + basicData?.title} desc={"View responses of each individual participant."} />

      <div className="d-flex flex-column gap-4 mt-4 mb-4">
        <Input.Search
          placeholder="Search by email"
          enterButton="Search"
          onSearch={handleSearch}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", marginBottom: 20 }}
        />

        <div className="d-flex justify-content-end">
          <Button icon={<DownloadOutlined />} className="myBtn mx-2" onClick={handleExport} style={{ marginBottom: 16 }}>
            Export Data
          </Button>
        </div>

        <Table loading={loading} columns={columns} dataSource={data?.data} pagination={false} />
        <div className="text-end">
          <Pagination
            total={data?.total}
            current={data?.page}
            onChange={handleTableChange}
            showSizeChanger
            showQuickJumper
            showTotal={() => `Total ${data?.total} items`}
          />
        </div>
      </div>
      <ResponsesDrawer current={current} open={open} setOpen={setOpen} />
    </SrvyLayout>
  );
};

export default Responses;
