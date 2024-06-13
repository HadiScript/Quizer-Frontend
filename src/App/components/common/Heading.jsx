import React from "react";

const Heading = ({ title, Icon, from = "pages", desc }) => {
  return (
    <>
      <div className={`d-flex mt-2 ${from === "modal" ? "mb-3" : "mb-3"} _heading gap-3`}>
        {Icon}
        <div>
          <div>
            <b>{title}</b>
          </div>
          <span>
            <i>{desc ? desc : 'Tailwind includes an expertly-crafted'} </i>
          </span>
        </div>
      </div>
    </>
  );
};

export default Heading;
