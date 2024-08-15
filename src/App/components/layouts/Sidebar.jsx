import { Menu, } from "antd";
import { Link } from "react-router-dom";
import useActive from "../../../hooks/useActive";
import { _useCommon } from "../../../actions/_common";
import WhichNavLink from "./WhichNavLink";


const Sidebar = ({ from = "notSubscriber", title }) => {

  const { isActive } = useActive();
  const { logout } = _useCommon();
  const list = WhichNavLink({ from })

  return (
    <>
      <div className={"text-start px-3 mt-3 mb-4"}>
        {/* <Logo /> */}
        <img src="/white2.png" height={50} />
      </div>
      {/* {from === "quiz-detail" && <div className="p-3" style={{ position: "relative", bottom: "10px" }}>
        <BgHeading title={title} />
      </div>} */}

      <div className="py-1 " >
        <Menu theme="dark" style={{ backgroundColor: "transparent" }}>
          {
            list.map((x, index) => (
              <Menu.Item
                key={index}
                className={` ${isActive(x.path)}`}
                icon={
                  <Link className="_link " to={x.path}>
                    {x.Icon}
                  </Link>
                }
              >
                <Link className="_link" to={x.path}>
                  {x.name}
                </Link>
              </Menu.Item>
            ))
          }
        </Menu>
      </div>


    </>
  );
};

export default Sidebar;
