import React from "react";
import { useParams } from "react-router-dom";
import SubcriberLayout from "../../components/layouts/Layout";
import { useAttemptUsers, useAttemptUsersTest } from "../../../actions/_attempt-users";
import { Pagination, } from "antd";
import AttemptUserTable from "../../components/panel/AttemptUserTable";

const Attempters = () => {
  const { id } = useParams();
  const { data, handleSearch, setSearchEmail, handleTableChange, loading, pagination } = useAttemptUsers(id);

  return (
    <SubcriberLayout from="quiz-detail">
      <AttemptUserTable loading={loading} handleSearch={handleSearch} setSearchEmail={setSearchEmail} from="page" data={data?.data} />

      <div className="my-3">
        {/* {JSON.stringify(data)} */}

        <Pagination total={data?.pagination.total} current={data?.pagination?.page} onChange={handleTableChange}

          // showSizeChanger
          // showQuickJumper
          showTotal={() => `Total ${data?.pagination.total} items`}
        />
      </div>
    </SubcriberLayout>
  );
};

export default Attempters;
