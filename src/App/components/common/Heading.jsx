import React from "react";

const Heading = ({ title, Icon, from = "pages", desc }) => {
  return (
    <>
      <div className={`d-flex ${!desc && "align-items-center" } mt-2 ${from === "modal" ? "mb-3" : "mb-3"} _heading gap-2`}>
        {Icon}
        <div >
          <div>
            <b>{title}</b>
          </div>
          {desc &&
            <span>
              <i>{desc ? desc : ''} </i>
            </span>}
        </div>
      </div>
    </>
  );
};

export default Heading;
