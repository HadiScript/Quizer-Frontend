import { ExpandAltOutlined, LoadingOutlined } from "@ant-design/icons"
import { Input, Pagination, Table } from "antd"
import { Link } from "react-router-dom"

const QuizTable = ({ list, loading, setSearch, handleSearch, handleTableChange, pagination, data }) => {



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
      render: (text, record) => <Link className="_link" to={`/subscribe/quizzes/${record._id}`}>{record.title}</Link>
    },
    {
      title: 'Questions#',
      dataIndex: 'questions',
      key: 'questions',
      sorter: (a, b) => a.questions.length - b.questions.length,
      render: (questions, record) => record.questions?.length
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      responsive: ['md'],
      render: (createdAt, record) => record.createdAt?.slice(0, 10)
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <Link className="_link" to={`/subscribe/quizzes/${record._id}`}>
          <ExpandAltOutlined role="button" />
        </Link>
      ),
      responsive: ['sm']
    }
  ];

  return (
    <>
      <div id="searchQuiz" className=" mt-5 mb-2">
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