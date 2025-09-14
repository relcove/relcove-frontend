import React, { useState } from 'react';
import { 
  Drawer, 
  Typography, 
  Button, 
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
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/ConfigurationOverviewDrawer.module.css';

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
        <div className={styles.configName}>
          <Text strong>{text}</Text>
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
          className={styles.clusterTag}
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
        <Text type="secondary" className={styles.lastSync}>
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
          <Button 
            type="text" 
            icon={<MoreHorizontal size={16} />}
            className={styles.moreButton}
          />
        </Dropdown>
      )
    }
  ];

  return (
    <Drawer
      title={
        <div className={styles.drawerHeader}>
          <div 
            className={styles.drawerIcon}
            style={{ backgroundColor: integration?.color }}
          >
            {integration?.icon}
          </div>
          <div className={styles.drawerTitle}>
            <Title level={4} className={styles.title}>
              {integration?.name} Configurations
            </Title>
            <Text type="secondary" className={styles.subtitle}>
              Manage your {integration?.name} integration settings
            </Text>
          </div>
        </div>
      }
      open={visible}
      onClose={onClose}
      width={800}
      className={styles.drawer}
      footer={
        <div className={styles.drawerFooter}>
          <Button onClick={onClose} className={styles.closeButton}>
            Close
          </Button>
          <Button 
            type="primary" 
            icon={<Plus size={16} />}
            onClick={handleAddConfiguration}
            className={styles.addButton}
          >
            Add {integration?.name} Configuration
          </Button>
        </div>
      }
    >
      <div className={styles.drawerContent}>
        {configurations.length > 0 ? (
          <Table
            columns={columns}
            dataSource={configurations}
            rowKey="id"
            pagination={false}
            className={styles.configTable}
            size="middle"
          />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div className={styles.emptyState}>
                <Text type="secondary">No configurations found</Text>
                <Text type="secondary" className={styles.emptySubtext}>
                  Create your first {integration?.name} configuration to get started
                </Text>
              </div>
            }
          >
            <Button 
              type="primary" 
              icon={<Plus size={16} />}
              onClick={handleAddConfiguration}
            >
              Add Configuration
            </Button>
          </Empty>
        )}
      </div>
    </Drawer>
  );
};

export default ConfigurationOverviewDrawer;
