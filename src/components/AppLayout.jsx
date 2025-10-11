import React, { useState } from "react";
import {
  Layout,
  Avatar,
  Typography,
  Button,
  Space,
  theme,
  Row,
  Col,
} from "antd";
import { PanelLeft, PanelLeftClose } from "lucide-react";
import SidebarMenu from "./SidebarMenu";
import { UserButton, useUser, OrganizationSwitcher } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { useToken } = theme;

const AppLayout = ({ children }) => {
  const { token } = useToken();
  const { user } = useUser();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("siderCollapsed") === "true"
  );

  // Check if user has organization membership
  const hasOrganization = user?.organizationMemberships?.length > 0;
  const shouldShowSidebar = hasOrganization;

  // Get current section name based on path
  const getCurrentSectionName = () => {
    const path = location.pathname;
    // Handle product-based routes
    if (path.includes('/products/')) {
      if (path.match(/\/products\/[^\/]+$/) || path.includes('/releases') || path.includes('/issues')) {
        return "GENERAL";
      }
    }
    // Handle admin routes (no product prefix)
    if (path === "/settings" || path === "/integrations") {
      return "ADMIN";
    }
    // Handle legacy routes
    if (path === "/" || path === "/releases" || path === "/issues") {
      return "GENERAL";
    }
    return "GENERAL";
  };

  const handleSiderCollapse = () => {
    const newCollapsedState = !collapsed;
    localStorage.setItem("siderCollapsed", String(newCollapsedState));
    setCollapsed(newCollapsedState);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "10px 0 0 0",
      }}
    >
      {/* Left Sidebar */}
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={collapsed}
        style={{
          background: "#fafafa",
          overflow: "hidden",
          height: "calc(100vh - 20px)",
          position: "fixed",
          left: 0,
          top: "20px",
          bottom: 0,
        }}
        width={200}
        collapsedWidth={80}
      >
        {/* R Logo */}
        <div
          style={{
            marginTop: "20px",
            marginLeft: "5px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: collapsed ? "40px" : "60px",
              height: collapsed ? "40px" : "60px",
              backgroundColor: token.colorPrimary,
              borderRadius: token.borderRadiusLG,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: token.fontWeightBold,
              fontSize: collapsed
                ? token.fontSizeHeading5
                : token.fontSizeHeading3,
              margin: "0 auto",
              transition: "all 0.2s ease",
            }}
          >
            R
          </div>
          {!collapsed && (
            <Title
              level={4}
              style={{
                margin: "12px 0 0 0",
                color: token.colorText,
                fontSize: token.fontSizeLg,
                fontWeight: token.fontWeightSemiBold,
              }}
            >
              Relcove
            </Title>
          )}
        </div>

        {/* Navigation Content */}
        <div
          style={{
            padding: "20px 0",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Navigation Menu - Only show if user has organization membership */}
          {shouldShowSidebar && (
            <div style={{ padding: "0" }}>
              <SidebarMenu collapsed={collapsed} />
            </div>
          )}

        </div>
      </Sider>

      {/* Main Content Area */}
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          marginTop: "20px",
          backgroundColor: "#ffffff",
          transition: "margin-left 0.2s ease",
          borderRadius: "10px 0 0 0",
          boxShadow: "4px 0 8px rgba(0, 0, 0, 0.08)",
          minHeight: "calc(100vh - 40px)",
          overflow: "hidden",
        }}
      >
        {/* Top Header Bar */}
        <Header
          style={{
            background: "white",
            padding: "0 24px",
            height: "64px",
            lineHeight: "64px",
            position: "fixed",
            top: "20px",
            left: collapsed ? "80px" : "200px",
            right: "0",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: "10px 0 0 0",
            transition: "left 0.2s ease",
          }}
        >
          <Col style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Button
              type="text"
              onClick={handleSiderCollapse}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: token.borderRadius,
                backgroundColor: token.colorBgLayout,
                border: `1px solid ${token.colorBorderSecondary}`,
                color: token.colorTextSecondary,
                fontSize: token.fontSizeXs,
                fontWeight: token.fontWeightMedium,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
            >
              {collapsed ? (
                <PanelLeft size={16} />
              ) : (
                <PanelLeftClose size={16} />
              )}
            </Button>
            <Title
              level={3}
              style={{
                margin: 0,
                color: token.colorText,
                fontSize: token.fontSizeXl,
                fontWeight: token.fontWeightSemiBold,
              }}
            >
              Relcove
            </Title>
          </Col>
          <Col style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <OrganizationSwitcher/>
            <UserButton />
          </Col>
        </Header>

        {/* Main Content */}
        <Content
          style={{
            paddingTop: 84, // 64px header + 20px margin
            paddingLeft: 60,
            paddingRight: "min(7%, 100px)",
            margin: 0,
            zIndex: 1,
            height: "calc(100vh - 104px)", // 20px top margin + 64px header + 20px bottom margin
            overflowY: "auto",
            background: "#ffffff",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
