import { Skeleton, Space } from "antd"
import { Placeholder } from "react-bootstrap"

export const BasicLoading = () => {
  return (
    <Skeleton shape={"square"} active />
  )
}


export const AllQuizLoading = () => {
  return <>
    {
      Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="col-xs-12 col-md-4 mb-5">
          <Skeleton active />
        </div>
      ))
    }
  </>
}


export const TableLoading = () => {
  return <div className="row gap-3">
    {Array.from({ length: 6 }).map((_, index) => (<div key={index} className="col-12">
      <Skeleton.Button block active style={{ width: '100%' }} />
    </div>))}
  </div>
}