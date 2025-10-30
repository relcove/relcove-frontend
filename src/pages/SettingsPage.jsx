import React from "react";
import { Card, Typography, Tabs, theme } from "antd";
import { Settings, Flag } from "lucide-react";
import ProductsSettingsTab from "../components/settings/ProductsSettingsTab";
import FeatureFlagsTab from "../components/settings/FeatureFlagsTab";

const { Title } = Typography;

const SettingsPage = () => {
  const { token } = theme.useToken();

  const tabItems = [
    {
      key: "products",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Settings size={16} />
          Products
        </span>
      ),
      children: <ProductsSettingsTab />,
    },
    {
      key: "feature-flags",
      label: (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Flag size={16} />
          Feature Flags
        </span>
      ),
      children: <FeatureFlagsTab />,
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: "32px" }}>
        <Title level={2} style={{ margin: 0, color: token.colorText }}>
          Settings
        </Title>
        <p style={{ margin: "8px 0 0 0", color: token.colorTextSecondary, fontSize: token.fontSizeSM }}>
          Manage your application configuration, products, and feature flags
        </p>
      </div>

      <Tabs
        defaultActiveKey="products"
        items={tabItems}
      />
    </div>
  );
};

export default SettingsPage;
