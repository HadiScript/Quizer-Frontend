import { Button, Input, Modal } from "antd";
import React from "react";
import Heading from "../../components/common/Heading";
import { CopyOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const CopyLinkModal = ({ open, setOpen, quizId, creatorId }) => {
  const link = `http://localhost:5173/attempt-quiz/${creatorId}/${quizId}`;
  // const link = `https://quizer-frontend.vercel.app//attempt-quiz/${creatorId}/${quizId}`;

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
    <Modal title={<Heading from="modal" title={"Copy Link"} />} footer={null} centered open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} width={500}>
      <Input readOnly value={link} />

      <div className="text-end my-2">
        <Button onClick={() => copyToClipboard(link)} type="dashed" icon={<CopyOutlined />}>
          Copy
        </Button>
      </div>
    </Modal>
  );
};

export default CopyLinkModal;
