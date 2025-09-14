import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Dashboard = () => {
  return (
    <div>
      <Title level={2} style={{ marginBottom: '24px', color: '#262626' }}>
        Dashboard
      </Title>
      <div style={{ 
        padding: '24px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <p>Welcome to Zentra Dashboard! This is your main dashboard content.</p>
        <p>You can add your dashboard components, charts, and data here.</p>
      </div>
    </div>
  );
};

export default Dashboard;