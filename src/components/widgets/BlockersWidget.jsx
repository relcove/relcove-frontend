import React from "react";
import { Card, Typography, theme, Tag, Avatar } from "antd";
import { AlertTriangle, Clock, User } from "lucide-react";

const { Title, Text } = Typography;

const BlockersWidget = ({ 
  title = "Blockers",
  blockers = [],
  showHeader = true,
  showCount = true
}) => {
  const { token } = theme.useToken();

  // Default mock data
  const defaultBlockers = [
    {
      id: "blocker-1",
      title: "Critical payment gateway integration failing",
      severity: "critical",
      reporter: "Sarah Chen",
      reportedAt: "2 hours ago",
      description: "Payment gateway API is returning 500 errors during checkout process",
    },
    {
      id: "blocker-2",
      title: "Database migration failing on production",
      severity: "high",
      reporter: "Mike Johnson",
      reportedAt: "4 hours ago",
      description: "Migration script fails when updating user table schema",
    },
    {
      id: "blocker-3",
      title: "Performance regression in search functionality",
      severity: "medium",
      reporter: "Alex Kim",
      reportedAt: "1 day ago",
      description: "Search queries taking 3x longer than expected",
    },
    {
      id: "blocker-4",
      title: "UI inconsistency in mobile view",
      severity: "low",
      reporter: "Emma Davis",
      reportedAt: "2 days ago",
      description: "Button alignment issues on mobile devices",
    },
  ];

  const blockersData = blockers.length > 0 ? blockers : defaultBlockers;

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case "critical":
        return {
          color: token.colorError,
          bgColor: token.colorErrorBg,
          label: "Critical",
        };
      case "high":
        return {
          color: token.colorWarning,
          bgColor: token.colorWarningBg,
          label: "High",
        };
      case "medium":
        return {
          color: token.colorPrimary,
          bgColor: token.colorPrimaryBg,
          label: "Medium",
        };
      case "low":
        return {
          color: token.colorTextSecondary,
          bgColor: token.colorFillTertiary,
          label: "Low",
        };
      default:
        return {
          color: token.colorTextTertiary,
          bgColor: token.colorFillTertiary,
          label: "Unknown",
        };
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card
      style={{
        borderRadius: token.borderRadiusLG,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        border: `1px solid ${token.colorBorderSecondary}`,
        height: "100%",
      }}
      bodyStyle={{ padding: "20px" }}
    >
      {showHeader && (
        <div style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <Title
              level={4}
              style={{
                fontSize: token.fontSizeLG,
                fontWeight: 600,
                color: token.colorText,
                margin: 0,
                fontFamily: token.fontFamilyHeading,
              }}
            >
              {title}
            </Title>
            {showCount && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <AlertTriangle size={16} color={token.colorError} />
                <Text
                  style={{
                    fontSize: token.fontSizeLG,
                    fontWeight: 700,
                    color: token.colorError,
                    fontFamily: token.fontFamilyHeading,
                  }}
                >
                  {blockersData.length}
                </Text>
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {blockersData.map((blocker) => {
          const severityConfig = getSeverityConfig(blocker.severity);

          return (
            <div
              key={blocker.id}
              style={{
                padding: "16px",
                backgroundColor: token.colorFillTertiary,
                borderRadius: token.borderRadius,
                border: `1px solid ${token.colorBorderSecondary}`,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = token.colorFillSecondary;
                e.currentTarget.style.borderColor = token.colorBorder;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = token.colorFillTertiary;
                e.currentTarget.style.borderColor = token.colorBorderSecondary;
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ flex: 1, marginRight: "12px" }}>
                  <Text
                    style={{
                      fontSize: token.fontSizeSM,
                      fontWeight: 500,
                      color: token.colorText,
                      fontFamily: token.fontFamilyHeading,
                      display: "block",
                      lineHeight: 1.4,
                    }}
                  >
                    {blocker.title}
                  </Text>
                </div>
                <Tag
                  color={severityConfig.color}
                  style={{
                    fontSize: token.fontSizeXS,
                    fontWeight: 500,
                    fontFamily: token.fontFamilyHeading,
                    borderRadius: token.borderRadiusSM,
                    flexShrink: 0,
                  }}
                >
                  {severityConfig.label}
                </Tag>
              </div>

              {/* Description */}
              {blocker.description && (
                <Text
                  style={{
                    fontSize: token.fontSizeXS,
                    color: token.colorTextSecondary,
                    fontFamily: token.fontFamily,
                    display: "block",
                    lineHeight: 1.4,
                    marginBottom: "8px",
                  }}
                >
                  {blocker.description}
                </Text>
              )}

              {/* Footer */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Avatar
                    size={20}
                    style={{
                      backgroundColor: token.colorPrimary,
                      fontSize: token.fontSizeXS,
                      fontWeight: 600,
                    }}
                  >
                    {getInitials(blocker.reporter)}
                  </Avatar>
                  <Text
                    style={{
                      fontSize: token.fontSizeXS,
                      color: token.colorTextSecondary,
                      fontFamily: token.fontFamily,
                    }}
                  >
                    {blocker.reporter}
                  </Text>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Clock size={12} color={token.colorTextTertiary} />
                  <Text
                    style={{
                      fontSize: token.fontSizeXS,
                      color: token.colorTextTertiary,
                      fontFamily: token.fontFamily,
                    }}
                  >
                    {blocker.reportedAt}
                  </Text>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default BlockersWidget;
