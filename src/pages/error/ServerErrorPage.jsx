import React from "react";
import { Button, Result, Card, Typography, Space, Alert } from "antd";
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

const ServerErrorPage = ({ 
  error, 
  onRetry, 
  showBackButton = true, 
  showHomeButton = true,
  title = "Internal Server Error",
  subtitle = "Something went wrong on our end. Please try again later.",
  className = ""
}) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #fef2f2 20%, #fff7ed 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      className={className}
    >
      <div style={{ maxWidth: '672px', width: '100%' }}>
        <Result
          status="500"
          icon={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '96px',
                  height: '96px',
                  backgroundColor: '#fef2f2',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <AlertTriangle size={48} style={{ color: '#dc2626' }} />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '-8px',
                  right: '-8px',
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#dc2626',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>!</span>
                </div>
              </div>
            </div>
          }
          title={
            <Title level={2} className="font-heading" style={{ color: '#111827', marginBottom: 0 }}>
              {title}
            </Title>
          }
          subTitle={
            <div style={{ marginTop: '12px' }}>
              <Paragraph className="font-paragraph" style={{ fontSize: '18px', color: '#4b5563', marginBottom: '12px' }}>
                {subtitle}
              </Paragraph>
              {error && (
                <Alert
                  message="Error Details"
                  description={
                    <Text code style={{ fontSize: '14px', wordBreak: 'break-all' }}>
                      {error.message || error.toString()}
                    </Text>
                  }
                  type="error"
                  showIcon
                  style={{ marginTop: '16px' }}
                />
              )}
            </div>
          }
          extra={
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Space wrap justify="center">
                {onRetry && (
                  <Button
                    type="primary"
                    size="large"
                    icon={<RefreshCw size={16} />}
                    onClick={onRetry}
                    style={{
                      height: '44px',
                      paddingLeft: '24px',
                      paddingRight: '24px',
                      borderRadius: '8px',
                      fontWeight: '500'
                    }}
                  >
                    Try Again
                  </Button>
                )}
                
                {showBackButton && (
                  <Button
                    size="large"
                    icon={<ArrowLeft size={16} />}
                    onClick={handleGoBack}
                    style={{
                      height: '44px',
                      paddingLeft: '24px',
                      paddingRight: '24px',
                      borderRadius: '8px',
                      fontWeight: '500',
                      backgroundColor: 'white',
                      color: '#374151',
                      borderColor: '#d1d5db',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    Go Back
                  </Button>
                )}
                
                {showHomeButton && (
                  <Button
                    size="large"
                    icon={<Home size={16} />}
                    onClick={handleGoHome}
                    style={{
                      height: '44px',
                      paddingLeft: '24px',
                      paddingRight: '24px',
                      borderRadius: '8px',
                      fontWeight: '500',
                      backgroundColor: 'white',
                      color: '#374151',
                      borderColor: '#d1d5db',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    Go Home
                  </Button>
                )}
              </Space>
            </Space>
          }
        />
        
        {/* Additional Help Section */}
        <Card 
          style={{ 
            marginTop: '32px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}
        >
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Title level={4} className="font-heading" style={{ 
              margin: 0, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              color: '#111827'
            }}>
              <AlertTriangle size={18} style={{ color: '#d97706' }} />
              What you can do:
            </Title>
            
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#d97706',
                  borderRadius: '50%',
                  marginTop: '8px',
                  flexShrink: 0
                }}></div>
                <Paragraph className="font-paragraph" style={{ margin: 0, color: '#4b5563' }}>
                  Wait a few minutes and try again - this might be a temporary issue
                </Paragraph>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#d97706',
                  borderRadius: '50%',
                  marginTop: '8px',
                  flexShrink: 0
                }}></div>
                <Paragraph className="font-paragraph" style={{ margin: 0, color: '#4b5563' }}>
                  Check your internet connection and refresh the page
                </Paragraph>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#d97706',
                  borderRadius: '50%',
                  marginTop: '8px',
                  flexShrink: 0
                }}></div>
                <Paragraph className="font-paragraph" style={{ margin: 0, color: '#4b5563' }}>
                  If the problem persists, contact our support team
                </Paragraph>
              </div>
            </Space>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default ServerErrorPage; 