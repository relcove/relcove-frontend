import React, { useState } from 'react';
import { 
  Card, 
  Steps, 
  Form, 
  Input, 
  Button, 
  Typography, 
  Space, 
  Alert, 
  Divider,
  theme 
} from 'antd';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  Eye, 
  EyeOff 
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getIntegrationConfig } from '../data/integrations';
import styles from '../styles/IntegrationSetupPage.module.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

const IntegrationSetupPage = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const { id: integrationId } = useParams();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [showSecrets, setShowSecrets] = useState({});
  const [isConnecting, setIsConnecting] = useState(false);

  const steps = [
    {
      title: 'Authentication',
      description: 'Configure API credentials'
    },
    {
      title: 'Permissions',
      description: 'Set up access permissions'
    },
    {
      title: 'Testing',
      description: 'Test the connection'
    }
  ];

  const config = getIntegrationConfig(integrationId);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    setIsConnecting(true);
    try {
      const values = await form.validateFields();
      console.log('Integration configuration:', values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle success - navigate back to integrations
      navigate('/integrations');
    } catch (error) {
      console.error('Integration error:', error);
      alert('Failed to connect the integration. Please check your credentials and try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const toggleSecretVisibility = (fieldName) => {
    setShowSecrets(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  const renderField = (field) => {
    const isPassword = field.type === 'password';
    const isTextArea = field.type === 'textarea';
    const showSecret = showSecrets[field.name];

    return (
      <Form.Item
        key={field.name}
        name={field.name}
        label={field.label}
        rules={[
          { required: field.required, message: `${field.label} is required` }
        ]}
        className={styles.formItem}
      >
        {isTextArea ? (
          <TextArea
            placeholder={field.placeholder}
            rows={4}
            className={styles.textArea}
          />
        ) : (
          <Input
            type={isPassword && !showSecret ? 'password' : 'text'}
            placeholder={field.placeholder}
            suffix={
              isPassword ? (
                <Button
                  type="text"
                  icon={showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                  onClick={() => toggleSecretVisibility(field.name)}
                  className={styles.eyeButton}
                />
              ) : null
            }
            className={styles.input}
          />
        )}
        {field.description && (
          <Text type="secondary" className={styles.fieldDescription}>
            {field.description}
          </Text>
        )}
      </Form.Item>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className={styles.stepContent}>
            <div className={styles.instructionsSection}>
              <Title level={5}>Setup Instructions</Title>
              <ol className={styles.instructionsList}>
                {config.instructions.map((instruction, index) => (
                  <li key={index} className={styles.instructionItem}>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
            
            <Divider />
            
            <div className={styles.configSection}>
              <Title level={5}>Configuration</Title>
              <Form form={form} layout="vertical" className={styles.form}>
                {config.fields.map(renderField)}
              </Form>
            </div>
          </div>
        );
      
      case 1:
        return (
          <div className={styles.stepContent}>
            <Title level={5}>Permissions & Access</Title>
            <Card className={styles.permissionsCard}>
              <Space direction="vertical" size="middle" className={styles.permissionsList}>
                {config.permissions?.map((permission, index) => (
                  <div key={index} className={styles.permissionItem}>
                    <CheckCircle size={16} className={styles.permissionIcon} />
                    <Text>{permission}</Text>
                  </div>
                ))}
              </Space>
            </Card>
            <Alert
              message="Data Access"
              description="This integration will have read access to your data for the features listed above. You can modify permissions after setup."
              type="info"
              className={styles.alert}
            />
          </div>
        );
      
      case 2:
        return (
          <div className={styles.stepContent}>
            <Title level={5}>Test Connection</Title>
            <div className={styles.testSection}>
              <Card className={styles.testCard}>
                <Space direction="vertical" size="large" className={styles.testContent}>
                  <div className={styles.testStatus}>
                    <CheckCircle size={24} className={styles.successIcon} />
                    <Text strong>Ready to test connection</Text>
                  </div>
                  <Text type="secondary">
                    Click "Test Connection" to verify your configuration and establish the connection.
                  </Text>
                </Space>
              </Card>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={styles.setupPage}>
      {/* Top Section - Back Button */}
      <div className={styles.topSection}>
        <Button 
          type="text"
          icon={<ArrowLeft size={16} />}
          onClick={() => navigate('/integrations')}
          className={styles.backButton}
        >
          Back to Integrations
        </Button>
      </div>

      {/* Middle Section - Main Content */}
      <div className={styles.middleSection}>
        <div className={styles.header}>
          <Title level={2} className={styles.title}>
            Setup {integrationId?.charAt(0).toUpperCase() + integrationId?.slice(1)} Integration
          </Title>
          <Text className={styles.subtitle}>
            Follow the steps below to configure your integration
          </Text>
        </div>

        <div className={styles.contentLayout}>
          <div className={styles.timelineContainer}>
            <Steps 
              current={currentStep} 
              items={steps}
              direction="vertical"
              className={styles.steps}
            />
          </div>
          
          <Card className={styles.setupCard}>
            <div className={styles.stepContainer}>
              {renderStepContent()}
            </div>
          </Card>
        </div>
      </div>
      
      {/* Bottom Section - Navigation Buttons */}
      <div className={styles.bottomSection}>
        <div className={styles.bottomSectionContent}>
          <div className={styles.footerLeft}>
            <Button 
              onClick={() => navigate('/integrations')}
              className={styles.cancelButton}
            >
              Cancel
            </Button>
          </div>
          
          <div className={styles.footerRight}>
            {currentStep > 0 && (
              <Button 
                icon={<ArrowLeft size={16} />}
                onClick={handlePrev}
                className={styles.prevButton}
              >
                Previous
              </Button>
            )}
            
            {currentStep === steps.length - 1 ? (
              <Button 
                type="primary" 
                onClick={handleFinish}
                loading={isConnecting}
                className={styles.connectButton}
              >
                Connect Integration
              </Button>
            ) : (
              <Button 
                type="primary" 
                icon={<ArrowRight size={16} />}
                onClick={handleNext}
                className={styles.nextButton}
              >
                Next: {steps[currentStep + 1]?.title}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSetupPage;
