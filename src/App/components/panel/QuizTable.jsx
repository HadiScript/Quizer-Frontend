import { ExpandAltOutlined, LoadingOutlined } from "@ant-design/icons"
import { Grid } from "antd"
import { Link } from "react-router-dom"

const QuizTable = ({ list, loading }) => {
  const points = Grid.useBreakpoint();


  return (
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">{loading ? <LoadingOutlined /> : "#"}</th>
            <th scope="col">Quiz</th>
            <th scope="col">Questions#</th>
            {!points.xs && <th scope="col">CreatedAt</th>}
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            list?.map((x, index) => <tr key={x._id}>
              <th scope="row">{++index}</th>
              <td><Link className="_link" to={`/subscribe/quizzes/${x._id}`}>{x.title}</Link></td>
              <td>{x.questions?.length}</td>
              {!points.xs && <td>{x.createdAt?.slice(0, 10)}</td>}
              <td> <Link className="_link" to={`/subscribe/quizzes/${x._id}`}><ExpandAltOutlined role="button" /></Link> </td>
            </tr>
            )
          }

        </tbody>
      </table>
    </div>
  )
}

export default QuizTable