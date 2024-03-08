import { LogoutOutlined, } from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import useActive from "../../../hooks/useActive";
import { _useCommon } from "../../../actions/_common";
import WhichNavLink from "./WhichNavLink";
import Logo from "./Logo";


const Sidebar = ({ from = "notSubscriber" }) => {

  const { isActive } = useActive();
  const { logout } = _useCommon();
  const list = WhichNavLink({ from })

  return (
    <>
      <div className={"text-start px-3 mt-3 mb-4"}>
        <Logo />
      </div>
      <div className="py-1 ">
        <Menu>
          {
            list.map((x, index) => (
              <Menu.Item
                key={index}
                className={`${x.gap ? "mt-4" : "mt-1"} ${isActive(x.path)}`}
                icon={
                  <Link className="_link its-icon" to={x.path}>
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


          {from === "subscriber" && (
            <Menu.Item
              key="99"
              className="mt-4 nav-link"
              onClick={logout}
              icon={
                <div className="its-icon">
                  <LogoutOutlined />
                </div>
              }
            >
              <span> Logout</span>
            </Menu.Item>
          )}
        </Menu>
      </div>
    </>
  );
};

export default Sidebar;
