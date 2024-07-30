import { BugOutlined, CloseOutlined, LogoutOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Drawer, Dropdown, Grid } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../../../context/authContext";
import "../../../assets/css/layout.css";
import SearchBard from "./SearchBar";
import { _useCommon } from "../../../actions/_common";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCloudPlus } from 'react-icons/bs'

const { useBreakpoint } = Grid;




const LayoutHeader = ({ from }) => {


  const router = useNavigate();
  const [auth] = useAuth();
  const { logout } = _useCommon()

  const breakpoints = useBreakpoint();
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const navigateToProfile = () => router('/subscribe/profile')

  const items = [
    {
      label: 'Profile',
      key: '0',
      icon: <UserOutlined />,
      onClick: navigateToProfile
    },


    {
      label: <a className="_link" href="https://quizer-frontend.vercel.app/attempt-survey/Report-a-Problem/66890a1b6495c447b5476e98" target="_">Report a Problem</a>,
      key: '1',
      icon: <BugOutlined />,

    },



    {
      label: 'Logout',
      key: '2',
      icon: <LogoutOutlined />,
      onClick: logout
    },
    {
      type: 'divider',
    },
    {
      label: <div>
        {auth?.user?.name[0]?.toUpperCase() + auth?.user?.name?.slice(1)}
        <br />
        <small>{auth?.user?.role[0]?.toUpperCase() + auth?.user?.role?.slice(1)}</small>
      </div>,
      key: '3',

    },
  ];


  return (
    <>
      <div className="pb-2 pt-2 border-bottom d-flex flex-row justify-content-between align-items-center ">
        {!breakpoints.lg && <MenuOutlined onClick={() => setDrawerVisibility(true)} />}
        {/* {breakpoints.lg && <span style={{ fontWeight: "600" }} className="text-capitalize ">Welcome {auth?.user?.name}</span>} */}
        <SearchBard />

        {/* // breakpoints.lg && */}
        <div className="d-flex flex-row justify-content-center align-items-center gap-2" style={{ fontWeight: "600" }}>
          {from === "subscriber" ? (
            <div className="d-flex align-items-center gap-4">
              {/* <div>
                <Dropdown menu={{ itemsTwo }} trigger={['click']} arrow>
                  <div role="button" className="d-flex flex-row justify-content-center align-items-center gap-1 px-1">
                    <BsCloudPlus size={19} />
                    <span className="d-none d-md-block">Add</span>
                  </div>
                </Dropdown>
              </div> */}
              <div>
                <Dropdown menu={{ items }} trigger={['click']} arrow>
                  <div role="button" className="d-flex flex-row justify-content-center align-items-center gap-1 px-1">
                    <IoSettingsOutline size={16} />
                    <span className="d-none d-md-block">Settings</span>
                  </div>
                </Dropdown>
              </div>
            </div>

          ) : (
            <span role="button" onClick={() => router("/subscribe/quizzes")} className="d-flex flex-row justify-content-center align-items-center gap-1  px-1 ">
              <IoLogOutOutline size={16} /> <span className="d-none d-md-block" >Exit</span>
            </span>
          )}
        </div>


      </div>
      <Drawer
        style={{
          background: "#083344"
        }}
        // className="mobile-sidebar"
        placement="left"
        closable={false}
        width={250}
        onClose={() => setDrawerVisibility(false)}
        open={drawerVisibility}
        extra={<CloseOutlined onClick={() => setDrawerVisibility(false)} />}
      >
        <Sidebar from={from} />
      </Drawer>
    </>
  );
};

export default LayoutHeader;
