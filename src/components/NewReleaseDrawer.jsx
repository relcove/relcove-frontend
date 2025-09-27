import React, { useState } from 'react';
import { Form, Input, Select, Space, theme, Typography, message, Row, Col, Tag } from 'antd';
import { Rocket } from 'lucide-react';
import GeneralDrawer from './GeneralDrawer';
import { CancelButton, SaveButton } from './StandardButtons';

const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const NewReleaseDrawer = ({ open, onClose, onReleaseCreated }) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Mock data for dropdowns
  const owners = [
    { value: 'sarah-chen', label: 'Sarah Chen', email: 'sarah@company.com' },
    { value: 'mike-wilson', label: 'Mike Wilson', email: 'mike@company.com' },
    { value: 'alex-brown', label: 'Alex Brown', email: 'alex@company.com' },
    { value: 'emma-davis', label: 'Emma Davis', email: 'emma@company.com' },
    { value: 'david-lee', label: 'David Lee', email: 'david@company.com' }
  ];

  const products = [
    { value: 'web-application', label: 'Web Application' },
    { value: 'mobile-app', label: 'Mobile App' },
    { value: 'api-service', label: 'API Service' },
    { value: 'desktop-app', label: 'Desktop App' }
  ];

  const releaseTypes = [
    { value: 'major', label: 'Major Release' },
    { value: 'minor', label: 'Minor Release' },
    { value: 'patch', label: 'Patch Release' },
    { value: 'hotfix', label: 'Hotfix Release' }
  ];

  const statuses = [
    { value: 'planning', label: 'Planning' },
    { value: 'development', label: 'Development' },
    { value: 'testing', label: 'Testing' },
    { value: 'rc', label: 'Release Candidate' },
    { value: 'released', label: 'Released' }
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Mock API call to create new release
      const response = await fetch('/api/v1/releases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          owner: values.owner,
          product: values.product,
          releaseType: values.releaseType,
          status: values.status,
          description: values.description || '',
          baseVersion: values.baseVersion,
          tags: values.tags || [],
          createdAt: new Date().toISOString()
        }),
      });

      if (response.ok) {
        const newRelease = await response.json();
        message.success('Release created successfully!');
        form.resetFields();
        onClose();
        onReleaseCreated(newRelease);
      } else {
        throw new Error('Failed to create release');
      }
    } catch (error) {
      console.error('Error creating release:', error);
      message.error('Failed to create release. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const footer = (
    <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
      <CancelButton onClick={handleCancel} />
      <SaveButton 
        loading={loading}
        onClick={() => form.submit()}
      >
        Create Release
      </SaveButton>
    </Space>
  );

  return (
    <GeneralDrawer
      open={open}
      onClose={handleCancel}
      title="Create New Release"
      icon={<Rocket size={16} color="white" />}
      footer={footer}
    >
      <div style={{ marginBottom: '20px' }}>
        <Text style={{ 
          fontSize: token.fontSizeSM, 
          color: token.colorTextSecondary,
          lineHeight: '1.5'
        }}>
          Create a new release for your product. This will set up a new release cycle with tracking and management capabilities.
        </Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Row gutter={[12, 16]}>
          {/* Name */}
          <Col span={24}>
            <Form.Item
              name="name"
              label={
                <Text style={{ fontSize: token.fontSizeSM, fontWeight: 500, color: token.colorFormLabel }}>
                  Name <Text style={{ color: token.colorRequired }}>*</Text>
                </Text>
              }
              rules={[
                { required: true, message: 'Please enter release name' },
                { min: 2, message: 'Release name must be at least 2 characters' },
                { max: 50, message: 'Release name must be less than 50 characters' }
              ]}
            >
              <Input 
                placeholder="e.g., v2.4.1, Q1 2024 Release"
                style={{ 
                  borderRadius: token.borderRadius,
                  fontSize: token.fontSizeSM
                }}
              />
            </Form.Item>
          </Col>

          {/* Owner */}
          <Col span={24}>
            <Form.Item
              name="owner"
              label={
                <Text style={{ fontSize: token.fontSizeSM, fontWeight: 500, color: token.colorFormLabel }}>
                  Owner <Text style={{ color: token.colorRequired }}>*</Text>
                </Text>
              }
              rules={[{ required: true, message: 'Please select an owner' }]}
            >
              <Select 
                placeholder="Select release owner"
                style={{ 
                  borderRadius: token.borderRadius,
                  fontSize: token.fontSizeSM
                }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {owners.map(owner => (
                  <Option key={owner.value} value={owner.value}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: token.fontSizeSM }}>{owner.label}</span>
                      <span style={{ fontSize: token.fontSizeXS, color: token.colorTextSecondary }}>
                        {owner.email}
                      </span>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Product */}
          <Col span={24}>
            <Form.Item
              name="product"
              label={
                <Text style={{ fontSize: token.fontSizeSM, fontWeight: 500, color: token.colorFormLabel }}>
                  Product <Text style={{ color: token.colorRequired }}>*</Text>
                </Text>
              }
              rules={[{ required: true, message: 'Please select a product' }]}
            >
              <Select 
                placeholder="Select product"
                style={{ 
                  borderRadius: token.borderRadius,
                  fontSize: token.fontSizeSM
                }}
              >
                {products.map(product => (
                  <Option key={product.value} value={product.value}>
                    {product.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Release Type */}
          <Col span={12}>
            <Form.Item
              name="releaseType"
              label={
                <Text style={{ fontSize: token.fontSizeSM, fontWeight: 500, color: token.colorFormLabel }}>
                  Release Type <Text style={{ color: token.colorRequired }}>*</Text>
                </Text>
              }
              rules={[{ required: true, message: 'Please select release type' }]}
            >
              <Select 
                placeholder="Select type"
                style={{ 
                  borderRadius: token.borderRadius,
                  fontSize: token.fontSizeSM
                }}
              >
                {releaseTypes.map(type => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Status */}
          <Col span={12}>
            <Form.Item
              name="status"
              label={
                <Text style={{ fontSize: token.fontSizeSM, fontWeight: 500, color: token.colorFormLabel }}>
                  Status <Text style={{ color: token.colorRequired }}>*</Text>
                </Text>
              }
              rules={[{ required: true, message: 'Please select status' }]}
            >
              <Select 
                placeholder="Select status"
                style={{ 
                  borderRadius: token.borderRadius,
                  fontSize: token.fontSizeSM
                }}
              >
                {statuses.map(status => (
                  <Option key={status.value} value={status.value}>
                    {status.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Base Version */}
          <Col span={24}>
            <Form.Item
              name="baseVersion"
              label={
                <Text style={{ fontSize: token.fontSizeSM, fontWeight: 500, color: token.colorFormLabel }}>
                  Base Version <Text style={{ color: token.colorRequired }}>*</Text>
                </Text>
              }
              rules={[
                { required: true, message: 'Please enter base version' },
                { pattern: /^v?\d+\.\d+\.\d+$/, message: 'Please enter valid version (e.g., v2.4.0 or 2.4.0)' }
              ]}
            >
              <Input 
                placeholder="e.g., v2.4.0, 2.4.0"
                style={{ 
                  borderRadius: token.borderRadius,
                  fontSize: token.fontSizeSM
                }}
              />
            </Form.Item>
          </Col>

          {/* Tags */}
          <Col span={24}>
            <Form.Item
              name="tags"
              label={
                <Text style={{ fontSize: token.fontSizeSM, fontWeight: 500, color: token.colorFormLabel }}>
                  Tags
                </Text>
              }
            >
              <Select
                mode="tags"
                placeholder="Add tags (press Enter to add)"
                style={{ 
                  borderRadius: token.borderRadius,
                  fontSize: token.fontSizeSM
                }}
                tokenSeparators={[',']}
              />
            </Form.Item>
          </Col>

          {/* Description */}
          <Col span={24}>
            <Form.Item
              name="description"
              label={
                <Text style={{ fontSize: token.fontSizeSM, fontWeight: 500, color: token.colorFormLabel }}>
                  Description
                </Text>
              }
              rules={[
                { max: 500, message: 'Description must be less than 500 characters' }
              ]}
            >
              <TextArea 
                placeholder="Brief description of the release..."
                rows={3}
                style={{ 
                  borderRadius: token.borderRadius,
                  fontSize: token.fontSizeSM
                }}
                showCount
                maxLength={500}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </GeneralDrawer>
  );
};

export default NewReleaseDrawer;
