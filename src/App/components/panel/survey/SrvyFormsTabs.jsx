
import { CopyOutlined } from "@ant-design/icons";
import { Button } from "antd";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../context/authContext";
import { FaWandMagicSparkles } from "react-icons/fa6";

const SrvyFormsTabs = () => {
  const { slug } = useParams();
  const [auth] = useAuth()

  const { pathname } = useLocation()
  const router = useNavigate();

  // const link = `https://quizer-frontend.vercel.app/attempt-survey/${slug}/${auth?.user?.userId}`
  const link = `https://sawal.co/attempt-survey/${slug}/${auth?.user?.userId}`


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
      {/* onClick={() => setwhich('edit')} style={which === "edit" ? { backgroundColor: "#083344", color: "white" } : {}} */}
      <div className="d-flex flex-wrap justify-content-between algin-items-center ">
        <div className="d-flex align-items-center gap-4 lightgrey-bg py-1 px-3 rounded-3 mt-4">
          <div
            role="button"
            className="py-2 px-4 rounded-3"
            onClick={() => router(`/subscribe/surveys/${slug}/detail`)}
            style={!pathname.includes("fields") ? { backgroundColor: "#083344", color: "white" } : {}}
          >
            Edit Detail
          </div>


          <div
            role="button"
            className="py-2 px-4 rounded-3"
            onClick={() => router(`/subscribe/surveys/${slug}/fields`)}
            style={pathname.includes("fields") ? { backgroundColor: "#083344", color: "white" } : {}}
          >
            Edit Fields
          </div>
        </div>


        {/* {JSON.stringify(auth)} */}
        <div className="d-flex gap-2">
          {!auth?.user?.userId ? "..." : <Button className="dottedBtn mt-4" onClick={() => copyToClipboard(link)} icon={<CopyOutlined />}> Copy Link </Button>}
          <Button className="dottedBtn myBtn _link mt-4" icon={<FaWandMagicSparkles />} onClick={() => router(`/template-preview/${slug}/${auth?.user?.userId}?from=dashboard`)}> Customize </Button>
        </div>
      </div>


    </>
  )
}

export default SrvyFormsTabs