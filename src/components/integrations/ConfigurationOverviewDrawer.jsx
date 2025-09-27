import React, { useState } from 'react';
import { 
  Typography, 
  Table, 
  Space, 
  Dropdown, 
  Tag,
  Empty,
  theme 
} from 'antd';
import { 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GeneralDrawer from '../GeneralDrawer';
import { CancelButton, SaveButton } from '../StandardButtons';

const { Title, Text } = Typography;

const ConfigurationOverviewDrawer = ({ integration, visible, onClose }) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const [configurations, setConfigurations] = useState([
    {
      id: 'config-1',
      name: 'Production Slack',
      status: 'active',
      lastSync: '2024-01-15T10:30:00Z',
      cluster: 'production-cluster',
      exportingTo: integration?.name || 'Slack'
    },
    {
      id: 'config-2', 
      name: 'Staging Notifications',
      status: 'inactive',
      lastSync: '2024-01-14T15:45:00Z',
      cluster: 'staging-cluster',
      exportingTo: integration?.name || 'Slack'
    }
  ]);

  const handleAddConfiguration = () => {
    navigate(`/integrations/${integration?.id}/new`);
    onClose();
  };

  const handleEditConfiguration = (configId) => {
    navigate(`/integrations/${integration?.id}/edit/${configId}`);
    onClose();
  };

  const handleDeleteConfiguration = (configId) => {
    setConfigurations(prev => prev.filter(config => config.id !== configId));
  };

  const getStatusTag = (status) => {
    switch (status) {
      case 'active':
        return <Tag color="green" icon={<CheckCircle size={12} />}>Active</Tag>;
      case 'inactive':
        return <Tag color="default" icon={<AlertCircle size={12} />}>Inactive</Tag>;
      case 'error':
        return <Tag color="red" icon={<AlertCircle size={12} />}>Error</Tag>;
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  const formatLastSync = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getActionItems = (config) => [
    {
      key: 'edit',
      label: 'Edit Configuration',
      icon: <Edit size={14} />,
      onClick: () => handleEditConfiguration(config.id)
    },
    {
      key: 'view',
      label: 'View Details',
      icon: <ExternalLink size={14} />,
      onClick: () => navigate(`/integrations/${integration?.id}/config/${config.id}`)
    },
    {
      type: 'divider'
    },
    {
      key: 'delete',
      label: 'Delete Configuration',
      icon: <Trash2 size={14} />,
      danger: true,
      onClick: () => handleDeleteConfiguration(config.id)
    }
  ];

  const columns = [
    {
      title: 'Configuration Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Text strong style={{ fontSize: token.fontSizeSM }}>{text}</Text>
          {getStatusTag(record.status)}
        </div>
      )
    },
   
    {
      title: 'Assigned to',
      dataIndex: 'cluster',
      key: 'cluster',
      render: (text) => (
        <Tag 
          color="blue" 
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(`/clusters/${text}`)}
        >
          {text}
        </Tag>
      )
    },
    {
      title: 'Last Sync',
      dataIndex: 'lastSync',
      key: 'lastSync',
      render: (text) => (
        <Text style={{ 
          fontSize: token.fontSizeSM, 
          color: token.colorTextSecondary 
        }}>
          {formatLastSync(text)}
        </Text>
      )
    },
    {
      title: '',
      key: 'actions',
      width: 50,
      render: (_, record) => (
        <Dropdown
          menu={{ items: getActionItems(record) }}
          trigger={['click']}
          placement="bottomRight"
        >
          <div style={{ 
            cursor: 'pointer', 
            padding: '4px',
            borderRadius: token.borderRadius,
            color: token.colorTextSecondary
          }}>
            <MoreHorizontal size={16} />
          </div>
        </Dropdown>
      )
    }
  ];

  const footer = (
    <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
      <CancelButton onClick={onClose} />
      <SaveButton 
        icon={<Plus size={14} />}
        onClick={handleAddConfiguration}
      >
        Add {integration?.name} Configuration
      </SaveButton>
    </Space>
  );

  return (
    <GeneralDrawer
      open={visible}
      onClose={onClose}
      title={`${integration?.name} Configurations`}
      icon={<Settings size={16} color="white" />}
      footer={footer}
      width="min(800px, 100%)"
    >
      <div style={{ marginBottom: '20px' }}>
        <Text style={{ 
          fontSize: token.fontSizeSM, 
          color: token.colorTextSecondary,
          lineHeight: '1.5'
        }}>
          Manage your {integration?.name} integration settings and configurations
        </Text>
      </div>

      {configurations.length > 0 ? (
        <Table
          columns={columns}
          dataSource={configurations}
          rowKey="id"
          pagination={false}
          size="middle"
          style={{
            backgroundColor: token.colorBgContainer,
            borderRadius: token.borderRadiusLG
          }}
        />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div style={{ textAlign: 'center' }}>
              <Text style={{ 
                fontSize: token.fontSizeSM, 
                color: token.colorTextSecondary 
              }}>
                No configurations found
              </Text>
              <br />
              <Text style={{ 
                fontSize: token.fontSizeXS, 
                color: token.colorTextTertiary 
              }}>
                Create your first {integration?.name} configuration to get started
              </Text>
            </div>
          }
        >
          <SaveButton 
            icon={<Plus size={14} />}
            onClick={handleAddConfiguration}
          >
            Add Configuration
          </SaveButton>
        </Empty>
      )}
    </GeneralDrawer>
  );
};

export default ConfigurationOverviewDrawer;
