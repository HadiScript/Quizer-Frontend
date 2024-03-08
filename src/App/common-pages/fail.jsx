import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Fail = () => {
  const router = useNavigate()

  useEffect(() => {
    router('/subscribe/profile')
  }, [])

  return (
    <div style={{ minHeight: "100vh" }} className="d-flex justify-content-center align-items-center p-2 attempt">
      <div className="my-shadow"></div>
      <div className="d-flex flex-column align-items-center gap-4 card-shadow successfullpayment">
        <span className="main">Payment Failed!</span>
      </div>
    </div>
  )
}

export default Fail