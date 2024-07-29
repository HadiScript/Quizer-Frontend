import { CheckCircleOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { Button, } from "antd"
import Heading from "../../common/Heading";
import { _useCommon } from "../../../../actions/_common";
import { useAuth } from "../../../../context/authContext";


const BasicInfo = () => {

  const [auth] = useAuth()
  const { updateToPremium, loading } = _useCommon();

  return (
    <div className="mt-3">
      <div className="p-3">
        <Heading title={"Update to Business Account"} Icon={<CheckCircleOutlined className="its-icon" />} desc={"Choose the plan that best suits your needs. Our Free plan offers essential tools, while our Business plan provides advanced features and support."} />
        {
          auth?.user?.type !== 'premium' ? <>
            <div className="d-flex justify-content-between align-items-center border rounded-3 p-3 mb-3">
              <h5>$10/month</h5>
              <Button className="myBtn my-3" onClick={() => updateToPremium('monthly')} icon={<CloudUploadOutlined />}>Update to Business</Button>
            </div>
            <div className="d-flex justify-content-between align-items-center border rounded-3 p-3">
              <h5>$105/year</h5>
              <Button className="myBtn my-3" onClick={() => updateToPremium('year')} icon={<CloudUploadOutlined />}>Update to Business</Button>
            </div>
          </>
            :
            <div className="d-flex justify-content-between align-items-center border rounded-3 p-3">
              <h5>Business Account Activated</h5>
            </div>
        }

      </div>
    </div>
  )
}

export default BasicInfo