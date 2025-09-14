import React, { useState } from 'react';
import { 
  Drawer, 
  Form, 
  Input, 
  Button, 
  Typography, 
  Steps, 
  Card, 
  Space, 
  Alert, 
  Divider,
  theme 
} from 'antd';
import { 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  Copy, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import styles from '../../styles/IntegrationDrawer.module.css';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const IntegrationDrawer = ({ integration, visible, onClose }) => {
  const { token } = theme.useToken();
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

  const getIntegrationConfig = (integrationId) => {
    const configs = {
      slack: {
        fields: [
          {
            name: 'botToken',
            label: 'Bot Token',
            type: 'password',
            required: true,
            description: 'Your Slack bot token for authentication',
            placeholder: 'xoxb-your-bot-token-here'
          },
          {
            name: 'webhookUrl',
            label: 'Webhook URL',
            type: 'text',
            required: false,
            description: 'Optional webhook URL for notifications',
            placeholder: 'https://hooks.slack.com/services/...'
          }
        ],
        instructions: [
          'Go to your Slack workspace settings',
          'Navigate to Apps & Integrations',
          'Create a new app or select existing one',
          'Copy the Bot Token from OAuth & Permissions',
          'Paste the token in the field below'
        ]
      },
      github: {
        fields: [
          {
            name: 'accessToken',
            label: 'Personal Access Token',
            type: 'password',
            required: true,
            description: 'GitHub personal access token with required permissions',
            placeholder: 'ghp_your-token-here'
          },
          {
            name: 'organization',
            label: 'Organization',
            type: 'text',
            required: false,
            description: 'GitHub organization name (optional)',
            placeholder: 'your-organization'
          }
        ],
        instructions: [
          'Go to GitHub Settings > Developer settings',
          'Click on Personal access tokens',
          'Generate new token with required permissions',
          'Copy the generated token',
          'Paste it in the field below'
        ]
      },
      aws: {
        fields: [
          {
            name: 'accessKeyId',
            label: 'Access Key ID',
            type: 'text',
            required: true,
            description: 'AWS Access Key ID',
            placeholder: 'AKIA...'
          },
          {
            name: 'secretAccessKey',
            label: 'Secret Access Key',
            type: 'password',
            required: true,
            description: 'AWS Secret Access Key',
            placeholder: 'Your secret access key'
          },
          {
            name: 'region',
            label: 'Region',
            type: 'text',
            required: true,
            description: 'AWS region for your resources',
            placeholder: 'us-east-1'
          }
        ],
        instructions: [
          'Log in to AWS Management Console',
          'Go to IAM (Identity and Access Management)',
          'Create a new user or use existing one',
          'Attach required policies for your use case',
          'Generate access keys for the user',
          'Copy the keys and paste them below'
        ]
      },
      gcp: {
        fields: [
          {
            name: 'serviceAccountKey',
            label: 'Service Account Key',
            type: 'textarea',
            required: true,
            description: 'JSON service account key file content',
            placeholder: 'Paste your service account JSON here...'
          },
          {
            name: 'projectId',
            label: 'Project ID',
            type: 'text',
            required: true,
            description: 'Google Cloud Project ID',
            placeholder: 'your-project-id'
          }
        ],
        instructions: [
          'Go to Google Cloud Console',
          'Navigate to IAM & Admin > Service Accounts',
          'Create a new service account or select existing',
          'Generate and download the JSON key file',
          'Copy the JSON content and paste it below'
        ]
      },
      azure: {
        fields: [
          {
            name: 'clientId',
            label: 'Client ID',
            type: 'text',
            required: true,
            description: 'Azure application client ID',
            placeholder: 'your-client-id'
          },
          {
            name: 'clientSecret',
            label: 'Client Secret',
            type: 'password',
            required: true,
            description: 'Azure application client secret',
            placeholder: 'your-client-secret'
          },
          {
            name: 'tenantId',
            label: 'Tenant ID',
            type: 'text',
            required: true,
            description: 'Azure Active Directory tenant ID',
            placeholder: 'your-tenant-id'
          }
        ],
        instructions: [
          'Go to Azure Portal',
          'Navigate to Azure Active Directory',
          'Register a new application',
          'Generate a client secret',
          'Copy the application details',
          'Paste them in the fields below'
        ]
      }
    };

    return configs[integrationId] || {
      fields: [
        {
          name: 'apiKey',
          label: 'API Key',
          type: 'password',
          required: true,
          description: 'API key for authentication',
          placeholder: 'your-api-key'
        }
      ],
      instructions: [
        'Obtain API credentials from the service provider',
        'Copy the API key or token',
        'Paste it in the field below'
      ]
    };
  };

  const config = getIntegrationConfig(integration?.id);

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
      
      // Handle success
      console.log('Integration connected successfully:', integration.name);
      onClose();
    } catch (error) {
      console.error('Integration error:', error);
      // Handle error - could show a toast notification or inline error
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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
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
                {integration.features?.map((feature, index) => (
                  <div key={index} className={styles.permissionItem}>
                    <CheckCircle size={16} className={styles.permissionIcon} />
                    <Text>{feature}</Text>
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
              Connect {integration?.name}
            </Title>
            <Text type="secondary" className={styles.subtitle}>
              {integration?.description}
            </Text>
          </div>
        </div>
      }
      open={visible}
      onClose={onClose}
      width={600}
      className={styles.drawer}
      footer={
        <div className={styles.drawerFooter}>
          <Button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </Button>
          <Button onClick={handlePrev} disabled={currentStep === 0} className={styles.prevButton}>
            Previous
          </Button>
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
            <Button type="primary" onClick={handleNext} className={styles.nextButton}>
              Next
            </Button>
          )}
        </div>
      }
    >
      <div className={styles.drawerContent}>
        <Steps 
          current={currentStep} 
          items={steps}
          className={styles.steps}
        />
        
        <div className={styles.stepContainer}>
          {renderStepContent()}
        </div>
      </div>
    </Drawer>
  );
};

export default IntegrationDrawer;
