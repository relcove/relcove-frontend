import React, { useState } from 'react';
import { Form, Input, Select, Space, theme, Typography, message, Row, Col } from 'antd';
import { Plus } from 'lucide-react';
import GeneralDrawer from './GeneralDrawer';
import { PRODUCT_ICONS, renderIconFromCode } from '../utils/productIcons.jsx';
import { CancelButton, SaveButton } from './StandardButtons';

const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const NewProductDrawer = ({ open, onClose, onProductCreated }) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Mock users data for Owner/Lead selection
  const users = [
    { value: 'john-doe', label: 'John Doe', email: 'john@company.com' },
    { value: 'jane-smith', label: 'Jane Smith', email: 'jane@company.com' },
    { value: 'mike-wilson', label: 'Mike Wilson', email: 'mike@company.com' },
    { value: 'sarah-chen', label: 'Sarah Chen', email: 'sarah@company.com' },
    { value: 'alex-brown', label: 'Alex Brown', email: 'alex@company.com' }
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Mock API call to create new product
      const response = await fetch('/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.productName,
          identifier: values.productIdentifier,
          description: values.description || '',
          owner: values.owner,
          icon: values.productIcon,
          status: 'active'
        }),
      });

      if (response.ok) {
        const newProduct = await response.json();
        message.success('Product created successfully!');
        form.resetFields();
        onClose();
        onProductCreated(newProduct);
      } else {
        throw new Error('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      message.error('Failed to create product. Please try again.');
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
        Create Product
      </SaveButton>
    </Space>
  );

  return (
    <GeneralDrawer
      open={open}
      onClose={handleCancel}
      title="Add Product"
      icon={<Plus size={16} color="white" />}
      footer={footer}
    >
      <div style={{ marginBottom: '20px' }}>
        <Text style={{ 
          fontSize: token.fontSizeSM, 
          color: token.colorTextSecondary,
          lineHeight: '1.5'
        }}>
          Add a new product to your organization. This will create a new workspace for managing releases, tests, and issues.
        </Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Row gutter={[12, 16]}>
          {/* Product Name */}
          <Col span={24}>
            <Form.Item
              name="productName"
              label={
                <Text style={{ fontSize: token.fontSizeSM, fontWeight: 500, color: token.colorFormLabel }}>
                  Product Name <Text style={{ color: token.colorRequired }}>*</Text>
                </Text>
              }
              rules={[
                { required: true, message: 'Please enter product name' },
                { min: 2, message: 'Product name must be at least 2 characters' },
                { max: 50, message: 'Product name must be less than 50 characters' }
              ]}
            >
              <Input 
                placeholder="e.g., Web Application, Mobile App"
                style={{ 
                  borderRadius: token.borderRadius,
                  fontSize: token.fontSizeSM
                }}
              />
            </Form.Item>
          </Col>

          {/* Product Identifier */}
          <Col span={24}>
            <Form.Item
              name="productIdentifier"
              label={
                <Text style={{ fontSize: token.fontSizeSM, fontWeight: 500, color: token.colorFormLabel }}>
                  Product Identifier <Text style={{ color: token.colorRequired }}>*</Text>
                </Text>
              }
              rules={[
                { required: true, message: 'Please enter product identifier' },
                { 
                  pattern: /^[a-z0-9-]+$/, 
                  message: 'Identifier must contain only lowercase letters, numbers, and hyphens' 
                },
                { min: 2, message: 'Identifier must be at least 2 characters' },
                { max: 30, message: 'Identifier must be less than 30 characters' }
              ]}
            >
              <Input 
                placeholder="e.g., web-app, mobile-app, api-service"
                style={{ 
                  borderRadius: token.borderRadius,
                  fontSize: token.fontSizeSM
                }}
              />
            </Form.Item>
          </Col>

          {/* Owner/Lead */}
          <Col span={24}>
            <Form.Item
              name="owner"
              label={
                <Text style={{ fontSize: token.fontSizeSM, fontWeight: 500, color: token.colorFormLabel }}>
                  Owner/Lead <Text style={{ color: token.colorRequired }}>*</Text>
                </Text>
              }
              rules={[{ required: true, message: 'Please select an owner' }]}
            >
              <Select 
                placeholder="Select product owner"
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
                {users.map(user => (
                  <Option key={user.value} value={user.value}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: token.fontSizeSM }}>{user.label}</span>
                      <span style={{ fontSize: token.fontSizeXS, color: token.colorTextSecondary }}>
                        {user.email}
                      </span>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Product Icon */}
          <Col span={24}>
            <Form.Item
              name="productIcon"
              label={
                <Text style={{ fontSize: token.fontSizeSM, fontWeight: 500, color: token.colorFormLabel }}>
                  Product Icon <Text style={{ color: token.colorRequired }}>*</Text>
                </Text>
              }
              rules={[{ required: true, message: 'Please select a product icon' }]}
            >
              <Select 
                placeholder="Select product icon"
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
                {Object.entries(PRODUCT_ICONS).map(([iconCode, iconConfig]) => (
                  <Option key={iconCode} value={iconCode}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: token.colorFillTertiary,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {renderIconFromCode(iconCode, 12, token.colorTextSecondary)}
                      </div>
                      <span style={{ fontSize: token.fontSizeSM }}>{iconConfig.label}</span>
                    </div>
                  </Option>
                ))}
              </Select>
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
                placeholder="Brief description of the product..."
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

export default NewProductDrawer;
