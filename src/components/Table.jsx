import React from "react";
import { Table as AntTable, Avatar, theme, Typography } from "antd";
import { CheckCircle, Clock, AlertCircle, AlertTriangle } from "lucide-react";

const { Text } = Typography;

const getStatusConfig = (status) => {
  switch (status) {
    case "done":
    case "completed":
      return {
        color: "#10B981",
        bgColor: "#ECFDF5",
        icon: CheckCircle,
        label: "Done",
      };
    case "in-progress":
    case "in_progress":
      return {
        color: "#F59E0B",
        bgColor: "#FFFBEB",
        icon: Clock,
        label: "In Progress",
      };
    case "blocked":
      return {
        color: "#EF4444",
        bgColor: "#FEF2F2",
        icon: AlertTriangle,
        label: "Blocked",
      };
    case "pending":
      return {
        color: "#6B7280",
        bgColor: "#F9FAFB",
        icon: AlertCircle,
        label: "Pending",
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

const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const renderStatusPill = (status) => {
  const statusConfig = getStatusConfig(status);
  const IconComponent = statusConfig.icon;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 8px",
        backgroundColor: statusConfig.bgColor,
        borderRadius: "12px",
        border: `1px solid ${statusConfig.color}`,
      }}
    >
      <IconComponent size={12} color={statusConfig.color} />
      <span
        style={{
          fontSize: "12px",
          fontWeight: 500,
          color: statusConfig.color,
          fontFamily: "Inter, sans-serif",
        }}
      >
        {statusConfig.label}
      </span>
    </div>
  );
};

const renderAvatar = (name, initials) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "#3B82F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: 600,
          color: "white",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {initials || getInitials(name)}
      </div>
      <span
        style={{
          fontSize: "14px",
          fontWeight: 500,
          color: "#1F2937",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {name}
      </span>
    </div>
  );
};

const renderComment = (comment) => {
  if (!comment || comment === "-") {
    return (
      <span
        style={{
          fontSize: "14px",
          color: "#9CA3AF",
          fontFamily: "Inter, sans-serif",
          fontStyle: "italic",
        }}
      >
        -
      </span>
    );
  }
  return (
    <span
      style={{
        fontSize: "14px",
        color: "#1F2937",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {comment}
    </span>
  );
};

const renderBuild = (build) => {
  return (
    <span
      style={{
        fontSize: "14px",
        fontWeight: 500,
        color: "#1F2937",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {build}
    </span>
  );
};

const renderLastUpdated = (lastUpdated) => {
  return (
    <span
      style={{
        fontSize: "14px",
        color: "#6B7280",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {lastUpdated}
    </span>
  );
};

const renderReleaseItem = (title) => {
  return (
    <span
      style={{
        fontSize: "14px",
        fontWeight: 500,
        color: "#1F2937",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {title}
    </span>
  );
};

const Table = ({ 
  columns = [], 
  data = [], 
  loading = false,
  pagination = false,
  showHeader = true,
  size = "middle",
  bordered = false,
  ...props 
}) => {
  const { token } = theme.useToken();

  return (
    <AntTable
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={pagination}
      showHeader={showHeader}
      size={size}
      bordered={bordered}
      style={{
        fontFamily: token.fontFamily,
      }}
      rowKey="id"
      {...props}
    />
  );
};

// Export utility functions for use in other components
export const TableUtils = {
  getStatusConfig,
  getInitials,
  renderStatusPill,
  renderAvatar,
  renderComment,
  renderBuild,
  renderLastUpdated,
  renderReleaseItem,
};

export default Table;
