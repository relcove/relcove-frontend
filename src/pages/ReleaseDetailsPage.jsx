import React, { useState } from "react";
import { Card, Tabs, Typography, Progress, theme, Space, Tag, Avatar } from "antd";
import { ArrowLeft, Calendar, Users, Clock, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ReleaseOverviewTab from "../components/release-details/ReleaseOverviewTab";
import ReleaseChecklistTab from "../components/release-details/ReleaseChecklistTab";
import ReleaseResultsTab from "../components/release-details/ReleaseResultsTab";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const ReleaseDetailsPage = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const { releaseId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock release data - in real app, this would be fetched based on releaseId
  const release = {
    id: releaseId || "release-1",
    version: "v2.4.0",
    title: "Major feature updates and performance improvements",
    status: "In Progress",
    statusColor: "blue",
    targetDate: "2024-01-15",
    health: 78,
    qaLead: { name: "Sarah Chen", initials: "SC", avatar: null },
    lastUpdated: "2 hours ago",
  };

  const handleBack = () => {
    navigate("/releases");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return token.colorPrimary;
      case "Completed":
        return token.colorSuccess;
      case "At Risk":
        return token.colorWarning;
      default:
        return token.colorTextTertiary;
    }
  };

  const getHealthColor = (health) => {
    if (health >= 90) return token.colorSuccess;
    if (health >= 70) return token.colorWarning;
    return token.colorError;
  };

  return (
    <div style={{ padding: "24px", backgroundColor: token.colorBgContainer }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        {/* Back Button */}
        <div style={{ marginBottom: "16px" }}>
          <div
            onClick={handleBack}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              color: token.colorTextSecondary,
              fontSize: token.fontSizeSM,
              fontWeight: 500,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = token.colorPrimary;
            }}
            onMouseLeave={(e) => {
              e.target.style.color = token.colorTextSecondary;
            }}
          >
            <ArrowLeft size={16} />
            Back to Releases
          </div>
        </div>

        {/* Release Info Card */}
        <Card
          style={{
            borderRadius: token.borderRadiusLG,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            border: `1px solid ${token.colorBorderSecondary}`,
          }}
          bodyStyle={{ padding: "12px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "8px",
            }}
          >
            {/* Left Side - Version & Title */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                <Title
                  level={2}
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: token.colorText,
                    margin: 0,
                    fontFamily: token.fontFamilyHeading,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {release.version}
                </Title>
                <div
                  style={{
                    padding: "4px 12px",
                    backgroundColor: getStatusColor(release.status) + "15",
                    borderRadius: "16px",
                    border: `1px solid ${getStatusColor(release.status)}`,
                  }}
                >
                  <Text
                    style={{
                      fontSize: token.fontSizeXS,
                      fontWeight: 600,
                      color: getStatusColor(release.status),
                      fontFamily: token.fontFamilyHeading,
                    }}
                  >
                    {release.status}
                  </Text>
                </div>
              </div>
              <Text
                style={{
                  fontSize: "16px",
                  color: token.colorTextSecondary,
                  fontFamily: token.fontFamily,
                  fontWeight: 400,
                  lineHeight: 1.5,
                }}
              >
                {release.title}
              </Text>
            </div>

            {/* Right Side - Release Health */}
            <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: token.fontSizeXS,
                      fontWeight: 500,
                      marginBottom: "6px",
                      display: "block",
                      fontFamily: token.fontFamilyHeading,
                      color: token.colorText,
                    }}
                  >
                    Release Health
                  </Text>
                  <div
                    style={{
                      position: "relative",
                      width: "72px",
                      height: "72px",
                    }}
                  >
                    <Progress
                      type="circle"
                      percent={release.health}
                      size={72}
                      strokeColor={getHealthColor(release.health)}
                      trailColor={token.colorBorderSecondary}
                      strokeWidth={8}
                      showInfo={false}
                      style={{ position: "absolute" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: getHealthColor(release.health),
                        fontSize: token.fontSizeSM,
                        fontWeight: 600,
                        zIndex: 1,
                        fontFamily: token.fontFamilyHeading,
                      }}
                    >
                      {release.health}%
                    </div>
                  </div>
                </div>
          </div>

          {/* Bottom Info */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "8px",
              borderTop: `1px solid ${token.colorBorderSecondary}`,
            }}
          >
            {/* Left Side - QA Lead */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Users size={14} color={token.colorTextSecondary} />
              <Text
                style={{
                  fontSize: token.fontSizeSM,
                  color: token.colorTextSecondary,
                  fontFamily: token.fontFamily,
                }}
              >
                QA Lead:
              </Text>
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: token.colorPrimary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: token.fontSizeXS,
                  fontWeight: 600,
                  color: "white",
                }}
              >
                {release.qaLead.initials}
              </div>
              <Text
                style={{
                  fontSize: token.fontSizeSM,
                  fontWeight: 500,
                  fontFamily: token.fontFamilyHeading,
                  color: token.colorText,
                }}
              >
                {release.qaLead.name}
              </Text>
            </div>

            {/* Right Side - Target Date & Last Updated */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* Target Date */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Calendar size={14} color={token.colorTextSecondary} />
                <Text
                  style={{
                    fontSize: token.fontSizeSM,
                    color: token.colorTextSecondary,
                    fontFamily: token.fontFamily,
                  }}
                >
                  Target: {release.targetDate}
                </Text>
              </div>

              {/* Last Updated */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Clock size={14} color={token.colorTextSecondary} />
                <Text
                  style={{
                    fontSize: token.fontSizeSM,
                    color: token.colorTextSecondary,
                    fontFamily: token.fontFamily,
                  }}
                >
                  Updated {release.lastUpdated}
                </Text>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Card
        style={{
          borderRadius: token.borderRadiusLG,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          border: `1px solid ${token.colorBorderSecondary}`,
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          style={{
            padding: "0 24px",
          }}
          tabBarStyle={{
            margin: 0,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <TabPane
            tab={
              <span style={{ fontFamily: token.fontFamilyHeading, fontWeight: 500 }}>
                Release Overview
              </span>
            }
            key="overview"
          >
            <ReleaseOverviewTab release={release} />
          </TabPane>
          <TabPane
            tab={
              <span style={{ fontFamily: token.fontFamilyHeading, fontWeight: 500 }}>
                Release Checklist
              </span>
            }
            key="checklist"
          >
            <ReleaseChecklistTab release={release} />
          </TabPane>
          <TabPane
            tab={
              <span style={{ fontFamily: token.fontFamilyHeading, fontWeight: 500 }}>
                Results
              </span>
            }
            key="results"
          >
            <ReleaseResultsTab release={release} />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ReleaseDetailsPage;
