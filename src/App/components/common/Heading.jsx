import React from "react";

const Heading = ({ title, Icon, from = "pages" }) => {
  return (
    <>
      <div className={`d-flex mt-2 ${from ==="modal" ? "mb-3" : "mb-5"} _heading gap-3`}>
        {Icon}
        <div>
          <div>
            <b>{title}</b>
          </div>
          <small>
            <i>Tailwind includes an expertly-crafted </i>
          </small>
        </div>
      </div>
    </>
  );
};

export default Heading;
