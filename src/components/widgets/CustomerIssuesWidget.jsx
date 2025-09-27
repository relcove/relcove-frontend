import React from 'react';
import { Card, List, Typography, Tag, Space, theme } from 'antd';
import { AlertTriangle, Sun, Info, ExternalLink } from 'lucide-react';

const { Text, Title } = Typography;

const CustomerIssuesWidget = () => {
  const { token } = theme.useToken();

  // Mock data for customer issues
  const issues = [
    {
      id: 'CR-2401',
      priority: 'Critical',
      priorityColor: token.colorError,
      priorityIcon: <AlertTriangle size={12} />,
      description: 'Payment gateway timeout on checkout',
      assignee: 'John Smith',
      date: '20/01/2024',
      status: 'Open',
      statusColor: token.colorError
    },
    {
      id: 'CR-2402',
      priority: 'High',
      priorityColor: token.colorWarning,
      priorityIcon: <Sun size={12} />,
      description: 'Dashboard loading performance issue',
      assignee: 'Sarah Chen',
      date: '19/01/2024',
      status: 'In Progress',
      statusColor: token.colorWarning
    },
    {
      id: 'CR-2403',
      priority: 'High',
      priorityColor: token.colorWarning,
      priorityIcon: <Sun size={12} />,
      description: 'Email notifications not delivered',
      assignee: 'Mike Johnson',
      date: '18/01/2024',
      status: 'Open',
      statusColor: token.colorError
    },
    {
      id: 'CR-2404',
      priority: 'Medium',
      priorityColor: token.colorInfo,
      priorityIcon: <Info size={12} />,
      description: 'Export feature crashes with large datasets',
      assignee: 'Lisa Wang',
      date: '17/01/2024',
      status: 'Resolved',
      statusColor: token.colorSuccess
    },
    {
      id: 'CR-2405',
      priority: 'Low',
      priorityColor: token.colorSuccess,
      priorityIcon: <Info size={12} />,
      description: 'Minor UI alignment issue in mobile view',
      assignee: 'Tom Wilson',
      date: '16/01/2024',
      status: 'Open',
      statusColor: token.colorError
    }
  ];

  return (
    <Card
      style={{
        height: '350px',
        borderRadius: token.borderRadiusLG,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        border: `1px solid ${token.colorBorderSecondary}`
      }}
      bodyStyle={{ padding: '16px', height: '100%', overflow: 'hidden' }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: token.colorPrimary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <AlertTriangle size={16} color="white" />
          </div>
          <div>
            <Title level={4} style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
              Customer Issues ({issues.length})
            </Title>
            <Text style={{ 
              fontSize: '12px', 
              color: token.colorTextTertiary,
              display: 'block',
              marginTop: '2px',
              marginLeft: '2px'
            }}>
              Last 7 days
            </Text>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          color: token.colorPrimary,
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 500
        }}>
          <Text style={{ color: token.colorPrimary }}>View All</Text>
          <ExternalLink size={14} />
        </div>
      </div>

      {/* Issues List */}
      <div style={{ height: 'calc(100% - 50px)', overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {issues.map((issue) => (
          <div
            key={issue.id}
            style={{
              padding: '16px',
              backgroundColor: token.colorBgElevated,
              borderRadius: token.borderRadius,
              border: `1px solid ${token.colorBorderSecondary}`,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between'
            }}
          >
            {/* Left side - Priority, ID, Description, Details */}
            <div style={{ flex: 1 }}>
              {/* Priority and ID */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Tag
                  color={issue.priorityColor}
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    margin: 0,
                    padding: '3px 8px',
                    borderRadius: '10px',
                    border: 'none'
                  }}
                >
                  {issue.priorityIcon}
                  {issue.priority}
                </Tag>
                <Text style={{ 
                  fontSize: '11px', 
                  color: token.colorTextSecondary, 
                  fontWeight: 500,
                  fontFamily: 'monospace'
                }}>
                  {issue.id}
                </Text>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '8px' }}>
                <Text style={{ 
                  fontSize: '13px', 
                  color: token.colorText,
                  fontWeight: 500,
                  lineHeight: '1.4'
                }}>
                  {issue.description}
                </Text>
              </div>

              {/* Details */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                color: token.colorTextSecondary
              }}>
                <Text style={{ fontSize: '11px', color: token.colorTextSecondary }}>
                  {issue.assignee}
                </Text>
                <span style={{ color: token.colorTextTertiary }}>•</span>
                <Text style={{ fontSize: '11px', color: token.colorTextSecondary }}>
                  {issue.date}
                </Text>
              </div>
            </div>

            {/* Right side - Status */}
            <div style={{ marginLeft: '12px' }}>
              <Tag
                color={issue.statusColor}
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  margin: 0,
                  padding: '4px 8px',
                  borderRadius: '12px'
                }}
              >
                {issue.status}
              </Tag>
            </div>
          </div>
        ))}
        </div>
      </div>
    </Card>
  );
};

export default CustomerIssuesWidget;
