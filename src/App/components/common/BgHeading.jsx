import { Alert } from "antd";

const BgHeading = ({ title, desc, AlertDesc }) => {
  return (
    <>
      <div className={`linearBg rounded-3 px-3 pt-3 pb-1 text-white d-flex flex-column justify-content-center align-items-start pe-none`} >

        <h6 className="text-white text-capitalize">{title}</h6>
        <p>{desc ? desc : ""} </p>
        {/* {AlertDesc && <Alert
          description={AlertDesc}
          type="info"
          showIcon
          closable
        />} */}
      </div>
    </>
  );
};

export default BgHeading