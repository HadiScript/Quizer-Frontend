import { DeleteOutlined, ExpandOutlined, ExportOutlined, FolderOpenOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Input, Tag } from "antd";

import { useState } from "react";
import AttempterDrawser from "./AttempterDrawser";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../common/Heading";

const AttemptUserTable = ({ from = "component", data, handleSearch, setSearchEmail, loading = false }) => {
  const { id } = useParams();
  const [current, setCurrent] = useState({});
  const [open, setOpen] = useState(false);

  const router = useNavigate();

  return (
    <>
      <Card className={`${from === "component" ? "table-box" : ""}`}>
        <div className="d-flex flex-wrap justify-content-between align-items-start pb-2">
          {from === "component" ? <h6>Quiz Attempted User</h6> : <Heading title={"Attempt Users"} Icon={<UserOutlined className="its-icon" />} />}
          {from === "table-box" && (
            <div className="d-flex justify-content-between gap-3 align-items-center">
              <Button onClick={() => router(`/subscribe/quize/${id}/attempters`)} icon={<ExpandOutlined />} type="dashed">
                Expend
              </Button>
              <Button icon={<ExportOutlined />} className="myBtn">
                Export Data
              </Button>
            </div>
          )}
        </div>

        {from !== "component" && (
          <div className=" mt-5 mb-2">
            <Input.Search
              placeholder="Search by email"
              enterButton="Search"
              onSearch={handleSearch}
              onChange={(e) => setSearchEmail(e.target.value)}
              style={{ width: "100%", marginBottom: 20 }}
            />
          </div>
        )}
        <div className="table-responsive mt-4 mb-4">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">{loading ? "..." : "#"}</th>
                <th scope="col">Email</th>
                <th scope="col">Attempt At</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((x, index) => (
                <tr key={index}>
                  <th scope="row">{++index}</th>
                  <td>{x?.studentDetails?.Email}</td>
                  <td>{x.createdAt.slice(0, 10)}</td>
                  <td> {x?.isPass ? <Tag color="blue">Pass</Tag> : <Tag color="red">Fail</Tag>} </td>
                  <td
                    role="button"
                    onClick={() => {
                      setCurrent(x);
                      setOpen(true);
                    }}
                  >
                    <FolderOpenOutlined />
                  </td>
                  <td role="button">
                    <DeleteOutlined />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <AttempterDrawser open={open} setOpen={setOpen} current={current} />
    </>
  );
};

export default AttemptUserTable;
