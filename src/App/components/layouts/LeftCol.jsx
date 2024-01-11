import {
  AppstoreOutlined,
  BackwardOutlined,
  CommentOutlined,
  DiffOutlined,
  FolderOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  ProfileOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import useActive from "../../../hooks/useActive";
import { _useCommon } from "../../../actions/_common";

const menuList = [
  {
    gap: false,
    name: "Dashboard",
    path: "/subscribe",
    Icon: <AppstoreOutlined />,
  },
  {
    gap: true,
    name: "Quizes",
    path: "/subscribe/quizes",
    Icon: <OrderedListOutlined />,
  },
  {
    gap: false,
    name: "Create Quiz",
    path: "/subscribe/create-quiz",
    Icon: <DiffOutlined />,
  },
  {
    gap: false,
    name: "Global Settings",
    path: "/subscribe/global-settings",
    Icon: <SettingOutlined />,
  },
  {
    gap: true,
    name: "Profile",
    path: "/subscribe/profile",
    Icon: <ProfileOutlined />,
  },
  {
    gap: false,
    name: "Settings",
    path: "/subscribe/settings",
    Icon: <SettingOutlined />,
  },
];

const LeftCol = () => {
  const { isActive } = useActive();
  const { logout } = _useCommon();

  return (
    <>
      <div className={"text-start px-3 mt-3 mb-4"}>
        <h4>HadiScript</h4>
      </div>
      <div className="py-1 ">
        <Menu>
          {menuList.map((x, index) => (
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
          ))}

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
        </Menu>
      </div>
    </>
  );
};

export default LeftCol;
