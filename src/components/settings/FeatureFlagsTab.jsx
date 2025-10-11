import React, { useState } from "react";
import { Button, Switch, theme, Typography, Tooltip, Tag } from "antd";
import { Edit, Trash2, Settings } from "lucide-react";
import { CreateButton } from "../StandardButtons";
import GeneralTable, { StatusCell, DateCell, ActionsCell } from "../GeneralTable";

const { Title, Text } = Typography;

const FeatureFlagsTab = () => {
  const { token } = theme.useToken();
  const [featureFlags, setFeatureFlags] = useState([
    {
      id: "new-dashboard",
      name: "New Dashboard",
      description: "Enable the redesigned dashboard interface",
      status: "active",
      environment: "production",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
    },
    {
      id: "beta-features",
      name: "Beta Features",
      description: "Show experimental features to beta users",
      status: "inactive",
      environment: "staging",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
    },
    {
      id: "advanced-analytics",
      name: "Advanced Analytics",
      description: "Enable advanced analytics and reporting features",
      status: "active",
      environment: "development",
      createdAt: "2024-01-05",
      updatedAt: "2024-01-12",
    },
  ]);

  const handleToggleFlag = (flagId) => {
    setFeatureFlags(flags =>
      flags.map(flag =>
        flag.id === flagId
          ? { ...flag, status: flag.status === "active" ? "inactive" : "active" }
          : flag
      )
    );
  };

  const handleDeleteFlag = (flagId) => {
    setFeatureFlags(flags => flags.filter(flag => flag.id !== flagId));
  };

  const columns = [
    {
      title: "Feature Flag",
      key: "feature",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500, fontSize: "14px", color: "#262626" }}>
            {record.name}
          </div>
          <div style={{ fontSize: "12px", color: "#8c8c8c", marginTop: "2px" }}>
            {record.description}
          </div>
        </div>
      ),
    },
    {
      title: "Environment",
      dataIndex: "environment",
      key: "environment",
      render: (environment) => (
        <Tag
          style={{
            backgroundColor: "#e6f7ff",
            color: "#1890ff",
            border: "none",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          {environment.charAt(0).toUpperCase() + environment.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Switch
            checked={status === "active"}
            onChange={() => handleToggleFlag(record.id)}
            size="small"
          />
          <StatusCell status={status} />
        </div>
      ),
    },
    {
      title: "Last Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) => <DateCell date={date} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <ActionsCell
          actions={[
            <Tooltip key="configure" title="Configure Flag">
              <Button
                type="text"
                size="small"
                icon={<Settings size={14} />}
                style={{ color: token.colorTextSecondary }}
              />
            </Tooltip>,
            <Tooltip key="delete" title="Delete Flag">
              <Button
                type="text"
                size="small"
                icon={<Trash2 size={14} />}
                onClick={() => handleDeleteFlag(record.id)}
                style={{ color: token.colorError }}
              />
            </Tooltip>,
          ]}
        />
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <Title level={4} style={{ margin: 0, color: token.colorText }}>
            Feature Flags
          </Title>
          <p style={{ margin: "4px 0 0 0", color: token.colorTextSecondary, fontSize: token.fontSizeSM }}>
            Control feature rollouts and experimental functionality
          </p>
        </div>
        <CreateButton onClick={() => console.log("Add feature flag")}>
          Add Feature Flag
        </CreateButton>
      </div>

      <GeneralTable
        columns={columns}
        dataSource={featureFlags}
        rowKey="id"
        error={null}
        emptyStateTitle="No feature flags found"
        emptyStateDescription="Create your first feature flag to get started."
        emptyStateActionLabel="Add Feature Flag"
        onEmptyStateAction={() => console.log("Add feature flag")}
        emptyStateIcon="plus"
        emptyStateSize="medium"
        showEmptyStateRefresh={true}
        onEmptyStateRefresh={() => window.location.reload()}
      />
    </div>
  );
};

export default FeatureFlagsTab;
