import { Alert } from "antd";

const BgHeading = ({ title, desc, AlertDesc, bgColor, textColor }) => {
  return (
    <>
      <div className={`${!bgColor && 'linearBg'} rounded-3 px-3 pt-3 pb-1 text-white d-flex flex-column justify-content-center align-items-start pe-none`} style={{ backgroundColor: bgColor }} >

        <h6 style={{ color: textColor ? textColor : "white" }} className="text-capitalize">{title}</h6>
        <p style={{ color: textColor ? textColor : "white" }}>{desc ? desc : ""} </p>

        {/* {AlertDesc && <Alert
          description={AlertDesc}
          type="info"
          showIcon
          closable
        />} */}
      </div >
    </>
  );
};

export default BgHeading