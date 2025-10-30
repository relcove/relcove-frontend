import React from "react";
import { Button, theme, Typography } from "antd";
import { Plus, RefreshCw } from "lucide-react";

const { Title, Text } = Typography;

const EmptyState = ({
  icon = "plus",
  title = "No data found",
  description = "There's no data to display at the moment.",
  actionLabel = "Add Item",
  onAction,
  showAction = true,
  showRefresh = false,
  onRefresh,
  size = "medium", // "small", "medium", "large"
}) => {
  const { token } = theme.useToken();

  const getIcon = () => {
    const iconProps = {
      size: size === "small" ? 24 : size === "medium" ? 32 : 40,
      color: token.colorTextQuaternary,
    };

    switch (icon) {
      case "plus":
        return <Plus {...iconProps} />;
      case "refresh":
        return <RefreshCw {...iconProps} />;
      default:
        return <Plus {...iconProps} />;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          container: { padding: "32px 16px" },
          title: { fontSize: token.fontSizeLG, marginBottom: "6px" },
          description: { fontSize: token.fontSizeSM },
          button: { height: "32px", fontSize: token.fontSizeSM },
        };
      case "medium":
        return {
          container: { padding: "40px 24px" },
          title: { fontSize: token.fontSizeXL, marginBottom: "8px" },
          description: { fontSize: token.fontSize },
          button: { height: "36px", fontSize: token.fontSize },
        };
      case "large":
      default:
        return {
          container: { padding: "48px 32px" },
          title: { fontSize: token.fontSizeXXL, marginBottom: "12px" },
          description: { fontSize: token.fontSizeLG },
          button: { height: "40px", fontSize: token.fontSizeLG },
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        ...sizeStyles.container,
      }}
    >
      {/* Icon */}
      <div
        style={{
          marginBottom: "16px",
          opacity: 0.4,
        }}
      >
        {getIcon()}
      </div>

      {/* Title */}
      <Title
        level={size === "small" ? 4 : size === "medium" ? 3 : 2}
        style={{
          margin: 0,
          color: token.colorTextSecondary,
          fontWeight: token.fontWeightNormal,
          ...sizeStyles.title,
        }}
      >
        {title}
      </Title>

      {/* Description */}
      <Text
        style={{
          color: token.colorTextTertiary,
          marginBottom: "24px",
          maxWidth: "320px",
          lineHeight: 1.4,
          ...sizeStyles.description,
        }}
      >
        {description}
      </Text>

      {/* Actions */}
      {(showAction && onAction) || (showRefresh && onRefresh) ? (
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          {showAction && onAction && (
            <Button
              type="primary"
              icon={<Plus size={14} />}
              onClick={onAction}
              style={{
                ...sizeStyles.button,
                fontWeight: token.fontWeightNormal,
              }}
            >
              {actionLabel}
            </Button>
          )}

          {showRefresh && onRefresh && (
            <Button
              type="text"
              icon={<RefreshCw size={14} />}
              onClick={onRefresh}
              style={{
                ...sizeStyles.button,
                color: token.colorTextTertiary,
              }}
            >
              Refresh
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default EmptyState;
