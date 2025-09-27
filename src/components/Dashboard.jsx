import React, { useState } from 'react';
import { Row, Col, theme, Typography, Button, Space } from 'antd';
import { Plus } from 'lucide-react';
import ActiveReleasesWidget from './widgets/ActiveReleasesWidget';
import CustomerIssuesWidget from './widgets/CustomerIssuesWidget';
import FeaturesOverviewWidget from './widgets/FeaturesOverviewWidget';
import TestResultsWidget from './widgets/TestResultsWidget';
import NewProductDrawer from './NewProductDrawer';
import ProductSelector from './ProductSelector';

const { Title, Text } = Typography;

const Dashboard = () => {
  const { token } = theme.useToken();
  const [selectedProduct, setSelectedProduct] = useState('web-application');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Mock products data
  const products = [
    { value: 'web-application', label: 'Web Application' },
    { value: 'mobile-app', label: 'Mobile App' },
    { value: 'api-service', label: 'API Service' },
    { value: 'desktop-app', label: 'Desktop App' }
  ];

  const handleNewProduct = () => {
    setDrawerOpen(true);
  };

  const handleProductCreated = (newProduct) => {
    // Add the new product to the list
    products.push({
      value: newProduct.id,
      label: newProduct.name
    });
    // Optionally switch to the new product
    setSelectedProduct(newProduct.id);
  };

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

          {/* Right side - Product Selector and New Product Button */}
          <Space size="middle" style={{ alignItems: 'center' }}>
            <ProductSelector
              selectedProduct={selectedProduct}
              onProductChange={setSelectedProduct}
              showLabel={true}
              width={160}
              size="middle"
            />
            <Button 
              type="primary" 
              icon={<Plus size={16} />}
              onClick={handleNewProduct}
              style={{
                borderRadius: token.borderRadius,
                fontWeight: 500
              }}
            >
              New Product
            </Button>
          </Space>
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

      {/* New Product Drawer */}
      <NewProductDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onProductCreated={handleProductCreated}
      />
    </div>
  );
};

export default Dashboard;