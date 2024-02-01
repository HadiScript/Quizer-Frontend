import React from "react";
import { useParams } from "react-router-dom";
import SubcriberLayout from "../../components/layouts/Layout";
import { useAttemptUsers } from "../../../actions/_attempt-users";
import { Input, Pagination, Table } from "antd";
import AttemptUserTable from "../../components/panel/AttemptUserTable";

const Attempters = () => {
  const { id } = useParams();
  const { data, handleSearch, setSearchEmail, handleTableChange, loading, pagination } = useAttemptUsers(id);

  const columns = [
    { title: "Student Email", dataIndex: ["studentDetails", "Email"], key: "email" },
    { title: "score", dataIndex: ["score"], key: "score" },
    { title: "Pass", dataIndex: ["score"], key: "score" },
    { title: "Attempted At", dataIndex: ["createdAt"], key: "createdAt" },
  ];

  return (
    <SubcriberLayout from="quiz-detail">
      <AttemptUserTable loading={loading} handleSearch={handleSearch} setSearchEmail={setSearchEmail} from="page" data={data} />

      <div className="my-3">
        <Pagination total={pagination.total} current={pagination.current} pageSize={pagination.pageSize} onChange={handleTableChange}/>
      </div>
    </SubcriberLayout>
  );
};

export default Attempters;
