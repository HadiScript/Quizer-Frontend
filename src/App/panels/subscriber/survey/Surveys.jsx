import { Input, Pagination } from 'antd'
import { useGetSurveys } from '../../../../actions/_survey'
import BgHeading from '../../../components/common/BgHeading'
import CreateQuizCTA from '../../../components/common/CreateQuizCTA'
import SubcriberLayout from '../../../components/layouts/Layout'
import AllSurveysTable from '../../../components/panel/survey/AllSurveysTable'

const Surveys = () => {
  const { data, setSearch, handleSearch, handleTableChange, loading: isLoading, pagination } = useGetSurveys()
  return (
    <SubcriberLayout>
      <BgHeading title={"Surveys"} desc={"List of all the surveys you have created. Manage, edit and analyze results of your surveys through their separate dashboards."} />
      <div className="mt-4 mb-2">
        <Input.Search
          placeholder="Search by Title"
          enterButton="Search"
          onSearch={handleSearch}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", marginBottom: 20 }}
        />
      </div>

      <AllSurveysTable data={data?.surveys} loading={isLoading} />


      <div className="mt-5">
        <Pagination total={data?.pagination.total} current={data?.pagination?.page} onChange={handleTableChange}
          showSizeChanger
          showQuickJumper
          showTotal={() => `Total ${data?.pagination.total} items`}
        />
      </div>


    </SubcriberLayout>
  )
}

export default Surveys