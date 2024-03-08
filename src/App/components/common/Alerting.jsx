import { Alert } from "antd"
import toast from "react-hot-toast"


const COLORS = {
  success: '#059669',
  danger: "#dc2626",
  info: "#0891b2"
}

const Alerting = ({ msg, type = "success", position = 'center' }) => {
  return toast.custom((t) =>
    <Alert
      type={type === 'danger' ? 'error' : type}
      showIcon
      closable
      style={{
        fontWeight: 'bold',
        minWidth: '250px',
        textAlign: "center"
      }}
      className="p-2 rounded-3"
      message={msg}
    >
      {msg}
    </Alert>,
    {
      position: `bottom-${position}`,
    })
}

export default Alerting