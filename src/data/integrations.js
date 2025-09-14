// Integration Data and Configuration

// Data structures and constants for integrations

export const INTEGRATION_CATEGORIES = [
  'Communication',
  'Development', 
  'Project Management',
  'Cloud Providers',
  'Data & Analytics',
  'Automation',
  'Security',
  'Monitoring'
];

export const INTEGRATION_STATUSES = [
  'connected',
  'available', 
  'error',
  'disconnected',
  'pending',
  'testing'
];

// Integration Configurations
export const INTEGRATION_CONFIGS = {
  slack: {
    fields: [
      {
        name: 'botToken',
        label: 'Bot Token',
        type: 'password',
        required: true,
        description: 'Your Slack bot token for authentication',
        placeholder: 'xoxb-your-bot-token-here',
        sensitive: true,
        validation: [
          { type: 'required', message: 'Bot token is required' },
          { type: 'pattern', value: '^xoxb-', message: 'Bot token must start with xoxb-' }
        ]
      },
      {
        name: 'webhookUrl',
        label: 'Webhook URL',
        type: 'url',
        required: false,
        description: 'Optional webhook URL for notifications',
        placeholder: 'https://hooks.slack.com/services/...',
        validation: [
          { type: 'pattern', value: '^https://hooks\\.slack\\.com/', message: 'Must be a valid Slack webhook URL' }
        ]
      },
      {
        name: 'channel',
        label: 'Default Channel',
        type: 'text',
        required: false,
        description: 'Default channel for notifications',
        placeholder: '#general'
      }
    ],
    instructions: [
      'Go to your Slack workspace settings',
      'Navigate to Apps & Integrations',
      'Create a new app or select existing one',
      'Copy the Bot Token from OAuth & Permissions',
      'Paste the token in the field below'
    ],
    permissions: [
      'Send messages',
      'Read channel information',
      'Access user information',
      'Manage webhooks'
    ],
    rateLimits: {
      requests: 100,
      period: 'minute',
      burst: 20
    }
  },

  github: {
    fields: [
      {
        name: 'accessToken',
        label: 'Personal Access Token',
        type: 'password',
        required: true,
        description: 'GitHub personal access token with required permissions',
        placeholder: 'ghp_your-token-here',
        sensitive: true,
        validation: [
          { type: 'required', message: 'Access token is required' },
          { type: 'pattern', value: '^ghp_|^gho_|^ghu_|^ghs_|^ghr_', message: 'Must be a valid GitHub token' }
        ]
      },
      {
        name: 'organization',
        label: 'Organization',
        type: 'text',
        required: false,
        description: 'GitHub organization name (optional)',
        placeholder: 'your-organization'
      },
      {
        name: 'repository',
        label: 'Repository',
        type: 'text',
        required: false,
        description: 'Specific repository (optional)',
        placeholder: 'owner/repository'
      }
    ],
    instructions: [
      'Go to GitHub Settings > Developer settings',
      'Click on Personal access tokens',
      'Generate new token with required permissions',
      'Copy the generated token',
      'Paste it in the field below'
    ],
    permissions: [
      'Read repository contents',
      'Read pull requests',
      'Read issues',
      'Read user information'
    ],
    rateLimits: {
      requests: 5000,
      period: 'hour',
      burst: 100
    }
  },

  aws: {
    fields: [
      {
        name: 'accessKeyId',
        label: 'Access Key ID',
        type: 'text',
        required: true,
        description: 'AWS Access Key ID',
        placeholder: 'AKIA...',
        validation: [
          { type: 'required', message: 'Access Key ID is required' },
          { type: 'pattern', value: '^AKIA', message: 'Access Key ID must start with AKIA' }
        ]
      },
      {
        name: 'secretAccessKey',
        label: 'Secret Access Key',
        type: 'password',
        required: true,
        description: 'AWS Secret Access Key',
        placeholder: 'Your secret access key',
        sensitive: true,
        validation: [
          { type: 'required', message: 'Secret Access Key is required' },
          { type: 'minLength', value: 20, message: 'Secret Access Key must be at least 20 characters' }
        ]
      },
      {
        name: 'region',
        label: 'Region',
        type: 'select',
        required: true,
        description: 'AWS region for your resources',
        placeholder: 'us-east-1',
        defaultValue: 'us-east-1'
      }
    ],
    instructions: [
      'Log in to AWS Management Console',
      'Go to IAM (Identity and Access Management)',
      'Create a new user or use existing one',
      'Attach required policies for your use case',
      'Generate access keys for the user',
      'Copy the keys and paste them below'
    ],
    permissions: [
      'EC2:DescribeInstances',
      'S3:ListBucket',
      'S3:GetObject',
      'Lambda:ListFunctions',
      'CloudWatch:GetMetricStatistics'
    ],
    supportedRegions: [
      'us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'
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
        placeholder: 'Paste your service account JSON here...',
        sensitive: true,
        validation: [
          { type: 'required', message: 'Service account key is required' }
        ]
      },
      {
        name: 'projectId',
        label: 'Project ID',
        type: 'text',
        required: true,
        description: 'Google Cloud Project ID',
        placeholder: 'your-project-id',
        validation: [
          { type: 'required', message: 'Project ID is required' },
          { type: 'pattern', value: '^[a-z][a-z0-9-]{4,28}[a-z0-9]$', message: 'Invalid project ID format' }
        ]
      }
    ],
    instructions: [
      'Go to Google Cloud Console',
      'Navigate to IAM & Admin > Service Accounts',
      'Create a new service account or select existing',
      'Generate and download the JSON key file',
      'Copy the JSON content and paste it below'
    ],
    permissions: [
      'Compute Engine: Read',
      'Cloud Storage: Read',
      'BigQuery: Read',
      'Cloud Functions: Read'
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
        placeholder: 'your-client-id',
        validation: [
          { type: 'required', message: 'Client ID is required' },
          { type: 'pattern', value: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', message: 'Invalid client ID format' }
        ]
      },
      {
        name: 'clientSecret',
        label: 'Client Secret',
        type: 'password',
        required: true,
        description: 'Azure application client secret',
        placeholder: 'your-client-secret',
        sensitive: true,
        validation: [
          { type: 'required', message: 'Client Secret is required' }
        ]
      },
      {
        name: 'tenantId',
        label: 'Tenant ID',
        type: 'text',
        required: true,
        description: 'Azure Active Directory tenant ID',
        placeholder: 'your-tenant-id',
        validation: [
          { type: 'required', message: 'Tenant ID is required' },
          { type: 'pattern', value: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', message: 'Invalid tenant ID format' }
        ]
      }
    ],
    instructions: [
      'Go to Azure Portal',
      'Navigate to Azure Active Directory',
      'Register a new application',
      'Generate a client secret',
      'Copy the application details',
      'Paste them in the fields below'
    ],
    permissions: [
      'Virtual Machines: Read',
      'Storage Accounts: Read',
      'Resource Groups: Read',
      'Subscriptions: Read'
    ]
  }
};

// Default Integration Data
export const DEFAULT_INTEGRATIONS = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Connect your Slack workspace to receive notifications and updates',
    category: 'Communication',
    icon: null, // Will be set by component
    status: 'connected',
    color: '#4A154B',
    features: ['Notifications', 'Team Updates', 'Alerts', 'Channel Management'],
    isEnabled: true
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Integrate with GitHub repositories for code management and CI/CD',
    category: 'Development',
    icon: null,
    status: 'available',
    color: '#24292e',
    features: ['Repository Access', 'Pull Requests', 'Issues', 'Actions'],
    isEnabled: true
  },
  {
    id: 'jira',
    name: 'JIRA',
    description: 'Sync project management and issue tracking with JIRA',
    category: 'Project Management',
    icon: null,
    status: 'available',
    color: '#0052CC',
    features: ['Issue Tracking', 'Project Management', 'Workflow Automation'],
    isEnabled: true
  },
  {
    id: 'aws',
    name: 'Amazon Web Services',
    description: 'Connect AWS services for cloud infrastructure management',
    category: 'Cloud Providers',
    icon: null,
    status: 'available',
    color: '#FF9900',
    features: ['EC2 Management', 'S3 Storage', 'Lambda Functions', 'CloudWatch'],
    isEnabled: true
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
    description: 'Integrate with GCP services for cloud computing and storage',
    category: 'Cloud Providers',
    icon: null,
    status: 'available',
    color: '#4285F4',
    features: ['Compute Engine', 'Cloud Storage', 'BigQuery', 'Cloud Functions'],
    isEnabled: true
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    description: 'Connect Azure services for enterprise cloud solutions',
    category: 'Cloud Providers',
    icon: null,
    status: 'available',
    color: '#0078D4',
    features: ['Virtual Machines', 'Blob Storage', 'Functions', 'Monitor'],
    isEnabled: true
  },
  {
    id: 'jira',
    name: 'JIRA',
    description: 'Sync project management and issue tracking with JIRA',
    category: 'Project Management',
    icon: null,
    status: 'available',
    color: '#0052CC',
    features: ['Issue Tracking', 'Project Management', 'Workflow Automation'],
    isEnabled: true
  },
  {
    id: 'database',
    name: 'Database Connections',
    description: 'Connect to various database systems for data management',
    category: 'Data & Analytics',
    icon: null,
    status: 'available',
    color: '#336791',
    features: ['MySQL', 'PostgreSQL', 'MongoDB'],
    isEnabled: true
  },
  {
    id: 'webhooks',
    name: 'Webhooks',
    description: 'Configure webhooks for real-time data synchronization',
    category: 'Automation',
    icon: null,
    status: 'available',
    color: '#FF6B35',
    features: ['Real-time Sync', 'Event Triggers', 'Custom Endpoints'],
    isEnabled: true
  }
];

// Utility Functions
export const getIntegrationConfig = (integrationId) => {
  return INTEGRATION_CONFIGS[integrationId] || {
    fields: [
      {
        name: 'apiKey',
        label: 'API Key',
        type: 'password',
        required: true,
        description: 'API key for authentication',
        placeholder: 'your-api-key',
        sensitive: true
      }
    ],
    instructions: [
      'Obtain API credentials from the service provider',
      'Copy the API key or token',
      'Paste it in the field below'
    ],
    permissions: ['Basic API Access']
  };
};

export const validateIntegrationConfig = (integrationId, config) => {
  const integrationConfig = getIntegrationConfig(integrationId);
  const errors = [];

  integrationConfig.fields.forEach(field => {
    const value = config[field.name];
    
    if (field.required && (!value || value.toString().trim() === '')) {
      errors.push(`${field.label} is required`);
      return;
    }

    if (value && field.validation) {
      field.validation.forEach(rule => {
        switch (rule.type) {
          case 'pattern':
            if (!new RegExp(rule.value).test(value.toString())) {
              errors.push(rule.message);
            }
            break;
          case 'minLength':
            if (value.toString().length < rule.value) {
              errors.push(rule.message);
            }
            break;
          case 'maxLength':
            if (value.toString().length > rule.value) {
              errors.push(rule.message);
            }
            break;
        }
      });
    }
  });

  return errors;
};
