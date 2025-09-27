import React, { useState } from 'react';
import { Card, Row, Col, Typography, Space, Badge, theme } from 'antd';
import { 
  Slack, 
  Github, 
  Cloud, 
  Database, 
  MessageSquare, 
  Zap,
  Settings,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import ConfigurationOverviewDrawer from '../components/integrations/ConfigurationOverviewDrawer';
import { DEFAULT_INTEGRATIONS } from '../data/integrations';
import { PrimaryButton, SecondaryButton } from '../components/StandardButtons';

const { Title, Text } = Typography;

const IntegrationsPage = () => {
  const { token } = theme.useToken();
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const getIntegrationIcon = (integrationId) => {
    const iconMap = {
      slack: <Slack size={24} />,
      github: <Github size={24} />,
      jira: <MessageSquare size={24} />,
      aws: <Cloud size={24} />,
      gcp: <Cloud size={24} />,
      azure: <Cloud size={24} />,
      database: <Database size={24} />,
      webhooks: <Zap size={24} />
    };
    return iconMap[integrationId] || <Settings size={24} />;
  };

  const integrations = DEFAULT_INTEGRATIONS.map(integration => ({
    ...integration,
    icon: getIntegrationIcon(integration.id)
  }));

  const categories = [...new Set(integrations.map(integration => integration.category))];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'connected':
        return <Badge status="success" text="Connected" />;
      case 'available':
        return <Badge status="default" text="Available" />;
      case 'error':
        return <Badge status="error" text="Error" />;
      default:
        return <Badge status="default" text="Unknown" />;
    }
  };

  const handleIntegrationClick = (integration) => {
    setSelectedIntegration(integration);
    setIsDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerVisible(false);
    setSelectedIntegration(null);
  };

  return (
    <div style={{ padding: '24px', backgroundColor: token.colorBgContainer }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '8px'
        }}>
          <div>
            <Title level={1} style={{ 
              fontSize: '28px', 
              fontWeight: 600, 
              color: token.colorText,
              margin: 0,
              fontFamily: token.fontFamilyHeading,
              letterSpacing: '-0.025em'
            }}>
              Integrations
            </Title>
            <Text style={{ 
              fontSize: '16px', 
              color: token.colorTextSecondary,
              fontFamily: token.fontFamily,
              fontWeight: 400
            }}>
              Connect your favorite tools and services to streamline your workflow
            </Text>
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        {categories.map(category => (
          <div key={category} style={{ marginBottom: '40px' }}>
            <Title level={4} style={{ 
              fontSize: token.fontSizeLG, 
              fontWeight: 600, 
              color: token.colorText,
              marginBottom: '20px',
              fontFamily: token.fontFamilyHeading
            }}>
              {category}
            </Title>
            <Row gutter={[24, 24]}>
              {integrations
                .filter(integration => integration.category === category)
                .map(integration => (
                  <Col xs={24} sm={12} lg={8} xl={6} key={integration.id}>
                    <Card
                      hoverable
                      style={{
                        borderRadius: token.borderRadiusLG,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                        border: `1px solid ${token.colorBorderSecondary}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      bodyStyle={{ padding: '20px' }}
                      onClick={() => handleIntegrationClick(integration)}
                    >
                      <div>
                        {/* Card Header */}
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          marginBottom: '16px'
                        }}>
                          <div 
                            style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '50%',
                              backgroundColor: integration.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white'
                            }}
                          >
                            {integration.icon}
                          </div>
                          <div>
                            {getStatusBadge(integration.status)}
                          </div>
                        </div>
                        
                        {/* Card Body */}
                        <div style={{ marginBottom: '16px' }}>
                          <Title level={5} style={{ 
                            fontSize: token.fontSizeLG, 
                            fontWeight: 600, 
                            color: token.colorText,
                            margin: '0 0 8px 0',
                            fontFamily: token.fontFamilyHeading
                          }}>
                            {integration.name}
                          </Title>
                          <Text style={{ 
                            fontSize: token.fontSizeSM, 
                            color: token.colorTextSecondary,
                            lineHeight: '1.5'
                          }}>
                            {integration.description}
                          </Text>
                        </div>

                        {/* Card Footer */}
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center'
                        }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {integration.features.slice(0, 2).map((feature, index) => (
                              <span key={index} style={{
                                fontSize: token.fontSizeXS,
                                color: token.colorTextSecondary,
                                backgroundColor: token.colorFillTertiary,
                                padding: '2px 8px',
                                borderRadius: token.borderRadiusSM,
                                fontWeight: 500
                              }}>
                                {feature}
                              </span>
                            ))}
                            {integration.features.length > 2 && (
                              <span style={{
                                fontSize: token.fontSizeXS,
                                color: token.colorTextSecondary,
                                backgroundColor: token.colorFillTertiary,
                                padding: '2px 8px',
                                borderRadius: token.borderRadiusSM,
                                fontWeight: 500
                              }}>
                                +{integration.features.length - 2} more
                              </span>
                            )}
                          </div>
                          
                          <div>
                            {integration.status === 'connected' ? (
                              <SecondaryButton 
                                icon={<Settings size={14} />}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleIntegrationClick(integration);
                                }}
                              >
                                Configure
                              </SecondaryButton>
                            ) : (
                              <PrimaryButton 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleIntegrationClick(integration);
                                }}
                              >
                                Connect
                              </PrimaryButton>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        ))}
      </div>

      {selectedIntegration && (
        <ConfigurationOverviewDrawer
          integration={selectedIntegration}
          visible={isDrawerVisible}
          onClose={handleDrawerClose}
        />
      )}
    </div>
  );
};

export default IntegrationsPage;
