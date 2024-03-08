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
      <div className="lightgrey-bg rounded-3 p-2">
        <Heading title={"Update to Premuim Account"} Icon={<CheckCircleOutlined className="its-icon" />} desc={"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available."} />
        {
          auth?.user?.type !== 'premium' ? <>
            <div className="d-flex justify-content-between align-items-center border rounded-3 p-3 mb-3">
              <h5>$10/month</h5>
              <Button className="myBtn my-3" onClick={() => updateToPremium('monthly')} icon={<CloudUploadOutlined />}>Update to Premium</Button>
            </div>
            <div className="d-flex justify-content-between align-items-center border rounded-3 p-3">
              <h5>$105/year</h5>
              <Button className="myBtn my-3" onClick={() => updateToPremium('year')} icon={<CloudUploadOutlined />}>Update to Premium</Button>
            </div>
          </>
            :
            <div className="d-flex justify-content-between align-items-center border rounded-3 p-3">
              <h5>Preimum Subscription Activated</h5>
            </div>
        }

      </div>
    </div>
  )
}

export default BasicInfo