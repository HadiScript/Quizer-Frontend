import { Button, Result } from 'antd'
import { IoCreate } from "react-icons/io5";
import { Link } from 'react-router-dom'

const CreateQuizCTA = ({ from = "createQuiz" }) => {
  return (
    <Result
      icon={<IoCreate color='#083344' size={100} />}
      title={from === "createQuiz" ? "You have'nt create any quiz yet!" : "You have'nt create any Survey yet!"}
      // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Link to={`/subscribe/${from === "createQuiz" ? "create-quiz" : "create-survey"}`} className='text-decoration-none' >
          <Button className='primaryBtn'>
            {from === "createQuiz" ? "Create Your First Quiz" : "Create Your First Survey"}
          </Button>
        </Link>

      ]}
    />
  )
}

export default CreateQuizCTA