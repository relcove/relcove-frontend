import React from 'react';
import { Row, Col, theme, Typography} from 'antd';
import ActiveReleasesWidget from './widgets/ActiveReleasesWidget';
import CustomerIssuesWidget from './widgets/CustomerIssuesWidget';
import FeaturesOverviewWidget from './widgets/FeaturesOverviewWidget';
import TestResultsWidget from './widgets/TestResultsWidget';

const { Title, Text } = Typography;

const Dashboard = () => {
  const { token } = theme.useToken();

  return (
    <div style={{ backgroundColor: token.colorBgContainer }}>
      {/* Command Center Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '8px'
        }}>
          {/* Left side - Title */}
          <div>
          <Title level={1} style={{ 
            fontSize: '28px', 
            fontWeight: 600, 
            color: token.colorText,
            margin: 0,
            fontFamily: token.fontFamilyHeading,
            letterSpacing: '-0.025em'
          }}>
            Command Center
          </Title>
            <Text style={{ 
              fontSize: '16px', 
              color: token.colorTextSecondary,
              fontFamily: token.fontFamily,
              fontWeight: 400
            }}>
              Real-time overview of releases, issues, features, and tests
            </Text>
          </div>
        </div>
      </div>

      {/* 2x2 Grid Layout */}
      <Row gutter={[24, 24]}>
        {/* Top Left - Active Releases */}
        <Col xs={24} lg={12}>
          <ActiveReleasesWidget />
        </Col>

        {/* Top Right - Customer Issues */}
        <Col xs={24} lg={12}>
          <CustomerIssuesWidget />
        </Col>

        {/* Bottom Left - Features Overview */}
        <Col xs={24} lg={12}>
          <FeaturesOverviewWidget />
        </Col>

        {/* Bottom Right - Test Results */}
        <Col xs={24} lg={12}>
          <TestResultsWidget />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;