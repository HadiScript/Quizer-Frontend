import React from "react";
import { Alert } from "antd";
import toast from "react-hot-toast";
import { WarningOutlined } from "@ant-design/icons";

export const Errs = (err) => {
  console.log(err, "here")
  if (err.response.data.errors) {
    err.response.data.errors.map((x) => toast.custom((t) => <Alert showIcon style={{ minWidth: '400px', fontWeight: "bold" }} type="error" description={x.message} closable />, { position: "bottom-center" }));
  } else toast.error("Something went wrong.");
};

