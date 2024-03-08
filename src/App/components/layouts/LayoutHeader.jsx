import { CloseOutlined, ExclamationCircleOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Drawer, Grid } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../../../context/authContext";
import "../../../assets/css/layout.css";
import SearchBard from "./SearchBar";


const { useBreakpoint } = Grid;

const LayoutHeader = ({ from }) => {


  const router = useNavigate();
  const [auth] = useAuth();

  const breakpoints = useBreakpoint();
  const [drawerVisibility, setDrawerVisibility] = useState(false);

  return (
    <>
      <div className="pb-2 pt-2 border-bottom d-flex flex-row justify-content-between align-items-center ">
        {!breakpoints.md && <MenuOutlined onClick={() => setDrawerVisibility(true)} />}
        {breakpoints.lg && <span style={{ fontWeight: "600" }}>Welcome {auth?.user?.name}</span>}

        <SearchBard />
        {breakpoints.lg && <div className="d-flex flex-row justify-content-center align-items-center gap-2" style={{ fontWeight: "600" }}>
          {from === "subscriber" ? (
            <span className="d-flex flex-row justify-content-center align-items-center gap-1 border-end px-1 ">
              <LogoutOutlined /> Logout
            </span>
          ) : (
            <span role="button" onClick={() => router("/subscribe/quizes")} className="d-flex flex-row justify-content-center align-items-center gap-1 border-end px-1 ">
              <LogoutOutlined /> Exit
            </span>
          )}
        </div>}
      </div>
      <Drawer
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
