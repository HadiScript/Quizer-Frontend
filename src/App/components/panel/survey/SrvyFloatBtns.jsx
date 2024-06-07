import { FaCheckDouble } from "react-icons/fa6";
import { FloatButton } from "antd";
import { VscPreview } from "react-icons/vsc";
import { CopyOutlined, LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../context/authContext";
import toast from "react-hot-toast";


const SrvyFloatBtns = ({
  setOpenPreview,
  updateLoading,
  updateSurveyFields,
}) => {

  const { slug } = useParams();
  const [auth] = useAuth()

  const link = `https://quizer-frontend.vercel.app/attempt-survey/${slug}/${auth?.user?.userId}`


  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <>
      <FloatButton.Group shape="circle" style={{ right: 24 }}>
        <FloatButton onClick={() => copyToClipboard(link)} tooltip={<div>Copy Link</div>} icon={<CopyOutlined />} />
        <FloatButton onClick={() => setOpenPreview(true)} tooltip={<div>Preview</div>} icon={<VscPreview />} />
        <FloatButton onClick={updateSurveyFields} tooltip={<div>Save</div>} icon={updateLoading ? <LoadingOutlined /> : <FaCheckDouble />} />
        <FloatButton.BackTop tooltip={<div>Top</div>} style={{ color: "white" }} visibilityHeight={0} />
      </FloatButton.Group>
    </>
  )
}

export default SrvyFloatBtns