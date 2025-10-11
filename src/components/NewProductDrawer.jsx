import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Space, theme, Typography, Row, Col, App, Spin } from 'antd';
import { Plus } from 'lucide-react';
import GeneralDrawer from './GeneralDrawer';
import { PRODUCT_ICONS, renderIconFromCode } from '../utils/productIcons.jsx';
import { CancelButton, SaveButton } from './StandardButtons';
import { useCreateProduct, useUpdateProduct } from '../services/products';
import { useProductStatusEnum } from '../services/enums';
import UserDropdown from './UserDropdown';

const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const NewProductDrawer = ({ open, onClose, onProductCreated, editingProduct = null }) => {
  const { token } = theme.useToken();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const { data: statusOptions = [], isLoading: statusLoading, error: statusError } = useProductStatusEnum();
  
  const isEditing = !!editingProduct;

  // Pre-fill form when editing
  useEffect(() => {
    if (open && editingProduct) {
      form.setFieldsValue({
        product_name: editingProduct.product_name,
        product_identifier: editingProduct.product_identifier,
        description: editingProduct.description || '',
        owner: editingProduct.owner,
        product_icon: editingProduct.product_icon,
        status: editingProduct.status || 'Active',
      });
    } else if (open && !editingProduct) {
      // Reset form for new product
      form.resetFields();
    }
  }, [open, editingProduct, form]);

  const handleSubmit = async (values) => {
    const productData = {
      product_name: values.product_name,
      product_identifier: values.product_identifier,
      description: values.description || '',
      owner: values.owner,
      product_icon: values.product_icon,
      status: values.status || 'Active'
    };

    if (isEditing) {
      // Update existing product
      updateProductMutation.mutate({
        productId: editingProduct.product_id,
        productData: productData
      }, {
        onSuccess: () => {
          message.success('Product updated successfully!');
          form.resetFields();
          onClose();
        },
        onError: (error) => {
          console.error('Error updating product:', error);
          message.error(error.message || 'Failed to update product. Please try again.');
        }
      });
    } else {
      // Create new product
      createProductMutation.mutate(productData, {
        onSuccess: (newProduct) => {
          message.success('Product created successfully!');
          form.resetFields();
          onClose();
          onProductCreated(newProduct);
        },
        onError: (error) => {
          console.error('Error creating product:', error);
          message.error(error.message || 'Failed to create product. Please try again.');
        }
      });
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
        loading={isEditing ? updateProductMutation.isPending : createProductMutation.isPending}
        onClick={() => form.submit()}
      >
        {isEditing ? 'Update Product' : 'Create Product'}
      </SaveButton>
    </Space>
  );

  return (
    <GeneralDrawer
      open={open}
      onClose={handleCancel}
      title={isEditing ? "Edit Product" : "Add Product"}
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
              name="product_name"
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
              name="product_identifier"
              label={
                <Text style={{ fontSize: token.fontSizeSM, fontWeight: 500, color: token.colorFormLabel }}>
                  Product Identifier <Text style={{ color: token.colorRequired }}>*</Text>
                </Text>
              }
              rules={[
                { required: true, message: 'Please enter product identifier' },
                { 
                  pattern: /^[A-Z0-9-]+$/, 
                  message: 'Identifier must contain only uppercase letters, numbers, and hyphens' 
                },
                { min: 2, message: 'Identifier must be at least 2 characters' },
                { max: 30, message: 'Identifier must be less than 30 characters' }
              ]}
            >
              <Input 
                placeholder="e.g., WEBAPP, MOBILE-APP, API-SERVICE"
                style={{ 
                  borderRadius: token.borderRadius,
                  fontSize: token.fontSizeSM
                }}
              />
            </Form.Item>
          </Col>
          
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
              <UserDropdown 
                placeholder="Select product owner"
                style={{ 
                  borderRadius: token.borderRadius,
                  fontSize: token.fontSizeSM,
                  minHeight: '48px',
                  height: '48px'
                }}
              />
            </Form.Item>
          </Col>

          {/* Product Icon */}
          <Col span={24}>
            <Form.Item
              name="product_icon"
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

          {/* Status - Only show when editing */}
          {isEditing && (
            <Col span={24}>
              <Form.Item
                name="status"
                label={
                  <Text style={{ fontSize: token.fontSizeSM, fontWeight: 500, color: token.colorFormLabel }}>
                    Status <Text style={{ color: token.colorRequired }}>*</Text>
                  </Text>
                }
                rules={[{ required: true, message: 'Please select a status' }]}
                initialValue="Active"
              >
                <Select 
                  placeholder="Select product status"
                  style={{ 
                    borderRadius: token.borderRadius,
                    fontSize: token.fontSizeSM
                  }}
                  loading={statusLoading}
                  disabled={statusLoading || statusError}
                  notFoundContent={statusLoading ? <Spin size="small" /> : "No status options found"}
                >
                  {statusOptions.map((statusOption) => (
                    <Option key={statusOption.value} value={statusOption.value}>
                      {statusOption.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </GeneralDrawer>
  );
};

export default NewProductDrawer;
