import { Alert } from "antd";

const BgHeading = ({ title, desc, AlertDesc }) => {
  return (
    <>
      <div className={`linearBg rounded-3 p-3 text-white d-flex flex-column  `}>
        <h4>{title}</h4>
        <p>{desc ? desc : "In publishing and graphic design, Lorem ipsum is a placeholder text"} </p>
        {AlertDesc && <Alert
          description={AlertDesc}
          type="info"
          showIcon
          closable
        />}
      </div>
    </>
  );
};

export default BgHeading