import React from "react";
import { Card, Typography, theme, Progress, Tag } from "antd";
import { CheckCircle, Clock, AlertCircle, Calendar, Target } from "lucide-react";

const { Title, Text } = Typography;

const ReleaseMilestonesWidget = ({ 
  title = "Release Milestones",
  milestones = [],
  showHeader = true
}) => {
  const { token } = theme.useToken();

  // Default mock data
  const defaultMilestones = [
    {
      id: "milestone-1",
      title: "Feature Development Complete",
      date: "Jan 8, 2024",
      status: "completed",
      progress: 100,
    },
    {
      id: "milestone-2",
      title: "Code Review & Testing",
      date: "Jan 12, 2024",
      status: "in-progress",
      progress: 75,
    },
    {
      id: "milestone-3",
      title: "Performance Optimization",
      date: "Jan 14, 2024",
      status: "in-progress",
      progress: 45,
    },
    {
      id: "milestone-4",
      title: "Security Audit",
      date: "Jan 15, 2024",
      status: "pending",
      progress: 0,
    },
    {
      id: "milestone-5",
      title: "Production Deployment",
      date: "Jan 16, 2024",
      status: "pending",
      progress: 0,
    },
  ];

  const milestonesData = milestones.length > 0 ? milestones : defaultMilestones;

  const getStatusConfig = (status) => {
    switch (status) {
      case "completed":
        return {
          color: "#10B981", // Professional green
          bgColor: "#ECFDF5", // Light green background
          icon: CheckCircle,
          label: "Complete",
        };
      case "in-progress":
        return {
          color: "#3B82F6", // Professional blue
          bgColor: "#EFF6FF", // Light blue background
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
      default:
        return {
          color: "#6B7280",
          bgColor: "#F9FAFB",
          icon: Calendar,
          label: "Pending",
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
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: token.colorPrimaryBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Target size={16} color={token.colorPrimary} />
            </div>
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
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {milestonesData.map((milestone) => {
          const statusConfig = getStatusConfig(milestone.status);
          const IconComponent = statusConfig.icon;

          return (
            <div
              key={milestone.id}
              style={{
                padding: "12px 16px",
                backgroundColor: token.colorBgContainer,
                borderRadius: token.borderRadius,
                border: `1px solid ${token.colorBorderSecondary}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Left side - Icon, Title, Date */}
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
                    {milestone.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: token.fontSizeXS,
                      color: token.colorTextSecondary,
                      fontFamily: token.fontFamily,
                    }}
                  >
                    {milestone.date}
                  </Text>
                </div>
              </div>

              {/* Right side - Status Tag and Progress */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {milestone.status === "in-progress" && (
                  <div style={{ width: "80px" }}>
                    <Progress
                      percent={milestone.progress}
                      size="small"
                      strokeColor={statusConfig.color}
                      trailColor={token.colorBorderSecondary}
                      showInfo={false}
                    />
                  </div>
                )}
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
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ReleaseMilestonesWidget;
