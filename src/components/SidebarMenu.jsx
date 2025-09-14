import React from "react";
import { Menu, theme } from "antd";
import { Home, Settings, Zap } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/SidebarMenu.module.css";

const SidebarMenu = ({ collapsed }) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

  const onClick = ({ key }) => {
    navigate(key);
  };

  const menuItems = [
    {
      key: "/",
      icon: <Home size={16} />,
      label: "Overview",
    },
    {
      key: "/integrations",
      icon: <Zap size={16} />,
      label: "Integrations",
    },
    {
      key: "/admin",
      icon: <Settings size={16} />,
      label: "Admin Panel",
    },
  ];

  return (
    <div
      className={styles.sidebarMenu}
      style={{
        "--ant-color-primary": token.colorPrimary,
        "--ant-color-primary-bg": token.colorPrimaryBg,
        "--ant-color-primary-bg-hover": token.colorPrimaryBgHover,
      }}
    >
      <Menu
        className={styles.menu}
        selectedKeys={[location.pathname]}
        onClick={onClick}
        mode="inline"
        items={menuItems.map((item) => ({
          ...item,
          className: `${styles.menuItem} ${
            collapsed ? styles.menuItemCollapsed : styles.menuItemExpanded
          }`,
          icon: React.cloneElement(item.icon, {
            className: `${styles.menuIcon} ${
              collapsed ? styles.menuIconCollapsed : styles.menuIconExpanded
            }`,
          }),
        }))}
        theme="light"
      />
    </div>
  );
};

export default SidebarMenu;
