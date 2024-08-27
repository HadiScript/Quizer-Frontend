import { Button, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../context/authContext";
import { _surveyQuiz, useDeleteSurvey } from "../../../../actions/_survey";

const AllSurveysTable = ({ data, loading }) => {
  const [auth] = useAuth()
  const { doIt, reset, loading: exportLoading } = _surveyQuiz();
  const { deleteSurvey, loading: deleteLoading } = useDeleteSurvey();


  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => <span >{record.description.slice(0, 30) + "..."}</span>,
      responsive: ['sm']
    },
    {
      title: 'Fields',
      dataIndex: 'fields',
      key: 'fields',
      sorter: (a, b) => a.title.localeCompare(b.fields),
      render: (text, record) => <span >{record.fields.length}</span>,
      responsive: ['sm']
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, record) => <span >{record.createdAt.slice(0, 10)}</span>,
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      responsive: ['sm']
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div className="d-flex gap-4">
          <Link className="text-decoration-none" to={`/subscribe/surveys/${record.slug}/detail`}>Dashboard</Link>
          <span role="button" onClick={() => deleteSurvey(record?._id)} className="text-danger">{!deleteLoading ? "Delete" : "wait..."} </span>
        </div>
      ),
    },
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

            {
              !record.export && <Button loading={exportLoading} onClick={() => doIt(record._id)}>
                Export
              </Button>
            }

            {
              record.export && <Button loading={exportLoading} onClick={() => reset(record._id)}>
                Unexport
              </Button>
            }
          </Tooltip>
        </div>
      ),
      responsive: ['sm']
    });
  }


  return <Table columns={columns} dataSource={data} loading={loading} rowKey="_id" pagination={false} />
}

export default AllSurveysTable