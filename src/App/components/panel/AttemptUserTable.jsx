import { DeleteOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import { Empty, Input, Tag, } from "antd";

import { useState } from "react";
import AttempterDrawser from "./AttempterDrawser";
import { useParams } from "react-router-dom";
import { TableLoading } from "../loadings";

import { TimeCal } from "../../../hooks/TimeCal";
import { useDeleteQuizAttempt } from "../../../actions/_attempt-users";




const AttemptUserTable = ({ from = "page", data, handleSearch, setSearchEmail, loading = false, quizId }) => {
  const { id } = useParams();
  const [current, setCurrent] = useState({});
  const [open, setOpen] = useState(false);
  const { loading: deleteLoading, deleteAttemtp } = useDeleteQuizAttempt()


  return (
    <>
      <div className={` ""}`}>
        <div className="d-flex flex-wrap justify-content-between align-items-start">
          {
            from !== "page" && <h6 className="px-3"> <b>Highest Score</b> </h6>
          }
        </div>
        {/* <Heading title={"Quiz users"} desc={"View detailed quiz report and responses of each individual user."} Icon={<UserOutlined className="its-icon" />} /> */}


        {loading ? <TableLoading /> : <div className="table-responsive mt-2 mb-4">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">{loading ? "..." : "#"}</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                {from === "page" && <th scope="col">Attempt At</th>}
                {from === "page" && <th scope="col">Score (%) </th>}
                {from === "page" && <th scope="col">Time Taken</th>}
                {from === "page" ? <th scope="col">Status</th> : <th scope="col">Score</th>}
                <th scope="col"></th>
                {from === "page" && <th scope="col"></th>}
              </tr>
            </thead>

            <tbody>
              {data?.map((x, index) => (
                <tr key={index}>
                  <th scope="row">{++index}</th>
                  <td>{x?.studentDetails?.Name}</td>
                  <td>{x?.studentDetails?.Phone}</td>
                  <td>{x?.studentDetails?.Email}</td>
                  {from === "page" && <td>{x?.createdAt.slice(0, 10)}</td>}
                  {from === "page" && <td className="">{x.score === 100 ? x?.score : x?.score.toPrecision(2)}</td>}
                  {from === "page" && <td className="">{TimeCal(x.startTime, x.endTime)}</td>}
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
                    <DeleteOutlined onClick={() => deleteAttemtp(quizId, x?._id)} />
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
