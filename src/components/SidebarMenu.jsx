import React, { useEffect } from "react";
import { Menu, theme, Select, Dropdown, message } from "antd";
import { Home, Settings, Zap, Rocket, Globe, Sparkles, MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/SidebarMenu.module.css";
import { renderIconFromCode } from "../utils/productIcons";
import { useProducts } from "../services/products";

const SidebarMenu = ({ collapsed }) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get products from API with error handling
  const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts();
  
  // Ensure products is always an array
  const products = Array.isArray(productsData) ? productsData : [];
  
  // Handle API errors gracefully
  const hasProducts = (products || []).length > 0 && !productsError;
  const isApiReady = !productsLoading && !productsError;

  // Extract productId from current path
  const getCurrentProductId = () => {
    const pathSegments = location.pathname.split("/");
    const productIndex = pathSegments.indexOf("products");
    if (productIndex !== -1 && pathSegments[productIndex + 1]) {
      return pathSegments[productIndex + 1];
    }
    return null;
  };

  const urlProductId = getCurrentProductId();

  // Validate if the product from URL exists
  const isValidProduct = (productId) => {
    return (products || []).some((product) => product.product_id === productId);
  };

  // Get current product or fallback to first product
  const getCurrentProduct = () => {
    if (urlProductId && isValidProduct(urlProductId)) {
      return urlProductId;
    }
    return (products || []).length > 0 ? products[0].product_id : null;
  };

  const currentProductId = getCurrentProduct();

  // Handle invalid product by redirecting to valid one or settings if no products
  useEffect(() => {
    // Don't do anything while API is loading
    if (productsLoading) return;
    
    // Handle API errors by showing message and redirecting to settings
    if (productsError) {
      console.error('Failed to load products:', productsError);
      if (location.pathname.startsWith('/products/')) {
        message.error('Failed to load products. Please check your connection.');
        navigate('/settings', { replace: true });
      }
      return;
    }
    
    // Handle no products case
    if ((products || []).length === 0) {
      if (location.pathname.startsWith('/products/')) {
        message.error('No products found. Please create your first product.');
        navigate('/settings', { replace: true });
      }
      return;
    }

    // Handle invalid product redirect
    if (urlProductId && !isValidProduct(urlProductId)) {
      const fallbackProduct = (products || [])[0]?.id;
      const currentPath = location.pathname;
      const newPath = currentPath.replace(
        `/products/${urlProductId}`,
        `/products/${fallbackProduct}`
      );
      navigate(newPath, { replace: true });
    }
  }, [urlProductId, navigate, location.pathname, products, productsLoading, productsError]);

  const onClick = ({ key }) => {
    navigate(key);
  };

  const handleProductChange = (productId) => {
    // Navigate to the overview page of the selected product
    navigate(`/products/${productId}`);
  };

  const generalItems = hasProducts ? [
    {
      key: `/products/${currentProductId}`,
      icon: <Home size={16} />,
      label: "Overview",
    },
    {
      key: `/products/${currentProductId}/releases`,
      icon: <Rocket size={16} />,
      label: "Releases",
    },
    {
      key: `/products/${currentProductId}/issues`,
      icon: <Sparkles size={16} />,
      label: "Issues",
    },
  ] : [];

  const adminItems = [
    {
      key: "/settings",
      icon: <Settings size={16} />,
      label: "Settings",
    },
    {
      key: "/chat",
      icon: <MessageCircle size={16} />,
      label: "Chat",
    },
    {
      key: "/integrations",
      icon: <Zap size={16} />,
      label: "Integrations",
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
      {/* Product Selector */}
      <div style={{ padding: "0 20px", marginBottom: "20px" }}>
        {!collapsed ? (
          <Select
            optionLabelProp="label"
            className={styles.productSelector}
            value={currentProductId}
            onChange={handleProductChange}
            disabled={!hasProducts || productsError}
            placeholder={
              productsError 
                ? "Failed to load products" 
                : !hasProducts 
                  ? "No products available" 
                  : "Select product"
            }
            style={{ width: "100%" }}
            options={(products || []).map((product) => ({
              value: product.product_id,
              label: (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "left",
                    }}
                  >
                    {renderIconFromCode(product.product_icon, 12)}
                  </div>
                  <span style={{ fontSize: token.fontSizeXS }}>{product.product_name}</span>
                </div>
              ),
            }))}
          />
        ) : (
          <Dropdown
            disabled={!hasProducts || productsError}
            menu={{
              items: (products || []).map((product) => ({
                key: product.product_id,
                label: (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {renderIconFromCode(product.product_icon, 16)}
                    <span>{product.product_name}</span>
                  </div>
                ),
                onClick: () => handleProductChange(product.product_id),
              })),
            }}
            trigger={["click"]}
            placement="rightTop"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "32px",
                backgroundColor: token.colorBgContainer,
                borderRadius: token.borderRadius,
                border: `1px solid ${token.colorBorder}`,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = token.colorPrimaryBg;
                e.target.style.borderColor = token.colorPrimary;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = token.colorBgContainer;
                e.target.style.borderColor = token.colorBorder;
              }}
            >
              {(() => {
                const currentProduct = (products || []).find(
                  (p) => p.product_id === currentProductId
                );
                return renderIconFromCode(
                  currentProduct?.product_icon || "package",
                  16,
                  token.colorText
                );
              })()}
            </div>
          </Dropdown>
        )}
      </div>

      {/* GENERAL Section */}
      {hasProducts && !productsError && (
        <div style={{ marginBottom: "20px" }}>
          {!collapsed && (
            <div
              style={{
                padding: "0 20px 8px 20px",
                fontSize: "10px",
                fontWeight: token.fontWeightMedium,
                color: token.colorTextSecondary,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              GENERAL
            </div>
          )}
          <Menu
            className={styles.menu}
            selectedKeys={[location.pathname]}
            onClick={onClick}
            mode="inline"
            items={generalItems.map((item) => ({
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
      )}

      {/* ADMIN Section */}
      <div>
        {!collapsed && (
          <div
            style={{
              padding: "0 20px 8px 20px",
              fontSize: "10px",
              fontWeight: token.fontWeightMedium,
              color: token.colorTextSecondary,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            ADMIN
          </div>
        )}
        <Menu
          className={styles.menu}
          selectedKeys={[location.pathname]}
          onClick={onClick}
          mode="inline"
          items={adminItems.map((item) => ({
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
    </div>
  );
};

export default SidebarMenu;
