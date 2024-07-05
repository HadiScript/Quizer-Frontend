import { DeleteOutlined, ExpandOutlined, ExportOutlined, EyeOutlined, FolderOpenOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Input, Tag, Tooltip } from "antd";

import { useState } from "react";
import AttempterDrawser from "./AttempterDrawser";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../common/Heading";
import { TableLoading } from "../loadings";

const AttemptUserTable = ({ from = "page", data, handleSearch, setSearchEmail, loading = false }) => {
  const { id } = useParams();
  const [current, setCurrent] = useState({});
  const [open, setOpen] = useState(false);

  const router = useNavigate();

  return (
    <>
      <div className={` ""}`}>
        <div className="d-flex flex-wrap justify-content-between align-items-start">
          {from !== "page" ? <h6 className="px-3"> <b>Highest Score</b> </h6> : <Heading title={"Quiz users"} desc={"Here is the list of all the users who have attempted the quiz."} Icon={<UserOutlined className="its-icon" />} />}
          {/* {from !== "page" && (
            <div className="d-flex justify-content-between gap-3 align-items-center">

              <Button onClick={() => router(`/subscribe/quize/${id}/attempters`)} icon={<ExpandOutlined />} type="dashed">
                Expend
              </Button>
              <Tooltip placement="top" title="Currently not available!">
                <Button icon={<ExportOutlined />} className="myBtn">
                  Export Data
                </Button>
              </Tooltip>
            </div>
          )} */}
        </div>

        {from === "page" && (
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

        {loading ? <TableLoading /> : <div className="table-responsive mt-4 mb-4">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">{loading ? "..." : "#"}</th>
                <th scope="col">Email</th>
                {from === "page" && <th scope="col">Attempt At</th>}
                {from === "page" ? <th scope="col">Status</th> : <th scope="col">Score</th>}
                <th scope="col"></th>
                {from === "page" && <th scope="col"></th>}
              </tr>
            </thead>

            <tbody>
              {data?.map((x, index) => (
                <tr key={index}>
                  <th scope="row">{++index}</th>
                  <td>{x?.studentDetails?.Email}</td>
                  {from === "page" && <td>{x?.createdAt.slice(0, 10)}</td>}
                  {from === "page" ? <td> {x?.isPass ? <Tag color="blue">Pass</Tag> : <Tag color="red">Fail</Tag>} </td> :

                    <td> {x?.score?.toFixed(2)} </td>
                  }
                  <td
                    role="button"
                    onClick={() => {
                      setCurrent(x);
                      setOpen(true);
                    }}
                  >
                    <EyeOutlined />
                  </td>
                  {from === "page" && <td role="button">
                    <DeleteOutlined />
                  </td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        }
        {data?.length === 0 && <Empty />}

      </div >

      <AttempterDrawser open={open} setOpen={setOpen} current={current} />
    </>
  );
};

export default AttemptUserTable;
