import React from "react";
import { Spin, theme } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { useToken } = theme;

const DefaultLoader = ({ size = "large", tip = "Loading...", height = "calc(100vh - 94px - 84px)" }) => {
  const { token } = useToken();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: height,
        padding: "20px",
      }}
    >
      <Spin
        size={size}
        tip={tip}
        indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
        style={{
          color: token.colorPrimary,
        }}
      />
    </div>
  );
};

export default DefaultLoader;
