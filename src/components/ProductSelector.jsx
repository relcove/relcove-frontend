import React from "react";
import { Select, theme, Typography } from "antd";

const { Option } = Select;
const { Text } = Typography;

const ProductSelector = ({ 
  selectedProduct, 
  onProductChange, 
  products = [], 
  showLabel = true,
  width = 160,
  size = "middle"
}) => {
  const { token } = theme.useToken();

  // Default products if none provided
  const defaultProducts = [
    { value: "web-application", label: "Web Application" },
    { value: "mobile-app", label: "Mobile App" },
    { value: "api-service", label: "API Service" },
    { value: "desktop-app", label: "Desktop App" },
  ];

  const productList = products.length > 0 ? products : defaultProducts;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {showLabel && (
        <Text
          style={{
            fontSize: "14px",
            color: token.colorTextSecondary,
            fontWeight: 500,
          }}
        >
          Product:
        </Text>
      )}
      <Select
        value={selectedProduct}
        onChange={onProductChange}
        style={{
          width: width,
          borderRadius: token.borderRadius,
        }}
        size={size}
      >
        {productList.map((product) => (
          <Option key={product.value} value={product.value}>
            {product.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default ProductSelector;
