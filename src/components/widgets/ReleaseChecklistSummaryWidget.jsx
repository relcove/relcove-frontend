import React from "react";
import { Card, Typography, theme, Progress, Tag } from "antd";
import { CheckCircle, Clock, AlertCircle, AlertTriangle } from "lucide-react";

const { Title, Text } = Typography;

const ReleaseChecklistSummaryWidget = ({ 
  title = "Release Checklist",
  checklistItems = [],
  showHeader = true
}) => {
  const { token } = theme.useToken();

  // Default mock data
  const defaultChecklistItems = [
    {
      id: "checklist-1",
      title: "All features tested and approved",
      team: "QA Team",
      status: "completed",
    },
    {
      id: "checklist-2",
      title: "Documentation updated",
      team: "Tech Writers",
      status: "completed",
    },
    {
      id: "checklist-3",
      title: "Performance benchmarks met",
      team: "DevOps Team",
      status: "in-progress",
    },
    {
      id: "checklist-4",
      title: "Security scan completed",
      team: "Security Team",
      status: "pending",
    },
    {
      id: "checklist-5",
      title: "Database migrations tested",
      team: "Backend Team",
      status: "blocked",
    },
    {
      id: "checklist-6",
      title: "Release notes prepared",
      team: "Product Team",
      status: "pending",
    },
    {
      id: "checklist-7",
      title: "Rollback plan ready",
      team: "DevOps Team",
      status: "completed",
    },
    {
      id: "checklist-8",
      title: "Monitoring alerts configured",
      team: "SRE Team",
      status: "in-progress",
    },
  ];

  const items = checklistItems.length > 0 ? checklistItems : defaultChecklistItems;

  const completedCount = items.filter(item => item.status === "completed").length;
  const totalCount = items.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  const getStatusConfig = (status) => {
    switch (status) {
      case "completed":
        return {
          color: "#10B981", // Professional green
          bgColor: "#ECFDF5", // Light green background
          icon: CheckCircle,
          label: "Done",
        };
      case "in-progress":
        return {
          color: "#F59E0B", // Professional orange
          bgColor: "#FFFBEB", // Light orange background
          icon: Clock,
          label: "In Progress",
        };
      case "pending":
        return {
          color: "#6B7280", // Professional gray
          bgColor: "#F9FAFB", // Light gray background
          icon: AlertCircle,
          label: "Pending",
        };
      case "blocked":
        return {
          color: "#EF4444", // Professional red
          bgColor: "#FEF2F2", // Light red background
          icon: AlertTriangle,
          label: "Blocked",
        };
      default:
        return {
          color: "#6B7280",
          bgColor: "#F9FAFB",
          icon: AlertCircle,
          label: "Unknown",
        };
    }
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
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Clock size={16} color={token.colorWarning} />
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
            </div>
            <div
              style={{
                padding: "6px 12px",
                backgroundColor: "#ECFDF5",
                borderRadius: "16px",
                border: "1px solid #10B981",
              }}
            >
              <Text
                style={{
                  fontSize: token.fontSizeSM,
                  fontWeight: 600,
                  color: "#10B981",
                  fontFamily: token.fontFamilyHeading,
                }}
              >
                {completedCount}/{totalCount} Done
              </Text>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Text
              style={{
                fontSize: token.fontSizeSM,
                color: token.colorTextSecondary,
                fontFamily: token.fontFamily,
              }}
            >
              Progress
            </Text>
            <Progress
              percent={progressPercentage}
              size="small"
              strokeColor="#10B981"
              trailColor={token.colorBorderSecondary}
              style={{ flex: 1 }}
              showInfo={false}
            />
            <Text
              style={{
                fontSize: token.fontSizeSM,
                fontWeight: 600,
                color: token.colorText,
                fontFamily: token.fontFamilyHeading,
                minWidth: "32px",
              }}
            >
              {completedCount}/{totalCount}
            </Text>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {items.map((item) => {
          const statusConfig = getStatusConfig(item.status);
          const IconComponent = statusConfig.icon;

          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 12px",
                backgroundColor: token.colorBgContainer,
                borderRadius: token.borderRadius,
                border: `1px solid ${token.colorBorderSecondary}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: statusConfig.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <IconComponent size={18} color={statusConfig.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: token.fontSizeSM,
                      fontWeight: 600,
                      color: token.colorText,
                      fontFamily: token.fontFamilyHeading,
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: token.fontSizeXS,
                      color: token.colorTextSecondary,
                      fontFamily: token.fontFamily,
                    }}
                  >
                    {item.team}
                  </Text>
                </div>
              </div>
              <div
                style={{
                  padding: "6px 12px",
                  backgroundColor: statusConfig.bgColor,
                  borderRadius: "16px",
                  border: `1px solid ${statusConfig.color}`,
                  flexShrink: 0,
                }}
              >
                <Text
                  style={{
                    fontSize: token.fontSizeXS,
                    fontWeight: 600,
                    color: statusConfig.color,
                    fontFamily: token.fontFamilyHeading,
                  }}
                >
                  {statusConfig.label}
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ReleaseChecklistSummaryWidget;
