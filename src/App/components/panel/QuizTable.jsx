import { LoadingOutlined } from "@ant-design/icons"
import { Button, Input, Pagination, Table, Tag, Tooltip } from "antd"
import { Link } from "react-router-dom"
import { useAuth } from "../../../context/authContext"
import { _exportQuiz } from "../../../actions/_quiz"



const QuizTable = ({ list, loading, setSearch, handleSearch, handleTableChange, pagination, data }) => {

  const [auth] = useAuth();
  const { doIt, loading: exportLoading, reset } = _exportQuiz();

  const columns = [
    {
      title: loading ? <LoadingOutlined /> : "#",
      key: 'index',
      render: (text, record, index) => index + 1,
      responsive: ['md']
    },
    {
      title: 'Quiz',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => <Link className="_link text-capitalize" to={`/subscribe/quizzes/${record._id}`}>{record.title}</Link>
    },
    {
      title: 'Questions',
      dataIndex: 'questions',
      key: 'questions',
      sorter: (a, b) => a.questions.length - b.questions.length,
      render: (questions, record) => record.questions?.length
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      responsive: ['md'],
      render: (createdAt, record) => record.createdAt?.slice(0, 10)
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record) => (

        // subscribe/quizzes/66865059750cd17f01a12e35/attempters
        <div className="d-flex gap-4">
          <Tooltip placement="topRight" title={"Detail Dashboard"}>
            <Link className="_link" to={`/subscribe/quizzes/${record._id}`}>
              {/* <ExpandAltOutlined role="button" /> */}
              Detail
            </Link>
          </Tooltip>
          <Tooltip placement="topLeft" title={"Attempt Users"}>
            <Link className="_link" to={`/subscribe/quizzes/${record._id}/attempters`}>
              Attempts
            </Link>
          </Tooltip>
        </div>
      ),
      responsive: ['sm']
    }
  ];


  if (auth?.user?.role === 'super-user') {
    columns.push({
      title: 'Export',
      key: 'export',
      render: (text, record) => (
        <div className="d-flex align-items-center gap-2">
          <Tooltip placement="top" title={record.export ? "Exported" : "Export"}>
            <Tag color="blue">{record.export ? "Yes" : "X"}</Tag>

          </Tooltip>
          <Tooltip placement="top" title="Toggle Export">

            {!record.export && <Button loading={exportLoading} onClick={() => doIt(record._id)}>
              Export
            </Button>}

            {record.export && <Button loading={exportLoading} onClick={() => reset(record._id)}>
              Unexport
            </Button>}
          </Tooltip>
        </div>
      ),
      responsive: ['sm']
    });
  }


  console.log(list, "all quiz tabl");

  return (
    <>
      <div id="searchQuiz" className="mt-3 mb-1">
        <Input.Search
          id="searchinput"
          placeholder="Search"
          // enterButton="Search"
          enterButton
          onSearch={handleSearch}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", marginBottom: 20, }}
        />
      </div>



      <Table
        columns={columns}
        dataSource={list}
        rowKey={record => record._id}
        pagination={false}
        loading={loading}
      />

      <div className="text-end mt-3">
        <Pagination total={data?.pagination?.total} current={data?.pagination?.page} onChange={handleTableChange}
          showSizeChanger
          showQuickJumper
          showTotal={() => `Total ${data?.pagination?.total} items`}
        />
      </div>

    </>
  )
}

export default QuizTable