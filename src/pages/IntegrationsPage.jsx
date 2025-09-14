import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button, Space, Badge, theme } from 'antd';
import { 
  Slack, 
  Github, 
  Cloud, 
  Database, 
  MessageSquare, 
  Zap,
  Plus,
  Settings,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import ConfigurationOverviewDrawer from '../components/integrations/ConfigurationOverviewDrawer';
import { DEFAULT_INTEGRATIONS } from '../data/integrations';
import styles from '../styles/IntegrationsPage.module.css';

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
    <div className={styles.integrationsPage}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Title level={2} className={styles.title}>
            Integrations
          </Title>
          <Text className={styles.subtitle}>
            Connect your favorite tools and services to streamline your workflow
          </Text>
        </div>
      </div>

      <div className={styles.content}>
        {categories.map(category => (
          <div key={category} className={styles.categorySection}>
            <Title level={4} className={styles.categoryTitle}>
              {category}
            </Title>
            <Row gutter={[24, 24]}>
              {integrations
                .filter(integration => integration.category === category)
                .map(integration => (
                  <Col xs={24} sm={12} lg={8} xl={6} key={integration.id}>
                    <Card
                      hoverable
                      className={`${styles.integrationCard} ${
                        integration.status === 'connected' ? styles.connectedCard : ''
                      }`}
                      onClick={() => handleIntegrationClick(integration)}
                    >
                      <div className={styles.cardContent}>
                        <div className={styles.cardHeader}>
                          <div 
                            className={styles.iconContainer}
                            style={{ backgroundColor: integration.color }}
                          >
                            {integration.icon}
                          </div>
                          <div className={styles.statusContainer}>
                            {getStatusBadge(integration.status)}
                          </div>
                        </div>
                        
                        <div className={styles.cardBody}>
                          <Title level={5} className={styles.integrationName}>
                            {integration.name}
                          </Title>
                          <Text className={styles.integrationDescription}>
                            {integration.description}
                          </Text>
                        </div>

                        <div className={styles.cardFooter}>
                          <div className={styles.features}>
                            {integration.features.slice(0, 2).map((feature, index) => (
                              <span key={index} className={styles.featureTag}>
                                {feature}
                              </span>
                            ))}
                            {integration.features.length > 2 && (
                              <span className={styles.featureTag}>
                                +{integration.features.length - 2} more
                              </span>
                            )}
                          </div>
                          
                          <div className={styles.actionButton}>
                            {integration.status === 'connected' ? (
                              <Button 
                                type="text" 
                                icon={<Settings size={16} />}
                                className={styles.configureButton}
                              >
                                Configure
                              </Button>
                            ) : (
                              <Button 
                                type="primary" 
                                size="small"
                                className={styles.connectButton}
                              >
                                Connect
                              </Button>
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
