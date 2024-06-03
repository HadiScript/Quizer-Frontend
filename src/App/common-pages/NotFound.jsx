import { HomeOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  return <div style={{ minHeight: "100vh" }} className="d-flex justify-content-center align-items-center">
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link to={'/'}>
        <Button className="myBtn" size={'large'} icon={<HomeOutlined />}>Back Home</Button>
      </Link>}
    />
  </div>
};

export default NotFound;
