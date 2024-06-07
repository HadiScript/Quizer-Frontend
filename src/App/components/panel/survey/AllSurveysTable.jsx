import { Table } from "antd";
import { Link } from "react-router-dom";

const AllSurveysTable = ({ data, loading }) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Link className="text-decoration-none" to={`/subscribe/surveys/${record.slug}/detail`}>Dashboard</Link>
      ),
    },
  ];


  return <Table columns={columns} dataSource={data} loading={loading} rowKey="_id" pagination={false} />
}

export default AllSurveysTable