import React, { useMemo } from "react";
import { Table, Tag, theme, Typography } from "antd";
import EmptyState from "./EmptyState";
import DefaultLoader from "./DefaultLoader";
import UserAvatar from "./UserAvatar";
import { formatDateForTable } from "../utils/helpers";
import { renderIconFromCode } from "../utils/productIcons";

const { Text } = Typography;

const GeneralTable = ({ 
  columns, 
  dataSource, 
  rowKey = "id", 
  pagination = true,
  loading = false,
  error = null,
  // Empty state props
  emptyStateTitle,
  emptyStateDescription,
  emptyStateActionLabel,
  onEmptyStateAction,
  emptyStateIcon = "plus",
  emptyStateSize = "medium",
  showEmptyStateRefresh = false,
  onEmptyStateRefresh,
  ...props 
}) => {
  const { token } = theme.useToken();

  const defaultPagination = {
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) =>
      `${range[0]}-${range[1]} of ${total} items`,
    pageSizeOptions: ["10", "20", "50", "100"],
  };

  // Generate skeleton data for loading state
  const generateSkeletonData = () => {
    const skeletonRows = 3;
    const skeletonData = [];
    
    for (let i = 0; i < skeletonRows; i++) {
      const row = { id: `skeleton-${i}` };
      columns.forEach((column, index) => {
        if (column.dataIndex) {
          row[column.dataIndex] = "loading...";
        }
      });
      skeletonData.push(row);
    }
    return skeletonData;
  };

  // Create skeleton columns that render loading states
  const skeletonColumns = useMemo(() => {
    return columns.map((column, index) => ({
      ...column,
      render: (text, record) => {
        // Check if this is skeleton data
        if (record?.id?.startsWith("skeleton-") || text === "loading...") {
          return renderSkeletonCell(column, index);
        }
        // Use original render function if it exists
        return column.render ? column.render(text, record) : text;
      }
    }));
  }, [columns, token]);

  // Render skeleton cell based on column type
  const renderSkeletonCell = (column, columnIndex) => {
    // Determine skeleton type based on column title or dataIndex
    const columnType = (column.title || column.dataIndex || "").toLowerCase();
    
    if (columnType.includes("product")) {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "6px",
              backgroundColor: token.colorFillSecondary,
              animation: "skeleton-pulse 1.5s ease-in-out infinite",
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                height: "14px",
                backgroundColor: token.colorFillSecondary,
                borderRadius: "4px",
                animation: "skeleton-pulse 1.5s ease-in-out infinite",
                width: "120px",
                marginBottom: "4px",
              }}
            />
            <div
              style={{
                height: "12px",
                backgroundColor: token.colorFillTertiary,
                borderRadius: "4px",
                animation: "skeleton-pulse 1.5s ease-in-out infinite",
                width: "100px",
              }}
            />
          </div>
        </div>
      );
    }
    
    if (columnType.includes("identifier")) {
      return (
        <div
          style={{
            height: "20px",
            backgroundColor: token.colorFillSecondary,
            borderRadius: "4px",
            animation: "skeleton-pulse 1.5s ease-in-out infinite",
            width: "80px",
          }}
        />
      );
    }
    
    if (columnType.includes("status")) {
      return (
        <div
          style={{
            height: "20px",
            backgroundColor: token.colorFillSecondary,
            borderRadius: "4px",
            animation: "skeleton-pulse 1.5s ease-in-out infinite",
            width: "60px",
          }}
        />
      );
    }
    
    if (columnType.includes("owner") || columnType.includes("lead")) {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: token.colorFillSecondary,
              animation: "skeleton-pulse 1.5s ease-in-out infinite",
            }}
          />
          <div
            style={{
              height: "14px",
              backgroundColor: token.colorFillSecondary,
              borderRadius: "4px",
              animation: "skeleton-pulse 1.5s ease-in-out infinite",
              width: "80px",
            }}
          />
        </div>
      );
    }
    
    if (columnType.includes("action")) {
      return (
        <div style={{ display: "flex", gap: "4px" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "4px",
              backgroundColor: token.colorFillSecondary,
              animation: "skeleton-pulse 1.5s ease-in-out infinite",
            }}
          />
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "4px",
              backgroundColor: token.colorFillSecondary,
              animation: "skeleton-pulse 1.5s ease-in-out infinite",
            }}
          />
        </div>
      );
    }
    
    // Default skeleton for other columns
    return (
      <div
        style={{
          height: "14px",
          backgroundColor: token.colorFillSecondary,
          borderRadius: "4px",
          animation: "skeleton-pulse 1.5s ease-in-out infinite",
          width: columnIndex === 0 ? "120px" : "90px",
        }}
      />
    );
  };

  // Custom empty state component
  const customEmptyState = (
    <EmptyState
      icon={emptyStateIcon}
      title={emptyStateTitle}
      description={emptyStateDescription}
      actionLabel={emptyStateActionLabel}
      onAction={onEmptyStateAction}
      showAction={!!onEmptyStateAction}
      showRefresh={showEmptyStateRefresh}
      onRefresh={onEmptyStateRefresh}
      size={emptyStateSize}
    />
  );

  // Show empty state only when not loading and no data
  const shouldShowEmptyState = !loading && (!dataSource || dataSource.length === 0);

  // Use skeleton data when loading, otherwise use actual data
  const tableData = loading ? generateSkeletonData() : dataSource;
  const tableColumns = loading ? skeletonColumns : columns;

  return (
    <>
      <style>
        {`
          @keyframes skeleton-pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.3;
            }
          }
        `}
      </style>
      <Table
        columns={tableColumns}
        dataSource={tableData}
        rowKey={rowKey}
        pagination={pagination && !loading ? defaultPagination : false}
        locale={{
          emptyText: shouldShowEmptyState ? customEmptyState : null,
        }}
        style={{
          backgroundColor: "white",
        }}
        styles={{
          header: {
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #f0f0f0",
          },
          body: {
            backgroundColor: "#ffffff",
          },
        }}
        {...props}
      />
    </>
  );
};

// Helper components for common table cell types
export const ProductCell = ({ record, icon, name, description }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    <div
      style={{
        width: "32px",
        height: "32px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#6b7280",
        border: "1px solid #e5e7eb",
      }}
    >
      {renderIconFromCode(icon, 16)}
    </div>
    <div>
      <div style={{ fontWeight: 500, fontSize: "14px", color: "#111827" }}>
        {name}
      </div>
    </div>
  </div>
);

export const IdentifierCell = ({ identifier }) => (
  <Tag
    style={{
      backgroundColor: "#f3f4f6",
      color: "#374151",
      border: "1px solid #e5e7eb",
      borderRadius: "6px",
      fontSize: "12px",
      fontWeight: 500,
    }}
  >
    {identifier}
  </Tag>
);

export const StatusCell = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return { color: "#059669", backgroundColor: "#d1fae5", border: "#10b981" };
      case "inactive":
        return { color: "#6b7280", backgroundColor: "#f3f4f6", border: "#d1d5db" };
      default:
        return { color: "#6b7280", backgroundColor: "#f3f4f6", border: "#d1d5db" };
    }
  };

  const statusStyle = getStatusColor(status);

  return (
    <Tag
      style={{
        color: statusStyle.color,
        backgroundColor: statusStyle.backgroundColor,
        border: `1px solid ${statusStyle.border}`,
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: 500,
      }}
    >
      {status}
    </Tag>
  );
};

export const OwnerCell = ({ owner }) => (
  <UserAvatar 
    clerkId={owner} 
    size="default" 
    showName={true}
    showEmail={true}
  />
);

export const DateCell = ({ date }) => (
  <Text style={{ fontSize: "14px", color: "#6b7280" }}>
    {formatDateForTable(date)}
  </Text>
);

export const ActionsCell = ({ actions }) => (
  <div style={{ display: "flex", gap: "8px" }}>
    {actions}
  </div>
);

export default GeneralTable;
