import React from "react";
import { Card, Typography, theme, Progress, Avatar } from "antd";
import { CheckCircle, Clock, AlertCircle, AlertTriangle } from "lucide-react";
import Table, { TableUtils } from "../Table";

const { Title, Text } = Typography;

const ReleaseChecklistTab = ({ release }) => {
  const { token } = theme.useToken();

  // Mock checklist data matching the screenshot
  const checklistItems = [
    {
      id: "checklist-1",
      title: "Code review completed",
      assignedTo: "Sarah Chen",
      initials: "SC",
      status: "done",
      comments: "All PRs reviewed and approved",
      build: "198",
      lastUpdated: "Oct 01, 08:40 AM",
    },
    {
      id: "checklist-2",
      title: "Security audit passed",
      assignedTo: "Mike Johnson",
      initials: "MJ",
      status: "done",
      comments: "No critical vulnerabilities found",
      build: "197",
      lastUpdated: "Sep 30, 11:44 PM",
    },
    {
      id: "checklist-3",
      title: "Performance tests",
      assignedTo: "Alex Rivera",
      initials: "AR",
      status: "done",
      comments: "All metrics within acceptable range",
      build: "197",
      lastUpdated: "Sep 29, 08:17 PM",
    },
    {
      id: "checklist-4",
      title: "Documentation updated",
      assignedTo: "Emma Davis",
      initials: "ED",
      status: "in-progress",
      comments: "API docs in progress, 70% complete",
      build: "198",
      lastUpdated: "Oct 01, 09:15 AM",
    },
    {
      id: "checklist-5",
      title: "Staging deployment",
      assignedTo: "Tom Wilson",
      initials: "TW",
      status: "in-progress",
      comments: "Deployed to staging, awaiting QA sign-off",
      build: "198",
      lastUpdated: "Oct 01, 07:29 AM",
    },
    {
      id: "checklist-6",
      title: "User acceptance testing",
      assignedTo: "Lisa Park",
      initials: "LP",
      status: "blocked",
      comments: "Blocked by open issues in feature X",
      build: "197",
      lastUpdated: "Sep 29, 06:05 PM",
    },
    {
      id: "checklist-7",
      title: "Production deployment",
      assignedTo: "David Kim",
      initials: "DK",
      status: "pending",
      comments: "-",
      build: "197",
      lastUpdated: "Sep 26, 07:29 PM",
    },
    {
      id: "checklist-8",
      title: "Post-release monitoring",
      assignedTo: "Anna Lopez",
      initials: "AL",
      status: "pending",
      comments: "-",
      build: "197",
      lastUpdated: "Sep 26, 07:29 PM",
    },
  ];

  const completedCount = checklistItems.filter(item => item.status === "done").length;
  const totalCount = checklistItems.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  // Table columns configuration
  const columns = [
    {
      title: "Release Item",
      dataIndex: "title",
      key: "title",
      render: (text) => TableUtils.renderReleaseItem(text),
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (text, record) => TableUtils.renderAvatar(text, record.initials),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => TableUtils.renderStatusPill(status),
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
      render: (text) => TableUtils.renderComment(text),
    },
    {
      title: "Build",
      dataIndex: "build",
      key: "build",
      render: (text) => TableUtils.renderBuild(text),
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      key: "lastUpdated",
      render: (text) => TableUtils.renderLastUpdated(text),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <CheckCircle size={20} color={token.colorPrimary} />
          <Title
            level={3}
            style={{
              fontSize: token.fontSizeXL,
              fontWeight: 600,
              color: token.colorText,
              margin: 0,
              fontFamily: token.fontFamilyHeading,
            }}
          >
            Interactive Release Checklist
          </Title>
        </div>

        {/* Progress Section */}
        <Card
          style={{
            borderRadius: token.borderRadiusLG,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            border: `1px solid ${token.colorBorderSecondary}`,
          }}
          bodyStyle={{ padding: "20px" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <Text
              style={{
                fontSize: token.fontSizeSM,
                color: token.colorTextSecondary,
                fontFamily: token.fontFamily,
              }}
            >
              Release Progress
            </Text>
            <Text
              style={{
                fontSize: token.fontSizeSM,
                fontWeight: 600,
                color: token.colorText,
                fontFamily: token.fontFamilyHeading,
              }}
            >
              {completedCount}/{totalCount} completed
            </Text>
          </div>
          <Progress
            percent={progressPercentage}
            strokeColor="#10B981"
            trailColor={token.colorBorderSecondary}
            strokeWidth={6}
            style={{ marginBottom: "8px" }}
          />
          <Text
            style={{
              fontSize: token.fontSizeSM,
              color: token.colorTextSecondary,
              fontFamily: token.fontFamily,
            }}
          >
            {progressPercentage}% of tasks completed
          </Text>
        </Card>
      </div>

      {/* Table */}
      <Card
        style={{
          borderRadius: token.borderRadiusLG,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          border: `1px solid ${token.colorBorderSecondary}`,
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Table
          columns={columns}
          dataSource={checklistItems}
          pagination={false}
          size="middle"
          showHeader={true}
        />
      </Card>
    </div>
  );
};

export default ReleaseChecklistTab;
