import React, { useState } from 'react';
import { Form, Input, Select, Space, theme, Typography, Row, Col, App } from 'antd';
import { Rocket } from 'lucide-react';
import GeneralDrawer from './GeneralDrawer';
import { CancelButton, SaveButton } from './StandardButtons';
import { useCreateRelease } from '../services/releases';
import { useProducts } from '../services/products';
import { useReleaseStatusEnum, useReleaseTypeEnum } from '../services/enums';
import UserDropdown from './UserDropdown';
import DefaultLoader from './DefaultLoader';

const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const NewReleaseDrawer = ({ open, onClose, onReleaseCreated, productId }) => {
  const { token } = theme.useToken();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  
  // API hooks
  const createReleaseMutation = useCreateRelease();
  const { data: products = [] } = useProducts();
  const { data: statusOptions = [], isLoading: statusLoading } = useReleaseStatusEnum();
  const { data: typeOptions = [], isLoading: typeLoading } = useReleaseTypeEnum();
  
  // Get current product
  const currentProduct = products.find(p => p.product_id === productId);

  const handleSubmit = async (values) => {
    const releaseData = {
      name: values.name,
      description: values.description || '',
      owner: values.owner,
      product_id: productId,
      release_type: values.releaseType,
      status: values.status,
      target_release_date: values.targetReleaseDate,
      base_version_id: values.baseVersion,
      tags: values.tags || [],
    };

    createReleaseMutation.mutate(releaseData, {
      onSuccess: (newRelease) => {
        message.success('Release created successfully!');
        form.resetFields();
        onClose();
        onReleaseCreated(newRelease);
      },
      onError: (error) => {
        console.error('Error creating release:', error);
        message.error(error.message || 'Failed to create release. Please try again.');
      }
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const footer = (
    <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
      <CancelButton onClick={handleCancel} />
      <SaveButton 
        loading={createReleaseMutation.isPending}
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
              <UserDropdown 
                placeholder="Select release owner"
                style={{ 
                  borderRadius: token.borderRadius,
                  fontSize: token.fontSizeSM,
                  minHeight: '48px',
                  height: '48px'
                }}
              />
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
                loading={typeLoading}
                disabled={typeLoading}
                notFoundContent={typeLoading ? <DefaultLoader height="40px" /> : "No types found"}
              >
                {typeOptions.map((typeOption) => (
                  <Option key={typeOption.value} value={typeOption.value}>
                    {typeOption.label}
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
                loading={statusLoading}
                disabled={statusLoading}
                notFoundContent={statusLoading ? <DefaultLoader height="40px" /> : "No statuses found"}
              >
                {statusOptions.map((statusOption) => (
                  <Option key={statusOption.value} value={statusOption.value}>
                    {statusOption.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Target Release Date */}
          <Col span={24}>
            <Form.Item
              name="targetReleaseDate"
              label={
                <Text style={{ fontSize: token.fontSizeSM, fontWeight: 500, color: token.colorFormLabel }}>
                  Target Release Date <Text style={{ color: token.colorRequired }}>*</Text>
                </Text>
              }
              rules={[{ required: true, message: 'Please select target release date' }]}
            >
              <Input 
                type="date"
                style={{ 
                  borderRadius: token.borderRadius,
                  fontSize: token.fontSizeSM
                }}
              />
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
