import { RiseOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

const UpdateToPremium = () => {
  return (
    <div className="overlay">
      <Link to={'/subscribe/profile'}>
        <Button className='preBtn' icon={<RiseOutlined />}>Update to Premuim</Button>
      </Link>
    </div>
  )
}

export default UpdateToPremium